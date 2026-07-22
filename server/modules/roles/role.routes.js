const express = require("express");

const router = express.Router();

const roleController = require("./role.controller");

const authenticate = require("../../middleware/authenticate");
const authorize = require("../../middleware/authorize");

const ROLES = require("../../constants/roles");

router.get(
    "/",
    authenticate,
    authorize(
        ROLES.SYSTEM_ADMIN,
        ROLES.ADMINISTRATOR
    ),
    roleController.getAllRoles
);

router.get(
    "/:id",
    authenticate,
    authorize(
        ROLES.SYSTEM_ADMIN,
        ROLES.ADMINISTRATOR
    ),
    roleController.getRoleById
);

module.exports = router;
