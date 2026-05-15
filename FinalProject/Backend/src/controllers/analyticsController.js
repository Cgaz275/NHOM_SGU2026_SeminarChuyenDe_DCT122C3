const analyticsService = require("../services/analyticsService");

async function getCardAnalytics(req, res) {
  try {
    const result = await analyticsService.getCardAnalytics(
      req.params.cardId,
      req.user.uid
    );

    if (result && result.error === "not-found") {
      return res.status(404).json({
        status: false,
        data: null,
        message: "Không tìm thấy thẻ",
      });
    }

    if (result && result.error === "forbidden") {
      return res.status(403).json({
        status: false,
        data: null,
        message: "Bạn không có quyền xem thống kê của thẻ này",
      });
    }

    return res.status(200).json({
      status: true,
      data: result.data,
      message: "Lấy thống kê thẻ thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      data: null,
      message: "Lấy thống kê thẻ thất bại",
    });
  }
}

async function getGlobalAnalytics(req, res) {
  try {
    const data = await analyticsService.getGlobalAnalytics();

    return res.status(200).json({
      status: true,
      data,
      message: "Lấy thống kê tổng thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      data: null,
      message: "Lấy thống kê tổng thất bại",
    });
  }
}

module.exports = {
  getCardAnalytics,
  getGlobalAnalytics,
};
