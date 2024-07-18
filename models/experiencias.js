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
}
module.exports = Experiencias;