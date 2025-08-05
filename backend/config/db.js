// config/db.js
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config();

// Configurer la connexion MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Se connecter à MySQL
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL:', err.message);
    process.exit(1);
  }
  console.log('Connecté à la base de données MySQL');
});

module.exports = db;
