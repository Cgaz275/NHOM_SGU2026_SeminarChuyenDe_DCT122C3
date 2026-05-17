const express = require("express");
const chatController = require("../controllers/chatController");
const { chatLimiter } = require("../middlewares/rateLimiter");

const router = express.Router();

/**
 * @swagger
 * /chat/cards/{cardId}/chat:
 *   post:
 *     summary: Chat với AI của thẻ
 *     tags: [Chat]
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
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Trả về câu trả lời từ AI
 */
router.post("/cards/:cardId/chat", chatLimiter, chatController.chatWithCard);

module.exports = router;
