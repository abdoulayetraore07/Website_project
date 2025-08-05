// models/User.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Créer un utilisateur
const createUser = ({ firstName, lastName, email, phone, password, companyName, storeLocation, isProfessional }, callback) => {
    const sql = `INSERT INTO users (firstName, lastName, email, phone, password, companyName, storeLocation, isProfessional) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [firstName, lastName, email, phone, password, companyName, storeLocation, isProfessional], callback);
  };
  

  try {
    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Requête d'insertion dans MySQL
    const sql = 'INSERT INTO users (firstName, lastName, email, phone, password, companyName, storeLocation, isProfessional) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    
    // Exécution de la requête SQL
    db.query(sql, [firstName, lastName, email, phone, hashedPassword, companyName, storeLocation, isProfessional], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'insertion dans MySQL:', err);
        return callback(err); // Retourne l'erreur si elle se produit
      }
      callback(null, result); // Retourne le résultat si tout se passe bien
    });
  } catch (err) {
    console.error('Erreur lors du hachage du mot de passe:', err);
    callback(err); // Gestion des erreurs de bcrypt (hash)
  };

// Rechercher un utilisateur par email ou téléphone
const findUserByEmailOrPhone = (identifier, callback) => {
  const sql = `SELECT * FROM users WHERE email = ? OR phone = ?`;
  db.query(sql, [identifier, identifier], callback);
};


  // Exécution de la requête SQL
  db.query(sql, [identifier, identifier], (err, results) => {
    if (err) {
      console.error('Erreur lors de la recherche de l\'utilisateur dans MySQL:', err);
      return callback(err); // Retourne l'erreur si elle se produit
    }

    if (results.length === 0) {
      console.log('Aucun utilisateur trouvé pour l\'identifiant:', identifier);
      return callback(null, null); // Aucun utilisateur trouvé
    }

    callback(null, results[0]); // Retourne l'utilisateur trouvé
  });
};

module.exports = {
  createUser,
  findUserByEmailOrPhone
};
