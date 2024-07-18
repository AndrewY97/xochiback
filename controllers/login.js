const Login = require('../models/login');

const loginController = {
    async register(req, res) {
        const { user, pass } = req.body;

        if (!user || !pass) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        try {
            const userId = await Login.registrarUsuario(user, pass);
            res.status(201).json({ message: 'Usuario registrado con éxito', userId });
        } catch (err) {
            console.error('Error registering user:', err);
            res.status(500).json({ error: 'Error al registrar el usuario' });
        }
    },
    async login(req, res) {
        const { user, pass } = req.body;

        if (!user || !pass) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        try {
            const userRecord = await Login.loingUsuario(user, pass);
            res.status(200).json({ message: 'Usuario logeado correctamente', user: userRecord });
        } catch (err) {
            console.error('Error al logear usuario:', err);
            let errorMessage = 'Error al intentar iniciar sesión';
            if (err.message === 'Usuario no encontrado' || err.message === 'Contraseña incorrecta') {
                errorMessage = err.message;
            }
            res.status(401).json({ error: errorMessage });
        }
    },
};

module.exports = loginController;
