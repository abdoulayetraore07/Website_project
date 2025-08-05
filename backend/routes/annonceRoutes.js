// routes/annonceRoutes.js
const express = require('express');
const db = require('../config/db');  // Importer la connexion MySQL
const router = express.Router();

// Créer une nouvelle annonce
// routes/annonceRoutes.js

router.post('/', (req, res) => {
  const { titre, description, prix, images, localisation, categorie, sous_categorie } = req.body;

  console.log(req.body);  // Ajoute cette ligne pour voir les données envoyées dans la requête

  const sql = 'INSERT INTO annonces (titre, description, prix, images, localisation, categorie, sous_categorie) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [titre, description, prix, JSON.stringify(images), localisation, categorie, sous_categorie], (err, result) => {
    if (err) {
      console.error('Erreur lors de la création de l\'annonce :', err);
      return res.status(500).send('Erreur lors de la création l\'annonce ');
    }
    res.status(201).send('Annonce créée avec succès');
  });
});


// Récupérer toutes les annonces
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM annonces';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send('Erreur lors de la récupération des annonces');
    }
    const annonces = results.map(annonce => ({
      ...annonce,
      images: JSON.parse(annonce.images),  // Parse JSON string into array
    }));
    res.json(annonces);
  });
});

// Mettre à jour une annonce
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { titre, description, prix, images, localisation, categorie, sous_categorie } = req.body;

  const sql = 'UPDATE annonces SET titre = ?, description = ?, prix = ?, images = ?, localisation = ?, categorie = ?, sous_categorie = ? WHERE id = ?';
  db.query(sql, [titre, description, prix, JSON.stringify(images), localisation, categorie, sous_categorie, id], (err, result) => {
    if (err) {
      return res.status(500).send('Erreur lors de la mise à jour de l\'annonce');
    }
    res.send('Annonce mise à jour avec succès');
  });
});

// Supprimer une annonce
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM annonces WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send('Erreur lors de la suppression de l\'annonce');
    }
    res.send('Annonce supprimée avec succès');
  });
});

module.exports = router;
