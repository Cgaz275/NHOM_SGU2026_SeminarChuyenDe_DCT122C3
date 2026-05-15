const express = require("express");
const analyticsController = require("../controllers/analyticsController");
const { verifyToken, verifyAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/cards/:cardId", verifyToken, analyticsController.getCardAnalytics);
router.get("/global", verifyToken, verifyAdmin, analyticsController.getGlobalAnalytics);

module.exports = router;
