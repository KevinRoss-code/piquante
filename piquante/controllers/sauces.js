const Sauce = require('../models/sauce');
const user = require('../controllers/user');
const fs = require('fs');

exports.creationSauces = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.ciblerSauces = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.modifierSauces = (req, res, next) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié' }))
        .catch(error => res.status(400).json({ error }));
};

exports.supprimerSauces = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé' }))
                    .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(500).json({ error }));
};

exports.routeGeneral = (req, res, next) => {
    Sauce.find()
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({ error }));
};

exports.fonctionLike = (req, res, next) => {
    const boutonLike = JSON.parse(req.body.like);
    switch (boutonLike) {
        case 1:
            Sauce.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $push: { usersLiked: req.body.userId },
                    $inc: { likes: 1 }
                })
                .then(sauce => res.status(200).json(sauce))
                .catch(error => res.status(400).json({ error }));
            break;
        case -1:
            Sauce.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $push: { usersDisliked: req.body.userId },
                    $inc: { dislikes: 1 }
                })
                .then(sauce => res.status(200).json(sauce))
                .catch(error => res.status(400).json({ error }));
            break;
        case 0:
            Sauce.findOne({ _id: req.params.id })
                .then(sauce => {
                    let user = sauce.usersLiked.find(elt => elt === req.body.userId)
                    if (user !== undefined) {
                        Sauce.findOneAndUpdate(
                            { _id: req.params.id },
                            {
                                $pull: { usersLiked: req.body.userId },
                                $inc: { likes: -1 }
                            })
                            .then(sauce => res.status(200).json(sauce))
                            .catch(error => res.status(400).json({ error }));
                    } else {
                        Sauce.findOneAndUpdate(
                            { _id: req.params.id },
                            {
                                $pull: { usersDisliked: req.body.userId },
                                $inc: { dislikes: -1 }
                            })
                            .then(sauce => res.status(200).json(sauce))
                            .catch(error => res.status(400).json({ error }));
                    }
                })
        default:
            break;
    };
}

