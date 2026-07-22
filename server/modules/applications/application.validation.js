const { body, param } = require("express-validator");

/**
 * Validation for submitting a new player application
 */
const createApplicationValidation = [

    body("first_name")
        .trim()
        .notEmpty()
        .withMessage("First name is required.")
        .isLength({ max: 100 })
        .withMessage("First name cannot exceed 100 characters."),

    body("middle_name")
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 100 })
        .withMessage("Middle name cannot exceed 100 characters."),

    body("last_name")
        .trim()
        .notEmpty()
        .withMessage("Last name is required.")
        .isLength({ max: 100 })
        .withMessage("Last name cannot exceed 100 characters."),

    body("gender")
        .notEmpty()
        .withMessage("Gender is required.")
        .isIn(["Male", "Female"])
        .withMessage("Gender must be Male or Female."),

    body("date_of_birth")
        .notEmpty()
        .withMessage("Date of birth is required.")
        .isISO8601()
        .withMessage("Invalid date of birth.")
        .custom((value) => {
            if (new Date(value) > new Date()) {
                throw new Error("Date of birth cannot be in the future.");
            }
            return true;
        }),

    body("nationality")
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 100 })
        .withMessage("Nationality cannot exceed 100 characters."),

    body("preferred_position")
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 50 })
        .withMessage("Preferred position cannot exceed 50 characters."),

    body("preferred_foot")
        .optional({ checkFalsy: true })
        .isIn(["Left", "Right", "Both"])
        .withMessage("Preferred foot must be Left, Right or Both."),

    body("school_name")
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 150 })
        .withMessage("School name cannot exceed 150 characters."),

    body("class_level")
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 50 })
        .withMessage("Class level cannot exceed 50 characters."),

    body("residential_address")
        .optional({ checkFalsy: true })
        .trim(),

    body("medical_conditions")
        .optional({ checkFalsy: true })
        .trim(),

    body("allergies")
        .optional({ checkFalsy: true })
        .trim(),

    body("emergency_contact_name")
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 150 })
        .withMessage("Emergency contact name cannot exceed 150 characters."),

    body("emergency_contact_phone")
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 20 })
        .withMessage("Emergency contact phone cannot exceed 20 characters.")
];

/**
 * Validation for application ID
 */
const applicationIdValidation = [

    param("id")
        .isInt({ min: 1 })
        .withMessage("Invalid application ID.")
];

/**
 * Validation for reviewing an application
 */
const reviewApplicationValidation = [

    ...applicationIdValidation,

    body("status")
        .notEmpty()
        .withMessage("Status is required.")
        .isIn(["Approved", "Rejected"])
        .withMessage("Status must be Approved or Rejected."),

    body("remarks")
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 1000 })
        .withMessage("Remarks cannot exceed 1000 characters.")
];

module.exports = {
    createApplicationValidation,
    applicationIdValidation,
    reviewApplicationValidation
};