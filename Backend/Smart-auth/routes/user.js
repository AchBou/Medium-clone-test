const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// Test Data
const users = [
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@email.com',
        // SHA256 hash for test password : `password`
        password: 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg='
    }
];

/* list users */
router.get('/', function(req, res, next) {
    res.send(users);
});

/* get a user by Id */
router.get('/:id', function(req, res, next) {
    let id = req.params.id-1
    res.send(users[id]);
});

/* registering a user */
router.post('/register', (req, res) => {
    const { email, firstName, lastName, password, confirmPassword } = req.body;

    // Checking if user with the same email is also registered
    if (users.find(user => user.email === email)) {
        res.send('User already exists');
        return;
    }

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



const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}


module.exports = router;
