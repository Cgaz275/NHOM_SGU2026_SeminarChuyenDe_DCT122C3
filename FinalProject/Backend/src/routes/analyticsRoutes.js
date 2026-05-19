const express = require("express");
const analyticsController = require("../controllers/analyticsController");
const { verifyToken, verifyAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /analytics/cards/{cardId}:
 *   get:
 *     summary: Thống kê dữ liệu của một thẻ cụ thể
 *     tags: [Analytics]
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
 *         description: Dữ liệu thống kê
 */
router.get("/cards/:cardId", verifyToken, analyticsController.getCardAnalytics);
router.get("/global", verifyToken, verifyAdmin, analyticsController.getGlobalAnalytics);

module.exports = router;
