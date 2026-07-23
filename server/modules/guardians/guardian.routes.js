const express = require("express");
const router = express.Router();

const guardianController = require("./guardian.controller");
const validate = require("../../middleware/validate");
const authenticate = require("../../middleware/authenticate");
const authorize = require("../../middleware/authorize");

const {
    guardianIdValidation,
    playerIdValidation,
    createGuardianValidation,
    updateGuardianValidation
} = require("./guardian.validation");

const ROLES = require("../../constants/roles");

/**
 * Create Guardian
 */
router.post(
    "/",
    authenticate,
    authorize(
        ROLES.SYSTEM_ADMIN,
        ROLES.ADMINISTRATOR
    ),
    createGuardianValidation,
    validate,
    guardianController.createGuardian
);

/**
 * Get All Guardians
 */
router.get(
    "/",
    authenticate,
    authorize(
        ROLES.SYSTEM_ADMIN,
        ROLES.ADMINISTRATOR,
        ROLES.COACH
    ),
    guardianController.getAllGuardians
);

/**
 * Get Guardians By Player ID
 */
router.get(
    "/player/:playerId",
    authenticate,
    authorize(
        ROLES.SYSTEM_ADMIN,
        ROLES.ADMINISTRATOR,
        ROLES.COACH
    ),
    playerIdValidation,
    validate,
    guardianController.getGuardiansByPlayerId
);

/**
 * Get Guardian By ID
 */
router.get(
    "/:id",
    authenticate,
    authorize(
        ROLES.SYSTEM_ADMIN,
        ROLES.ADMINISTRATOR,
        ROLES.COACH
    ),
    guardianIdValidation,
    validate,
    guardianController.getGuardianById
);

/**
 * Update Guardian
 */
router.put(
    "/:id",
    authenticate,
    authorize(
        ROLES.SYSTEM_ADMIN,
        ROLES.ADMINISTRATOR
    ),
    [
        ...guardianIdValidation,
        ...updateGuardianValidation
    ],
    validate,
    guardianController.updateGuardian
);

/**
 * Delete Guardian
 */
router.delete(
    "/:id",
    authenticate,
    authorize(
        ROLES.SYSTEM_ADMIN
    ),
    guardianIdValidation,
    validate,
    guardianController.deleteGuardian
);

module.exports = router;