const express = require("express");
const router = express.Router();

const playerController = require("./player.controller");
const validate = require("../../middleware/validate");
const authenticate = require("../../middleware/authenticate");
const authorize = require("../../middleware/authorize");

const {
    playerIdValidation,
    updatePlayerValidation,
    updateStatusValidation,
    assignTeamValidation
} = require("./player.validation");

const ROLES = require("../../constants/roles");

/**
 * Get all players
 */
router.get(
    "/",
    authenticate,
    authorize(
        ROLES.SYSTEM_ADMIN,
        ROLES.ADMINISTRATOR,
        ROLES.COACH
    ),
    playerController.getAllPlayers
);

/**
 * Get player by ID
 */
router.get(
    "/:id",
    authenticate,
    authorize(
        ROLES.SYSTEM_ADMIN,
        ROLES.ADMINISTRATOR,
        ROLES.COACH
    ),
    playerIdValidation,
    validate,
    playerController.getPlayerById
);

/**
 * Update player
 */
router.put(
    "/:id",
    authenticate,
    authorize(
        ROLES.SYSTEM_ADMIN,
        ROLES.ADMINISTRATOR
    ),
    [
        ...playerIdValidation,
        ...updatePlayerValidation
    ],
    validate,
    playerController.updatePlayer
);

/**
 * Update player status
 */
router.patch(
    "/:id/status",
    authenticate,
    authorize(
        ROLES.SYSTEM_ADMIN,
        ROLES.ADMINISTRATOR
    ),
    updateStatusValidation,
    validate,
    playerController.updatePlayerStatus
);

/**
 * Assign player to a team
 */
router.patch(
    "/:id/team",
    authenticate,
    authorize(
        ROLES.SYSTEM_ADMIN,
        ROLES.ADMINISTRATOR
    ),
    assignTeamValidation,
    validate,
    playerController.assignPlayerToTeam
);

module.exports = router;