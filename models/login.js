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
    async updateUsuario(id_user, user, pass) {
        try {
            const hashedPassword = await bcrypt.hash(pass, 10);
            const [result] = await pool.promise().query(
                'UPDATE usuarios SET pass = ?, user =?  WHERE id = ?',
                [hashedPassword, user, id_user]
            );
            return { id: id_user, user };
        } catch (err) {
            console.error('Error modifying user:', err);
            throw err;
        }
    },
    async getAllUsers() {
        try {
            const query = "SELECT * FROM usuarios";
            const [rows, fields] = await pool.promise().query(query);
            return rows;
        } catch (error) {
            console.error('Error al obtener los usuarios:', error.message);
            throw error;
        }
    },
    async deleteUsuario(id_user) {
        try {
            const deleteResult = await pool.promise().query(
                'DELETE FROM usuarios WHERE id = ?',
                [id_user]
            );
            if (deleteResult.affectedRows === 0) {
                throw new Error(`No se encontró ningun usuario con id ${id_user}`);
            }
            return { mensaje: `Usuario con id ${id_user} eliminada correctamente` };
        } catch (err) {
            console.error('Error al eliminar al usuario:', err);
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
