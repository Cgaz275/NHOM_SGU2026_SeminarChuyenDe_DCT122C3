const express = require("express");
const reportController = require("../controllers/reportController");
const { verifyToken, verifyAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", reportController.createReport);
router.get("/", verifyToken, verifyAdmin, reportController.getAllReports);
router.put(
	"/:reportId/resolve",
	verifyToken,
	verifyAdmin,
	reportController.resolveReport
);

module.exports = router;
