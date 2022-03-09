const mongoose = require('mongoose');
require('dotenv').config({ path: './config/.env' });

// connexion à mongoDB
mongoose.connect(process.env.DB_CONFIG, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((error) => console.log('Connexion à MongoDB échouée !', error));