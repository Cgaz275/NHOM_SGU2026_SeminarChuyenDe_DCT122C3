const express = require("express");
const userController = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/me", verifyToken, userController.getMe);
router.put("/me", verifyToken, userController.updateMe);

module.exports = router;
