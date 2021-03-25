const CommentService = require('../services/Comment.service');
const comments  = require('../models/comment.model');

const { Op } = require("sequelize");

let Comment = function () {

};

Comment.prototype=Object.create(CommentService.prototype)


// Create and Save a new Comment
Comment.prototype.create = (req, res) => {
    // Validate request
    if (!req.body.content || !req.body.userId || !req.body.articleId) {
        res.status(400).send({
            message: "A mandatory field is missing !"
        });
        return;
    }

    // Create a Comment
    const comment = {
        content: req.body.content,
        userId: req.body.userId,
        articleId: req.body.articleId
    };

    // Save Comment in the database
    comments.create(comment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Comment."
            });
        });
};

// Retrieve all Comments from the database.
Comment.prototype.findAll = (req, res) => {
    const title = req.query.title;
    const condition = title ? {title: {[Op.like]: `%${title}%`}} : null;

    comments.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Comments."
            });
        });
};

// Find a single Comment with an id
Comment.prototype.findOne = (req, res) => {
    console.log(req.params)
    const id = req.params.id;

    comments.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Comment with id=" + id
            });
        });
};



// Update a Comment by the id in the request
Comment.prototype.update = (req, res) => {
    const id = req.params.id;

    comments.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Comment was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Comment with id=${id}. Maybe Comment was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Comment with id=" + id
            });
        });
};

// Delete a Comment with the specified id in the request
Comment.prototype.delete = (req, res) => {
    const id = req.params.id;

    comments.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Comment was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Comment with id=" + id
            });
        });
};


module.exports=new Comment();
