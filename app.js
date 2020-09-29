const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouteur = require('./routes/user');
const Sauce = require('./models/sauce')


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
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


    

//mise ne place des middleware qui sont des variables et permettent d'éxecuter le code
app.post('/api/sauces', (req, res, next) => {
    //delete req.body._id;
    const sauce = new Sauce({
        ...req.body
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré'}))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/sauces/:id', (req, res, next) => {
    Sauce.findOne({_id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
});

app.get('/api/sauces', (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
});

app.use('/api/auth', userRouteur);

module.exports = app;


