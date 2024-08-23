const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

const indexRouter = require('./routes/index');

app.use(cors());
app.use(express.json());

// Configuración para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
