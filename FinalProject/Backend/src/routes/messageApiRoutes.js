const express = require("express");
const messageController = require("../controllers/messageController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/cards/:cardId", messageController.leaveMessage);
router.get("/cards/:cardId", verifyToken, messageController.getMessages);
router.put("/:messageId/read", verifyToken, messageController.markAsReadByMessageId);
router.delete("/:messageId", verifyToken, messageController.deleteMessage);

module.exports = router;
