const { auth, db } = require("../config/firebase");

async function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: false,
        data: null,
        message: "Chưa được xác thực",
      });
    }

    const token = authHeader.replace("Bearer ", "").trim();

    if (!token) {
      return res.status(401).json({
        status: false,
        data: null,
        message: "Chưa được xác thực",
      });
    }

    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;

    return next();
  } catch (error) {
    return res.status(401).json({
      status: false,
      data: null,
      message: "Token không hợp lệ",
    });
  }
}

async function verifyAdmin(req, res, next) {
  try {
    const userId = req.user && req.user.uid ? req.user.uid : null;
    const userEmail = req.user && req.user.email ? req.user.email : null;

    let userDoc = null;

    if (userId) {
      const snapshot = await db.collection("users").doc(userId).get();
      if (snapshot.exists) {
        userDoc = snapshot.data();
      }
    }

    if (!userDoc && userEmail) {
      const snapshot = await db
        .collection("users")
        .where("email", "==", userEmail)
        .limit(1)
        .get();

      if (!snapshot.empty) {
        userDoc = snapshot.docs[0].data();
      }
    }

    if (!userDoc || userDoc.role !== "admin") {
      return res.status(403).json({
        status: false,
        data: null,
        message: "Bạn không có quyền truy cập chức năng này",
      });
    }

    return next();
  } catch (error) {
    return res.status(500).json({
      status: false,
      data: null,
      message: "Xác thực quyền quản trị thất bại",
    });
  }
}

module.exports = {
  verifyToken,
  verifyAdmin,
};
