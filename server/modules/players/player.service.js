const playerRepository = require("./player.repository");
const AppError = require("../../utils/AppError");

/**
 * Generate a unique player registration number.
 * Format: SHUSA-YYYY-0001
 */
const generateRegistrationNumber = async () => {

    const year = new Date().getFullYear();

    // Simple unique suffix based on timestamp
    const uniquePart = Date.now().toString().slice(-4);

    return `SHUSA-${year}-${uniquePart}`;
};

/**
 * Create a player
 */
const createPlayer = async (playerData) => {

    const registrationNumber = await generateRegistrationNumber();

    const existingPlayer =
        await playerRepository.findByRegistrationNumber(registrationNumber);

    if (existingPlayer) {
        throw new AppError("Registration number already exists.", 409);
    }

    playerData.registration_number = registrationNumber;

    return await playerRepository.create(playerData);
};

/**
 * Get all players
 */
const getAllPlayers = async () => {
    return await playerRepository.findAll();
};

/**
 * Get player by ID
 */
const getPlayerById = async (playerId) => {

    const player = await playerRepository.findById(playerId);

    if (!player) {
        throw new AppError("Player not found.", 404);
    }

    return player;
};

/**
 * Update player
 */
const updatePlayer = async (playerId, playerData) => {

    await getPlayerById(playerId);

    return await playerRepository.update(playerId, playerData);
};

/**
 * Update player status
 */
const updatePlayerStatus = async (playerId, status) => {

    await getPlayerById(playerId);

    return await playerRepository.updateStatus(playerId, status);
};

/**
 * Assign player to a team
 */
const assignPlayerToTeam = async (playerId, teamId) => {

    await getPlayerById(playerId);

    return await playerRepository.assignTeam(playerId, teamId);
};

module.exports = {
    createPlayer,
    getAllPlayers,
    getPlayerById,
    updatePlayer,
    updatePlayerStatus,
    assignPlayerToTeam
};