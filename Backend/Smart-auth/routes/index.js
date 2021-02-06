const express = require('express');
const router = express.Router();

/* Root link */
router.get('/', function(req, res, next) {
    res.send('Welcome to Medium clone authentication Api');
});

module.exports = router;
