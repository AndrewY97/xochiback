const pool = require('../config/database');

const Reservas = {
    async crearReserva(nombre, email, celular, cantidad, fecha, exp, hora) {
        try {
            const [expRows] = await pool.promise().query(
                'SELECT id FROM experiencias WHERE nombre = ?',
                [exp]
            );

            if (expRows.length === 0) {
                throw new Error(`No se encontró la experiencia con el nombre: ${exp}`);
            }

            const experienciaId = expRows[0].id;
            const [clientRows] = await pool.promise().query(
                'SELECT id FROM clientes WHERE nombre = ? OR email = ? OR celular = ?',
                [nombre, email, celular]
            );

            let clienteId;
            if (clientRows.length === 0) {
                const [clientResult] = await pool.promise().query(
                    'INSERT INTO clientes (nombre, email, celular) VALUES (?, ?, ?)',
                    [nombre, email, celular]
                );
                clienteId = clientResult.insertId;
            } else {
                clienteId = clientRows[0].id;
            }

            const [result] = await pool.promise().query(
                'INSERT INTO reservacion (personas, fecha,horario,id_experiencia,id_cliente) VALUES (?, ?,?, ?, ?)',
                [cantidad, fecha, hora, experienciaId, clienteId]
            );

            return { id: result.insertId, clienteId, nombre, email, hora, celular, cantidad, fecha, experienciaId };
        } catch (err) {
            console.error('Error al crear una nueva reserva:', err);
            throw err;
        }
    },
    async getDisponible(cantidad, exp) {
        try {
            const [expRows] = await pool.promise().query(
                'SELECT id FROM experiencias WHERE nombre = ?',
                [exp]
            );

            if (expRows.length === 0) {
                throw new Error(`No se encontró la experiencia con el nombre: ${exp}`);
            }

            const experienciaId = expRows[0].id;

            const [disponibilidadRows] = await pool.promise().query(
                `SELECT 
                    todas_fechas.fecha AS fecha,
                    CASE WHEN COALESCE((26 - SUM(r.personas)), 26) >= ? THEN
                             COALESCE((26 - SUM(r.personas)), 26)
                         ELSE
                             -1 * COALESCE(SUM(r.personas), 0)
                         END AS lugares_disponibles
                 FROM
                    (SELECT DISTINCT fecha FROM reservacion WHERE id_experiencia = ? AND fecha >= CURRENT_DATE) todas_fechas
                 LEFT JOIN
                    reservacion r ON r.fecha = todas_fechas.fecha AND r.id_experiencia = ?
                 GROUP BY
                    todas_fechas.fecha
                 ORDER BY
                    todas_fechas.fecha
                 LIMIT 100`,
                [cantidad, experienciaId, experienciaId]
            );

            return disponibilidadRows;
        } catch (err) {
            console.error('Error al obtener disponibilidad:', err);
            throw err;
        }
    },
    async getAll() {
        try {
            const [rows] = await pool.promise().query(
                `SELECT 
                    r.*, 
                    e.nombre AS nombre_experiencia,
                    c.nombre AS nombre_cliente,
                    c.email,
                    c.celular
                 FROM 
                    reservacion r
                 INNER JOIN 
                    experiencias e ON r.id_experiencia = e.id
                 INNER JOIN 
                    clientes c ON r.id_cliente = c.id`
            );

            return rows;
        } catch (err) {
            console.error('Error al obtener todas las reservas:', err);
            throw err;
        }
    },
    async getAllOrdByDate() {
        try {
            const [rows] = await pool.promise().query(
                `SELECT 
                    r.*, 
                    e.nombre AS nombre_experiencia,
                    c.nombre AS nombre_cliente,
                    c.email,
                    c.celular
                 FROM 
                    reservacion r
                 INNER JOIN 
                    experiencias e ON r.id_experiencia = e.id
                 INNER JOIN 
                    clientes c ON r.id_cliente = c.id
                ORDER BY 
                    r.fecha DESC;`

            );

            return rows;
        } catch (err) {
            console.error('Error al obtener todas las reservas ordenadas por fecha:', err);
            throw err;
        }
    },
    async getByCliente(id_cliente) {
        try {
            const [rows] = await pool.promise().query(
                `SELECT 
                    r.*, 
                    e.nombre AS nombre_experiencia,
                    c.nombre AS nombre_cliente,
                    c.email,
                    c.celular
                 FROM 
                    reservacion r
                
                 INNER JOIN 
                    experiencias e ON r.id_experiencia = e.id
                 INNER JOIN 
                    clientes c ON r.id_cliente = c.id
                    WHERE r.id_cliente=?;
                    `,
                [id_cliente]
            );

            return rows;
        } catch (err) {
            console.error('Error al obtener todas las reservas ordenadas por fecha:', err);
            throw err;
        }
    }

}
module.exports = Reservas;