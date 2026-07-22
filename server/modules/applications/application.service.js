const applicationRepository = require("./application.repository");
const AppError = require("../../utils/AppError");

/**
 * Generate a unique application number
 * Example: SHUSA-20260722-4831
 */
const generateApplicationNumber = () => {

    const date = new Date();

    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    const random = Math.floor(1000 + Math.random() * 9000);

    return `SHUSA-${year}${month}${day}-${random}`;

};

/**
 * Create application
 */
const createApplication = async (applicationData) => {

    let applicationNumber;

    let exists = true;

    // Ensure generated application number is unique
    while (exists) {

        applicationNumber = generateApplicationNumber();

        exists = await applicationRepository.existsByApplicationNumber(
            applicationNumber
        );

    }

    applicationData.application_number = applicationNumber;

    const application =
        await applicationRepository.create(applicationData);

    return application;

};

/**
 * Get all applications
 */
const getAllApplications = async () => {

    return await applicationRepository.findAll();

};

/**
 * Get application by ID
 */
const getApplicationById = async (applicationId) => {

    const application =
        await applicationRepository.findById(applicationId);

    if (!application) {

        throw new AppError(
            "Application not found.",
            404
        );

    }

    return application;

};

/**
 * Review application
 */
const reviewApplication = async (
    applicationId,
    status,
    reviewedBy,
    remarks
) => {

    const application =
        await applicationRepository.findById(applicationId);

    if (!application) {

        throw new AppError(
            "Application not found.",
            404
        );

    }

    if (application.status !== "Pending") {

        throw new AppError(
            "Only pending applications can be reviewed.",
            400
        );

    }

    return await applicationRepository.updateStatus(
        applicationId,
        status,
        reviewedBy,
        remarks
    );

};

module.exports = {
    createApplication,
    getAllApplications,
    getApplicationById,
    reviewApplication
};