const express = require('express');
const router = express.Router();

const { verifySignUp } = require("../middlewares");
const auth = require("../controllers/auth.controller");


router.post(
    "/signup",
    [
        verifySignUp.checkDuplicateUsernameOrEmail
    ],
    auth.signup
);

router.post("/login", auth.login);

module.exports = router;
