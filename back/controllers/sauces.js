const Sauce = require('../models/Sauce');
const User = require('../models/User');

exports.createSauce = (req, res, next) => {
    console.log(req.body.sauce);
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: "Sauce enregistrée" }))
        .catch((error) => res.status(400).json({ emessage: "Error occured when creating the sauce : " + error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then(
        (sauce) => {
            res.status(200).json(sauce);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.modifySauce = (req, res, next) => {
    const sauce = new Sauce({
        _id: req.params.id,
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId
    });
    Sauce.updateOne({ _id: req.params.id }, sauce).then(
        () => {
            res.status(201).json({
                message: 'Sauce updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({
                message: 'Deleted!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getAllSauce = (req, res, next) => {

    Sauce.find().then(
        (sauce) => {
            res.status(200).json(sauce);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

// like fonction
exports.likeSauce = (req, res, next) => {
    let userId = req.body.userId;
    let sauceId = req.params.id;
    let like = req.body.like;

    //  us ID on 'usersLiked' and 'likes'

    if (like === 1) {
        Sauce.updateOne({ _id: sauceId }, {
                $push: { usersLiked: userId },
                $inc: { likes: +1 },
            })
            .then(() =>
                res.status(200).json({ message: "L'utilisateur like la sauce" })
            )
            .catch((error) => res.status(400).json({ message: "Error occured when updating the sauce : " + error }));


        //  dislike 
    } else if (like === -1) {
        Sauce.updateOne({ _id: sauceId }, {
                $push: { usersDisliked: userId },
                $inc: { dislikes: +1 },
            })
            .then(() =>
                res.status(200).json({ message: "L'utilisateur dislike la sauce" })
            )
            .catch((error) => res.status(400).json({ error }));


        //  update like/dislike with include

    } else if (like === 0) {
        Sauce.findOne({ _id: sauceId })
            .then((sauce) => {
                if (sauce.usersLiked.includes(userId)) {
                    Sauce.updateOne({ _id: sauceId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 } })
                        .then(() =>
                            res.status(200).json({ message: "L'utilisateur a retiré son like" })
                        )
                        .catch((error) => res.status(400).json({ message: "Error occured when updating the sauce : " + error }));
                }
                if (sauce.usersDisliked.includes(userId)) {
                    Sauce.updateOne({ _id: sauceId }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } })
                        .then(() =>
                            res.status(200).json({ message: "L'utilisateur a retiré son dislike" })
                        )
                        .catch((error) => res.status(400).json({ message: "Error occured when updating the sauce : " + error }));
                }
            })
            .catch((error) => res.status(400).json({ error }));
    }
}