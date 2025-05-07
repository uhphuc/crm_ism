const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoute');
const customerRoutes = require('./routes/customerRoute');
const userRoutes = require('./routes/userRoute');
const dealRoutes = require('./routes/dealRoute');
const noteRoutes = require('./routes/noteRoute');
const activityRoutes = require('./routes/activityRoute');
const db = require('./models/index');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/deals', dealRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/activities', activityRoutes);

app.get('/', (req, res) => {
  res.send('CRM Backend is running');
});

db.sequelize.sync({ alter: false }) // Set to true if you want to alter the tables
  .then(() => {
    console.log('Base de données synchronisée');
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erreur de synchronisation avec la base de données:', err);
  });
