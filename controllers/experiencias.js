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

    async agregarFechaExperiencia(req, res) {
        const { experiencia, fecha } = req.body;
        try {
            const result = await Experiencias.insertarFechaExperiencia(experiencia, fecha);
            res.status(201).json({ message: 'Fecha de experiencia agregada exitosamente', result });
        } catch (error) {
            res.status(500).json({ message: 'Error al insertar la fecha de experiencia', error: error.message });
        }
    },
    async obtenerExperienciasYFechasDesdeHoy(req, res) {
        try {
            const { experiencias, fechas } = await Experiencias.obtenerExperienciasYFechasDesdeHoy();
            res.json(fechas );
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las experiencias y fechas desde hoy', error: error.message });
        }
    },
    async obtenerExperienciasYFechasDesdeHoy2(req, res) {
        try {
            const { experiencias, fechas } = await Experiencias.obtenerExperienciasYFechasDesdeHoy2();
            res.json(fechas );
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las experiencias y fechas desde hoy', error: error.message });
        }
    }
};

module.exports = experienciasController;
