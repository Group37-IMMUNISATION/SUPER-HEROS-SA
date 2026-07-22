const express = require("express");

const controller = require("./application.controller");

const {
    createApplicationValidation,
    applicationIdValidation,
    reviewApplicationValidation
} = require("./application.validation");

const validate = require("../../middleware/validate");

const authenticate = require("../../middleware/authenticate");

const authorize = require("../../middleware/authorize");

const  ROLES  = require("../../constants/roles");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Parent/Guardian submits application
router.post(
    "/",
    createApplicationValidation,
    validate,
    controller.createApplication
);

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

router.use(authenticate);

/**
 * View all applications
 */
router.get(
    "/",
    authorize(
        ROLES.SYSTEM_ADMIN,
        ROLES.ADMINISTRATOR,
        ROLES.CHIEF_EXECUTIVE_OFFICER
    ),
    controller.getAllApplications
);

/**
 * View single application
 */
router.get(
    "/:id",
    applicationIdValidation,
    validate,
    authorize(
        ROLES.SYSTEM_ADMIN,
        ROLES.ADMINISTRATOR,
        ROLES.CHIEF_EXECUTIVE_OFFICER
    ),
    controller.getApplicationById
);

/**
 * Approve / Reject application
 */
router.patch(
    "/:id/review",
    reviewApplicationValidation,
    validate,
    authorize(
        ROLES.SYSTEM_ADMIN,
        ROLES.ADMINISTRATOR
    ),
    controller.reviewApplication
);

module.exports = router;