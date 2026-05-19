const aiService = require("../services/aiService");
const { db } = require("../config/firebase");

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
      req.body.conversationId,
      req.body.guestName,
      req.body.guestContact,
      req.body.forceHumanTakeover
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

async function getChatHistory(req, res) {
  try {
    const { cardId } = req.params;
    const { guestContact } = req.query;

    if (!guestContact) {
      return res.status(400).json({
        status: false,
        data: null,
        message: "Thiếu thông tin khách",
      });
    }

    // Tìm cuộc trò chuyện có cardId + visitorEmail trùng khớp, lấy mới nhất
    const snapshot = await db.collection("conversations")
      .where("cardId", "==", cardId)
      .where("visitorEmail", "==", guestContact)
      .orderBy("createdAt", "desc")
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.status(200).json({
        status: true,
        data: null,
        message: "Không tìm thấy lịch sử chat",
      });
    }

    const convDoc = snapshot.docs[0];
    const conversationId = convDoc.id;

    // Lấy toàn bộ tin nhắn trong cuộc trò chuyện đó
    const messagesSnap = await db.collection("conversations")
      .doc(conversationId)
      .collection("messages")
      .orderBy("createdAt", "asc")
      .get();

    const messages = messagesSnap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        sender: data.sender,
        content: data.content,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : null,
      };
    });

    const convData = convDoc.data() || {};
    const mode = convData.mode || "ai_active";

    return res.status(200).json({
      status: true,
      data: { conversationId, messages, mode },
      message: "Lấy lịch sử chat thành công",
    });
  } catch (error) {
    console.error("[getChatHistory] Lỗi:", error);
    return res.status(500).json({
      status: false,
      data: null,
      message: "Lấy lịch sử thất bại",
    });
  }
}

module.exports = {
  chatWithCard,
  getChatHistory,
};
