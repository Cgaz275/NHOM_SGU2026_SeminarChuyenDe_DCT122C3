const express = require("express");
const chatController = require("../controllers/chatController");
const { chatLimiter } = require("../middlewares/rateLimiter");

const router = express.Router();

router.post("/cards/:cardId/chat", chatLimiter, chatController.chatWithCard);

module.exports = router;
