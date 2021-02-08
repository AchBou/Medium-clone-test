const express = require('express');
const router = express.Router();
const userDAO=require('../DAO/userDAO');

/* list users */
router.get('/', function(req, res, next) {
    let user = userDAO.listUsers([],function (err,rs){
        if(err){console.error(err)}
        else{
            let user = rs[0]
            res.send(user);
        }
    });
});

/* get a user by Id */
router.get('/:id', function(req, res, next) {
    let user = userDAO.getUserById([req.params.id],function (err,rs){
        if(err){console.error(err)}
        else{
            let user = rs[0]
            res.send(user);
        }
    });
});



module.exports = router;
