“Đóng vai trò là Senior Backend Engineer. Hãy bổ sung Swagger UI và tài liệu API cho backend theo đúng kiến trúc hiện tại.
Yêu cầu thực hiện:
1. Cập nhật dependencies (package.json):
• Thêm swagger-jsdoc và swagger-ui-express.
• Nếu thiếu script chạy, thêm:
  - "start": "node src/server.js"
  - "dev": "nodemon src/server.js"
2. Tạo file cấu hình Swagger (src/config/swagger.js):
• OpenAPI 3.0.0, title: "Digital Twin API", version: "1.0.0".
• servers: base URL là http://192.168.1.8:5000/api/v1.
• securitySchemes: bearerAuth (JWT).
• apis trỏ vào ./src/routes/*.js để đọc JSDoc.
3. Cập nhật server (src/server.js):
• Import swagger-ui-express và swaggerSpec.
• app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)).
• Thêm app.set('trust proxy', 1) để chuẩn bị deploy.
4. Bổ sung JSDoc cho các routes chính:
• Auth, Users, Cards, Chat, Messages, Analytics, Reports.
• Ít nhất mỗi route cần: summary, tags, parameters và requestBody (nếu có).
Hãy đảm bảo code clean, không phá vỡ các API đang có.”