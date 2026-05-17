const messageService = require("../services/messageService");

async function leaveMessage(req, res) {
  try {
    if (!req.body || !req.body.content) {
      return res.status(400).json({
        status: false,
        data: null,
        message: "Vui lòng nhập nội dung tin nhắn",
      });
    }

    const message = await messageService.leaveMessage(req.params.cardId, req.body);

    return res.status(201).json({
      status: true,
      data: message,
      message: "Gửi tin nhắn thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      data: null,
      message: "Gửi tin nhắn thất bại",
    });
  }
}

async function getMessages(req, res) {
  try {
    const result = await messageService.getMessages(req.params.cardId, req.user.uid);

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
        message: "Bạn không có quyền xem hộp thư của thẻ này",
      });
    }

    return res.status(200).json({
      status: true,
      data: result.data,
      message: "Lấy danh sách tin nhắn thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      data: null,
      message: "Lấy danh sách tin nhắn thất bại",
    });
  }
}

async function markAsRead(req, res) {
  try {
    const result = await messageService.markAsRead(
      req.params.messageId,
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

    if (result && result.error === "message-not-found") {
      return res.status(404).json({
        status: false,
        data: null,
        message: "Không tìm thấy tin nhắn",
      });
    }

    if (result && result.error === "forbidden") {
      return res.status(400).json({
        status: false,
        data: null,
        message: "Bạn không có quyền cập nhật tin nhắn này",
      });
    }

    return res.status(200).json({
      status: true,
      data: result,
      message: "Đánh dấu đã đọc thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      data: null,
      message: "Đánh dấu đã đọc thất bại",
    });
  }
}

async function markAsReadByMessageId(req, res) {
  try {
    const result = await messageService.markAsReadByMessageId(
      req.params.messageId,
      req.user.uid
    );

    if (result && result.error === "message-not-found") {
      return res.status(404).json({
        status: false,
        data: null,
        message: "Không tìm thấy tin nhắn",
      });
    }

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
        message: "Bạn không có quyền cập nhật tin nhắn này",
      });
    }

    return res.status(200).json({
      status: true,
      data: result,
      message: "Đánh dấu đã đọc thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      data: null,
      message: "Đánh dấu đã đọc thất bại",
    });
  }
}

async function deleteMessage(req, res) {
  try {
    const result = await messageService.deleteMessage(
      req.params.messageId,
      req.user.uid
    );

    if (result && result.error === "message-not-found") {
      return res.status(404).json({
        status: false,
        data: null,
        message: "Không tìm thấy tin nhắn",
      });
    }

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
        message: "Bạn không có quyền xóa tin nhắn này",
      });
    }

    return res.status(200).json({
      status: true,
      data: result,
      message: "Xóa tin nhắn thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      data: null,
      message: "Xóa tin nhắn thất bại",
    });
  }
}

module.exports = {
  leaveMessage,
  getMessages,
  markAsRead,
  markAsReadByMessageId,
  deleteMessage,
};
