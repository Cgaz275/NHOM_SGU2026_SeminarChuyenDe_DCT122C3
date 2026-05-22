const admin = require("firebase-admin");
const path = require("path");

const serviceAccountPath = path.join(
  __dirname,
  "../../firebase/firebase-admin-key.json"
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(require(serviceAccountPath)),
  });
}

const db = admin.firestore();

// Thêm dòng cấu hình trỏ đích danh vào database 'seminar'
db.settings({ databaseId: "seminar" });

const auth = admin.auth();
const storage = admin.storage();

module.exports = {
  admin,
  db,
  auth,
  storage,
};