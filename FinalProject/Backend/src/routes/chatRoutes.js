const express = require("express");
const chatController = require("../controllers/chatController");

const router = express.Router();

router.post("/cards/:cardId/chat", chatController.chatWithCard);

module.exports = router;
