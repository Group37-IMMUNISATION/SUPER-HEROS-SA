const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");
const authenticate = require("../../middleware/authenticate");
const authorize = require("../../middleware/authorize");
const ROLES = require("../../constants/roles");
const {loginValidation,validate} = require("./auth.validation");


router.post(
    "/login",
    loginValidation,
    validate,
    authController.login
);

router.get(
    "/me",
    authenticate,
    authController.getCurrentUser
);

router.get(
    "/admin-test",
    authenticate,
    authorize(ROLES.SYSTEM_ADMIN),
    (req, res) => {
        res.json({
            success: true,
            message: "Welcome System Administrator!",
            user: req.user
        });
    }
);

module.exports = router;