// controllers/auth.controller.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User; 
const Customer = db.Customer;

// Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

exports.register = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  
  try {

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ 
        success: false,
        message: 'Email has already been taken' 
      });
    }

    const existingCustomer = await Customer.findOne({ where: { email } });
    if (!existingCustomer) {
      await Customer.create({
        firstName,
        lastName,
        email,
        source: 'website',
        status: 'customer',
      });
    }

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide all required fields' 
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = await User.create({ 
      firstName, 
      lastName, 
      email, 
      password: hashedPassword,
      role: role || 'sales',
      isActive: true
    });

    const token = generateToken(user);

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

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email et mot de passe requis' 
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ 
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

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: 'Identifiants invalides' 
      });
    }

    await user.update({ lastLogin: new Date() });

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


exports.getMe = async (req, res) => {
  try {

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