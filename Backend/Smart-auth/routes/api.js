const express = require('express');
const router = express.Router();
const request = require('request');

//uri for the api backend, TODO: Add it to a configuration file
const uri = 'http://localhost:8000'

/* GET Resource */
router.get('/*', function(req, res, next) {

    let options = {
        uri: uri+req.originalUrl,
        body: JSON.stringify(req.body),
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }
    request(options,  (err, rs, body) => {
        if (err) {
            console.log(err);res.send(err) }
        res.status(200).send(body)
    });
});


/* Post Resource */
router.post('/*', function(req, res, next) {
    let options = {
        uri: uri+req.originalUrl,
        body: JSON.stringify(req.body),
        method: 'POST',
        headers: {
            "content-type": 'application/json',
            'Accept': 'application/json'
        }
    }
    request(options, (err, rs, body) => {
        console.log(options.uri)
        if (err) { res.send(err); }
        res.status(201).send(body)
    });
});

/* Update Resource*/
router.put('/*', function(req, res, next) {
    let options = {
        uri: uri+req.originalUrl,
        body: JSON.stringify(req.body),
        method: 'PUT',
        headers: {
            "content-type": 'application/json',
            'Accept': 'application/json'
        }
    }
    request(options, (err, rs, body) => {
        if (err) { res.send(err); }
        res.status(200).send(body)
    });
});

/* get a user by Id */
router.delete('/*', function(req, res, next) {
    let options = {
        uri: uri+req.originalUrl,
        method: 'DELETE',
        headers: {
            'Accept': 'application/json'
        }
    }
    request(options, (err, rs, body) => {
        if (err) { res.send(err) }
        res.status(204).send('resource deleted')
    });
});


module.exports = router;
