const { admin, db } = require("../config/firebase");

async function ensureCardOwner(cardId, userId) {
  const cardRef = db.collection("cards").doc(cardId);
  const snapshot = await cardRef.get();

  if (!snapshot.exists) {
    return { error: "not-found" };
  }

  const card = snapshot.data();

  if (card.userId !== userId) {
    return { error: "forbidden" };
  }

  return { card };
}

async function leaveMessage(cardId, data = {}) {
  const payload = {
    cardId,
    senderName: data.senderName || null,
    senderEmail: data.senderEmail || null,
    senderPhone: data.senderPhone || null,
    content: data.content || null,
    isRead: false,
    isDeleted: false,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  const messageRef = await db.collection("messages").add(payload);
  const snapshot = await messageRef.get();

  return { id: snapshot.id, ...snapshot.data() };
}

async function getMessages(cardId, userId) {
  const ownerCheck = await ensureCardOwner(cardId, userId);

  if (ownerCheck.error) {
    return ownerCheck;
  }

  const snapshot = await db
    .collection("messages")
    .where("cardId", "==", cardId)
    .orderBy("createdAt", "desc")
    .get();

  const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const visibleItems = items.filter((item) => item.isDeleted !== true);

  return { data: visibleItems };
}

async function markAsRead(messageId, cardId, userId) {
  const ownerCheck = await ensureCardOwner(cardId, userId);

  if (ownerCheck.error) {
    return ownerCheck;
  }

  const messageRef = db.collection("messages").doc(messageId);
  const snapshot = await messageRef.get();

  if (!snapshot.exists) {
    return { error: "message-not-found" };
  }

  const message = snapshot.data();

  if (message.cardId !== cardId) {
    return { error: "not-found" };
  }

  await messageRef.update({ isRead: true });
  const updatedSnapshot = await messageRef.get();

  return { id: updatedSnapshot.id, ...updatedSnapshot.data() };
}

async function markAsReadByMessageId(messageId, userId) {
  const messageRef = db.collection("messages").doc(messageId);
  const snapshot = await messageRef.get();

  if (!snapshot.exists) {
    return { error: "message-not-found" };
  }

  const message = snapshot.data();
  const ownerCheck = await ensureCardOwner(message.cardId, userId);

  if (ownerCheck.error) {
    return ownerCheck;
  }

  await messageRef.update({ isRead: true });
  const updatedSnapshot = await messageRef.get();

  return { id: updatedSnapshot.id, ...updatedSnapshot.data() };
}

async function deleteMessage(messageId, userId) {
  const messageRef = db.collection("messages").doc(messageId);
  const snapshot = await messageRef.get();

  if (!snapshot.exists) {
    return { error: "message-not-found" };
  }

  const message = snapshot.data();
  const ownerCheck = await ensureCardOwner(message.cardId, userId);

  if (ownerCheck.error) {
    return ownerCheck;
  }

  await messageRef.update({ isDeleted: true });
  const updatedSnapshot = await messageRef.get();

  return { id: updatedSnapshot.id, ...updatedSnapshot.data() };
}

module.exports = {
  leaveMessage,
  getMessages,
  markAsRead,
  markAsReadByMessageId,
  deleteMessage,
};
