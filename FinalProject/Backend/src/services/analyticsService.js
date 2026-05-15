const { db } = require("../config/firebase");

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

async function getCardAnalytics(cardId, userId) {
  const ownerCheck = await ensureCardOwner(cardId, userId);

  if (ownerCheck.error) {
    return ownerCheck;
  }

  const messagesSnapshot = await db
    .collection("messages")
    .where("cardId", "==", cardId)
    .get();

  return {
    data: {
      views: 150,
      vcfDownloads: 45,
      messagesCount: messagesSnapshot.size,
    },
  };
}

async function getGlobalAnalytics() {
  const usersSnapshot = await db.collection("users").get();
  const cardsSnapshot = await db.collection("cards").get();
  const messagesSnapshot = await db.collection("messages").get();

  return {
    totalUsers: usersSnapshot.size,
    totalCards: cardsSnapshot.size,
    totalMessages: messagesSnapshot.size,
  };
}

module.exports = {
  getCardAnalytics,
  getGlobalAnalytics,
};
