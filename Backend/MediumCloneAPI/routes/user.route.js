const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");


const users = require("../controllers/user.controller.js");

// Create a new user
router.post("/",[authJwt.verifyToken], users.create);

// Retrieve all users
router.get("/",[authJwt.verifyToken , authJwt.isAdmin], users.findAll);

// Retrieve a single user with userId
router.get("/:id",[authJwt.verifyToken, authJwt.isAdmin], users.findOne);

// Update a user with userId
router.put("/:id",[authJwt.verifyToken, authJwt.isAdmin], users.update);

// Delete a user with userId
router.delete("/:id",[authJwt.verifyToken, authJwt.isAdmin], users.delete);


module.exports = router;
