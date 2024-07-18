const pool = require('../config/database');

const Galerias = {
    async uploadPictures(experiencia, fotos) {
        try {
            const [rows] = await pool.promise().query('SELECT id FROM experiencias WHERE nombre = ?', [experiencia]);
            if (rows.length === 0) {
                throw new Error('Experiencia no encontrada');
            }
            const experienciaId = rows[0].id;

            for (const foto of fotos) {
                const { nombre, ruta } = foto;
                await pool.promise().query('INSERT INTO galeria (id_experiencia, foto) VALUES (?, ?)', [experienciaId, ruta]);
            }

            return { message: 'Imágenes subidas correctamente' };
        } catch (error) {
            console.error('Error al subir las imágenes:', error);
            throw new Error('Error al subir las imágenes');
        }
    },
    async getPictures(experiencia) {
        try {
            const [experienciaRows] = await pool.promise().query('SELECT id FROM experiencias WHERE nombre = ?', [experiencia]);
            if (experienciaRows.length === 0) {
                throw new Error('Experiencia no encontrada');
            }
            const experienciaId = experienciaRows[0].id;
            const [fotoRows] = await pool.promise().query('SELECT foto FROM galeria WHERE id_experiencia = ?', [experienciaId]);

            const fotos = fotoRows.map(row => row.foto);
            return fotos;
        } catch (error) {
            console.error('Error al obtener las imágenes:', error);
            throw new Error('Error al obtener las imágenes');
        }
    }
};

module.exports = Galerias;
