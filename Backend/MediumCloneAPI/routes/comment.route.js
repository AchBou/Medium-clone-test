const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");


const comments = require("../controllers/comment.controller.js");

// Create a new user
router.post("/",[authJwt.verifyToken], comments.create);

// Retrieve all comments
router.get("/",[authJwt.verifyToken], comments.findAll);

// Retrieve a single user with userId
router.get("/:id",[authJwt.verifyToken], comments.findOne);

// Update a user with userId
router.put("/:id",[authJwt.verifyToken], comments.update);

// Delete a user with userId
router.delete("/:id",[authJwt.verifyToken], comments.delete);


module.exports = router;
