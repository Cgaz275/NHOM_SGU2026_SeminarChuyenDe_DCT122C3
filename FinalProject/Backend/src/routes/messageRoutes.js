const express = require("express");
const messageController = require("../controllers/messageController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /cards/{cardId}/messages:
 *   post:
 *     summary: Để lại lời nhắn cho chủ thẻ
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: cardId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Đã gửi lời nhắn
 */
router.post("/:cardId/messages", messageController.leaveMessage);

/**
 * @swagger
 * /cards/{cardId}/messages:
 *   get:
 *     summary: Lấy danh sách lời nhắn (Chủ thẻ)
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cardId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách lời nhắn
 */
router.get("/:cardId/messages", verifyToken, messageController.getMessages);

/**
 * @swagger
 * /cards/{cardId}/messages/{messageId}/read:
 *   put:
 *     summary: Đánh dấu lời nhắn đã đọc
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cardId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Đã đánh dấu đọc
 */
router.put(
  "/:cardId/messages/:messageId/read",
  verifyToken,
  messageController.markAsRead
);

module.exports = router;
