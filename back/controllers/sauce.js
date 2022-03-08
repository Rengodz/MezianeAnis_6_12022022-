const Sauce = require('../models/Sauce');

exports.createSauce = (req, res, next) => {
    const sauce = new Sauce({
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId,
        manufacturer: req.body.manufacturer,
        mainPepper: req.body.mainPepper,
        imageUrl: req.body.imageUrl,
        heat: req.body.heat,
    });
    sauce.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully!'
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
    console.log("appel");
    Sauce.find().then(
        (sauces) => {
            res.status(200).json(sauce);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}; // like fonction
exports.fctLike = (req, res, next) => {
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
            .catch((error) => res.status(400).json({ error }));
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
                        .catch((error) => res.status(400).json({ error }));
                }
                if (sauce.usersDisliked.includes(userId)) {
                    Sauce.updateOne({ _id: sauceId }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } })
                        .then(() =>
                            res.status(200).json({ message: "L'utilisateur a retiré son dislike" })
                        )
                        .catch((error) => res.status(400).json({ error }));
                }
            })
            .catch((error) => res.status(400).json({ error }));
    }
}