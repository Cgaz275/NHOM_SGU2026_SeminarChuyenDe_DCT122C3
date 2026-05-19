const express = require("express");
const conversationController = require("../controllers/conversationController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// Tất cả các route này đều cần xác thực (chủ thẻ)
router.use(verifyToken);

router.get("/", conversationController.getConversations);
router.post("/:id/messages", conversationController.sendOwnerMessage);
router.put("/:id/takeover", conversationController.toggleHumanTakeover);
router.put("/:id/read", conversationController.markConversationRead);
router.put("/:id/archive", conversationController.archiveConversation);
router.put("/:id/restore", conversationController.restoreConversation);
router.delete("/:id", conversationController.deleteConversation);

module.exports = router;
