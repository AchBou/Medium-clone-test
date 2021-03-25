const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");


const tags = require("../controllers/tag.controller.js");

// Create a new user
router.post("/",[authJwt.verifyToken], tags.create);

// Retrieve all tags
router.get("/",[authJwt.verifyToken], tags.findAll);

// Retrieve a single user with userId
router.get("/:id",[authJwt.verifyToken], tags.findOne);

// Update a user with userId
router.put("/:id",[authJwt.verifyToken], tags.update);

// Delete a user with userId
router.delete("/:id",[authJwt.verifyToken], tags.delete);


module.exports = router;
