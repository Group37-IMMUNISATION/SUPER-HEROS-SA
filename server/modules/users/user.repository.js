const db = require("../../config/db");


//CREATE USER
const createUser = async (userData) => {

    const query = `
        INSERT INTO users
        (
            role_id,
            full_name,
            email,
            password,
            phone,
            profile_photo
        )
        VALUES
        (
            $1,$2,$3,$4,$5,$6
        )
        RETURNING
            user_id,
            full_name,
            email,
            phone,
            profile_photo,
            role_id,
            is_active,
            created_at;
    `;

    const values = [
        userData.roleId,
        userData.fullName,
        userData.email,
        userData.password,
        userData.phone,
        userData.profilePhoto
    ];

    const { rows } = await db.query(query, values);

    return rows[0];
};

//FIND USER BY EMAIL
const findByEmail = async (email) => {

    const query = `
        SELECT
            u.user_id,
            u.role_id,
            u.full_name,
            u.email,
            u.password,
            u.phone,
            u.profile_photo,
            u.is_active,
            u.last_login,
            u.created_at,
            u.updated_at,
            r.role_name
        FROM users u
        INNER JOIN roles r
            ON u.role_id = r.role_id
        WHERE u.email = $1
        LIMIT 1;
    `;

    const { rows } = await db.query(query, [email]);

    return rows[0];
};

//FIND USER BY ID
const findById = async (id) => {

    const query = `
        SELECT
            u.user_id,
            u.role_id,
            u.full_name,
            u.email,
            u.phone,
            u.profile_photo,
            u.is_active,
            u.last_login,
            u.created_at,
            u.updated_at,
            r.role_name
        FROM users u
        INNER JOIN roles r
            ON u.role_id = r.role_id
        WHERE u.user_id = $1
        LIMIT 1;
    `;

    const { rows } = await db.query(query, [id]);

    return rows[0];
};

//FIND ALL USERS
const findAll = async () => {

    const query = `
        SELECT
            u.user_id,
            u.full_name,
            u.email,
            u.phone,
            u.profile_photo,
            u.is_active,
            u.last_login,
            u.created_at,
            r.role_name
        FROM users u
        INNER JOIN roles r
            ON u.role_id = r.role_id
        ORDER BY u.created_at DESC;
    `;

    const { rows } = await db.query(query);

    return rows;
};

//UPDATE USER
const updateUser = async (id, userData) => {

    const fields = [];
    const values = [];
    let index = 1;

    if (userData.roleId !== undefined) {
        fields.push(`role_id = $${index++}`);
        values.push(userData.roleId);
    }

    if (userData.fullName !== undefined) {
        fields.push(`full_name = $${index++}`);
        values.push(userData.fullName);
    }

    if (userData.email !== undefined) {
        fields.push(`email = $${index++}`);
        values.push(userData.email);
    }

    if (userData.password !== undefined) {
        fields.push(`password = $${index++}`);
        values.push(userData.password);
    }

    if (userData.phone !== undefined) {
        fields.push(`phone = $${index++}`);
        values.push(userData.phone);
    }

    if (userData.profilePhoto !== undefined) {
        fields.push(`profile_photo = $${index++}`);
        values.push(userData.profilePhoto);
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);

    values.push(id);

    const query = `
        UPDATE users
        SET ${fields.join(", ")}
        WHERE user_id = $${index}
        RETURNING
            user_id,
            role_id,
            full_name,
            email,
            phone,
            profile_photo,
            is_active,
            created_at,
            updated_at;
    `;

    const { rows } = await db.query(query, values);

    return rows[0];

};

//DELETE USER
const deleteUser = async (id) => {

    const query = `
        UPDATE users
        SET
            is_active = FALSE,
            updated_at = CURRENT_TIMESTAMP
        WHERE user_id = $1
        RETURNING
            user_id,
            full_name,
            email,
            is_active;
    `;

    const { rows } = await db.query(query, [id]);

    return rows[0];
};

module.exports = {
    createUser,
    findByEmail,
    findById,
    findAll,
    updateUser,
    deleteUser
};