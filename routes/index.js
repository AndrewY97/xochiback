const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { experienciasController, reservasController, galeriasController, loginController, stripeController, promocionesController } = require('../controllers');

router.get('/experiencias', experienciasController.obtenerTodas);

router.post('/reservas', reservasController.crearNuevaReserva);
router.post('/reservas/disponibilidad', reservasController.obtenerDisponibilidad);
router.get('/reservas/getByCliente', reservasController.getReservasByIDCliente);
router.get('/reservas/getall', reservasController.getAll);
router.get('/reservas/getOrderByDate', reservasController.getAllOrdByDate);

// Rutas relacionadas con la galería de imágenes
router.post('/galeria/uploadPic', upload.array('fotos', 8), galeriasController.uploadPictures);
router.get('/galeria/getPic/:experiencia', galeriasController.getPictures);

//Rutas relacionadas al login
router.post('/login/registrer', loginController.register);
router.get('/login/log', loginController.login);
router.get('/login/getall', loginController.getAllUsers);
router.get('/login/deleteUser', loginController.deleteUser);
router.post('/login/updateUser', loginController.updateUser);

//rutas de stripe
router.post('/pagoStripe', stripeController.hacerPago);

//rutas de promo
router.post('/promociones', promocionesController.crearPromocion);
router.get('/promociones/getall', promocionesController.getAllPromos);
router.get('/promociones/deletepromo', promocionesController.eliminarPromo);
router.post('/promociones/updatepromo', promocionesController.modificarPromocion);

module.exports = router;
