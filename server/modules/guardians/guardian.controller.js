const guardianService = require("./guardian.service");
const asyncHandler = require("../../utils/asyncHandler");
const { successResponse } = require("../../utils/response");

/**
 * Create Guardian
 */
const createGuardian = asyncHandler(async (req, res) => {

    const guardian = await guardianService.createGuardian(req.body);

    return successResponse(
        res,
        "Guardian created successfully.",
        guardian,
        201
    );

});

/**
 * Get All Guardians
 */
const getAllGuardians = asyncHandler(async (req, res) => {

    const guardians = await guardianService.getAllGuardians();

    return successResponse(
        res,
        "Guardians retrieved successfully.",
        guardians
    );

});

/**
 * Get Guardian By ID
 */
const getGuardianById = asyncHandler(async (req, res) => {

    const guardian = await guardianService.getGuardianById(req.params.id);

    return successResponse(
        res,
        "Guardian retrieved successfully.",
        guardian
    );

});

/**
 * Get Guardians By Player ID
 */
const getGuardiansByPlayerId = asyncHandler(async (req, res) => {

    const guardians = await guardianService.getGuardiansByPlayerId(
        req.params.playerId
    );

    return successResponse(
        res,
        "Player guardians retrieved successfully.",
        guardians
    );

});

/**
 * Update Guardian
 */
const updateGuardian = asyncHandler(async (req, res) => {

    const guardian = await guardianService.updateGuardian(
        req.params.id,
        req.body
    );

    return successResponse(
        res,
        "Guardian updated successfully.",
        guardian
    );

});

/**
 * Delete Guardian
 */
const deleteGuardian = asyncHandler(async (req, res) => {

    await guardianService.deleteGuardian(req.params.id);

    return successResponse(
        res,
        "Guardian deleted successfully."
    );

});

module.exports = {
    createGuardian,
    getAllGuardians,
    getGuardianById,
    getGuardiansByPlayerId,
    updateGuardian,
    deleteGuardian
};