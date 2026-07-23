const guardianRepository = require("./guardian.repository");
const AppError = require("../../utils/AppError");

/**
 * Create Guardian
 */
const createGuardian = async (guardianData) => {

    return await guardianRepository.create(guardianData);

};

/**
 * Get All Guardians
 */
const getAllGuardians = async () => {

    return await guardianRepository.findAll();

};

/**
 * Get Guardian By ID
 */
const getGuardianById = async (guardianId) => {

    const guardian = await guardianRepository.findById(guardianId);

    if (!guardian) {
        throw new AppError("Guardian not found.", 404);
    }

    return guardian;

};

/**
 * Get Guardians By Player ID
 */
const getGuardiansByPlayerId = async (playerId) => {

    return await guardianRepository.findByPlayerId(playerId);

};

/**
 * Update Guardian
 */
const updateGuardian = async (guardianId, guardianData) => {

    await getGuardianById(guardianId);

    return await guardianRepository.update(
        guardianId,
        guardianData
    );

};

/**
 * Delete Guardian
 */
const deleteGuardian = async (guardianId) => {

    await getGuardianById(guardianId);

    return await guardianRepository.remove(guardianId);

};

module.exports = {
    createGuardian,
    getAllGuardians,
    getGuardianById,
    getGuardiansByPlayerId,
    updateGuardian,
    deleteGuardian
};