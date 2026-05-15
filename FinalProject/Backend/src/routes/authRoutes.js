const express = require("express");
const authController = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", verifyToken, authController.register);
router.post("/login", verifyToken, authController.login);
router.post("/forgot-password", verifyToken, authController.forgotPassword);

module.exports = router;
