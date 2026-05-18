Đóng vai một chuyên gia DevOps. Tôi muốn triển khai (deploy) dự án Full-stack của mình theo mô hình: Backend (Node.js/Express) lên Render.com và Frontend (Next.js) lên Vercel.

Vui lòng rà soát lại toàn bộ workspace hiện tại và hướng dẫn tôi theo từng bước (Step-by-step) sau:

BƯỚC 1: CHUẨN BỊ BACKEND CHO RENDER
- Kiểm tra file `package.json` của Backend xem đã có lệnh `"start": "node src/server.js"` chưa.
- Kiểm tra file server (index.js/server.js) xem cổng khởi động đã dùng `process.env.PORT` chưa (rất quan trọng cho Render).
- Kiểm tra cấu hình CORS xem đã sẵn sàng để nhận request từ domain production chưa.
- Cung cấp cho tôi đoạn code cần sửa (nếu có).

BƯỚC 2: DEPLOY BACKEND
- Hướng dẫn tôi cách đẩy Backend lên GitHub và kết nối với Render (Web Service).
- Nhắc tôi các biến môi trường (.env) cần thiết lập trên bảng điều khiển của Render (như Firebase credentials, DB URL...).

BƯỚC 3: CHUẨN BỊ FRONTEND CHO VERCEL
- Sau khi Backend chạy và có URL thật, hãy hướng dẫn tôi cách thay thế biến `NEXT_PUBLIC_API_URL` ở Frontend.
- Kiểm tra xem cấu hình Next.js có cần thêm `images: { domains: [...] }` cho các host ảnh (như Firebase Storage) để không bị lỗi lúc build không.

BƯỚC 4: DEPLOY FRONTEND
- Hướng dẫn tôi đẩy Frontend lên GitHub và deploy bằng Vercel.

Hãy đưa ra hướng dẫn ngắn gọn, tập trung vào các đoạn code cần cấu hình lại trong IDE trước khi push lên Git!