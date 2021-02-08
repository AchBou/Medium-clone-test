const express = require('express');
const router = express.Router();
const request = require('request');


/* GET Resource */
router.get('/*', function(req, res, next) {
    let options = {
        uri: 'http://localhost:8000/api'+req.path,
        body: JSON.stringify(req.body),
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }
    request(options,  (err, rs, body) => {
        if (err) { return console.log(err); }
        //console.log(body)
        res.send(body)
    });
});


/* Post Resource */
router.post('/*', function(req, res, next) {
    let options = {
        uri: 'http://localhost:8000/api'+req.path,
        body: JSON.stringify(req.body),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    request(options, (err, rs, body) => {
        if (err) { return console.log(err); }
        res.send(body)
    });
});

/* Update Resource*/
router.put('/*', function(req, res, next) {
    let options = {
        uri: 'http://localhost:8000/api'+req.path,
        body: JSON.stringify(req.body),
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    request(options, (err, rs, body) => {
        if (err) { return console.log(err); }
        console.log(body);
        res.send(body)
    });
});

/* get a user by Id */
router.delete('/*', function(req, res, next) {
    let options = {
        uri: 'http://localhost:8000/api'+req.path,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    request(options, (err, rs, body) => {
        if (err) { return console.log(err); }
        res.send(body)
    });
});


module.exports = router;
