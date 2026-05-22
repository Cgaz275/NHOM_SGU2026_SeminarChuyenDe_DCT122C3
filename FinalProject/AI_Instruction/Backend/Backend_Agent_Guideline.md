# Backend Agent Guideline - Node.js + Express + Firebase

**Tài liệu này là hướng dẫn chi tiết cho Backend Developer Agent làm việc trên phần Backend của dự án Persona-Based Digital Twin Card.**

---

## 📋 Mục đích và Phạm Vi

### Trách nhiệm Backend Agent

- ✅ Implement API endpoints theo thiết kế từ `AI_Instruction/Source of truth/Architecht & Database.pdf`
- ✅ Xây dựng logic nghiệp vụ (business logic) trong services
- ✅ Quản lý Firestore operations (CRUD, queries, transactions)
- ✅ Implement authentication & authorization
- ✅ Implement error handling, validation, logging
- ✅ Tối ưu hóa performance (no N+1 queries, efficient queries)
- ✅ Bảo mật (no hardcoded secrets, proper validation)
- ✅ Viết unit tests + integration tests
- ✅ Cập nhật documentation sau mỗi thay đổi

### Không phải trách nhiệm

- ❌ Frontend implementation
- ❌ UI/UX design decisions
- ❌ Deployment & DevOps (trao cho Ops team)
- ❌ Database schema design (do System Architect)

---

## 🛠️ Technology Stack

| Công nghệ | Phiên bản | Mục đích | Tài liệu |
|-----------|----------|---------|---------|
| **Node.js** | 20.x+ | Runtime | [Node.js Docs](https://nodejs.org/docs/) |
| **Express.js** | 4.x | Web framework | [Express Docs](https://expressjs.com/) |
| **Firebase Admin SDK** | Latest | Backend Firebase client | [Firebase Docs](https://firebase.google.com/docs) |
| **Firestore** | - | NoSQL Database | [Firestore Docs](https://firebase.google.com/docs/firestore) |
| **Firebase Auth** | - | Authentication | [Firebase Auth](https://firebase.google.com/docs/auth) |
| **OpenAI SDK** | Latest | AI integration | [OpenAI Docs](https://platform.openai.com/docs) |
| **Jest** | 29.x+ | Unit/Integration Testing | [Jest Docs](https://jestjs.io/) |
| **Postman** | Latest | API Testing | [Postman Docs](https://learning.postman.com/) |

---

## 📁 Cây Cấu Trúc Backend

```
Backend/
├── src/
│   ├── config/
│   │   ├── firebase.js                  ← Firebase initialization & admin SDK
│   │   └── swagger.js                   ← Swagger API documentation config
│   │
│   ├── controllers/
│   │   ├── authController.js            ← Authentication endpoints
│   │   ├── userController.js            ← User management endpoints
│   │   ├── cardController.js            ← Digital card endpoints
│   │   ├── aiService.js                 ← AI Twin configuration endpoints
│   │   ├── conversationController.js    ← Conversation/chat endpoints
│   │   ├── messageController.js         ← Message endpoints
│   │   ├── chatController.js            ← Chat logic endpoints
│   │   ├── reportController.js          ← Report/abuse endpoints
│   │   └── analyticsController.js       ← Analytics endpoints
│   │
│   ├── routes/
│   │   ├── authRoutes.js                ← POST /api/auth/*
│   │   ├── userRoutes.js                ← GET/PUT /api/users/*
│   │   ├── cardRoutes.js                ← GET/POST /api/cards/*
│   │   ├── conversationRoutes.js        ← GET/POST /api/conversations/*
│   │   ├── messageRoutes.js             ← GET/POST /api/messages/*
│   │   ├── chatRoutes.js                ← POST /api/chat/*
│   │   ├── reportRoutes.js              ← POST /api/reports/*
│   │   ├── analyticsRoutes.js           ← GET /api/analytics/*
│   │   └── messageApiRoutes.js          ← API-based message routes
│   │
│   ├── services/
│   │   ├── authService.js               ← Auth business logic
│   │   ├── userService.js               ← User operations (Firestore)
│   │   ├── cardService.js               ← Card operations (Firestore)
│   │   ├── aiService.js                 ← AI Twin logic & OpenAI integration
│   │   ├── conversationService.js       ← Conversation logic
│   │   ├── messageService.js            ← Message operations
│   │   ├── analyticsService.js          ← Analytics logic
│   │   └── reportService.js             ← Report processing
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js            ← JWT/Firebase token validation
│   │   ├── errorHandler.js              ← Global error handling
│   │   └── rateLimiter.js               ← API rate limiting
│   │
│   ├── utils/
│   │   ├── toneMapper.js                ← AI tone mapping utility
│   │   └── [other utilities]/
│   │
│   ├── knowledge-base/
│   │   └── knowledge_base.json          ← AI Twin knowledge base (RAG)
│   │
│   ├── firebase/
│   │   └── firebase-admin-key.json      ← Firebase credentials (git-ignored)
│   │
│   ├── server.js                        ← Express app initialization
│   ├── seed.js                          ← Database seeding script
│   └── set-admin.js                     ← Admin role setup script
│
├── package.json
├── package-lock.json
└── .env.example

```

---

## 🔑 Core Modules & Responsibilities

### 1. **Authentication Module** (`auth*`)
**Files:** `authController.js`, `authService.js`, `authRoutes.js`, `authMiddleware.js`

**Endpoints:**
- `POST /api/auth/register` — User registration
- `POST /api/auth/login` — User login
- `POST /api/auth/logout` — User logout
- `GET /api/auth/verify` — Token verification

**Responsibilities:**
- Firebase Authentication setup (email/password, OAuth)
- JWT token generation & validation
- Request authentication & authorization
- Password hashing (Firebase handles this)
- Session management

**Reference:** `AI_Instruction/Source of truth/Architecht & Database.pdf` - Security & Auth section

---

### 2. **User Module** (`user*`)
**Files:** `userController.js`, `userService.js`, `userRoutes.js`

**Endpoints:**
- `GET /api/users/:id` — Get user profile
- `PUT /api/users/:id` — Update user profile
- `GET /api/users` — List users (admin only)
- `DELETE /api/users/:id` — Delete user (admin only)

**Responsibilities:**
- User CRUD operations on Firestore
- User profile management
- Admin operations
- User data validation
- User roles & permissions

**Reference:** `AI_Instruction/Source of truth/Architecht & Database.pdf` - User Data Model

---

### 3. **Digital Card Module** (`card*`)
**Files:** `cardController.js`, `cardService.js`, `cardRoutes.js`

**Endpoints:**
- `POST /api/cards` — Create digital card
- `GET /api/cards/:id` — Get card details
- `PUT /api/cards/:id` — Update card
- `DELETE /api/cards/:id` — Delete card
- `GET /api/cards/slug/:slug` — Get card by custom slug

**Responsibilities:**
- Digital card CRUD operations
- Card slug management (unique identifiers)
- Card publish/unpublish logic
- QR code generation (via third-party service)
- Card analytics tracking

**Reference:** `AI_Instruction/Source of truth/Architecht & Database.pdf` - Card Data Model

---

### 4. **AI Twin Module** (`ai*`)
**Files:** `aiService.js` (no dedicated controller, uses other routes)

**Endpoints:** (via other modules)
- `POST /api/ai-config` — Configure AI Twin
- `POST /api/chat` — Chat with AI Twin

**Responsibilities:**
- OpenAI API integration (gpt-4o-mini)
- Prompt engineering & persona management
- Knowledge base management (RAG)
- Tone/style configuration
- AI response generation
- Conversation context management

**Reference:** 
- `AI_Instruction/Source of truth/Architecht & Database.pdf` - AI Twin Architecture
- `AI_Instruction/Source of truth/DigitalTwin_Document.md` - AI Twin specification
- `AI_Instruction/Source of truth/Tech Documents/OpenAI Quickstart.pdf` - OpenAI integration

---

### 5. **Conversation & Chat Module** (`conversation*`, `chat*`, `message*`)
**Files:** `conversationController.js`, `conversationService.js`, `conversationRoutes.js`, `chatController.js`, `messageController.js`, `messageService.js`

**Endpoints:**
- `POST /api/conversations` — Start conversation
- `GET /api/conversations/:id` — Get conversation details
- `GET /api/conversations` — List conversations
- `POST /api/chat` — Send chat message
- `GET /api/messages/:conversationId` — Get chat history
- `PUT /api/conversations/:id/status` — Update conversation status (human takeover)

**Responsibilities:**
- Conversation lifecycle management
- Chat message storage & retrieval
- Human takeover (escalation to admin)
- Message history pagination
- Real-time conversation status updates

**Reference:** `AI_Instruction/Source of truth/Architecht & Database.pdf` - Conversation & Message Data Models

---

### 6. **Reporting & Moderation Module** (`report*`)
**Files:** `reportController.js`, `reportService.js`, `reportRoutes.js`

**Endpoints:**
- `POST /api/reports` — Report AI Twin/conversation
- `GET /api/reports` — List reports (admin only)
- `PUT /api/reports/:id` — Update report status (admin only)

**Responsibilities:**
- Report submission & validation
- Report storage
- Report status tracking
- Admin review workflow

**Reference:** `AI_Instruction/Source of truth/PRD.pdf` - Reporting feature

---

### 7. **Analytics Module** (`analytics*`)
**Files:** `analyticsController.js`, `analyticsService.js`, `analyticsRoutes.js`

**Endpoints:**
- `GET /api/analytics/cards/:cardId` — Card usage stats
- `GET /api/analytics/conversations/:cardId` — Conversation stats
- `GET /api/analytics/ai-twins` — AI Twin performance metrics
- `GET /api/analytics/admin` — Admin dashboard analytics

**Responsibilities:**
- Event tracking (conversations, messages, reports)
- Metrics aggregation
- Dashboard data generation
- Performance monitoring

**Reference:** `AI_Instruction/Source of truth/Architecht & Database.pdf` - Analytics schema

---

## 📝 Naming Conventions (Backend)

### File Naming

```
controllers/
├── authController.js               ← PascalCase + Suffix "Controller"
├── userController.js
└── aiService.js

routes/
├── authRoutes.js                   ← camelCase + Suffix "Routes"
├── cardRoutes.js
└── conversationRoutes.js

services/
├── authService.js                  ← camelCase + Suffix "Service"
├── cardService.js
└── conversationService.js

middlewares/
├── authMiddleware.js               ← camelCase + Suffix "Middleware"
├── errorHandler.js
└── rateLimiter.js

utils/
├── toneMapper.js                   ← camelCase (utility names)
└── validators.js
```

### Function Naming

```javascript
// Controllers: verb-based, camelCase
getUser()                           ← GET request handler
createUser()                        ← POST request handler
updateUser()                        ← PUT request handler
deleteUser()                        ← DELETE request handler
getUserCards()                      ← GET nested resource

// Services: action-based, descriptive
fetchUserById(userId)
createNewCard(cardData)
updateCardStatus(cardId, status)
validateUserEmail(email)
generateJWTToken(userId)
queryFirestoreUsers(filters)

// Middleware: function that returns middleware
authMiddleware()                    ← Returns middleware function
errorHandler(err, req, res, next)
rateLimiter(req, res, next)

// Utilities: descriptive, verb-based
mapToneToPrompt(tone)
validateEmail(email)
hashPassword(password)
```

### Variable Naming

```javascript
// IDs
const userId = "user123";
const cardId = "card456";
const conversationId = "conv789";

// Data objects
const userData = {};
const cardData = { title: "...", slug: "..." };

// Booleans
const isAuthenticated = true;
const hasPermission = false;
const shouldRetry = true;

// Firebase references
const usersRef = db.collection("users");
const userDocRef = db.collection("users").doc(userId);

// Arrays
const userList = [];
const cardIds = [];
const conversationHistory = [];

// Counts & indices
const totalUsers = 100;
const pageIndex = 0;
const retryCount = 3;
```

---

## ✅ Code Quality Standards (Backend)

### 1. **Type Safety & Validation**
```javascript
// ✅ GOOD: Proper validation
function createUser(req, res) {
  const { email, name } = req.body;
  
  // Validate input
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }
  if (!name || name.trim().length === 0) {
    return res.status(400).json({ error: "Name required" });
  }
  
  // Process...
}

// ❌ BAD: No validation
function createUser(req, res) {
  const user = req.body;
  db.collection("users").add(user);
}
```

### 2. **Error Handling**
```javascript
// ✅ GOOD: Proper error handling
async function getUser(req, res) {
  try {
    const userId = req.params.id;
    const userDoc = await db.collection("users").doc(userId).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.json(userDoc.data());
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// ❌ BAD: No error handling
async function getUser(req, res) {
  const userDoc = await db.collection("users").doc(req.params.id).get();
  res.json(userDoc.data());
}
```

### 3. **Environment Variables**
```javascript
// ✅ GOOD: Use environment variables
const openaiApiKey = process.env.OPENAI_API_KEY;
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID
};

// ❌ BAD: Hardcoded secrets
const openaiApiKey = "sk-abc123xyz...";
const firebaseConfig = { apiKey: "AIzaSyD..." };
```

### 4. **JSDoc Comments**
```javascript
// ✅ GOOD: Clear JSDoc
/**
 * Fetch user by ID from Firestore
 * @param {string} userId - The user ID
 * @returns {Promise<Object>} User data
 * @throws {Error} If user not found
 */
async function getUserById(userId) {
  // ...
}

// ❌ BAD: No documentation
async function getUser(id) {
  // ...
}
```

### 5. **Efficient Firestore Queries**
```javascript
// ✅ GOOD: Indexed query with limit
db.collection("cards")
  .where("userId", "==", userId)
  .where("isPublished", "==", true)
  .orderBy("createdAt", "desc")
  .limit(10)
  .get()

// ❌ BAD: Fetching all then filtering (N+1 pattern)
const allCards = await db.collection("cards").get();
const userCards = allCards.docs
  .map(d => d.data())
  .filter(c => c.userId === userId && c.isPublished)
  .slice(0, 10);
```

---

## 🔐 Security Best Practices

### 1. **Firebase Security Rules**
Reference: `AI_Instruction/Source of truth/Architecht & Database.pdf` - Security section

**Rules per collection:**
- `users` — Only own profile read/write, admins can read all
- `cards` — Public read, creator can write
- `conversations` — Only participants can read/write
- `messages` — Only participants can read/write
- `ai_configs` — Only owner can read/write
- `reports` — Anyone can create, admins can read all

### 2. **Authentication & Authorization**
```javascript
// ✅ GOOD: Check authentication & authorization
async function updateCard(req, res) {
  const cardId = req.params.id;
  const userId = req.user.id;  // From auth middleware
  
  const cardDoc = await db.collection("cards").doc(cardId).get();
  
  // Authorization check
  if (cardDoc.data().userId !== userId) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  
  // Update...
}
```

### 3. **Input Validation & Sanitization**
```javascript
// ✅ GOOD: Validate & sanitize
function validateCardInput(data) {
  const errors = [];
  
  if (!data.title || typeof data.title !== "string") {
    errors.push("Title is required and must be string");
  }
  
  if (!data.slug || !/^[a-z0-9-]+$/.test(data.slug)) {
    errors.push("Slug must contain only lowercase letters, numbers, and hyphens");
  }
  
  if (data.bio && data.bio.length > 500) {
    errors.push("Bio must be under 500 characters");
  }
  
  return { valid: errors.length === 0, errors };
}
```

### 4. **Rate Limiting**
```javascript
// ✅ GOOD: Rate limit sensitive endpoints
const createUserLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // 5 requests per windowMs
});

app.post("/api/auth/register", createUserLimiter, authController.register);
```

---

## 🧪 Testing Strategy (Backend)

### Unit Tests (Jest)
```javascript
// ✅ Example: Service test
describe("UserService", () => {
  describe("createUser", () => {
    it("should create user with valid data", async () => {
      const userData = { email: "test@mail.com", name: "Test User" };
      const result = await userService.createUser(userData);
      
      expect(result).toHaveProperty("id");
      expect(result.email).toBe(userData.email);
    });
    
    it("should throw error for invalid email", async () => {
      const userData = { email: "invalid-email", name: "Test" };
      
      await expect(userService.createUser(userData))
        .rejects.toThrow("Invalid email");
    });
  });
});
```

### Integration Tests
- Test API endpoints with real Firestore (test database)
- Test authentication flow (register → login → verify token)
- Test error scenarios (invalid input, 404, 403, etc.)

### Test Modules (7 Modules per TEST PLAN.pdf)
```
Testing/Backend/tests/
├── Module_1_Auth.test.js               ← Authentication module
├── Module_2_Card_Profile.test.js       ← Card & User profile
├── Module_3_AI_Config.test.js          ← AI Twin configuration
├── Module_4_Chatbot_AI.test.js         ← Chat & AI responses
├── Module_5_Fallback_Inbox.test.js     ← Conversation & inbox
├── Module_6_Human_Takeover.test.js     ← Human takeover workflow
└── Module_7_Admin_Panel.test.js        ← Admin operations
```

---

## 📋 API Documentation (Swagger)

**File:** `Backend/src/config/swagger.js`

Every endpoint MUST have Swagger documentation:

```javascript
/**
 * @swagger
 * /api/cards:
 *   post:
 *     summary: Create a new digital card
 *     parameters:
 *       - in: body
 *         name: card
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title: { type: string }
 *             slug: { type: string }
 *     responses:
 *       201:
 *         description: Card created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
```

---

## 📊 Firestore Data Models

Reference: `AI_Instruction/Source of truth/Architecht & Database.pdf`

### Key Collections

**users**
```javascript
{
  id: "user123",
  email: "user@mail.com",
  name: "John Doe",
  profileImage: "https://...",
  role: "user" | "admin",
  isActive: true,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

**cards**
```javascript
{
  id: "card123",
  userId: "user123",
  title: "John's Card",
  slug: "johns-card",
  bio: "...",
  aiTwinEnabled: true,
  aiConfig: { /* AI Twin settings */ },
  isPublished: true,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

**conversations**
```javascript
{
  id: "conv123",
  cardId: "card123",
  visitorId: "visitor456",
  status: "active" | "escalated" | "closed",
  aiTwinResponse: { /* AI response data */ },
  humanTakeoverAt: Timestamp | null,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

**messages**
```javascript
{
  id: "msg123",
  conversationId: "conv123",
  sender: "visitor" | "ai" | "human",
  content: "...",
  metadata: { /* tone, sentiment, etc */ },
  createdAt: Timestamp
}
```

---

## 🚀 Deployment Checklist

Before deploying to production:

- ✅ All tests passed (Jest unit + integration)
- ✅ No hardcoded secrets (all in .env)
- ✅ API documentation complete (Swagger)
- ✅ Error handling implemented
- ✅ Rate limiting configured
- ✅ Firebase security rules reviewed
- ✅ Performance optimized (no N+1 queries)
- ✅ Logging configured
- ✅ Environment variables set in production
- ✅ Database backups configured

---

## 📞 Common Issues & Solutions

### Issue: N+1 Query Problem
```javascript
// ❌ BAD: N+1 queries
const conversations = await db.collection("conversations").where("cardId", "==", cardId).get();
for (const conv of conversations.docs) {
  const messages = await db.collection("messages").where("conversationId", "==", conv.id).get(); // N queries!
}

// ✅ GOOD: Single query (or batch query)
const messages = await db.collection("messages").where("cardId", "==", cardId).get();
const grouped = {};
messages.docs.forEach(doc => {
  const convId = doc.data().conversationId;
  if (!grouped[convId]) grouped[convId] = [];
  grouped[convId].push(doc.data());
});
```

### Issue: Firestore Limits
- Max write rate: 1 write per second per document
- Max collection size: Unlimited, but queries get slower
- Solution: Denormalization, subcollections, caching

### Issue: AI Response Latency
- OpenAI API calls take 1-5 seconds
- Solution: Use async processing, queue system, caching

---

## 📝 Development Workflow

1. **Read Requirements**
   - Check `AI_Instruction/Source of truth/PRD.pdf` for feature requirements
   - Check `AI_Instruction/Source of truth/Architecht & Database.pdf` for data models

2. **Design API**
   - Define endpoint paths, methods, request/response schemas
   - Update Swagger documentation before implementation

3. **Implement**
   - Create controller → service → routes
   - Add input validation
   - Add error handling
   - Write unit tests

4. **Test**
   - Unit tests (Jest)
   - Integration tests (with test Firestore)
   - API tests (Postman)

5. **Document**
   - Update Swagger docs
   - Update API documentation
   - Add code comments for non-obvious logic

6. **Commit**
   - Git commit with clear message
   - Reference related documents (PRD, Architecture)

---

## 🔗 Key References

| Document | Location | When to Read |
|----------|----------|---|
| **PRD** | `AI_Instruction/Source of truth/PRD.pdf` | Feature planning |
| **Architecture & Database** | `AI_Instruction/Source of truth/Architecht & Database.pdf` | API design, data models |
| **Test Plan** | `AI_Instruction/Source of truth/TEST PLAN.pdf` | Test strategy |
| **System Agent Guideline** | `AI_Instruction/System_Agent_Guideline.md` | General rules & procedures |
| **Technology Docs** | `AI_Instruction/Source of truth/Tech Documents/` | Tech stack reference |
| **Digital Twin Docs** | `AI_Instruction/Source of truth/DigitalTwin_Document.md` | AI Twin feature |

---

## 📡 API Endpoints Documentation (Swagger)

Reference: `AI_Instruction/Source of truth/Architecht & Database.pdf` - Section 7: API Design

### Module 1: Authentication Endpoints

```
POST /api/auth/register
- Request: { email, password, name }
- Response (201): { userId, token, email }
- Error (400): { error: "Invalid email" }
- Error (409): { error: "Email already exists" }

POST /api/auth/login
- Request: { email, password }
- Response (200): { userId, token, email, role }
- Error (401): { error: "Invalid credentials" }

POST /api/auth/logout
- Request: {} (requires Bearer token)
- Response (200): { message: "Logged out" }
- Error (401): { error: "Unauthorized" }

GET /api/auth/verify
- Request: {} (requires Bearer token)
- Response (200): { userId, email, role, isValid: true }
- Error (401): { error: "Token expired" }
```

### Module 2: Card Management Endpoints

```
POST /api/cards
- Request: { title, slug, bio, userId }
- Response (201): { cardId, title, slug, createdAt }
- Error (400): { error: "Slug must be unique" }

GET /api/cards/:cardId
- Response (200): { cardId, title, slug, bio, status, ... }
- Error (404): { error: "Card not found" }

PUT /api/cards/:cardId
- Request: { title, slug, bio, status, ... }
- Response (200): { cardId, updatedAt, ... }
- Error (403): { error: "Unauthorized" }

DELETE /api/cards/:cardId
- Response (200): { message: "Card deleted" }
- Error (403): { error: "Unauthorized" }

GET /api/cards/slug/:slug
- Response (200): { cardId, title, bio, ... }
- Error (404): { error: "Card not found" }

GET /api/cards
- Query: { userId, limit=10, offset=0 }
- Response (200): { cards: [], total, hasMore }
```

### Module 3: AI Twin Configuration

```
POST /api/cards/:cardId/ai-config
- Request: { persona, knowledgeBase[], systemPrompt, toneOfVoice }
- Response (201): { configId, cardId, ... }

GET /api/cards/:cardId/ai-config
- Response (200): { configId, persona, systemPrompt, ... }

PUT /api/cards/:cardId/ai-config
- Request: { persona, knowledgeBase[], systemPrompt }
- Response (200): { configId, updatedAt }

POST /api/cards/:cardId/ai-config/test-response
- Request: { message }
- Response (200): { response, metadata }
- Error (503): { error: "AI service unavailable" }
```

### Module 4: Chat Endpoints

```
POST /api/chat
- Request: { cardId, message, conversationId? }
- Response (200): { conversationId, response, metadata }
- Error (429): { error: "Rate limited" }
- Error (503): { error: "AI service unavailable" }
```

### Module 5: Conversation & Inbox Endpoints

```
GET /api/conversations
- Query: { cardId, userId, status?, limit=20, offset=0 }
- Response (200): { conversations: [], total }

GET /api/conversations/:conversationId
- Response (200): { conversationId, cardId, status, messages: [] }

GET /api/messages/:conversationId
- Query: { limit=50, offset=0 }
- Response (200): { messages: [], total }

POST /api/cards/:cardId/messages
- Request: { senderName, senderEmail, content }
- Response (201): { messageId, cardId, createdAt }

PUT /api/messages/:messageId/read
- Response (200): { messageId, isRead: true }
```

### Module 6: Human Takeover Endpoints

```
PUT /api/conversations/:conversationId/escalate
- Request: { reason }
- Response (200): { conversationId, status: "escalated" }

GET /api/conversations/:conversationId/transcript
- Response (200): { transcript: "...", format: "text" }

POST /api/conversations/:conversationId/response
- Request: { message }
- Response (201): { messageId, conversationId }
```

### Module 7: Admin Endpoints

```
GET /api/admin/users
- Response (200): { users: [], total } (admin only)
- Error (403): { error: "Forbidden" }

PUT /api/admin/users/:userId/status
- Request: { status: "active"|"banned" }
- Response (200): { userId, status }

GET /api/admin/reports
- Query: { status?, limit=20 }
- Response (200): { reports: [], total }

PUT /api/admin/reports/:reportId/resolve
- Request: { action: "approve"|"reject", note? }
- Response (200): { reportId, status: "resolved" }

GET /api/admin/analytics
- Response (200): { totalUsers, totalCards, totalConversations, ... }
```

### Standard Response Format

```javascript
// Success Response
{
  "success": true,
  "data": { /* response payload */ },
  "message": "Operation successful"
}

// Error Response
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Human-readable error message in Vietnamese",
  "details": { /* optional details */ }
}
```

### HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK - Request succeeded | GET card successful |
| 201 | Created - Resource created | Card created successfully |
| 400 | Bad Request - Invalid input | Invalid email format |
| 401 | Unauthorized - Missing/invalid token | Token expired |
| 403 | Forbidden - Insufficient permissions | Cannot edit other's card |
| 404 | Not Found - Resource doesn't exist | Card not found |
| 409 | Conflict - Duplicate resource | Email already exists |
| 429 | Too Many Requests - Rate limited | API rate limit exceeded |
| 500 | Server Error | Database connection failed |
| 503 | Service Unavailable | OpenAI API down |

---

## 🤖 OpenAI Integration Details

Reference: `AI_Instruction/Source of truth/Tech Documents/OpenAI Quickstart.pdf`

### Architecture

```
1. Receive message from Frontend
   ↓
2. Fetch card's AI configuration (persona, knowledge base)
   ↓
3. Build system prompt
   - Global guardrails (safety rules)
   - Card owner's system prompt
   - Knowledge base context (RAG)
   ↓
4. Send to OpenAI API
   - Model: gpt-4o-mini
   - Temperature: 0.7 (balanced creativity)
   - Max tokens: 300-500
   ↓
5. Process response
   - Validate response format
   - Check for guardrail violations
   ↓
6. Store in Firestore
   - Save message to messages collection
   - Update conversation metadata
   ↓
7. Return to Frontend
   - JSON with response text
```

### System Prompt Structure

```javascript
// Build system prompt from multiple sources
function buildSystemPrompt(card, globalRules) {
  return `
${globalRules.safetyGuidelines}

---

Card Owner Profile:
- Name: ${card.fullName}
- Job Title: ${card.jobTitle}
- Experience: ${card.knowledgeData.experience}

You are ${card.fullName}'s AI assistant. Respond as if you are them:
${card.aiConfig.systemPrompt}

Tone of Voice: ${card.aiConfig.toneOfVoice}

Knowledge Base (use for context):
${JSON.stringify(card.aiConfig.knowledgeData, null, 2)}

Remember: Only answer based on the above information. Do not fabricate.
  `.trim();
}
```

### Guardrails Implementation

```javascript
// Merge global guardrails with card-specific rules
function buildGuardrails(globalRules, cardRules) {
  const guardrails = {
    prohibited_topics: [
      ...globalRules.prohibitedTopics,
      ...cardRules.customProhibited
    ],
    safety_check: true,
    max_tokens: 500,
    temperature: 0.7
  };

  return guardrails;
}

// Check response against guardrails
function validateAIResponse(response, guardrails) {
  // Check for prohibited topics
  for (const topic of guardrails.prohibited_topics) {
    if (response.toLowerCase().includes(topic.toLowerCase())) {
      return {
        valid: false,
        reason: "Prohibited topic detected",
        message: "I cannot discuss that topic"
      };
    }
  }

  // Check response length
  if (response.length > 2000) {
    return {
      valid: false,
      reason: "Response too long",
      message: "Response exceeds maximum length"
    };
  }

  return { valid: true };
}
```

### Error Handling & Fallback

```javascript
async function chatWithAI(cardId, message) {
  try {
    // Rate limiting check
    if (isRateLimited(cardId)) {
      return {
        success: true,
        response: "You've sent too many messages. Please wait a moment.",
        isFallback: true
      };
    }

    // Check AI is enabled
    const card = await getCard(cardId);
    if (!card.aiConfig.aiStatus === "Ready") {
      return {
        success: true,
        response: "AI is currently unavailable. Please leave a message.",
        isFallback: true
      };
    }

    // Build & validate prompt
    const systemPrompt = buildSystemPrompt(card);
    const guardrails = buildGuardrails(globalRules, card.aiConfig);

    // Call OpenAI
    const response = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    // Validate response
    const validation = validateAIResponse(response.choices[0].message.content, guardrails);
    if (!validation.valid) {
      return {
        success: true,
        response: validation.message,
        isFallback: true
      };
    }

    // Store & return
    await storeMessage(cardId, {
      sender: "ai",
      content: response.choices[0].message.content
    });

    return {
      success: true,
      response: response.choices[0].message.content,
      isFallback: false
    };

  } catch (error) {
    logger.error("OpenAI API error", { error, cardId });

    if (error.code === "rate_limit_exceeded") {
      return {
        success: true,
        response: "The service is busy. Please try again later.",
        isFallback: true
      };
    }

    if (error.code === "server_error") {
      return {
        success: true,
        response: "The inbox is overloaded right now. Please leave a message!",
        isFallback: true
      };
    }

    return {
      success: false,
      error: "Internal server error",
      message: "Failed to process chat request"
    };
  }
}
```

### Cost Optimization

```javascript
// Strategy 1: Limit output tokens
const MAX_OUTPUT_TOKENS = 500;  // Prevent runaway responses

// Strategy 2: Use cheaper model
const MODEL = "gpt-4o-mini";    // Lower cost than gpt-4

// Strategy 3: Implement caching
const responseCache = new Map();

async function getCachedResponse(cacheKey) {
  if (responseCache.has(cacheKey)) {
    const cached = responseCache.get(cacheKey);
    if (Date.now() - cached.timestamp < 3600000) { // 1 hour
      return cached.response;
    }
  }
  return null;
}

// Strategy 4: Rate limiting per card
const rateLimits = {
  chatLimit: 10,      // 10 messages per minute
  dailyLimit: 1000    // 1000 messages per day
};
```

---

## 🎯 Backend Performance Baselines

### API Response Time Targets

| Endpoint | Method | Target | Measurement |
|----------|--------|--------|-------------|
| POST /api/auth/login | POST | < 500ms | Token verification time |
| POST /api/cards | POST | < 1s | Card creation time |
| GET /api/cards/:slug | GET | < 500ms | Public card retrieval |
| POST /api/chat | POST | < 3s | AI response generation |
| GET /api/conversations | GET | < 1s | List conversations |
| GET /api/messages | GET | < 1s | Message history retrieval |
| PUT /api/admin/users/:id | PUT | < 500ms | Admin operations |

### Firestore Query Performance

```javascript
// Query targets
const PERFORMANCE_TARGETS = {
  smallQuery: 100,      // < 100ms (1-10 documents)
  mediumQuery: 500,     // < 500ms (10-100 documents)
  largeQuery: 2000      // < 2000ms (100+ documents)
};

// Monitor query performance
async function measureQueryPerformance(query) {
  const start = Date.now();
  const result = await query.get();
  const duration = Date.now() - start;

  logger.info("Query performance", {
    documents: result.size,
    duration,
    target: duration < PERFORMANCE_TARGETS.mediumQuery ? "✅ PASS" : "⚠️ SLOW"
  });

  return result;
}
```

### Cost Monitoring

```javascript
// Track OpenAI API costs
class CostTracker {
  trackRequest(model, inputTokens, outputTokens) {
    const costs = {
      "gpt-4o-mini": { input: 0.0005, output: 0.0015 }  // per token
    };

    const totalCost =
      (inputTokens * costs[model].input) +
      (outputTokens * costs[model].output);

    logger.info("API cost", { model, inputTokens, outputTokens, totalCost });
    return totalCost;
  }

  // Daily/monthly limits
  checkBudget(spent, dailyLimit = 50) {
    if (spent > dailyLimit) {
      logger.warn("Daily budget exceeded", { spent, limit: dailyLimit });
      return false;
    }
    return true;
  }
}
```

---

## 📝 Logging & Monitoring Strategy

### What to Log

```javascript
// API Requests
logger.info("API Request", {
  method: req.method,
  path: req.path,
  userId: req.user?.id,
  timestamp: new Date()
});

// Authentication Events
logger.info("User Login", {
  userId,
  email,
  provider,
  timestamp: new Date()
});

logger.error("Login Failed", {
  email,
  reason: "Invalid credentials",
  attempt: attemptCount
});

// Database Operations
logger.info("Firestore Operation", {
  operation: "create",
  collection: "cards",
  documentId: cardId,
  duration: executionTime
});

logger.error("Firestore Error", {
  operation: "query",
  collection: "conversations",
  error: error.message
});

// AI API Calls
logger.info("OpenAI Request", {
  cardId,
  model: "gpt-4o-mini",
  inputTokens,
  outputTokens,
  duration: responseTime
});

logger.error("OpenAI Error", {
  cardId,
  error: error.message,
  code: error.code
});

// Errors (All)
logger.error("Unhandled Error", {
  message: error.message,
  stack: error.stack,
  context: { userId, cardId, path: req.path }
});
```

### Log Levels

```javascript
// DEBUG: Development details (not in production)
logger.debug("Variable value", { value });

// INFO: General information (login, API calls)
logger.info("User registered", { email, userId });

// WARN: Warning conditions (unusual but not error)
logger.warn("Slow query detected", { duration: 5000 });

// ERROR: Error conditions (failures, exceptions)
logger.error("Database error", { error });

// FATAL: Critical errors (system shutdown)
logger.fatal("Database connection lost", { error });
```

### Example Logging Setup

```javascript
// logger.js
const winston = require("winston");

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.json(),
  defaultMeta: { service: "persona-digital-twin" },
  transports: [
    // Error logs
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error"
    }),
    // All logs
    new winston.transports.File({
      filename: "logs/combined.log"
    })
  ]
});

// Add console transport in development
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

module.exports = logger;
```

---

## ⏱️ Backend Testing Timeline (6 Phases)

Reference: `Testing_Agent_Guideline.md` v2.0 - Phase descriptions

### Phase 1 & 2: Module 1-4 Testing (Week 1-4)

**Module 1: Auth**
```bash
npm run test -- Module_1_Auth
# Tests:
# - register endpoint (valid/invalid emails)
# - login endpoint (success/failure)
# - token validation
# - OAuth integration
```

**Module 2: Card**
```bash
npm run test -- Module_2_Card_Profile
# Tests:
# - create card API
# - update card API
# - delete card (soft delete)
# - slug uniqueness
# - QR code generation
```

**Module 3: AI Config**
```bash
npm run test -- Module_3_AI_Config
# Tests:
# - save AI config
# - update knowledge base
# - test response endpoint
# - validate prompt rules
```

**Module 4: Chat**
```bash
npm run test -- Module_4_Chatbot_AI
# Tests:
# - send message to AI
# - AI response generation
# - conversation context preservation
# - AI accuracy (≥ 90%)
# - Guardrail compliance
```

### Phase 3: Module 5-7 Testing (Week 4-5)

**Module 5: Inbox**
```bash
npm run test -- Module_5_Fallback_Inbox
```

**Module 6: Human Takeover**
```bash
npm run test -- Module_6_Human_Takeover
```

**Module 7: Admin**
```bash
npm run test -- Module_7_Admin_Panel
```

### Phase 4: Performance & Security (Week 5-6)

- API response time monitoring
- Firestore query optimization verification
- Security audit (XSS, SQL injection, etc.)
- Load testing (optional, for MVP)

### Phase 5 & 6: Regression & Release (Week 6-8)

- Run regression test suite
- Verify all bug fixes
- Final release checklist

---

## ✅ Pre-Implementation Checklist

Before starting any feature:

**Documentation Review**:
- ✅ Have I read the PRD for this feature?
- ✅ Have I reviewed the architecture design?
- ✅ Do I understand the data models?

**Planning**:
- ✅ Are the API endpoints documented (request/response)?
- ✅ Have I planned error scenarios?
- ✅ Do I have Firestore security rules?
- ✅ Have I considered performance impact?

**Implementation Readiness**:
- ✅ Is there a test plan for this feature?
- ✅ Have I checked for existing similar code?
- ✅ Do I understand the performance targets?

**AI Integration** (if applicable):
- ✅ Have I reviewed OpenAI integration strategy?
- ✅ Do I understand guardrails implementation?
- ✅ Have I planned error fallback?
- ✅ Have I considered cost optimization?

---

**Version:** 1.1 (Enhanced)
**Last Updated:** 2026
**Status:** Active ✅

*Enhanced version with API documentation, OpenAI integration, performance baselines, logging strategy, and testing timeline.*
