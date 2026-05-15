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

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

module.exports = {
  createReport,
  getAllReports,
};
