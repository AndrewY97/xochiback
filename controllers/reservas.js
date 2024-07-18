const Reservas = require('../models/reservas');

const reservasController = {
    async crearNuevaReserva(req, res) {
        const { nombre, email, celular, cantidad, fecha, exp, hora } = req.body;

        try {
            const nuevaReserva = await Reservas.crearReserva(nombre, email, celular, cantidad, fecha, exp, hora);
            res.status(201).json(nuevaReserva);
        } catch (error) {
            console.error('Error al crear una nueva reserva:', error);
            res.status(500).json({ error: 'Hubo un problema al crear la reserva.' });
        }
    },

    async obtenerDisponibilidad(req, res) {
        const { cantidad, exp } = req.body;

        try {
            const disponibilidad = await Reservas.getDisponible(cantidad, exp);
            res.status(200).json(disponibilidad);
        } catch (error) {
            console.error('Error al obtener la disponibilidad:', error);
            res.status(500).json({ error: 'Hubo un problema al obtener la disponibilidad.' });
        }
    },
    async getAll(req, res) {
        try {
            const reservas = await Reservas.getAll();
            res.json(reservas);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las reservas', error: error.message });
        }
    },

    async getAllOrdByDate(req, res) {
        try {
            const reservas = await Reservas.getAllOrdByDate();
            res.json(reservas);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las reservas', error: error.message });
        }
    },
    async getReservasByIDCliente(req, res) {
        const { id_cliente } = req.query;

        try {
            const reservasByCliente = await Reservas.getByCliente(id_cliente);
            res.status(200).json(reservasByCliente);
        } catch (error) {
            console.error('Error al obtener las reservas por cliente:', error);
            res.status(500).json({ error: 'Hubo un problema al obtener las reservas por cliente.' });
        }
    },
};

module.exports = reservasController;
