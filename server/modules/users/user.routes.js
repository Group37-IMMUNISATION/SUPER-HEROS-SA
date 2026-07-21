const express = require("express");

const router = express.Router();

const userController = require("./user.controller");
const authenticate = require("../../middleware/authenticate");
const authorize = require("../../middleware/authorize");
const ROLES = require("../../constants/roles");
const {createUserValidation,updateUserValidation,validate} = require("./user.validation");

router.post(
    "/",
    authenticate,
    authorize(ROLES.SYSTEM_ADMIN),
    userController.createUser
);

router.get(
    "/",
    authenticate,
    authorize(
        ROLES.SYSTEM_ADMIN,
        ROLES.ADMINISTRATOR
    ),
    userController.getAllUsers
);

router.get(
    "/:id",
    authenticate,
    authorize(
        ROLES.SYSTEM_ADMIN,
        ROLES.ADMINISTRATOR
    ),
    userController.getUserById
);

router.put(
    "/:id",
    authenticate,
    authorize(ROLES.SYSTEM_ADMIN),
    userController.updateUser
);

router.patch(
    "/:id/deactivate",
    authenticate,
    authorize(ROLES.SYSTEM_ADMIN),
    userController.deactivateUser
);

router.post(
    "/",
    authenticate,
    authorize(ROLES.SYSTEM_ADMIN),
    createUserValidation,
    validate,
    userController.createUser
);

router.put(
    "/:id",
    authenticate,
    authorize(ROLES.SYSTEM_ADMIN),
    updateUserValidation,
    validate,
    userController.updateUser
);



module.exports = router;