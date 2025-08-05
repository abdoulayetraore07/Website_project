// models/Annonce.js
const db = require('../config/db');

// Créer une annonce
const createAnnonce = (annonceData, callback) => {
  console.log(annonceData);  // Ajoute cette ligne pour déboguer
  const { title, price, location, description, image, userId, categorie, sous_categorie } = annonceData;  // Ajout des champs categorie et sous_categorie

  const sql = `INSERT INTO annonces (title, price, location, description, image, userId, categorie, sous_categorie) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  
  db.query(sql, [title, price, location, description, image, userId, categorie, sous_categorie], (err, result) => {
    if (err) {
      console.error('Erreur lors de la création de l\'annonce :', err);
      return callback(err);
    }
    callback(null, result);
  });
};


// Récupérer toutes les annonces
const getAllAnnonces = (callback) => {
  const sql = `SELECT * FROM annonces`;
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des annonces :', err);
      return callback(err);
    }
    callback(null, results);
  });
};

module.exports = {
  createAnnonce,
  getAllAnnonces,
};
