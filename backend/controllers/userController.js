// /controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmailOrPhone } = require('../models/User');
const generateToken = require('../utils/generateToken');

// Inscription
const registerUser = (req, res) => {
  const { firstName, lastName, email, phone, password, companyName, storeLocation, isProfessional } = req.body;

  findUserByEmailOrPhone(email, (err, existingUser) => {
    if (err) {
      console.error('Erreur lors de la vérification de l\'utilisateur :', err);
      return res.status(500).json({ message: 'Erreur serveur lors de la vérification de l\'utilisateur' });
    }

    if (existingUser) {
      return res.status(400).json({ message: 'Utilisateur déjà existant.' });
    }

    // Créer l'utilisateur avec toutes les options requises
    createUser(req.body, (err, result) => {
      if (err) {
        console.error('Erreur MySQL lors de la création de l\'utilisateur :', err);
        return res.status(500).json({ message: 'Erreur lors de l\'inscription' });
      }

      // Générer un token JWT après l'inscription
      const token = generateToken(result.insertId);
      res.status(201).json({ token });
    });
  });
};

// Connexion
const loginUser = (req, res) => {
  const { identifier, password } = req.body; // `identifier` peut être un email ou un numéro de téléphone

  findUserByEmailOrPhone(identifier, async (err, user) => {
    if (err) {
      console.error('Erreur lors de la recherche de l\'utilisateur :', err);
      return res.status(500).json({ message: 'Erreur serveur lors de la recherche de l\'utilisateur' });
    }

    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé.' });
    }

    // Vérification du mot de passe avec bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect.' });
    }

    // Génération du token JWT après connexion réussie
    const token = generateToken(user.id);
    res.json({ token });
  });
};

module.exports = { registerUser, loginUser };
