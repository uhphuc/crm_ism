const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.User; // Utilisation de l'importation depuis db.User


exports.newUser = async (req, res) => { 
    const { firstName, lastName, email, role } = req.body;
    
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
        if (!firstName || !lastName || !email ) {
        return res.status(400).json({ 
            success: false,
            message: 'Tous les champs sont obligatoires' 
        });
        }
    
        // Hachage du mot de passe
        const salt = await bcrypt.genSalt(10);
        const password = '12345678'
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Création de l'utilisateur
        const user = await User.create({ 
        firstName, 
        lastName, 
        email, 
        password: hashedPassword,
        role: role || 'manager', 
        isActive: true
        });
    
    
        // Réponse sans exposer le mot de passe
        const userResponse = user.toJSON();
        delete userResponse.password;
    
        res.status(201).json({ 
        success: true,
        message: 'Utilisateur enregistré avec succès',
        user: userResponse,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
        success: false,
        message: 'Erreur lors de la création de l\'utilisateur',
        error: error.message 
        });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] } // Exclure le mot de passe des résultats
        });
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Erreur lors de la récupération des utilisateurs',
            error: error.message 
        });
    }
}

exports.getOneUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] } // Exclure le mot de passe des résultats
        });
        if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Erreur lors de la récupération de l\'utilisateur',
            error: error.message 
        });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;
        
        // Vérifier si l'utilisateur existe
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
        
        // Hachage du mot de passe si fourni
        let hashedPassword;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        }
        
        // Mettre à jour l'utilisateur
        await user.update({ 
            firstName, 
            lastName, 
            email, 
            password: hashedPassword || user.password,
            role: role || user.role,
            isActive: true
        });
        
        // Réponse sans exposer le mot de passe
        const userResponse = user.toJSON();
        delete userResponse.password;
        
        res.status(200).json({ 
            success: true,
            message: 'Utilisateur mis à jour avec succès',
            user: userResponse 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Erreur lors de la mise à jour de l\'utilisateur',
            error: error.message 
        });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
        
        await user.destroy();
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Erreur lors de la suppression de l\'utilisateur',
            error: error.message 
        });
    }
}
exports.getSalesUsers = async (req, res) => {
    try {
        const salesUsers = await User.findAll({
            where: { role: 'sales' },
            attributes: { exclude: ['password'] } // Exclure le mot de passe des résultats
        });
        res.status(200).json(salesUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Erreur lors de la récupération des utilisateurs commerciaux',
            error: error.message 
        });
    }
}

