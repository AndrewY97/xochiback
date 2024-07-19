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

    async updateUser(req, res) {
        const { id_user, user, pass } = req.body;

        try {
            const actUser = await Login.updateUsuario(id_user, user, pass);
            res.status(201).json(actUser);
        } catch (error) {
            console.error('Error al modificar el usuario:', error);
            res.status(500).json({ error: 'Hubo un problema al modificar al usuario.' });
        }
    },
    async deleteUser(req, res) {
        const { id_user } = req.query;

        try {
            const delUser = await Login.deleteUsuario(id_user);
            res.status(201).json(delUser);
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            res.status(500).json({ error: 'Hubo un problema al eliminar al usuario.' });
        }
    },
    async getAllUsers(req, res) {
        try {
            const user = await Login.getAllUsers();
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
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
