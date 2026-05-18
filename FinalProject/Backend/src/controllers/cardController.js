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

async function updateAiConfig(req, res) {
  try {
    if (!req.body || (req.body.aiConfig === undefined && req.body.aiStatus === undefined)) {
      return res.status(400).json({
        status: false,
        data: null,
        message: "Vui lòng cung cấp cấu hình AI hoặc trạng thái AI để cập nhật",
      });
    }

    const result = await cardService.updateAiConfig(
      req.params.cardId,
      req.user.uid,
      {
        aiConfig: req.body.aiConfig,
        aiStatus: req.body.aiStatus,
      }
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
      message: "Cập nhật cấu hình AI thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      data: null,
      message: "Cập nhật cấu hình AI thất bại",
    });
  }
}

async function toggleTakeover(req, res) {
  try {
    if (!req.body || typeof req.body.isAiPaused !== "boolean") {
      return res.status(400).json({
        status: false,
        data: null,
        message: "Vui lòng cung cấp trạng thái tạm dừng AI hợp lệ",
      });
    }

    const result = await cardService.toggleTakeover(
      req.params.cardId,
      req.user.uid,
      req.body.isAiPaused
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
      message: "Cập nhật trạng thái tạm dừng AI thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      data: null,
      message: "Cập nhật trạng thái tạm dừng AI thất bại",
    });
  }
}

async function deleteCard(req, res) {
  try {
    const result = await cardService.deleteCard(req.params.cardId, req.user.uid);

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
        message: "Bạn không có quyền xóa thẻ này",
      });
    }

    return res.status(200).json({
      status: true,
      data: result,
      message: "Xóa thẻ thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      data: null,
      message: "Xóa thẻ thất bại",
    });
  }
}

async function deleteCard(req, res) {
}

async function redirectQr(req, res) {
  try {
    const card = await cardService.getCardById(req.params.cardId);

    if (!card || card.status === "deleted") {
      return res.status(404).send("Thẻ không tồn tại hoặc đã bị xóa.");
    }

    const frontendBaseUrl = process.env.FRONTEND_URL || "http://localhost:3000";

    return res.redirect(`${frontendBaseUrl}/u/${card.slug}`);
  } catch (error) {

    console.error("Lỗi trong redirectQr controller:", error);
    return res.status(500).send("Lỗi hệ thống khi xử lý điều hướng QR.");
  }
}

async function checkSlug(req, res) {
  try {
    const { slug } = req.query;
    if (!slug) {
      return res.status(400).json({
        status: false,
        data: null,
        message: "Vui lòng cung cấp slug cần kiểm tra",
      });
    }

    const isDuplicate = await cardService.checkSlugAvailability(slug, req.user.uid);

    return res.status(200).json({
      status: true,
      data: isDuplicate, // true nếu trùng, false nếu không trùng
      message: "Kiểm tra slug hoàn tất",
    });
  } catch (error) {
    console.error("Lỗi trong checkSlug:", error);
    return res.status(500).json({
      status: false,
      data: null,
      message: "Kiểm tra slug thất bại",
    });
  }
}

module.exports = {
  createCard,
  getCardBySlug,
  getMyCards,
  updateCard,
  deleteCard,
  updateAiConfig,
  toggleTakeover,
  redirectQr,
  checkSlug,
};

