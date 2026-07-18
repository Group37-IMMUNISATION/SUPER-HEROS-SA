const authService = require("./auth.service");
const asyncHandler = require("../../utils/asyncHandler");
const { successResponse } = require("../../utils/response");

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const data = await authService.login(email, password);

    return successResponse(
        res,
        "Login successful",
        data,
        200
    );
});

module.exports = {
    login
};