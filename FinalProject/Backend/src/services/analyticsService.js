const { admin, db } = require("../config/firebase");

async function ensureCardExists(cardId) {
  const cardRef = db.collection("cards").doc(cardId);
  const snapshot = await cardRef.get();

  if (!snapshot.exists) {
    return false;
  }

  return true;
}

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

  const analyticsRef = db.collection("analytics_cards").doc(cardId);
  const analyticsSnapshot = await analyticsRef.get();
  const analyticsData = analyticsSnapshot.exists ? analyticsSnapshot.data() : null;

  return {
    data: {
      views: analyticsData && analyticsData.totalViews ? analyticsData.totalViews : 0,
      vcfDownloads:
        analyticsData && analyticsData.vcfDownloads ? analyticsData.vcfDownloads : 0,
      aiChatInteractions:
        analyticsData && analyticsData.aiChatInteractions
          ? analyticsData.aiChatInteractions
          : 0,
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

async function trackVcfDownload(cardId) {
  const cardExists = await ensureCardExists(cardId);

  if (!cardExists) {
    return { error: "not-found" };
  }

  const analyticsRef = db.collection("analytics_cards").doc(cardId);
  const snapshot = await analyticsRef.get();

  if (!snapshot.exists) {
    const payload = {
      totalViews: 0,
      vcfDownloads: 1,
      aiChatInteractions: 0,
      lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
    };

    await analyticsRef.set(payload);
    const createdSnapshot = await analyticsRef.get();

    return { id: createdSnapshot.id, ...createdSnapshot.data() };
  }

  await analyticsRef.update({
    vcfDownloads: admin.firestore.FieldValue.increment(1),
    lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
  });

  const updatedSnapshot = await analyticsRef.get();

  return { id: updatedSnapshot.id, ...updatedSnapshot.data() };
}

module.exports = {
  getCardAnalytics,
  getGlobalAnalytics,
  trackVcfDownload,
};
