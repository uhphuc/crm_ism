// controllers/auth.controller.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User; // Utilisation de l'importation depuis db.User

// Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

/**
 * Inscription d'un nouvel utilisateur
 */
exports.register = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  
  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ 
        success: false,
        message: 'Un utilisateur avec cet email existe déjà' 
      });
    }

    // Validation des données
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Tous les champs sont obligatoires' 
      });
    }

    // Hachage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Création de l'utilisateur
    const user = await User.create({ 
      firstName, 
      lastName, 
      email, 
      password: hashedPassword,
      role: role || 'sales', // Valeur par défaut si non spécifiée
      isActive: true
    });

    // Création du token JWT
    const token = generateToken(user);

    // Réponse sans exposer le mot de passe
    const userResponse = user.toJSON();
    delete userResponse.password;

    res.status(201).json({ 
      success: true,
      message: 'Utilisateur enregistré avec succès',
      user: userResponse,
      token 
    });
  } catch (err) {
    console.error('Erreur lors de l\'inscription:', err);
    res.status(500).json({ 
      success: false,
      message: 'Erreur lors de l\'inscription', 
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

/**
 * Connexion d'un utilisateur
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Validation des données
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email et mot de passe requis' 
      });
    }

    // Recherche de l'utilisateur
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'Utilisateur non trouvé' 
      });
    }

    // Vérification si le compte est actif
    if (!user.isActive) {
      return res.status(403).json({ 
        success: false,
        message: 'Ce compte a été désactivé' 
      });
    }

    // Vérification du mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: 'Identifiants invalides' 
      });
    }

    // Mise à jour de la date de dernière connexion
    await user.update({ lastLogin: new Date() });

    // Génération du token
    const token = generateToken(user);

    res.json({ 
      success: true,
      message: 'Connexion réussie', 
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      },
      token 
    });
  } catch (err) {
    console.error('Erreur lors de la connexion:', err);
    res.status(500).json({ 
      success: false,
      message: 'Erreur lors de la connexion', 
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

/**
 * Récupération des informations de l'utilisateur connecté
 */
exports.getMe = async (req, res) => {
  try {
    // L'utilisateur est déjà disponible depuis le middleware d'authentification
    const user = await User.findByPk(req.userId, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'Utilisateur non trouvé' 
      });
    }

    res.json({ 
      success: true,
      user 
    });
  } catch (err) {
    console.error('Erreur lors de la récupération du profil:', err);
    res.status(500).json({ 
      success: false,
      message: 'Erreur lors de la récupération du profil' 
    });
  }
};

/**
 * Génération d'un token JWT
 */
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      role: user.role,
      email: user.email
    }, 
    JWT_SECRET, 
    { 
      expiresIn: JWT_EXPIRES_IN 
    }
  );
};