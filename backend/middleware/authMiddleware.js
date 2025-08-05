// /middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const protectRoute = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Accès refusé, aucun token fourni.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // Continuer vers la prochaine fonction
  } catch (err) {
    res.status(401).json({ message: 'Token invalide.' });
  }
};

module.exports = protectRoute;
