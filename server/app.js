const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

const db = new sqlite3.Database(path.join(__dirname, 'database.db'), (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pseudo TEXT UNIQUE,
    password TEXT,
    coin INTEGER DEFAULT 0,
    profil_picture TEXT,
    cookie TEXT
)`);

app.post('/register', (req, res) => {
    const { pseudo, password } = req.body;

    const query = `INSERT INTO users (pseudo, password) VALUES (?, ?)`;
    db.run(query, [pseudo, password], function(err) {
        if (err) {
            return res.status(400).json({ message: 'User already exists or an error occurred.' });
        }
        res.status(200).json({ message: 'User registered successfully!' });
    });
});

app.post('/login', (req, res) => {
    const { pseudo, password } = req.body;

    const query = `SELECT * FROM users WHERE pseudo = ? AND password = ?`;
    db.get(query, [pseudo, password], (err, row) => {
        if (err) {
            return res.status(500).json({ message: 'An error occurred.' });
        }
        if (!row) {
            return res.status(400).json({ message: 'Invalid pseudo or password.' });
        }
        res.status(200).json({ message: 'Login successful!' });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
