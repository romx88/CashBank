const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/css', express.static(path.join(__dirname, '../css')));
app.use('/img', express.static(path.join(__dirname, '../img')));
app.use('/music', express.static(path.join(__dirname, '../music')));

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

app.get('/plinko.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/plinko.html'));
});

app.get('/buy.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/buy.html'));
});

app.get('/music.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/music.html'));
});

// Database setup
const db = new sqlite3.Database(path.join(__dirname, '../database.db'), (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pseudo TEXT UNIQUE,
            password TEXT,
            coin INTEGER DEFAULT 100,
            profil_picture TEXT,
            cookie TEXT,
            character TEXT
        )`);
  }
});

app.post('/register', async (req, res) => {
  const { pseudo, password, character } = req.body;

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(`INSERT INTO users (pseudo, password, character) VALUES (?, ?, ?)`,
      [pseudo, hashedPassword, character],
      function (err) {
        if (err) {
          res.status(500).json({ message: 'Failed to register user.' });
        } else {
          db.get(`SELECT * FROM users WHERE pseudo = ?`, [pseudo], (err, row) => {
            if (err) {
              res.status(500).json({ message: 'Error retrieving user.' });
            } else {
              res.status(200).json({ message: 'User registered successfully!', character: row.character });
            }
          });
        }
      });
  } catch (err) {
    res.status(500).json({ message: 'Error hashing password.' });
  }
});

app.post('/login', async (req, res) => {
  const { pseudo, password } = req.body;

  db.get(`SELECT * FROM users WHERE pseudo = ?`, [pseudo], async (err, row) => {
    if (err) {
      res.status(500).json({ message: 'Error logging in.' });
    } else if (!row || !(await bcrypt.compare(password, row.password))) {
      res.status(400).json({ message: 'Invalid username or password.' });
    } else {
      res.status(200).json({ message: 'Login successful!', character: row.character });
    }
  });
});

app.get('/api/getCoins', (req, res) => {
  const { pseudo } = req.query;
  db.get(`SELECT coin FROM users WHERE pseudo = ?`, [pseudo], (err, row) => {
    if (err) {
      res.status(500).json({ message: 'Error retrieving coins.' });
    } else {
      res.status(200).json({ coins: row ? row.coin : 0 });
    }
  });
});

app.post('/api/delete', (req, res) => {
  const { pseudo } = req.body;

  db.run(`DELETE FROM users WHERE pseudo = ?`, [pseudo], (err) => {
    if (err) {
      res.status(500).json({ message: 'Error deleting account.' });
    } else {
      res.status(200).json({ message: 'Account successfully deleted.' });
    }
  });
});

app.post('/api/updateCoins', (req, res) => {
  const { pseudo, coins } = req.body;
  db.run(`UPDATE users SET coin = ? WHERE pseudo = ?`, [coins, pseudo], function (err) {
    if (err) {
      res.status(500).json({ message: 'Error updating coins.' });
    } else {
      res.status(200).json({ message: 'Coins updated successfully!' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
