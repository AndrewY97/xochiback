const express = require('express');
const app = express();
const cors = require('cors')
const port = 3000;

const indexRouter = require('./routes/index');

app.use(cors());
app.use(express.json());
app.use('/', indexRouter);

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
