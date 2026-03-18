// server.js

// ===== IMPORTS =====
const express = require('express');        // Framework web para Node.js
const bodyParser = require('body-parser'); // Para leer datos JSON del frontend
const mysql = require('mysql2');           // Para conectarnos a MySQL

// ===== CONFIGURACIÓN DEL SERVIDOR =====
const app = express();
const PORT = 3000; // Puerto donde correrá el servidor

// ===== CONEXIÓN A LA BASE DE DATOS =====
const db = mysql.createConnection({
    host: 'localhost',   // Host de MySQL (XAMPP normalmente localhost)
    user: 'root',        // Usuario MySQL
    password: '',        // Contraseña MySQL (por defecto en XAMPP vacía)
    database: 'mi_web'     // Nombre de tu base de datos
});

// Conectar a MySQL
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a MySQL:', err);
    } else {
        console.log('Conectado a la base de datos MySQL');
    }
});

// ===== MIDDLEWARES =====
// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(__dirname));
// Parsear JSON de las solicitudes
app.use(bodyParser.json());

// ===== RUTA POST PARA REGISTRAR USUARIOS =====
app.post('/register', (req, res) => {
    const { name, email, password } = req.body; // Datos que envía el frontend

    // Validación básica
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    // Verificar si el email ya está registrado
    db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Error consultando la base de datos:', err);
            return res.status(500).json({ message: 'Error interno del servidor.' });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'El email ya está registrado.' });
        }

        // Insertar nuevo usuario en la tabla con columnas: email, nombre, password
        db.query(
            'INSERT INTO usuarios (email, nombre, password) VALUES (?, ?, ?)',
            [email, name, password],
            (err, result) => {
                if (err) {
                    console.error('Error insertando usuario:', err);
                    return res.status(500).json({ message: 'Error al registrar usuario.' });
                }
                // Registro exitoso
                return res.json({ message: 'Registro exitoso!' });
            }
        );
    });
});

// ===== INICIAR SERVIDOR =====
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});