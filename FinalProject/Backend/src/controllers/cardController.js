const cardService = require("../services/cardService");

async function createCard(req, res) {
  try {
    if (!req.body || !req.body.fullName) {
      return res.status(400).json({
        status: false,
        data: null,
        message: "Vui lòng nhập họ tên để tạo thẻ",
      });
    }

    const card = await cardService.createCard(req.user.uid, req.body);

    return res.status(201).json({
      status: true,
      data: card,
      message: "Tạo thẻ thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      data: null,
      message: "Tạo thẻ thất bại",
    });
  }
}

async function getCardBySlug(req, res) {
  try {
    const card = await cardService.getCardBySlug(req.params.slug);

    if (!card) {
      return res.status(404).json({
        status: false,
        data: null,
        message: "Không tìm thấy thẻ",
      });
    }

    return res.status(200).json({
      status: true,
      data: card,
      message: "Lấy thông tin thẻ thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      data: null,
      message: "Lấy thông tin thẻ thất bại",
    });
  }
}

async function getMyCards(req, res) {
  try {
    const cards = await cardService.getMyCards(req.user.uid);

    return res.status(200).json({
      status: true,
      data: cards,
      message: "Lấy danh sách thẻ thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      data: null,
      message: "Lấy danh sách thẻ thất bại",
    });
  }
}

async function updateCard(req, res) {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: false,
        data: null,
        message: "Vui lòng cung cấp dữ liệu cần cập nhật",
      });
    }

    const result = await cardService.updateCard(
      req.params.cardId,
      req.user.uid,
      req.body
    );

    if (result && result.error === "not-found") {
      return res.status(404).json({
        status: false,
        data: null,
        message: "Không tìm thấy thẻ",
      });
    }

    if (result && result.error === "forbidden") {
      return res.status(400).json({
        status: false,
        data: null,
        message: "Bạn không có quyền cập nhật thẻ này",
      });
    }

    return res.status(200).json({
      status: true,
      data: result,
      message: "Cập nhật thẻ thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      data: null,
      message: "Cập nhật thẻ thất bại",
    });
  }
}

module.exports = {
  createCard,
  getCardBySlug,
  getMyCards,
  updateCard,
};
