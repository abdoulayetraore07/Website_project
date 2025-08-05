// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/db');  // Connexion à la base de données
const userRoutes = require('./routes/userRoutes');
const annonceRoutes = require('./routes/annonceRoutes');  // Importer les routes d'annonces

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // Parser les corps des requêtes en JSON

// Routes API
app.use('/api/users', userRoutes);  // Routes utilisateur
app.use('/api/annonces', annonceRoutes);  // Routes annonces

// Route de test
app.get('/', (req, res) => {
  res.send('API fonctionne bien');
});

// Lancer le serveur
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
