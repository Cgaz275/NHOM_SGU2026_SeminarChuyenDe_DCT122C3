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

async function getAllUsers() {
  const snapshot = await db.collection("users").orderBy("createdAt", "desc").get();

  const users = await Promise.all(snapshot.docs.map(async (doc) => {
    const userData = { id: doc.id, ...doc.data() };
    
    // Tìm thẻ của user này để lấy tên hiển thị ưu tiên
    const cardSnapshot = await db.collection("cards").where("userId", "==", doc.id).limit(1).get();
    
    if (!cardSnapshot.empty) {
      const cardData = cardSnapshot.docs[0].data();
      // Ưu tiên lấy fullName từ thẻ, nếu không có mới dùng fullName từ user
      userData.fullName = cardData.fullName || cardData.title || userData.fullName;
    }
    
    return userData;
  }));

  return users;
}


async function updateUserStatus(userId, status) {
  const userRef = db.collection("users").doc(userId);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    return { error: "not-found" };
  }

  await userRef.update({ status });
  const updatedSnapshot = await userRef.get();

  return { id: updatedSnapshot.id, ...updatedSnapshot.data() };
}

module.exports = {
  getProfile,
  updateProfile,
  getAllUsers,
  updateUserStatus,
};
