const express = require("express");
const cardController = require("../controllers/cardController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /cards/:
 *   post:
 *     summary: Tạo thẻ mới
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Tạo thẻ thành công
 */
router.post("/", verifyToken, cardController.createCard);

/**
 * @swagger
 * /cards/me:
 *   get:
 *     summary: Lấy danh sách thẻ của tôi
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách thẻ
 */
router.get("/me", verifyToken, cardController.getMyCards);

/**
 * @swagger
 * /cards/{cardId}:
 *   put:
 *     summary: Cập nhật thẻ
 *     tags: [Cards]
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
 *         description: Cập nhật thành công
 */
router.put("/:cardId", verifyToken, cardController.updateCard);
router.put("/:cardId/ai-config", verifyToken, cardController.updateAiConfig);

/**
 * @swagger
 * /cards/{cardId}/takeover:
 *   put:
 *     summary: Bật/tắt chế độ người thật trả lời (Takeover)
 *     tags: [Cards]
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
 *         description: Đã chuyển đổi chế độ Takeover
 */
router.put("/:cardId/takeover", verifyToken, cardController.toggleTakeover);

/**
 * @swagger
 * /cards/{slug}:
 *   get:
 *     summary: Xem thẻ theo đường dẫn tĩnh (Slug)
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lấy thông tin thẻ thành công
 */
router.get("/:slug", cardController.getCardBySlug);

module.exports = router;
