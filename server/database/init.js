// database/init.js
const db = require('../models');
const bcrypt = require('bcrypt');
// Synchronisation de la base de données
async function initDatabase() {
  try {
    // Forcer la resynchronisation de la base de données (ATTENTION: à utiliser en développement uniquement)
    // En production, utilisez des migrations à la place
    await db.sequelize.sync({ force: true });
    console.log('✅ Base de données synchronisée avec succès');
    
    // Créer un utilisateur administrateur par défaut
    const hashedPassword = await bcrypt.hash('admin123', 10); // Hachage du mot de passe
    const adminUser = await db.User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: hashedPassword, // En production, utilisez bcrypt pour hasher le mot de passe
      role: 'admin'
    });
    
    console.log('✅ Utilisateur administrateur créé avec succès');
    
    // Ajouter quelques données de test si nécessaire
    // ...
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de la base de données:', error);
  } finally {
    // Vous pouvez fermer la connexion ici si nécessaire
    // await db.sequelize.close();
  }
}

// Exécuter l'initialisation si ce script est appelé directement
if (require.main === module) {
  initDatabase();
}

module.exports = initDatabase;