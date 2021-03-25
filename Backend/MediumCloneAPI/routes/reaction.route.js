const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");


const reactions = require("../controllers/reaction.controller.js");

// Create a new user
router.post("/",[authJwt.verifyToken], reactions.create);

// Retrieve all reactions
router.get("/",[authJwt.verifyToken], reactions.findAll);

// Retrieve a single user with userId
router.get("/:id",[authJwt.verifyToken], reactions.findOne);

// Update a user with userId
router.put("/:id",[authJwt.verifyToken], reactions.update);

// Delete a user with userId
router.delete("/:id",[authJwt.verifyToken], reactions.delete);


module.exports = router;
