const db = require("../../config/db");

const findAll = async () => {

    const query = `
        SELECT
            role_id,
            role_name
        FROM roles
        ORDER BY role_id;
    `;

    const { rows } = await db.query(query);

    return rows;

};

const findById = async (id) => {

    const query = `
        SELECT
            role_id,
            role_name
        FROM roles
        WHERE role_id = $1;
    `;

    const { rows } = await db.query(query, [id]);

    return rows[0];

};

module.exports = {
    findAll,
    findById
};