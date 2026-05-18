const { admin, db } = require("../config/firebase");

async function createReport(data = {}) {
  const payload = {
    cardId: data.cardId || null,
    reason: data.reason || null,
    reporterEmail: data.reporterEmail || null,
    status: "pending",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  const reportRef = await db.collection("reports").add(payload);
  const snapshot = await reportRef.get();

  return { id: snapshot.id, ...snapshot.data() };
}

async function getAllReports() {
  const snapshot = await db
    .collection("reports")
    .orderBy("createdAt", "desc")
    .get();

  const reports = await Promise.all(snapshot.docs.map(async (doc) => {
    const reportData = { id: doc.id, ...doc.data() };
    
    if (reportData.cardId) {
      const cardSnapshot = await db.collection("cards").doc(reportData.cardId).get();
      if (cardSnapshot.exists) {
        const cardData = cardSnapshot.data();
        
        if (cardData.userId) {
          const userSnapshot = await db.collection("users").doc(cardData.userId).get();
          if (userSnapshot.exists) {
            const userData = userSnapshot.data();
            return {
              ...reportData,
              fullName: cardData.fullName || cardData.title || userData.fullName || "No Name",
              email: userData.email || "N/A"
            };

          }
        }
      }
    }
    
    return reportData;
  }));

  return reports;
}


async function resolveReport(reportId) {
  const reportRef = db.collection("reports").doc(reportId);
  const snapshot = await reportRef.get();

  if (!snapshot.exists) {
    return { error: "not-found" };
  }

  await reportRef.update({ status: "resolved" });
  const updatedSnapshot = await reportRef.get();

  return { id: updatedSnapshot.id, ...updatedSnapshot.data() };
}

module.exports = {
  createReport,
  getAllReports,
  resolveReport,
};
