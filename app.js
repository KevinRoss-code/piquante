const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const saucesRouter = require('./routes/sauces')
const userRouter = require('./routes/user');
const path = require('path');



const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

const uri = "mongodb+srv://loursenrage:Asc1THn9@bdd-piquante.m0qvo.mongodb.net/BDD-piquante?retryWrites=true&w=majority";
mongoose.connect(uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));



app.use('/api/sauces', saucesRouter);
app.use('/api/auth', userRouter);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;