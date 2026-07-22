const { body, param } = require("express-validator");

/**
 * Validate Player ID
 */
const playerIdValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("Valid player ID is required.")
];

/**
 * Update Player Validation
 */
const updatePlayerValidation = [

    body("first_name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("First name cannot be empty."),

    body("middle_name")
        .optional()
        .trim(),

    body("last_name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Last name cannot be empty."),

    body("gender")
        .optional()
        .isIn(["Male", "Female"])
        .withMessage("Gender must be Male or Female."),

    body("date_of_birth")
        .optional()
        .isISO8601()
        .withMessage("Valid date of birth is required."),

    body("nationality")
        .optional()
        .trim(),

    body("preferred_position")
        .optional()
        .trim(),

    body("preferred_foot")
        .optional()
        .isIn(["Left", "Right", "Both"])
        .withMessage("Preferred foot must be Left, Right or Both."),

    body("school_name")
        .optional()
        .trim(),

    body("class_level")
        .optional()
        .trim(),

    body("residential_address")
        .optional()
        .trim(),

    body("medical_conditions")
        .optional()
        .trim(),

    body("allergies")
        .optional()
        .trim(),

    body("player_photo")
        .optional()
        .trim()
];

/**
 * Update Player Status
 */
const updateStatusValidation = [

    param("id")
        .isInt({ min: 1 })
        .withMessage("Valid player ID is required."),

    body("status")
        .notEmpty()
        .withMessage("Status is required.")
        .isIn([
            "Active",
            "Inactive",
            "Suspended",
            "Injured"
        ])
        .withMessage(
            "Status must be Active, Inactive, Suspended or Injured."
        )
];

/**
 * Assign Team
 */
const assignTeamValidation = [

    param("id")
        .isInt({ min: 1 })
        .withMessage("Valid player ID is required."),

    body("team_id")
        .isInt({ min: 1 })
        .withMessage("Valid team ID is required.")
];

module.exports = {
    playerIdValidation,
    updatePlayerValidation,
    updateStatusValidation,
    assignTeamValidation
};