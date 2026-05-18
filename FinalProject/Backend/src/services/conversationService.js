const { admin, db } = require("../config/firebase");
const cardService = require("./cardService");

async function getConversations(userId) {
  // Lấy danh sách card của user
  const cards = await cardService.getMyCards(userId);
  if (cards.length === 0) {
    return [];
  }

  const cardIds = cards.map((c) => c.id);

  // Lấy danh sách hội thoại thuộc các card trên
  const snapshot = await db
    .collection("conversations")
    .where("cardId", "in", cardIds)
    .get();

  const conversations = [];

  for (const doc of snapshot.docs) {
    const convData = doc.data();

    // Lấy tin nhắn của từng hội thoại
    const messagesSnapshot = await db
      .collection("conversations")
      .doc(doc.id)
      .collection("messages")
      .orderBy("createdAt", "asc")
      .get();

    const messages = messagesSnapshot.docs.map((mDoc) => {
      const mData = mDoc.data();
      return {
        id: mDoc.id,
        ...mData,
        createdAt: mData.createdAt ? (mData.createdAt.toDate ? mData.createdAt.toDate().toISOString() : mData.createdAt) : null,
      };
    });

    conversations.push({
      id: doc.id,
      ...convData,
      lastMessageAt: convData.lastMessageAt ? (convData.lastMessageAt.toDate ? convData.lastMessageAt.toDate().toISOString() : convData.lastMessageAt) : null,
      messages,
    });
  }

  // Sắp xếp theo thời gian tin nhắn mới nhất giảm dần
  return conversations.sort((a, b) => {
    const timeA = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0;
    const timeB = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0;
    return timeB - timeA;
  });
}

async function sendOwnerMessage(conversationId, content) {
  const convRef = db.collection("conversations").doc(conversationId);
  const convSnap = await convRef.get();

  if (!convSnap.exists) {
    return { success: false, message: "Không tìm thấy hội thoại" };
  }

  const now = admin.firestore.FieldValue.serverTimestamp();

  // Thêm tin nhắn mới vào subcollection
  const messageData = {
    sender: "owner",
    content,
    type: "text",
    createdAt: now,
  };

  const msgRef = await convRef.collection("messages").add(messageData);

  // Cập nhật thông tin hội thoại
  await convRef.update({
    lastMessage: content,
    lastMessageAt: now,
    status: "read", // Đã trả lời thì coi như đã đọc
    isArchived: false, // Tự động mở lưu trữ nếu có tin nhắn mới
  });

  return { success: true, messageId: msgRef.id };
}

async function toggleHumanTakeover(conversationId, enabled) {
  const convRef = db.collection("conversations").doc(conversationId);
  const convSnap = await convRef.get();

  if (!convSnap.exists) {
    return { success: false, message: "Không tìm thấy hội thoại" };
  }

  const now = admin.firestore.FieldValue.serverTimestamp();
  const mode = enabled ? "human_takeover" : "ai_active";
  const systemContent = enabled
    ? "Chủ thẻ đã tiếp quản hội thoại. AI tạm dừng."
    : "Chủ thẻ đã trả lại hội thoại cho AI.";

  // Cập nhật mode
  await convRef.update({ mode });

  // Thêm tin nhắn hệ thống
  await convRef.collection("messages").add({
    sender: "system",
    content: systemContent,
    type: "system",
    isSystemEvent: true,
    createdAt: now,
  });

  return { success: true };
}

async function markConversationRead(conversationId, read) {
  const convRef = db.collection("conversations").doc(conversationId);
  await convRef.update({
    status: read ? "read" : "unread",
    unreadCount: read ? 0 : 1,
  });
  return { success: true };
}

async function archiveConversation(conversationId) {
  const convRef = db.collection("conversations").doc(conversationId);
  await convRef.update({
    isArchived: true,
    status: "archived",
  });
  return { success: true };
}

async function restoreConversation(conversationId) {
  const convRef = db.collection("conversations").doc(conversationId);
  await convRef.update({
    isArchived: false,
    status: "read",
  });
  return { success: true };
}

async function deleteConversation(conversationId) {
  // Trong Firestore, xóa document không tự động xóa subcollection.
  // Nhưng để đơn giản cho demo, ta chỉ cần xóa document hội thoại là đủ để FE không thấy nữa.
  // Hoặc cập nhật status thành 'deleted'.
  const convRef = db.collection("conversations").doc(conversationId);
  await convRef.update({
    status: "deleted",
  });
  return { success: true };
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
