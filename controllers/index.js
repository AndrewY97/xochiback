const experienciasController = require('./experiencias');
const reservasController = require('./reservas');
const galeriasController = require('./galeria');
const loginController = require('./login');
const stripeController = require('./stripe');
const promocionesController = require('./promociones');
const emailController = require('./email');

module.exports = {
    experienciasController,
    reservasController,
    galeriasController,
    loginController,
    stripeController,
    promocionesController,
    emailController,
};
