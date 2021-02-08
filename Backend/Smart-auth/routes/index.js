const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const userDAO=require('../DAO/userDAO');
const jwt = require('jsonwebtoken');


// JWT secret. TODO: externalizing this and deleting it from archive/Prod
const mySecret = 'achraf123';

// Test Data
let users = require('../mockData.json')


/* Root link */
router.get('/', function(req, res, next) {
    res.send('Welcome to Medium clone authentication Api');
});

/* registering a user */
router.post('/signup', (req, res) => {
    const { email, username, role, password } = req.body;

    // Hashing the pwd stored in the DB
    const hashedPassword = getHashedPassword(password);

    let data=[username,hashedPassword,email,role];

    // Checking if user with the same email is also registered
    userDAO.getUserByLoginInfo( [email],function (err, result) {
        if (err) {
            res.json(err) }
        else {
            {
                if(result[0]) {
                    res.send('User already exits')
                }
                else {
                    // Storing the user into the database
                    userDAO.addUser( data,function (err, result) {
                        if (err) {
                            res.send(err) }
                        else{
                            res.json(result.affectedRows); }
                    });
                }
            }
        }
    });

});

/* signing in a user */
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = getHashedPassword(password);

    userDAO.getUserByLoginInfo( [email],function (err, result) {
        if (err) {
            res.json(err) }
        else {
            {
                if(result[0] && result[0].password==hashedPassword)
                { const Token = jwt.sign({"user_id": result[0].id}, mySecret);
                    res.json(Token); }
                else res.send("utilisateur ou mot de passe inconnu");
            }

        }
    });

});


// creates the hash pwd
const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}
module.exports = router;
