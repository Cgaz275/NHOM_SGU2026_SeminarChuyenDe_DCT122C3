const { auth } = require("../config/firebase");

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

module.exports = {
  verifyToken,
};
