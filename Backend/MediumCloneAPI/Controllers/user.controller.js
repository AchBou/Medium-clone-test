const UserService = require('../services/user.service');
const users = require('../models/user.model');

const { Op } = require("sequelize");

let User = function () {

};

User.prototype= Object.create(UserService.prototype)

// Create and Save a new User
User.prototype.create = (req, res) => {
    // Validate request
    if (!req.body.username || !req.body.password || !req.body.email) {
        res.status(400).send({
            message: "A mandatory field is missing !"
        });
        return;
    }

    // Create a User
    const user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    };

    // Save User in the database
    users.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

// Retrieve all Users from the database.
User.prototype.findAll = (req, res) => {
    const title = req.query.title;
    const condition = title ? {title: {[Op.like]: `%${title}%`}} : null;

    users.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users."
            });
        });
};

// Find a single User with an id
User.prototype.findOne = (req, res) => {
    console.log(req.params)
    const id = req.params.id;

    users.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};


// Update a User by the id in the request
User.prototype.update = (req, res) => {
    const id = req.params.id;

    users.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

// Delete a User with the specified id in the request
User.prototype.delete = (req, res) => {
    const id = req.params.id;

    users.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};


module.exports=new User();
