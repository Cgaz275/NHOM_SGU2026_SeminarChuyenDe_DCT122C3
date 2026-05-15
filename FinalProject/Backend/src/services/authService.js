const { admin, db } = require("../config/firebase");

async function registerUser(decodedToken, payload = {}) {
  const userId = decodedToken.uid;
  const userRef = db.collection("users").doc(userId);
  const snapshot = await userRef.get();

  if (snapshot.exists) {
    return { id: snapshot.id, ...snapshot.data() };
  }

  const userData = {
    email: decodedToken.email || payload.email || null,
    fullName: payload.fullName || decodedToken.name || null,
    role: "user",
    authProvider:
      decodedToken.firebase && decodedToken.firebase.sign_in_provider
        ? decodedToken.firebase.sign_in_provider
        : "firebase",
    isVerified: true,
    kycStatus: "pending",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  if (decodedToken.phone_number) {
    userData.phone = decodedToken.phone_number;
  }

  await userRef.set(userData);

  return { id: userId, ...userData };
}

async function loginOk(decodedToken) {
  return {
    uid: decodedToken.uid,
    email: decodedToken.email || null,
  };
}

async function forgotPasswordOk(decodedToken) {
  return {
    uid: decodedToken.uid,
    email: decodedToken.email || null,
  };
}

module.exports = {
  registerUser,
  loginOk,
  forgotPasswordOk,
};
