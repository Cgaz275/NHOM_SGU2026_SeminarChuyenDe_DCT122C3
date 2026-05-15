const express = require("express");
const messageController = require("../controllers/messageController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/:cardId/messages", messageController.leaveMessage);
router.get("/:cardId/messages", verifyToken, messageController.getMessages);
router.put(
  "/:cardId/messages/:messageId/read",
  verifyToken,
  messageController.markAsRead
);

module.exports = router;
