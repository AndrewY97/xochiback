const fs = require('fs');
const fsPromises = require('fs').promises; // fs.promises para operaciones asincrónicas
const path = require('path');
const Galerias = require('../models/galeria');

const galeriasController = {
    async uploadPictures(req, res) {
        try {
            const experiencia = req.body.experiencia;
            const fotos = req.files;

            if (!fotos || fotos.length === 0) {
                return res.status(400).send('No se subieron archivos');
            }

            const publicDir = path.join(process.cwd(), 'public');
            const experienciaDir = path.join(publicDir, experiencia);
            await fsPromises.mkdir(experienciaDir, { recursive: true });

            const fotosGuardadas = await Promise.all(fotos.map(async (foto) => {
                const filePath = path.join(experienciaDir, foto.originalname);
                try {
                    await fsPromises.access(filePath);
                    console.log(`El archivo ${foto.originalname} ya existe. No se guardará nuevamente.`);
                    return null;
                } catch (err) {
                    await fsPromises.writeFile(filePath, foto.buffer);
                    const relativePath = path.relative(publicDir, filePath);
                    return {
                        nombre: foto.originalname,
                        ruta: relativePath,
                    };
                }
            }));

            const fotosGuardadasFiltradas = fotosGuardadas.filter(foto => foto !== null);
            if (fotosGuardadasFiltradas.length > 0) {
                await Galerias.uploadPictures(experiencia, fotosGuardadasFiltradas);
            }
            console.log('Fotos guardadas:', fotosGuardadasFiltradas);

            res.status(200).json({ message: 'Archivos subidos correctamente.', files: fotosGuardadasFiltradas });
        } catch (error) {
            console.error('Error al subir las imágenes:', error);
            res.status(500).json({ error: 'Hubo un problema al subir las imágenes.' });
        }
    },
    async getPictures(req, res) {
        try {
            const { experiencia } = req.params;

            if (!experiencia) {
                return res.status(400).json({ error: 'Falta el nombre de la experiencia en los parámetros de la solicitud.' });
            }

            // Obtener las fotos de la experiencia desde Galerias
            const fotos = await Galerias.getPictures(experiencia);

            // Imprimir en consola las fotos obtenidas
            console.log('Fotos obtenidas:', fotos);

            const folderPath = path.join(process.cwd(), 'public', experiencia);
            console.log(folderPath);

            if (!fs.existsSync(folderPath)) {
                return res.status(404).json({ error: 'La carpeta de la experiencia no existe.' });
            }

            const fotos2 = fs.readdirSync(folderPath);

            const fotosConUrls = fotos2.map(foto => {
                return {
                    nombre: foto,
                    url: `https://ideamia-dev.com/${experiencia}/${foto}`
                };
            });

            res.status(200).json({ fotos: fotosConUrls });
        } catch (error) {
            console.error('Error al obtener las imágenes:', error);
            res.status(500).json({ error: 'Hubo un problema al obtener las imágenes.' });
        }
    },

    async getImage(req, res) {
        try {
            const { experiencia, nombreImagen } = req.params;
            const imagePath = path.join(process.cwd(), 'public', experiencia, nombreImagen);

            if (fs.existsSync(imagePath)) {
                res.sendFile(imagePath);
            } else {
                res.status(404).json({ error: 'La imagen solicitada no existe.' });
            }
        } catch (error) {
            console.error('Error al obtener la imagen:', error);
            res.status(500).json({ error: 'Hubo un problema al obtener la imagen.' });
        }
    }
};

module.exports = galeriasController;
