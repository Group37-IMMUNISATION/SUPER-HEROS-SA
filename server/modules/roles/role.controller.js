const roleService = require("./role.service");
const asyncHandler = require("../../utils/asyncHandler");
const { successResponse } = require("../../utils/response");

const getAllRoles = asyncHandler(async (req, res) => {

    const roles = await roleService.getAllRoles();

    return successResponse(
        res,
        "Roles retrieved successfully.",
        roles
    );

});

const getRoleById = asyncHandler(async (req, res) => {

    const role = await roleService.getRoleById(req.params.id);

    return successResponse(
        res,
        "Role retrieved successfully.",
        role
    );

});

module.exports = {
    getAllRoles,
    getRoleById
};