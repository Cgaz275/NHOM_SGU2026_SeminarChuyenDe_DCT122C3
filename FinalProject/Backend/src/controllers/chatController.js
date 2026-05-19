const aiService = require("../services/aiService");

async function chatWithCard(req, res) {
  try {
    if (!req.body || !req.body.message) {
      return res.status(400).json({
        status: false,
        data: null,
        message: "Vui lòng nhập nội dung tin nhắn",
      });
    }

    const { reply, conversationId } = await aiService.processChat(
      req.params.cardId,
      req.body.message,
      req.body.conversationId
    );

    return res.status(200).json({
      status: true,
      data: { reply, conversationId },
      message: "Gửi tin nhắn thành công",
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
      status: false,
      data: null,
      message: error.message || "Xử lý tin nhắn thất bại",
    });
  }
}

module.exports = {
  chatWithCard,
};
