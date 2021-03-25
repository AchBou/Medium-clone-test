const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require("../config/auth.config");
const authService = require("../services/auth.service");
const User = require('../models/user.model');


let Auth = function () {

};

Auth.prototype=Object.create(authService.prototype)


Auth.prototype.signup = (req, res) => {
    // Save User to Database
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
            res.send({ message: "User registered successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

Auth.prototype.login = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            const token = jwt.sign({id: user.id}, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: user.role,
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

module.exports=new Auth();
