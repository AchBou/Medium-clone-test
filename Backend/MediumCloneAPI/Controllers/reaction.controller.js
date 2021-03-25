const Reactionservice = require('../services/reaction.service');
const Reactions  = require('../models/reaction.model');

const { Op } = require("sequelize");

let Reaction = function () {

};

Reaction.prototype=Object.create(Reactionservice.prototype)


// Create and Save a new reaction
Reaction.prototype.create = (req, res) => {
    // Validate request
    if (!req.body.type || !req.body.userId || !req.body.articleId) {
        res.status(400).send({
            message: "A mandatory field is missing !"
        });
        return;
    }

    // Create a reaction
    const reaction = {
        type: req.body.type,
        userId: req.body.userId,
        articleId: req.body.articleId
    };

    // Save reaction in the database
    Reactions.create(reaction)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the reaction."
            });
        });
};

// Retrieve all Reactions from the database.
Reaction.prototype.findAll = (req, res) => {
    const title = req.query.title;
    const condition = title ? {title: {[Op.like]: `%${title}%`}} : null;

    Reactions.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Reactions."
            });
        });
};

// Find a single reaction with an id
Reaction.prototype.findOne = (req, res) => {
    console.log(req.params)
    const id = req.params.id;

    Reactions.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving reaction with id=" + id
            });
        });
};



// Update a reaction by the id in the request
Reaction.prototype.update = (req, res) => {
    const id = req.params.id;

    Reactions.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "reaction was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update reaction with id=${id}. Maybe reaction was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating reaction with id=" + id
            });
        });
};

// Delete a reaction with the specified id in the request
Reaction.prototype.delete = (req, res) => {
    const id = req.params.id;

    Reactions.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "reaction was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete reaction with id=${id}. Maybe reaction was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete reaction with id=" + id
            });
        });
};


module.exports=new Reaction();
