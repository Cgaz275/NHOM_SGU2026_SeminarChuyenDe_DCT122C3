const rateLimit = require("express-rate-limit");

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: false,
    message: "Bạn đã gửi quá nhiều yêu cầu, vui lòng thử lại sau",
  },
});

const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: false,
    message: "Bạn đã gửi quá nhiều tin nhắn, vui lòng thử lại sau",
  },
});

module.exports = {
  globalLimiter,
  chatLimiter,
};
