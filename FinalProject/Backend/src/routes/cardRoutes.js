const express = require("express");
const cardController = require("../controllers/cardController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, cardController.createCard);
router.get("/me", verifyToken, cardController.getMyCards);
router.put("/:cardId", verifyToken, cardController.updateCard);
router.delete("/:cardId", verifyToken, cardController.deleteCard);
router.put("/:cardId/ai-config", verifyToken, cardController.updateAiConfig);
router.put("/:cardId/takeover", verifyToken, cardController.toggleTakeover);
router.get("/:slug", cardController.getCardBySlug);

module.exports = router;
