const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/css', express.static(path.join(__dirname, '../css')));
app.use('/img', express.static(path.join(__dirname, '../img')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/index.html'));
});

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/login.html'));
});

app.get('/signup.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/signup.html'));
});

app.get('/profile.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/profile.html'));
});

app.get('/game.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/game.html'));
});

app.get('/game-win.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/game-win.html'));
});

app.get('/game-loose.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/game-loose.html'));
});

app.get('/buy.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/buy.html'));
});

// Database setup
const db = new sqlite3.Database(path.join(__dirname, '../database.db'), (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pseudo TEXT,
            password TEXT,
            coin INTEGER DEFAULT 0,
            profil_picture TEXT,
            cookie TEXT,
            character TEXT
        )`);
  }
});

app.post('/register', (req, res) => {
    const { pseudo, password, character } = req.body;
  
    db.run(`INSERT INTO users (pseudo, password, character) VALUES (?, ?, ?)`,
      [pseudo, password, character],
      function (err) {
        if (err) {
          res.status(500).json({ message: 'Failed to register user.' });
        } else {
          res.status(200).json({ message: 'User registered successfully!', character: character });
        }
      });
  });  

  app.post('/login', (req, res) => {
    const { pseudo, password } = req.body;
  
    db.get(`SELECT * FROM users WHERE pseudo = ? AND password = ?`, [pseudo, password], (err, row) => {
      if (err) {
        res.status(500).json({ message: 'Error logging in.' });
      } else if (!row) {
        res.status(400).json({ message: 'Invalid username or password.' });
      } else {
        res.status(200).json({ message: 'Login successful!', character: row.character });
      }
    });
  });  

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});