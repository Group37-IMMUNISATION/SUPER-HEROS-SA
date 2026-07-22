const playerService = require("./player.service");
const asyncHandler = require("../../utils/asyncHandler");
const { successResponse } = require("../../utils/response");

/**
 * Get all players
 */
const getAllPlayers = asyncHandler(async (req, res) => {

    const players = await playerService.getAllPlayers();

    return successResponse(
        res,
        "Players retrieved successfully.",
        players
    );

});

/**
 * Get player by ID
 */
const getPlayerById = asyncHandler(async (req, res) => {

    const player = await playerService.getPlayerById(req.params.id);

    return successResponse(
        res,
        "Player retrieved successfully.",
        player
    );

});

/**
 * Update player
 */
const updatePlayer = asyncHandler(async (req, res) => {

    const player = await playerService.updatePlayer(
        req.params.id,
        req.body
    );

    return successResponse(
        res,
        "Player updated successfully.",
        player
    );

});

/**
 * Update player status
 */
const updatePlayerStatus = asyncHandler(async (req, res) => {

    const player = await playerService.updatePlayerStatus(
        req.params.id,
        req.body.status
    );

    return successResponse(
        res,
        "Player status updated successfully.",
        player
    );

});

/**
 * Assign player to a team
 */
const assignPlayerToTeam = asyncHandler(async (req, res) => {

    const player = await playerService.assignPlayerToTeam(
        req.params.id,
        req.body.team_id
    );

    return successResponse(
        res,
        "Player assigned to team successfully.",
        player
    );

});

module.exports = {
    getAllPlayers,
    getPlayerById,
    updatePlayer,
    updatePlayerStatus,
    assignPlayerToTeam
};