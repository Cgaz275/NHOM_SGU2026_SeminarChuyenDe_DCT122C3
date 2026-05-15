const authService = require("../services/authService");

async function register(req, res) {
  try {
    const user = await authService.registerUser(req.user, req.body);

    return res.status(200).json({
      status: true,
      data: user,
      message: "Đăng ký thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      data: null,
      message: "Đăng ký thất bại",
    });
  }
}

async function login(req, res) {
  try {
    const result = await authService.loginOk(req.user);

    return res.status(200).json({
      status: true,
      data: result,
      message: "Đăng nhập thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      data: null,
      message: "Đăng nhập thất bại",
    });
  }
}

async function forgotPassword(req, res) {
  try {
    const result = await authService.forgotPasswordOk(req.user);

    return res.status(200).json({
      status: true,
      data: result,
      message: "Yêu cầu quên mật khẩu thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      data: null,
      message: "Yêu cầu quên mật khẩu thất bại",
    });
  }
}

module.exports = {
  register,
  login,
  forgotPassword,
};
