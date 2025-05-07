// middleware/auth.middleware.js
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;

// Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

/**
 * Middleware pour vérifier le token JWT
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @param {Function} next - Fonction suivante
 */
exports.verifyToken = async (req, res, next) => {
  try {
    // Récupérer le token du header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false,
        message: 'Accès non autorisé. Token manquant' 
      });
    }

    // Extraire le token
    const token = authHeader.split(' ')[1];
    
    // Vérifier le token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Vérifier que l'utilisateur existe toujours en base de données
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Utilisateur non trouvé' 
      });
    }
    
    if (!user.isActive) {
      return res.status(403).json({ 
        success: false,
        message: 'Ce compte a été désactivé' 
      });
    }
    
    // Ajouter l'ID de l'utilisateur et son rôle à la requête
    req.userId = decoded.id;
    req.userRole = decoded.role;
    req.userEmail = decoded.email;
    
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token expiré' 
      });
    }
    
    return res.status(401).json({ 
      success: false,
      message: 'Token invalide' 
    });
  }
};

/**
 * Middleware pour vérifier si l'utilisateur a un rôle spécifique
 * @param {Array|String} roles - Rôle(s) autorisé(s)
 */
exports.checkRole = (roles) => {
  return (req, res, next) => {
    // Convertir en tableau si ce n'est pas déjà le cas
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    
    // Vérifier que l'utilisateur a le bon rôle
    if (!allowedRoles.includes(req.userRole)) {
      return res.status(403).json({ 
        success: false,
        message: 'Accès refusé. Vous n\'avez pas les droits suffisants' 
      });
    }
    
    next();
  };
};