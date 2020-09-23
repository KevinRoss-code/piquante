const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//mise ne place des middleware qui sont des variables et permettent d'éxecuter le code
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.post('/api/auth/signup', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Creer'
    });
    next();
});

app.post('/api/auth/login', (req, res, next) => {
    console.log(req.body);
    res.status(202).json({
        userId:'string',
        token:'string'
    });
    next();
});

app.post('/api/sauces', (req, res, next) =>{
    console.log(req.body);
    res.status(202).json({
        sauce:'chaine',
        image:'fichier',
    });
    next();
});

app.use('/api/sauces', (req, res, next) => {
    const sauce = [
        {
            id: 'ObjectID',
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

app.use((req, res, next) => {
    console.log('reçu')
})

module.exports = app;