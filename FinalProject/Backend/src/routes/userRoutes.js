const express = require("express");
const userController = require("../controllers/userController");
const { verifyToken, verifyAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Lấy thông tin cá nhân của người dùng hiện tại
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trả về thông tin user
 */
router.get("/me", verifyToken, userController.getMe);
/**
 * @swagger
 * /users/me:
 *   put:
 *     summary: Cập nhật thông tin cá nhân
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               displayName:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put("/me", verifyToken, userController.updateMe);
router.get("/", verifyToken, verifyAdmin, userController.getAllUsers);
router.put("/:id/status", verifyToken, verifyAdmin, userController.updateUserStatus);

module.exports = router;
