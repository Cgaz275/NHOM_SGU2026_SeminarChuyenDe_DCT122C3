function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: false,
    message: err.message || "Lỗi máy chủ nội bộ",
    error: err.error || null,
  });
}

module.exports = {
  errorHandler,
};
