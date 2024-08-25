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
            const query = "INSERT INTO FechasE (Experiencia, fecha) VALUES (?, ?)";
            const [result] = await pool.promise().query(query, [experiencia, fecha]);
            return result;
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
    }
};

module.exports = Experiencias;
