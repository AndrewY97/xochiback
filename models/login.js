const pool = require('../config/database');
const bcrypt = require('bcrypt');

const Login = {
    async registrarUsuario(user, pass) {
        try {
            const hashedPassword = await bcrypt.hash(pass, 10);
            const [result] = await pool.promise().query(
                'INSERT INTO usuarios (user, pass,status) VALUES (?, ?,1)',
                [user, hashedPassword]
            );
            return result.insertId;
        } catch (err) {
            console.error('Error registering user:', err);
            throw err;
        }
    },
    async loingUsuario(user, pass) {
        try {
            const [rows] = await pool.promise().query(
                'SELECT * FROM usuarios WHERE user = ? LIMIT 1',
                [user]
            );
            if (rows.length === 0) {
                throw new Error('Usuario no encontrado');
            }
            const userRecord = rows[0];
            const isPasswordValid = await bcrypt.compare(pass, userRecord.pass);
            if (!isPasswordValid) {
                throw new Error('Contraseña incorrecta');
            }
            return {
                id: userRecord.id,
                user: userRecord.user,
                status: userRecord.status
            };
        } catch (err) {
            console.error('Error al logear usuario:', err);
            throw err;
        }
    },
};

module.exports = Login;
