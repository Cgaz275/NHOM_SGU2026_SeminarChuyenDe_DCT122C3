const express = require("express");
const userController = require("../controllers/userController");
const { verifyToken, verifyAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/me", verifyToken, userController.getMe);
router.put("/me", verifyToken, userController.updateMe);
router.get("/", verifyToken, verifyAdmin, userController.getAllUsers);
router.put("/:id/status", verifyToken, verifyAdmin, userController.updateUserStatus);

module.exports = router;
