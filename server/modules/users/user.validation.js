const { body, validationResult } = require("express-validator");

const createUserValidation = [

    body("roleId")
        .notEmpty()
        .withMessage("Role is required")
        .isInt({ min: 1 })
        .withMessage("Role ID must be a valid integer"),

    body("fullName")
        .trim()
        .notEmpty()
        .withMessage("Full name is required")
        .isLength({ min: 3, max: 100 })
        .withMessage("Full name must be between 3 and 100 characters"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email address")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),

    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required")
        .isLength({ min: 10, max: 15 })
        .withMessage("Phone number must be between 10 and 15 digits"),

    body("profilePhoto")
        .optional()
        .isString()
        .withMessage("Profile photo must be a string")

];


const updateUserValidation = [

    body("roleId")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Role ID must be a valid integer"),

    body("fullName")
        .optional()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage("Full name must be between 3 and 100 characters"),

    body("email")
        .optional()
        .trim()
        .isEmail()
        .withMessage("Invalid email address")
        .normalizeEmail(),

    body("password")
        .optional()
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),

    body("phone")
        .matches(/^(\+256|0)[7][0-9]{8}$/)
        .withMessage("Enter a valid Ugandan phone number"),

    body("profilePhoto")
        .optional()
        .isString()
        .withMessage("Profile photo must be a string")

];


const validate = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errors.array()
        });

    }

    next();

};

module.exports = {
    createUserValidation,
    updateUserValidation,
    validate
};
