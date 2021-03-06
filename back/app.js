const express = require('express');
require('dotenv').config({ path: './config/.env' });
const mongoose = require('mongoose');


const path = require('path');
const userRoutes = require('./routes/user');

const Sauce = require('./models/Sauce');

const sauceRoutes = require('./routes/sauce');

mongoose.connect(process.env.DB_CONFIG, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/sauces', sauceRoutes);

app.use('/api/auth', userRoutes);

module.exports = app;