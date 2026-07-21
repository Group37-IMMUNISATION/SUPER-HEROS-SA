const roleRepository = require("./role.repository");
const AppError = require("../../utils/AppError");

const getAllRoles = async () => {

    return await roleRepository.findAll();

};

const getRoleById = async (id) => {

    const role = await roleRepository.findById(id);

    if (!role) {
        throw new AppError("Role not found.", 404);
    }

    return role;

};

module.exports = {
    getAllRoles,
    getRoleById
};