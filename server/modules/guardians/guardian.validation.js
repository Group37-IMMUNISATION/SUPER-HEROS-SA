const { body, param } = require("express-validator");

/**
 * Validate Guardian ID
 */
const guardianIdValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("Valid guardian ID is required.")
];

/**
 * Validate Player ID
 */
const playerIdValidation = [
    param("playerId")
        .isInt({ min: 1 })
        .withMessage("Valid player ID is required.")
];

/**
 * Create Guardian Validation
 */
const createGuardianValidation = [

    body("player_id")
        .isInt({ min: 1 })
        .withMessage("Valid player ID is required."),

    body("full_name")
        .trim()
        .notEmpty()
        .withMessage("Guardian full name is required."),

    body("relationship")
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage("Relationship cannot exceed 50 characters."),

    body("phone")
        .optional()
        .trim()
        .isLength({ max: 20 })
        .withMessage("Phone number cannot exceed 20 characters."),

    body("whatsapp")
        .optional()
        .trim()
        .isLength({ max: 20 })
        .withMessage("WhatsApp number cannot exceed 20 characters."),

    body("email")
        .optional()
        .isEmail()
        .withMessage("Invalid email address."),

    body("occupation")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage("Occupation cannot exceed 100 characters."),

    body("national_id")
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage("National ID cannot exceed 50 characters."),

    body("address")
        .optional()
        .trim()
];

/**
 * Update Guardian Validation
 */
const updateGuardianValidation = [

    body("full_name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Guardian full name cannot be empty."),

    body("relationship")
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage("Relationship cannot exceed 50 characters."),

    body("phone")
        .optional()
        .trim()
        .isLength({ max: 20 })
        .withMessage("Phone number cannot exceed 20 characters."),

    body("whatsapp")
        .optional()
        .trim()
        .isLength({ max: 20 })
        .withMessage("WhatsApp number cannot exceed 20 characters."),

    body("email")
        .optional()
        .isEmail()
        .withMessage("Invalid email address."),

    body("occupation")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage("Occupation cannot exceed 100 characters."),

    body("national_id")
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage("National ID cannot exceed 50 characters."),

    body("address")
        .optional()
        .trim()
];

module.exports = {
    guardianIdValidation,
    playerIdValidation,
    createGuardianValidation,
    updateGuardianValidation
};