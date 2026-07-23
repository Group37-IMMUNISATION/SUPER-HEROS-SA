const db = require("../../config/db");

/**
 * Get all guardians
 */
const findAll = async () => {

    const query = `
        SELECT *
        FROM guardians
        ORDER BY created_at DESC;
    `;

    const { rows } = await db.query(query);

    return rows;
};

/**
 * Get guardian by ID
 */
const findById = async (guardianId) => {

    const query = `
        SELECT *
        FROM guardians
        WHERE guardian_id = $1;
    `;

    const { rows } = await db.query(query, [guardianId]);

    return rows[0];
};

/**
 * Get guardians for a player
 */
const findByPlayerId = async (playerId) => {

    const query = `
        SELECT *
        FROM guardians
        WHERE player_id = $1
        ORDER BY guardian_id;
    `;

    const { rows } = await db.query(query, [playerId]);

    return rows;
};

/**
 * Create guardian
 */
const create = async (guardianData) => {

    const query = `
        INSERT INTO guardians (
            player_id,
            full_name,
            relationship,
            phone,
            whatsapp,
            email,
            occupation,
            national_id,
            address
        )
        VALUES (
            $1,$2,$3,$4,$5,$6,$7,$8,$9
        )
        RETURNING *;
    `;

    const values = [
        guardianData.player_id,
        guardianData.full_name,
        guardianData.relationship,
        guardianData.phone,
        guardianData.whatsapp,
        guardianData.email,
        guardianData.occupation,
        guardianData.national_id,
        guardianData.address
    ];

    const { rows } = await db.query(query, values);

    return rows[0];
};

/**
 * Update guardian
 */
const update = async (guardianId, guardianData) => {

    const query = `
        UPDATE guardians
        SET
            full_name = $2,
            relationship = $3,
            phone = $4,
            whatsapp = $5,
            email = $6,
            occupation = $7,
            national_id = $8,
            address = $9
        WHERE guardian_id = $1
        RETURNING *;
    `;

    const values = [
        guardianId,
        guardianData.full_name,
        guardianData.relationship,
        guardianData.phone,
        guardianData.whatsapp,
        guardianData.email,
        guardianData.occupation,
        guardianData.national_id,
        guardianData.address
    ];

    const { rows } = await db.query(query, values);

    return rows[0];
};

/**
 * Delete guardian
 */
const remove = async (guardianId) => {

    const query = `
        DELETE FROM guardians
        WHERE guardian_id = $1
        RETURNING *;
    `;

    const { rows } = await db.query(query, [guardianId]);

    return rows[0];
};

const copyFromApplication = async (
    applicationId,
    playerId,
    client = db
) => {

    const query = `
        INSERT INTO guardians (
            player_id,
            full_name,
            relationship,
            phone,
            whatsapp,
            email,
            occupation,
            national_id,
            address
        )
        SELECT
            $2,
            full_name,
            relationship,
            phone,
            whatsapp,
            email,
            occupation,
            national_id,
            address
        FROM application_guardians
        WHERE application_id = $1;
    `;

    await client.query(query, [
        applicationId,
        playerId
    ]);
};

module.exports = {
    findAll,
    findById,
    findByPlayerId,
    create,
    update,
    remove,
    copyFromApplication
};