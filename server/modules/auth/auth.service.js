const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRepository = require("./auth.repository");
const AppError = require("../../utils/AppError");

const login = async (email, password) => {
    // Find user
    const user = await authRepository.findUserByEmail(email);

    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }

    // Check account status
    if (!user.is_active) {
        throw new AppError("Your account has been deactivated", 403);
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new AppError("Invalid email or password", 401);
    }

    // Generate JWT
    const token = jwt.sign(
        {
            userId: user.user_id,
            roleId: user.role_id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "1d"
        }
    );

    return {
        token,
        user: {
            id: user.user_id,
            fullName: user.full_name,
            email: user.email,
            role: user.role_name
        }
    };
};

module.exports = {
    login
};