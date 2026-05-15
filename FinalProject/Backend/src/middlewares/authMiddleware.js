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

function verifyAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    return next();
  }

  return res.status(403).json({
    status: false,
    data: null,
    message: "Bạn không có quyền truy cập chức năng này",
  });
}

module.exports = {
  verifyToken,
  verifyAdmin,
};
