const conversationService = require("../services/conversationService");

async function getConversations(req, res) {
  try {
    const conversations = await conversationService.getConversations(req.user.uid);
    
    return res.status(200).json({
      status: true,
      data: conversations,
      message: "Lấy danh sách hội thoại thành công",
    });
  } catch (error) {
    console.error("Lỗi trong getConversations:", error);
    return res.status(500).json({
      status: false,
      data: null,
      message: "Lấy danh sách hội thoại thất bại",
    });
  }
}

async function sendOwnerMessage(req, res) {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        status: false,
        data: null,
        message: "Nội dung tin nhắn không được để trống",
      });
    }

    const result = await conversationService.sendOwnerMessage(id, content);

    if (!result.success) {
      return res.status(400).json({
        status: false,
        data: null,
        message: result.message,
      });
    }

    return res.status(200).json({
      status: true,
      data: result,
      message: "Gửi tin nhắn thành công",
    });
  } catch (error) {
    console.error("Lỗi trong sendOwnerMessage:", error);
    return res.status(500).json({
      status: false,
      data: null,
      message: "Gửi tin nhắn thất bại",
    });
  }
}

async function toggleHumanTakeover(req, res) {
  try {
    const { id } = req.params;
    const { enabled } = req.body;

    if (enabled === undefined) {
      return res.status(400).json({
        status: false,
        data: null,
        message: "Vui lòng cung cấp trạng thái enabled",
      });
    }

    const result = await conversationService.toggleHumanTakeover(id, enabled);

    if (!result.success) {
      return res.status(400).json({
        status: false,
        data: null,
        message: result.message,
      });
    }

    return res.status(200).json({
      status: true,
      data: null,
      message: "Cập nhật trạng thái tiếp quản thành công",
    });
  } catch (error) {
    console.error("Lỗi trong toggleHumanTakeover:", error);
    return res.status(500).json({
      status: false,
      data: null,
      message: "Cập nhật trạng thái tiếp quản thất bại",
    });
  }
}

async function markConversationRead(req, res) {
  try {
    const { id } = req.params;
    const { read } = req.body;

    await conversationService.markConversationRead(id, read);

    return res.status(200).json({
      status: true,
      data: null,
      message: "Cập nhật trạng thái đọc thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      data: null,
      message: "Cập nhật trạng thái đọc thất bại",
    });
  }
}

async function archiveConversation(req, res) {
  try {
    const { id } = req.params;
    await conversationService.archiveConversation(id);

    return res.status(200).json({
      status: true,
      data: null,
      message: "Lưu trữ hội thoại thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      data: null,
      message: "Lưu trữ hội thoại thất bại",
    });
  }
}

async function restoreConversation(req, res) {
  try {
    const { id } = req.params;
    await conversationService.restoreConversation(id);

    return res.status(200).json({
      status: true,
      data: null,
      message: "Khôi phục hội thoại thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      data: null,
      message: "Khôi phục hội thoại thất bại",
    });
  }
}

async function deleteConversation(req, res) {
  try {
    const { id } = req.params;
    await conversationService.deleteConversation(id);

    return res.status(200).json({
      status: true,
      data: null,
      message: "Xóa hội thoại thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      data: null,
      message: "Xóa hội thoại thất bại",
    });
  }
}

module.exports = {
  getConversations,
  sendOwnerMessage,
  toggleHumanTakeover,
  markConversationRead,
  archiveConversation,
  restoreConversation,
  deleteConversation,
};
