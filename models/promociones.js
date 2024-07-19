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
    async eliminarPromocion(promoId) {
        try {
            const deleteResult = await pool.promise().query(
                'DELETE FROM promo WHERE id = ?',
                [promoId]
            );
            if (deleteResult.affectedRows === 0) {
                throw new Error(`No se encontró ninguna promoción con id ${promoId}`);
            }
            return { mensaje: `Promoción con id ${promoId} eliminada correctamente` };
        } catch (err) {
            console.error('Error al eliminar la promoción:', err);
            throw err;
        }
    },
    async actualizarPromocion(promoId, descuento, disponibles) {
        try {
            const updateResult = await pool.promise().query(
                'UPDATE promo SET descuento = ?, disponibles = ? WHERE id = ?',
                [descuento, disponibles, promoId]
            );
            if (updateResult.affectedRows === 0) {
                throw new Error(`No se encontró ninguna promoción con id ${promoId}`);
            }
            return { id: promoId, descuento, disponibles };
        } catch (err) {
            console.error('Error al actualizar la promoción:', err);
            throw err;
        }
    }
}
module.exports = Promociones;