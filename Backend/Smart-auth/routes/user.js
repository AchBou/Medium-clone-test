const express = require('express');
const router = express.Router();

// Test Data
let users = require('../mockData.json')


/* list users */
router.get('/', function(req, res, next) {
    res.send(users);
});

/* get a user by Id */
router.get('/:id', function(req, res, next) {
    let id = req.params.id-1
    res.send(users[id]);
});



module.exports = router;
