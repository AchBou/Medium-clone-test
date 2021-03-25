const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");


const articles = require("../controllers/article.controller.js");

// Create a new user
router.post("/",[authJwt.verifyToken], articles.create);

// Retrieve all articles
router.get("/",[authJwt.verifyToken], articles.findAll);

// Retrieve a single user with userId
router.get("/:id",[authJwt.verifyToken], articles.findOne);

// Update a user with userId
router.put("/:id",[authJwt.verifyToken], articles.update);

// Delete a user with userId
router.delete("/:id",[authJwt.verifyToken], articles.delete);


module.exports = router;
