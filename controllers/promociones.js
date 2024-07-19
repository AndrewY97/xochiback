const Promociones = require('../models/promociones');

const promocionesController = {
    async getAllPromos(req, res) {
        try {
            const promos = await Promociones.obtenerPromociones();
            res.json(promos);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las promociones', error: error.message });
        }
    },

    async crearPromocion(req, res) {
        const { descuento, disponibles, status } = req.body;

        try {
            const nuevaPromo = await Promociones.crearPromocion(descuento, disponibles, status);
            res.status(201).json(nuevaPromo);
        } catch (error) {
            console.error('Error al crear una nueva promo:', error);
            res.status(500).json({ error: 'Hubo un problema al crear la promo.' });
        }
    },
}

module.exports = promocionesController;