const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const userRouteur = require('./routes/user');


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

const uri = "mongodb+srv://loursenrage:<Asc1THn9>@bdd-piquante.m0qvo.mongodb.net/<BDD-piquante>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true }, { useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


//mise ne place des middleware qui sont des variables et permettent d'éxecuter le code


app.use(bodyParser.json());

app.use('/api/auth', userRouteur);

module.exports = app;



/*app.post('/api/auth/signup', (req, res, next) => {
    delete req.body._id;
    const sign = new Sign({
        ...req.body
    });
    sign.save()
    .the(() => res.status(201).json({ message: 'Inscription réussite'}))
    .catch(error => res.status(400).json({ error }));
    next();
});


app.post('/api/sauces', (req, res, next) =>{
    delete req.body._id;
    const sauces = new Sauces({
        ...req.body
    });
    sauces.save()
    .the(() => res.status(201).json({ message: 'Sauce enregistrée'}))
    .catch(error => res.status(400).json({ error }));
    next();
    next();
});

app.use('/signup', (req, res, next) => {
    const newUser = [
        {
            userId: 'string',
            email: 'string',
            password: 'string'
        }
    ];
    next()
;})
app.use('/api/sauces', (req, res, next) => {
    const sauce = [
        {
            _id: 'ObjectID',
            userId: 'string',
            name: 'string',
            manufacteur: 'string',
            description: 'string',
            mainPepper: 'string',
            imageUrl: 'string',
            heat: 'number',
            likes: 'number',
            dislikes: 'number',
            usersLiked: '[string]',
            usersDisliked: '[string]',
        }
    ];
    res.status(200).json(sauce);
    next();
});
*/