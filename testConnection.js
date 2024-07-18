const pool = require('./config/database');

// Función para probar la conexión
async function testConnection() {
    try {
        const connection = await pool.promise().getConnection();
        console.log('Conexión exitosa a la base de datos MySQL.');

        // Prueba una consulta simple
        const [rows] = await connection.query('SELECT 1 + 1 AS solution');
        console.log('Resultado de la consulta:', rows);

        connection.release(); // Libera la conexión de vuelta al pool
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}

testConnection();
