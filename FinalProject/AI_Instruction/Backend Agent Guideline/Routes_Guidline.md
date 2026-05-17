# 🛣️ Routes Guideline (Dành cho AI Agent)

**Vị trí trong Kiến trúc:** Layered Architecture (Route → Controller → Service → Database)

> **CHỈ THỊ CỐT LÕI CHO AI AGENT:** Tầng định tuyến Router là "Phân luồng Giao thông". AI Agent **bắt buộc** tuân thủ thứ tự khai báo routes và chuỗi middleware để đảm bảo an toàn và đúng nghiệp vụ.

## 1. Vai trò và giới hạn của tầng Route

- **Nhiệm vụ:** Định danh path con, áp đặt HTTP method, và cấu hình middleware (auth, rate-limit, v.v.).
- **Tuyệt đối không:** Chứa logic nghiệp vụ, truy vấn DB, thực hiện validate sâu hay build response — những việc này thuộc về Controller/Service.

## 2. Quy tắc cấu trúc và đặt tên

- **Naming convention:** File route dùng `camelCase` và hậu tố `Routes.js` (ví dụ: `authRoutes.js`, `cardRoutes.js`).
- **Tách module:** Mỗi file quản lý một tài nguyên/domain riêng, không gộp chung nhiều domain.

## 3. Chaining middleware (Bảo mật & phân quyền)

- **Public routes:** Được mở nhưng phải gắn `globalLimiter`.
- **Protected (Owner):** Bắt buộc `verifyToken`.
- **Admin routes:** Bắt buộc `verifyToken, verifyAdmin`.
- **AI Chat:** Bắt buộc `chatLimiter` (hoặc cơ chế rate limit nghiêm ngặt).

## 4. File mẫu (template) — `cardRoutes.js`

Ví dụ mẫu (hãy giữ nguyên thứ tự routes để tránh xung đột):

```javascript
// src/routes/cardRoutes.js
const express = require("express");
const cardController = require("../controllers/cardController");
const { verifyToken, verifyAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

// ==========================================
// 1. CHUỖI PROTECTED ROUTES (Yêu cầu verifyToken)
// ==========================================
router.post("/", verifyToken, cardController.createCard);
router.get("/me", verifyToken, cardController.getMyCards); // Đặt trước các route có param động

router.put("/:cardId", verifyToken, cardController.updateCard);
router.delete("/:cardId", verifyToken, cardController.deleteCard); // Soft Delete

// Cấu hình AI & Human Takeover
router.put("/:cardId/ai-config", verifyToken, cardController.updateAiConfig);
router.put("/:cardId/takeover", verifyToken, cardController.toggleTakeover);

// ==========================================
// 2. CHUỖI PUBLIC ROUTES (Truy cập tự do)
// ==========================================
// Đặt ở cuối để tránh nuốt route '/me'
router.get("/:slug", cardController.getCardBySlug);

module.exports = router;
```

## 5. Mount router trong `server.js`

Đoạn mount mẫu được dùng trong `src/server.js`:

```javascript
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const cardRoutes = require("./routes/cardRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const reportRoutes = require("./routes/reportRoutes");
const { globalLimiter } = require("./middlewares/rateLimiter");

app.use(globalLimiter);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/cards", cardRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/reports", reportRoutes);

// Module messages được cắm proxy chung Base path với cards
app.use("/api/v1/cards", messageRoutes);
```

## 6. Ràng buộc tuyệt đối (Critical constraints)

- **DRY:** Trong `src/routes/*.js` không viết lại `/api/v1` hay tên tài nguyên gốc. Router con chỉ định nghĩa đường dẫn con (`/`, `/:id`, `/me`).
- **Order of routes:** Luôn đặt các route tĩnh (ví dụ `/me`, `/global`) **trước** các route động (`/:cardId`, `/:slug`) để tránh xung đột.
- **Error handling:** Tầng Route không tự bắt lỗi; Controller và Global Error Handler chịu trách nhiệm này.

---

_Giữ cấu trúc này khi thêm/điều chỉnh routes để đảm bảo an toàn và nhất quán._