const pool = require('../config/database');

const Promociones = {
    async obtenerPromociones() {
        try {
            const query = "SELECT * FROM promo";
            const [rows, fields] = await pool.promise().query(query);
            return rows;
        } catch (error) {
            console.error('Error al obtener las promociones:', error.message);
            throw error;
        }
    },

    async crearPromocion(descuento, disponibles, status) {
        try {
            const [promoResult] = await pool.promise().query(
                'INSERT INTO promo (descuento, disponibles, status) VALUES (?, ?, ?)',
                [descuento, disponibles, status]
            );
            return { id: promoResult.insertId, descuento, disponibles, status };
        } catch (err) {
            console.error('Error al crear una nueva promocion:', err);
            throw err;

        }

    },
}
module.exports = Promociones;