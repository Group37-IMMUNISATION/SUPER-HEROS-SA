const applicationService = require("./application.service");
const asyncHandler = require("../../utils/asyncHandler");
const { successResponse } = require("../../utils/response");

/**
 * Submit application
 */
const createApplication = asyncHandler(async (req, res) => {

    const application = await applicationService.createApplication(req.body);

    return successResponse(
        res,
        "Application submitted successfully.",
        application,
        201
    );

});

/**
 * Get all applications
 */
const getAllApplications = asyncHandler(async (req, res) => {

    const applications =
        await applicationService.getAllApplications();

    return successResponse(
        res,
        "Applications retrieved successfully.",
        applications
    );

});

/**
 * Get application by ID
 */
const getApplicationById = asyncHandler(async (req, res) => {

    const application =
        await applicationService.getApplicationById(req.params.id);

    return successResponse(
        res,
        "Application retrieved successfully.",
        application
    );

});

/**
 * Review application
 */
const reviewApplication = asyncHandler(async (req, res) => {

    const application =
        await applicationService.reviewApplication(
            req.params.id,
            req.body.status,
            req.user.userId,
            req.body.remarks
        );

    return successResponse(
        res,
        "Application reviewed successfully.",
        application
    );

});

module.exports = {
    createApplication,
    getAllApplications,
    getApplicationById,
    reviewApplication
};