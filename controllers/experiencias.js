const Experiencias = require('../models/experiencias');

const experienciasController = {
    async obtenerTodas(req, res) {
        try {
            const experiencias = await Experiencias.obtenerExperiencias();
            res.json(experiencias);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las experiencias', error: error.message });
        }
    },

}

module.exports = experienciasController;