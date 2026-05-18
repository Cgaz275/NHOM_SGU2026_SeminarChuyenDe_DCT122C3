const userService = require("../services/userService");
const authService = require("../services/authService");

async function getMe(req, res) {
  try {
    // Tự động tạo user nếu chưa tồn tại trong database
    const profile = await authService.registerUser(req.user);

    return res.status(200).json({
      status: true,
      data: profile,
      message: "Lấy hồ sơ thành công",
    });
  } catch (error) {
    console.error("Lỗi trong getMe:", error);
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

async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();

    return res.status(200).json({
      status: true,
      data: users,
      message: "Lấy danh sách người dùng thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      data: null,
      message: "Lấy danh sách người dùng thất bại",
    });
  }
}

async function updateUserStatus(req, res) {
  try {
    const { status } = req.body || {};

    if (!status || !["active", "banned"].includes(status)) {
      return res.status(400).json({
        status: false,
        data: null,
        message: "Vui lòng cung cấp trạng thái hợp lệ (active/banned)",
      });
    }

    const result = await userService.updateUserStatus(req.params.id, status);

    if (result && result.error === "not-found") {
      return res.status(404).json({
        status: false,
        data: null,
        message: "Không tìm thấy người dùng",
      });
    }

    return res.status(200).json({
      status: true,
      data: result,
      message: "Cập nhật trạng thái người dùng thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      data: null,
      message: "Cập nhật trạng thái người dùng thất bại",
    });
  }
}

module.exports = {
  getMe,
  updateMe,
  getAllUsers,
  updateUserStatus,
};
