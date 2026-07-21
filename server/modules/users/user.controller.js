const userService = require("./user.service");
const asyncHandler = require("../../utils/asyncHandler");
const { successResponse } = require("../../utils/response");

const createUser = asyncHandler(async (req, res) => {

    const user = await userService.createUser(req.body);

    return successResponse(
        res,
        "User created successfully.",
        user,
        201
    );

});


const getAllUsers = asyncHandler(async (req, res) => {

    const users = await userService.getAllUsers();

    return successResponse(
        res,
        "Users retrieved successfully.",
        users
    );

});


const getUserById = asyncHandler(async (req, res) => {

    const user = await userService.getUserById(
        req.params.id
    );

    return successResponse(
        res,
        "User retrieved successfully.",
        user
    );

});


const updateUser = asyncHandler(async (req, res) => {

    const user = await userService.updateUser(
        req.params.id,
        req.body
    );

    return successResponse(
        res,
        "User updated successfully.",
        user
    );

});


const deactivateUser = asyncHandler(async (req, res) => {

    const user = await userService.deactivateUser(
        req.params.id
    );

    return successResponse(
        res,
        "User deactivated successfully.",
        user
    );

});

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deactivateUser
};