"Đóng vai trò là Senior Backend Engineer. Hãy đọc file Backend Agent Guideline/Guideline.md để nắm bắt các quy tắc kiến trúc của dự án Persona-based Digital Card.
Nhiệm vụ 1: Khởi tạo Project
1.	Hãy di chuyển vào thư mục Backend/ và khởi tạo một project Node.js (package.json).
2.	Cài đặt các thư viện cơ bản: express, cors, dotenv, firebase-admin. Cài thêm nodemon ở dạng devDependencies.
Nhiệm vụ 2: Cấu hình Firebase & Server
1.	Tạo file .env trong thư mục Backend/ và thiết lập cổng PORT=5000.
2.	Tạo cấu trúc thư mục bên trong Backend/: src/config/, src/routes/, src/controllers/.
3.	Trong src/config/, tạo file firebase.js. Viết code khởi tạo kết nối Firebase Admin SDK. Lưu ý: File chứa key bảo mật nằm ở đường dẫn Backend/firebase/firebase-admin-key.json (tính từ gốc dự án), hãy trỏ đúng đường dẫn để kết nối.
4.	Tạo file src/server.js: Khởi tạo Express app, cấu hình CORS, tích hợp file config Firebase vừa tạo. Thêm một route test cơ bản GET /api/v1/health trả về JSON {"status": "OK", "message": "Backend & Firebase is running!"}.
Hãy thực thi các lệnh terminal cần thiết và viết code cho các file trên."
