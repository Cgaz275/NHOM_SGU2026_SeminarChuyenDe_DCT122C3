const reportService = require("../services/reportService");

async function createReport(req, res) {
  try {
    if (!req.body || !req.body.cardId || !req.body.reason) {
      return res.status(400).json({
        status: false,
        data: null,
        message: "Vui lòng cung cấp đầy đủ thông tin báo cáo",
      });
    }

    const report = await reportService.createReport(req.body);

    return res.status(201).json({
      status: true,
      data: report,
      message: "Gửi báo cáo thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      data: null,
      message: "Gửi báo cáo thất bại",
    });
  }
}

async function getAllReports(req, res) {
  try {
    const reports = await reportService.getAllReports();

    return res.status(200).json({
      status: true,
      data: reports,
      message: "Lấy danh sách báo cáo thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      data: null,
      message: "Lấy danh sách báo cáo thất bại",
    });
  }
}

async function resolveReport(req, res) {
  try {
    const result = await reportService.resolveReport(req.params.reportId);

    if (result && result.error === "not-found") {
      return res.status(404).json({
        status: false,
        data: null,
        message: "Không tìm thấy báo cáo",
      });
    }

    return res.status(200).json({
      status: true,
      data: result,
      message: "Xử lý báo cáo thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      data: null,
      message: "Xử lý báo cáo thất bại",
    });
  }
}

module.exports = {
  createReport,
  getAllReports,
  resolveReport,
};
