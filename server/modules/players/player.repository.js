const db = require("../../config/db");

/**
 * Create a new player
 */
const create = async (playerData) => {

    const query = `
        INSERT INTO players (
            application_id,
            registration_number,
            team_id,
            first_name,
            middle_name,
            last_name,
            gender,
            date_of_birth,
            nationality,
            preferred_position,
            preferred_foot,
            school_name,
            class_level,
            residential_address,
            medical_conditions,
            allergies,
            player_photo,
            status
        )
        VALUES (
            $1,$2,$3,$4,$5,$6,$7,$8,$9,
            $10,$11,$12,$13,$14,$15,$16,$17,$18
        )
        RETURNING *;
    `;

    const values = [
        playerData.application_id,
        playerData.registration_number,
        playerData.team_id,
        playerData.first_name,
        playerData.middle_name,
        playerData.last_name,
        playerData.gender,
        playerData.date_of_birth,
        playerData.nationality,
        playerData.preferred_position,
        playerData.preferred_foot,
        playerData.school_name,
        playerData.class_level,
        playerData.residential_address,
        playerData.medical_conditions,
        playerData.allergies,
        playerData.player_photo,
        playerData.status || "Active"
    ];

    const { rows } = await db.query(query, values);

    return rows[0];
};

const findAll = async () => {

    const query = `
        SELECT *
        FROM players
        ORDER BY created_at DESC;
    `;

    const { rows } = await db.query(query);

    return rows;
};

const findById = async (playerId) => {

    const query = `
        SELECT *
        FROM players
        WHERE player_id = $1;
    `;

    const { rows } = await db.query(query, [playerId]);

    return rows[0];
};

const findByRegistrationNumber = async (registrationNumber) => {

    const query = `
        SELECT *
        FROM players
        WHERE registration_number = $1;
    `;

    const { rows } = await db.query(query, [registrationNumber]);

    return rows[0];
};

const update = async (playerId, playerData) => {

    const query = `
        UPDATE players
        SET
            team_id = $2,
            first_name = $3,
            middle_name = $4,
            last_name = $5,
            gender = $6,
            date_of_birth = $7,
            nationality = $8,
            preferred_position = $9,
            preferred_foot = $10,
            school_name = $11,
            class_level = $12,
            residential_address = $13,
            medical_conditions = $14,
            allergies = $15,
            player_photo = $16,
            updated_at = CURRENT_TIMESTAMP
        WHERE player_id = $1
        RETURNING *;
    `;

    const values = [
        playerId,
        playerData.team_id,
        playerData.first_name,
        playerData.middle_name,
        playerData.last_name,
        playerData.gender,
        playerData.date_of_birth,
        playerData.nationality,
        playerData.preferred_position,
        playerData.preferred_foot,
        playerData.school_name,
        playerData.class_level,
        playerData.residential_address,
        playerData.medical_conditions,
        playerData.allergies,
        playerData.player_photo
    ];

    const { rows } = await db.query(query, values);

    return rows[0];
};

const updateStatus = async (playerId, status) => {

    const query = `
        UPDATE players
        SET
            status = $2,
            updated_at = CURRENT_TIMESTAMP
        WHERE player_id = $1
        RETURNING *;
    `;

    const { rows } = await db.query(query, [playerId, status]);

    return rows[0];
};

const assignTeam = async (playerId, teamId) => {

    const query = `
        UPDATE players
        SET
            team_id = $2,
            updated_at = CURRENT_TIMESTAMP
        WHERE player_id = $1
        RETURNING *;
    `;

    const { rows } = await db.query(query, [playerId, teamId]);

    return rows[0];
};

module.exports = {
    create,
    findAll,
    findById,
    findByRegistrationNumber,
    update,
    updateStatus,
    assignTeam
};
