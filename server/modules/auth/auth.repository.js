const pool = require("../../config/db");

/**
 * Find user by email
 */
const findUserByEmail = async (email) => {
    const query = `
        SELECT
            u.user_id,
            u.full_name,
            u.email,
            u.password,
            u.is_active,
            u.role_id,
            r.role_name
        FROM users u
        INNER JOIN roles r
            ON u.role_id = r.role_id
        WHERE LOWER(u.email) = LOWER($1)
        LIMIT 1;
    `;

    const { rows } = await pool.query(query, [email]);

    return rows[0] || null;
};

module.exports = {
    findUserByEmail
};