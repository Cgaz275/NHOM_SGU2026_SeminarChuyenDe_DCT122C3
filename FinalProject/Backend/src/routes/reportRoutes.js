const express = require("express");
const reportController = require("../controllers/reportController");
const { verifyToken, verifyAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /reports/:
 *   post:
 *     summary: Gửi báo cáo thẻ vi phạm
 *     tags: [Reports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cardId:
 *                 type: string
 *               reason:
 *                 type: string
 *     responses:
 *       201:
 *         description: Báo cáo thành công
 */
router.post("/", reportController.createReport);

/**
 * @swagger
 * /reports/:
 *   get:
 *     summary: Lấy danh sách báo cáo (Dành cho Admin)
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách báo cáo
 */
router.get("/", verifyToken, verifyAdmin, reportController.getAllReports);
router.put(
	"/:reportId/resolve",
	verifyToken,
	verifyAdmin,
	reportController.resolveReport
);

module.exports = router;
