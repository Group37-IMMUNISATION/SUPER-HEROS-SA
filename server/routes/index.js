const express = require("express");

const router = express.Router();

const authRoutes = require("../modules/auth");
const userRoutes = require("../modules/users");
const roleRoutes = require("../modules/roles");
const applicationRoutes = require("../modules/applications");
const playerRoutes = require("../modules/players");
const guardianRoutes = require("../modules/guardians");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/applications", applicationRoutes);
router.use("/players", playerRoutes);
router.use("/guardians", guardianRoutes);

router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to SHUSA Academy API",
        version: "1.0.0"
    });
});

router.get("/health", (req, res) => {
    res.json({
        success: true,
        status: "Healthy",
        timestamp: new Date()
    });
});

module.exports = router;