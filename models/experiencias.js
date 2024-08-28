const pool = require('../config/database');

const Experiencias = {
    async obtenerExperiencias() {
        try {
            const query = "SELECT * FROM experiencias";
            const [rows, fields] = await pool.promise().query(query);
            return rows;
        } catch (error) {
            console.error('Error al obtener las experiencias:', error.message);
            throw error;
        }
    },

    async insertarFechaExperiencia(experiencia, fecha) {
        try {
            // Insertar en la tabla FechasE
            const query1 = "INSERT INTO FechasE (Experiencia, fecha) VALUES (?, ?)";
            const [result1] = await pool.promise().query(query1, [experiencia, fecha]);
            // Buscar el id de la experiencia en la tabla experiencias
            const query2 = "SELECT id FROM experiencias WHERE nombre = ?";
            const [rows] = await pool.promise().query(query2, [experiencia]);
            const idExperiencia = rows[0].id;
            // Insertar en la tabla de reservacion
            const query3 = "INSERT INTO reservacion (id_experiencia, fecha, personas, id_cliente,horario) VALUES (?, ?, ?, ?,?)";
            const [result2] = await pool.promise().query(query3, [idExperiencia, fecha, 0, 5,'pendiente']);
            return { fechaInsertada: result1, reservacionInsertada: result2 };
        } catch (error) {
            console.error('Error al insertar los datos:', error.message);
            throw error;
        }
    },

    async obtenerExperienciasYFechasDesdeHoy() {
        try {
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            const fechasQuery = "SELECT * FROM FechasE WHERE fecha >= ?";
            const [fechas] = await pool.promise().query(fechasQuery, [formattedDate]);

            return {
                fechas
            };
        } catch (error) {
            console.error('Error al obtener las experiencias y fechas desde hoy:', error.message);
            throw error;
        }
    },
    async obtenerExperienciasYFechasDesdeHoy2() {
        try {
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            const fechasQuery = `SELECT
                r.id_experiencia,
                e.nombre AS experiencia_nombre,
                r.fecha,
                SUM(r.personas) AS total_personas_reservadas,
                (26 - SUM(r.personas)) AS total_personas_restantes
                FROM reservacion r
                JOIN FechasE f ON r.fecha = f.fecha
                JOIN experiencias e ON f.Experiencia = e.nombre
                WHERE f.fecha >= ?
                GROUP BY r.id_experiencia, e.nombre, r.fecha`;
            const [fechas] = await pool.promise().query(fechasQuery, [formattedDate]);
            return {
                fechas
            };
        } catch (error) {
            console.error('Error al obtener las experiencias y fechas desde hoy:', error.message);
            throw error;
        }
    }
};

module.exports = Experiencias;
