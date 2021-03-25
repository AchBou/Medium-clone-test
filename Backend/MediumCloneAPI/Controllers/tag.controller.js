const tagService = require('../services/tag.service');
const tags = require('../models/tag.model');

const { Op } = require("sequelize");

let Tag = function () {

};

Tag.prototype=Object.create(tagService.prototype)


// Create and Save a new Tag
Tag.prototype.create = (req, res) => {
    // Validate request
    if (false) {
        res.status(400).send({
            message: "A mandatory field is missing !"
        });
        return;
    }

    // Create a Tag
    const tag = {
        title:req.body.title
    };
    console.log(tag)
    // Save Tag in the database
    tags.create(tag)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tag."
            });
        });
};

// Retrieve all Tags from the database.
Tag.prototype.findAll = (req, res) => {
    const title = req.query.title;
    const condition = title ? {title: {[Op.like]: `%${title}%`}} : null;

    tags.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Tags."
            });
        });
};

// Find a single Tag with an id
Tag.prototype.findOne = (req, res) => {
    console.log(req.params)
    const id = req.params.id;

    tags.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tag with id=" + id
            });
        });
};



// Update a Tag by the id in the request
Tag.prototype.update = (req, res) => {
    const id = req.params.id;

    tags.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tag was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tag with id=${id}. Maybe Tag was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tag with id=" + id
            });
        });
};

// Delete a Tag with the specified id in the request
Tag.prototype.delete = (req, res) => {
    const id = req.params.id;

    tags.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tag was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tag with id=${id}. Maybe Tag was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tag with id=" + id
            });
        });
};


module.exports=new Tag();
