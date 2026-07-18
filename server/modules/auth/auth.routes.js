const express = require("express");

const router = express.Router();

const authController = require("./auth.controller");

const {
    loginValidation,
    validate
} = require("./auth.validation");

router.post(
    "/login",
    loginValidation,
    validate,
    authController.login
);

module.exports = router;