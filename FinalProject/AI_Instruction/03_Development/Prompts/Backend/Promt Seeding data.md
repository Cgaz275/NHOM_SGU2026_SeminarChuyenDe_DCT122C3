“Đóng vai trò là Senior Backend Engineer. Hãy đọc file sơ đồ Database docs/database/database-schema.md và file dữ liệu knowledge-base/knowledge_base.json (file này chứa Global_AI_Rules và mảng Demo_Cards).
Nhiệm vụ: Viết script src/seed.js để đẩy dữ liệu mẫu (Seeding) lên Firestore.
Yêu cầu chi tiết cho file src/seed.js:
1.	Import kết nối Firebase từ src/config/firebase.js và thư viện fs để đọc file JSON.
2.	Viết một hàm async function runSeed(). Bọc toàn bộ trong try...catch.
3.	Seeding Global Rules: Đọc object Global_AI_Rules từ file JSON. Ghi đè (sử dụng hàm .set()) vào collection tên là ai_knowledge_base với Document ID cứng là global_rules. Log ra terminal tiến trình này.
4.	Seeding Demo Cards: Duyệt qua mảng Demo_Cards từ file JSON. Với mỗi object thành viên:
o	Bước 4.1: Tạo một Document mới trong collection users (dùng hàm .add() để tự sinh ID). Dữ liệu gồm: email: slug + "@demo.com", fullName, role: "user", isVerified: true, createdAt: admin.firestore.FieldValue.serverTimestamp(). Lấy cái ID vừa được sinh ra (gọi là newUserId).
o	Bước 4.2: Tạo một Document mới trong collection cards (dùng hàm .add() để tự sinh ID). Dữ liệu gồm: userId: newUserId (tham chiếu đến user vừa tạo), slug, fullName, jobTitle, status, aiStatus, aiConfig (bê nguyên cục aiConfig từ JSON vào), createdAt: admin.firestore.FieldValue.serverTimestamp().
o	Log ra terminal: Đã tạo User và Card thành công cho: [Tên thành viên].
5.	Cuối hàm, in ra dòng chữ "🎉 Seeding Database thành công!" và gọi process.exit(0) để tắt tiến trình. Nếu có lỗi vào block catch, in ra lỗi chi tiết và gọi process.exit(1).”
