# Backend Routes Guideline - Node.js + Express + Firebase

**Hướng dẫn chi tiết cho việc xây dựng Routes (API endpoints) trong Backend của dự án Persona-Based Digital Twin Card.**

---

## 📋 Routes là gì?

Routes định nghĩa các HTTP endpoints (URLs) và mapping chúng đến Controller functions. Chúng là cầu nối giữa client requests và server logic.

**Trách nhiệm của Routes:**
- ✅ Định nghĩa HTTP methods (GET, POST, PUT, DELETE)
- ✅ Định nghĩa URL paths
- ✅ Mapping endpoints → controller functions
- ✅ Apply middlewares (auth, validation, rate limit)
- ✅ Documentation (Swagger annotations)

---

## 🏗️ Cấu Trúc Routes

```
Backend/src/routes/
├── authRoutes.js            ← POST /api/auth/*
├── userRoutes.js            ← GET/PUT /api/users/*
├── cardRoutes.js            ← GET/POST /api/cards/*
├── conversationRoutes.js    ← GET/POST /api/conversations/*
├── messageRoutes.js         ← GET/POST /api/messages/*
├── chatRoutes.js            ← POST /api/chat/*
├── reportRoutes.js          ← POST /api/reports/*
├── analyticsRoutes.js       ← GET /api/analytics/*
└── index.js                 ← Register all routes
```

---

## 💾 File Template cho Routes

```javascript
// routes/exampleRoutes.js

const express = require("express");
const router = express.Router();
const ExampleController = require("../controllers/exampleController");
const authMiddleware = require("../middlewares/authMiddleware");
const rateLimiter = require("../middlewares/rateLimiter");

/**
 * @swagger
 * /api/examples:
 *   get:
 *     summary: Get all examples for user
 *     tags: [Examples]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: offset
 *         schema: { type: integer, default: 0 }
 *     responses:
 *       200:
 *         description: Examples list retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data: { type: array }
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, ExampleController.listExamples);

/**
 * @swagger
 * /api/examples:
 *   post:
 *     summary: Create new example
 *     tags: [Examples]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Example created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, rateLimiter, ExampleController.createExample);

/**
 * @swagger
 * /api/examples/{id}:
 *   get:
 *     summary: Get example by ID
 *     tags: [Examples]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Example retrieved
 *       404:
 *         description: Example not found
 */
router.get("/:id", ExampleController.getExample);

/**
 * @swagger
 * /api/examples/{id}:
 *   put:
 *     summary: Update example
 *     tags: [Examples]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *     responses:
 *       200:
 *         description: Example updated
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 */
router.put("/:id", authMiddleware, ExampleController.updateExample);

/**
 * @swagger
 * /api/examples/{id}:
 *   delete:
 *     summary: Delete example
 *     tags: [Examples]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Example deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 */
router.delete("/:id", authMiddleware, ExampleController.deleteExample);

module.exports = router;
```

---

## 📋 Chi tiết các Routes

### 1. **authRoutes.js** - Authentication

**Endpoints:**
```javascript
const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const rateLimiter = require("../middlewares/rateLimiter");

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: User registration
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, name]
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *               name: { type: string }
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 *       409:
 *         description: Email already exists
 */
router.post("/register", rateLimiter, AuthController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Missing credentials
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", rateLimiter, AuthController.login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: User logout
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/logout", authMiddleware, AuthController.logout);

/**
 * @swagger
 * /api/auth/verify:
 *   get:
 *     summary: Verify token validity
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
 *       401:
 *         description: Token invalid or expired
 */
router.get("/verify", authMiddleware, AuthController.verify);

module.exports = router;
```

### 2. **userRoutes.js** - User Management

```javascript
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: List all users (admin only)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *       - in: query
 *         name: offset
 *         schema: { type: integer, default: 0 }
 *     responses:
 *       200:
 *         description: Users list retrieved
 *       403:
 *         description: Admin only
 */
router.get("/", authMiddleware, UserController.listUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: User profile retrieved
 *       404:
 *         description: User not found
 */
router.get("/:id", UserController.getUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               profileImage: { type: string }
 *               bio: { type: string }
 *     responses:
 *       200:
 *         description: Profile updated
 *       403:
 *         description: Forbidden
 */
router.put("/:id", authMiddleware, UserController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user (admin only)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: User deleted
 *       403:
 *         description: Admin only
 */
router.delete("/:id", authMiddleware, UserController.deleteUser);

module.exports = router;
```

### 3. **cardRoutes.js** - Digital Card

```javascript
const express = require("express");
const router = express.Router();
const CardController = require("../controllers/cardController");
const authMiddleware = require("../middlewares/authMiddleware");
const rateLimiter = require("../middlewares/rateLimiter");

/**
 * @swagger
 * /api/cards:
 *   get:
 *     summary: List user's cards
 *     tags: [Cards]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: offset
 *         schema: { type: integer, default: 0 }
 *     responses:
 *       200:
 *         description: Cards list retrieved
 */
router.get("/", authMiddleware, CardController.listCards);

/**
 * @swagger
 * /api/cards:
 *   post:
 *     summary: Create new card
 *     tags: [Cards]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, slug]
 *             properties:
 *               title: { type: string }
 *               slug: { type: string }
 *               bio: { type: string }
 *     responses:
 *       201:
 *         description: Card created successfully
 *       400:
 *         description: Invalid input
 *       409:
 *         description: Slug already taken
 */
router.post("/", authMiddleware, rateLimiter, CardController.createCard);

/**
 * @swagger
 * /api/cards/{id}:
 *   get:
 *     summary: Get card by ID
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Card retrieved
 *       404:
 *         description: Card not found
 */
router.get("/:id", CardController.getCard);

/**
 * @swagger
 * /api/cards/slug/{slug}:
 *   get:
 *     summary: Get card by slug
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Card retrieved
 *       404:
 *         description: Card not found
 */
router.get("/slug/:slug", CardController.getCardBySlug);

/**
 * @swagger
 * /api/cards/{id}:
 *   put:
 *     summary: Update card
 *     tags: [Cards]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               slug: { type: string }
 *               bio: { type: string }
 *               isPublished: { type: boolean }
 *     responses:
 *       200:
 *         description: Card updated
 *       403:
 *         description: Forbidden
 */
router.put("/:id", authMiddleware, CardController.updateCard);

/**
 * @swagger
 * /api/cards/{id}:
 *   delete:
 *     summary: Delete card
 *     tags: [Cards]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Card deleted
 *       403:
 *         description: Forbidden
 */
router.delete("/:id", authMiddleware, CardController.deleteCard);

module.exports = router;
```

### 4. **chatRoutes.js** - Chat with AI

```javascript
const express = require("express");
const router = express.Router();
const ChatController = require("../controllers/chatController");
const rateLimiter = require("../middlewares/rateLimiter");

/**
 * @swagger
 * /api/chat:
 *   post:
 *     summary: Send message to AI Twin
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [cardId, message]
 *             properties:
 *               cardId: { type: string }
 *               message: { type: string }
 *               conversationId: { type: string }
 *     responses:
 *       200:
 *         description: Response from AI
 *       400:
 *         description: Invalid input
 *       429:
 *         description: Rate limited
 *       503:
 *         description: AI service unavailable
 */
router.post("/", rateLimiter, ChatController.sendMessage);

module.exports = router;
```

### 5. **conversationRoutes.js** - Conversations

```javascript
const express = require("express");
const router = express.Router();
const ConversationController = require("../controllers/conversationController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /api/conversations:
 *   get:
 *     summary: List conversations
 *     tags: [Conversations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: cardId
 *         schema: { type: string }
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [active, escalated, closed] }
 *     responses:
 *       200:
 *         description: Conversations list retrieved
 */
router.get("/", authMiddleware, ConversationController.listConversations);

/**
 * @swagger
 * /api/conversations/{id}:
 *   get:
 *     summary: Get conversation details
 *     tags: [Conversations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Conversation retrieved
 *       404:
 *         description: Not found
 */
router.get("/:id", authMiddleware, ConversationController.getConversation);

/**
 * @swagger
 * /api/conversations/{id}/escalate:
 *   put:
 *     summary: Escalate conversation to human
 *     tags: [Conversations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason: { type: string }
 *     responses:
 *       200:
 *         description: Conversation escalated
 */
router.put("/:id/escalate", authMiddleware, ConversationController.escalate);

module.exports = router;
```

### 6. **messageRoutes.js** - Messages

```javascript
const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/messageController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /api/messages/{conversationId}:
 *   get:
 *     summary: Get conversation messages
 *     tags: [Messages]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 50 }
 *       - in: query
 *         name: offset
 *         schema: { type: integer, default: 0 }
 *     responses:
 *       200:
 *         description: Messages retrieved
 */
router.get("/:conversationId", authMiddleware, MessageController.getMessages);

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Send message
 *     tags: [Messages]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [conversationId, content]
 *             properties:
 *               conversationId: { type: string }
 *               content: { type: string }
 *     responses:
 *       201:
 *         description: Message sent
 */
router.post("/", authMiddleware, MessageController.sendMessage);

module.exports = router;
```

### 7. **reportRoutes.js** - Reports

```javascript
const express = require("express");
const router = express.Router();
const ReportController = require("../controllers/reportController");
const authMiddleware = require("../middlewares/authMiddleware");
const rateLimiter = require("../middlewares/rateLimiter");

/**
 * @swagger
 * /api/reports:
 *   get:
 *     summary: List reports (admin only)
 *     tags: [Reports]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Reports list retrieved
 */
router.get("/", authMiddleware, ReportController.listReports);

/**
 * @swagger
 * /api/reports:
 *   post:
 *     summary: Submit report
 *     tags: [Reports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [conversationId, reason]
 *             properties:
 *               conversationId: { type: string }
 *               reason: { type: string }
 *               details: { type: string }
 *     responses:
 *       201:
 *         description: Report submitted
 *       400:
 *         description: Invalid input
 *       429:
 *         description: Rate limited
 */
router.post("/", rateLimiter, ReportController.createReport);

module.exports = router;
```

### 8. **analyticsRoutes.js** - Analytics

```javascript
const express = require("express");
const router = express.Router();
const AnalyticsController = require("../controllers/analyticsController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /api/analytics/cards/{cardId}:
 *   get:
 *     summary: Get card analytics
 *     tags: [Analytics]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cardId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Card analytics retrieved
 */
router.get("/cards/:cardId", authMiddleware, AnalyticsController.getCardAnalytics);

/**
 * @swagger
 * /api/analytics/conversations/{cardId}:
 *   get:
 *     summary: Get conversation statistics
 *     tags: [Analytics]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cardId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Conversation stats retrieved
 */
router.get("/conversations/:cardId", authMiddleware, AnalyticsController.getConversationStats);

/**
 * @swagger
 * /api/analytics/admin:
 *   get:
 *     summary: Get admin dashboard analytics (admin only)
 *     tags: [Analytics]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Admin analytics retrieved
 */
router.get("/admin", authMiddleware, AnalyticsController.getAdminAnalytics);

module.exports = router;
```

---

## 🔗 Main Routes File (index.js hoặc server.js)

```javascript
// server.js
const express = require("express");
const app = express();

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const cardRoutes = require("./routes/cardRoutes");
const chatRoutes = require("./routes/chatRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
const messageRoutes = require("./routes/messageRoutes");
const reportRoutes = require("./routes/reportRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

// Middleware
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/analytics", analyticsRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "NOT_FOUND",
    message: "Endpoint not found"
  });
});

// Error handler (must be last)
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

module.exports = app;
```

---

## ✅ Route Naming Conventions

### Standard REST Routes Pattern

```javascript
// Collection endpoints
GET    /api/resources              ← List
POST   /api/resources              ← Create

// Individual resource endpoints
GET    /api/resources/:id          ← Get one
PUT    /api/resources/:id          ← Update
DELETE /api/resources/:id          ← Delete

// Nested resources
GET    /api/resources/:id/sub      ← List nested
POST   /api/resources/:id/sub      ← Create nested

// Special actions
POST   /api/resources/:id/action   ← Special action
PUT    /api/resources/:id/action   ← Update status
```

### Examples from Project

```javascript
// Auth
POST   /api/auth/register          ← Create account
POST   /api/auth/login             ← Auth action
POST   /api/auth/logout            ← Auth action
GET    /api/auth/verify            ← Verify token

// Cards
GET    /api/cards                  ← List user's cards
POST   /api/cards                  ← Create card
GET    /api/cards/:id              ← Get card
PUT    /api/cards/:id              ← Update card
DELETE /api/cards/:id              ← Delete card
GET    /api/cards/slug/:slug       ← Get by slug (public)

// Conversations
GET    /api/conversations          ← List conversations
POST   /api/conversations          ← Create conversation
GET    /api/conversations/:id      ← Get conversation
PUT    /api/conversations/:id/escalate ← Escalate to human

// Analytics
GET    /api/analytics/cards/:cardId           ← Card stats
GET    /api/analytics/conversations/:cardId  ← Conversation stats
GET    /api/analytics/admin                  ← Admin dashboard
```

---

## 🔐 Middleware Usage Pattern

### Pattern: Always protect sensitive endpoints

```javascript
// Public endpoint (no auth needed)
router.get("/public", ControllerFunc);

// Protected endpoint (auth required)
router.get("/private", authMiddleware, ControllerFunc);

// Admin only
router.get("/admin", authMiddleware, adminMiddleware, ControllerFunc);

// Rate limited
router.post("/sensitive", rateLimiter, ControllerFunc);

// Multiple middlewares
router.post(
  "/create",
  authMiddleware,           // Check user is authenticated
  validateInput,            // Validate request body
  rateLimiter,              // Check rate limit
  ControllerFunc            // Execute controller
);
```

---

## 📝 Swagger/OpenAPI Documentation

**Mỗi route phải có Swagger documentation:**

```javascript
/**
 * @swagger
 * /api/resource:
 *   get:
 *     summary: Short description
 *     description: Longer description
 *     tags: [ResourceName]
 *     security:
 *       - BearerAuth: []        ← If requires auth
 *     parameters:
 *       - in: query
 *         name: paramName
 *         required: false
 *         schema: { type: string }
 *         description: Description
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fieldName]
 *             properties:
 *               fieldName: { type: string }
 *     responses:
 *       200:
 *         description: Success message
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.get("/resource", ControllerFunc);
```

---

## ✅ Route Checklist

Trước khi hoàn thành routes file:

- ✅ Tất cả endpoints được định nghĩa?
- ✅ HTTP methods đúng (GET, POST, PUT, DELETE)?
- ✅ URL paths đúng?
- ✅ Auth middleware applied đúng?
- ✅ Rate limiting applied?
- ✅ Swagger documentation viết đầy đủ?
- ✅ Error handling covered?
- ✅ Response format consistent?

---

**Version:** 1.0
**Last Updated:** 2026
**Status:** Active ✅
