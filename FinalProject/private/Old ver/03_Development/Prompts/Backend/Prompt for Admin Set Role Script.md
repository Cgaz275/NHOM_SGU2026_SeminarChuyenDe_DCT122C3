“Đóng vai trò là Senior Backend Engineer. Hãy tạo script cấp quyền Admin thủ công.
Yêu cầu:
1. Tạo file src/set-admin.js.
2. Kết nối Firestore, tìm user theo email cố định (ví dụ: admin@gmail.com).
3. Nếu tìm thấy, update role = "admin" và log thành công.
4. Nếu không thấy, log hướng dẫn đăng ký tài khoản trước.
5. Bọc try...catch và kết thúc tiến trình bằng process.exit(0/1).
Script này chỉ chạy thủ công khi cần cấp quyền admin.”