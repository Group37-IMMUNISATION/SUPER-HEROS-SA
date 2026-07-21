const express = require("express");

const router = express.Router();

const authRoutes = require("../modules/auth");
const userRoutes = require("../modules/users");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

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