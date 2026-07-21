const bcrypt = require("bcrypt");
const AppError = require("../../utils/AppError");
const userRepository = require("./user.repository");

const createUser = async (userData) => {

    const existingUser = await userRepository.findByEmail(
        userData.email
    );

    if (existingUser) {
        throw new AppError(
            "Email address already exists.",
            409
        );
    }

    const hashedPassword = await bcrypt.hash(
        userData.password,
        10
    );

    userData.password = hashedPassword;

    return await userRepository.createUser(userData);

};


const getAllUsers = async () => {

    return await userRepository.findAll();

};


const getUserById = async (id) => {

    const user = await userRepository.findById(id);

    if (!user) {

        throw new AppError(
            "User not found.",
            404
        );

    }

    return user;

};


const updateUser = async function updateUser(id, userData) {

    const existingUser = await userRepository.findById(id);

    if (!existingUser) {
        throw new AppError("User not found.", 404);
    }

    // Hash password if it is being updated
    if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
    }

    return await userRepository.updateUser(id, userData);

}


const deactivateUser = async (id) => {

    const user = await userRepository.findById(id);

    if (!user) {

        throw new AppError(
            "User not found.",
            404
        );

    }

    return await userRepository.deleteUser(id);

};


module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deactivateUser
};