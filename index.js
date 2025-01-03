const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(bodyParser.json());

const DbUrl="mongodb+srv://momodex:root@cluster0.tc6xq.mongodb.net/filmsDB?retryWrites=true&w=majority";
mongoose.connect(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch(err => console.log('Erreur de connexion à MongoDB :', err));
// Connexion à MongoDB Atlas
/*mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch(err => console.log('Erreur de connexion à MongoDB :', err));
*/
// Middleware
app.use(cors()); // Autorise toutes les origines par défaut
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:3001', // Origine autorisée
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization']
  };
  app.use(cors(corsOptions));

// Exemple de route
app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));

const filmsRoutes = require('./routes/films');
app.use('/films', filmsRoutes);


  