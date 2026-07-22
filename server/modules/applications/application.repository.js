const db = require("../../config/db");

/**
 * Create a new player application
 */
const create = async (applicationData) => {

    const query = `
        INSERT INTO player_applications (
            application_number,
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
            emergency_contact_name,
            emergency_contact_phone
        )
        VALUES (
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16
        )
        RETURNING *;
    `;

    const values = [
        applicationData.application_number,
        applicationData.first_name,
        applicationData.middle_name,
        applicationData.last_name,
        applicationData.gender,
        applicationData.date_of_birth,
        applicationData.nationality,
        applicationData.preferred_position,
        applicationData.preferred_foot,
        applicationData.school_name,
        applicationData.class_level,
        applicationData.residential_address,
        applicationData.medical_conditions,
        applicationData.allergies,
        applicationData.emergency_contact_name,
        applicationData.emergency_contact_phone
    ];

    const { rows } = await db.query(query, values);

    return rows[0];
};

/**
 * Get all applications
 */
const findAll = async () => {

    const query = `
        SELECT *
        FROM player_applications
        ORDER BY submitted_at DESC;
    `;

    const { rows } = await db.query(query);

    return rows;
};

/**
 * Get application by ID
 */
const findById = async (applicationId) => {

    const application =
        await applicationRepository.findById(applicationId);

    if (!application) {
        throw new AppError("Application not found.", 404);
    }

    const guardians =
        await applicationRepository.findGuardiansByApplicationId(applicationId);

    const documents =
        await applicationRepository.findDocumentsByApplicationId(applicationId);

    return {
        application,
        guardians,
        documents
    };

};

/**
 * Check if application number exists
 */
const existsByApplicationNumber = async (applicationNumber) => {

    const query = `
        SELECT application_id
        FROM player_applications
        WHERE application_number = $1;
    `;

    const { rows } = await db.query(query, [applicationNumber]);

    return rows[0];
};

/**
 * Update application review
 */
const updateStatus = async (
    applicationId,
    status,
    reviewedBy,
    remarks
) => {

    const query = `
        UPDATE player_applications
        SET
            status = $2,
            reviewed_by = $3,
            reviewed_at = CURRENT_TIMESTAMP,
            remarks = $4
        WHERE application_id = $1
        RETURNING *;
    `;

    const values = [
        applicationId,
        status,
        reviewedBy,
        remarks
    ];

    const { rows } = await db.query(query, values);

    return rows[0];
};

const findGuardiansByApplicationId = async (applicationId) => {

    const query = `
        SELECT *
        FROM application_guardians
        WHERE application_id = $1
        ORDER BY guardian_id;
    `;

    const { rows } = await db.query(query, [applicationId]);

    return rows;

};

const findDocumentsByApplicationId = async (applicationId) => {

    const query = `
        SELECT *
        FROM application_documents
        WHERE application_id = $1
        ORDER BY document_id;
    `;

    const { rows } = await db.query(query, [applicationId]);

    return rows;

};



module.exports = {
    create,
    findAll,
    findById,
    existsByApplicationNumber,
    updateStatus,
    findGuardiansByApplicationId,
    findDocumentsByApplicationId
};