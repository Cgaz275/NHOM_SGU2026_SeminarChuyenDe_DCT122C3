const { db } = require("../config/firebase");

async function getProfile(userId) {
  const userRef = db.collection("users").doc(userId);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    return null;
  }

  return { id: snapshot.id, ...snapshot.data() };
}

async function updateProfile(userId, payload = {}) {
  const userRef = db.collection("users").doc(userId);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    return null;
  }

  const allowedFields = ["fullName", "phone", "avatarUrl", "kycStatus"];
  const updates = {};

  for (const field of allowedFields) {
    if (payload[field] !== undefined) {
      updates[field] = payload[field];
    }
  }

  if (Object.keys(updates).length === 0) {
    return { id: snapshot.id, ...snapshot.data() };
  }

  await userRef.update(updates);
  const updatedSnapshot = await userRef.get();

  return { id: updatedSnapshot.id, ...updatedSnapshot.data() };
}

module.exports = {
  getProfile,
  updateProfile,
};
