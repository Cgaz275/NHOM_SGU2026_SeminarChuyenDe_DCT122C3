const userService = require("../services/userService");

async function getMe(req, res) {
  try {
    const profile = await userService.getProfile(req.user.uid);

    if (!profile) {
      return res.status(404).json({
        status: false,
        data: null,
        message: "Không tìm thấy người dùng",
      });
    }

    return res.status(200).json({
      status: true,
      data: profile,
      message: "Lấy hồ sơ thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      data: null,
      message: "Lấy hồ sơ thất bại",
    });
  }
}

async function updateMe(req, res) {
  try {
    const profile = await userService.updateProfile(req.user.uid, req.body);

    if (!profile) {
      return res.status(404).json({
        status: false,
        data: null,
        message: "Không tìm thấy người dùng",
      });
    }

    return res.status(200).json({
      status: true,
      data: profile,
      message: "Cập nhật hồ sơ thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      data: null,
      message: "Cập nhật hồ sơ thất bại",
    });
  }
}

module.exports = {
  getMe,
  updateMe,
};
