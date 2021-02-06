const express = require('express');
const router = express.Router();
const crypto = require('crypto');
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
    const { email, firstName, lastName, password, confirmPassword } = req.body;

    // Checking if user with the same email is also registered
    if (users.find(user => user.email === email)) {
        res.send('User already exists');
        return;
    }

    // Hashing the pwd stored in the DB
    const hashedPassword = getHashedPassword(password);
    // Storing the user into the database
    users.push({
        firstName,
        lastName,
        email,
        password: hashedPassword
    });

    res.send('Regisetred Succefully');

});

/* signing in a user */
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = getHashedPassword(password);

    const user = users.find(u => {
        return u.email === email && hashedPassword === u.password
    });

    if (user) {
        // generate an auth token to be used for the login
        const token = jwt.sign({ user: user.username }, mySecret);
        console.log(token)
        res.send('User successfully authenticated');
    } else {
        res.send('Invalid username or password');
    }
});


// creates the hash pwd
const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}
module.exports = router;
