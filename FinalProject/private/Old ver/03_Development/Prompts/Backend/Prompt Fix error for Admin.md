“Đóng vai trò là Senior Backend Engineer. Trong file src/middlewares/authMiddleware.js, hàm verifyAdmin đang bị lỗi logic. Nó trả về 403 dù role của user trong collection users đã là admin.
Nguyên nhân: Token của Firebase Auth không chứa trường role.
Yêu cầu: Hãy viết lại hàm verifyAdmin theo logic sau:
1.	Lấy email (hoặc uid) từ req.user (đã được giải mã từ verifyToken trước đó).
2.	Truy vấn vào collection users trên Firestore để tìm document của user này.
3.	Kiểm tra: Nếu không tìm thấy user, HOẶC userData.role !== 'admin', thì trả về 403 Forbidden kèm message: "Bạn không có quyền truy cập chức năng này".
4.	Nếu đúng là admin, gọi next() để cho đi tiếp.
5.	Cập nhật code, bắt lỗi try...catch cẩn thận.”
