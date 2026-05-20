# Backend API Documentation Guideline

**Hướng dẫn chi tiết cho việc tài liệu hóa API endpoints trong Backend của dự án Persona-Based Digital Twin Card.**

---

## 📋 API Documentation là gì?

API Documentation định nghĩa chi tiết các HTTP endpoints, request/response formats, error codes. Sử dụng Swagger/OpenAPI để auto-generate interactive documentation.

**Trách nhiệm của Documentation:**
- ✅ Define endpoints (method, path, parameters)
- ✅ Define request schemas
- ✅ Define response schemas
- ✅ Define error codes & messages
- ✅ Provide examples
- ✅ Keep synchronized with code

---

## 🎯 Standard Response Format

### Success Response

```javascript
{
  "success": true,
  "data": { /* response payload */ },
  "message": "Operation successful"
}
```

### Error Response

```javascript
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Human-readable message in Vietnamese"
}
```

### Paginated Response

```javascript
{
  "success": true,
  "data": [ /* items */ ],
  "pagination": {
    "total": 100,
    "limit": 10,
    "offset": 0,
    "hasMore": true
  },
  "message": "List retrieved"
}
```

---

## 📝 Swagger/OpenAPI Documentation

### Complete Endpoint Documentation Template

```javascript
/**
 * @swagger
 * /api/resource/{id}:
 *   get:
 *     summary: Get resource by ID
 *     description: Fetch a single resource by its ID
 *     tags: [Resources]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Resource ID
 *         schema:
 *           type: string
 *       - in: query
 *         name: includeDetails
 *         required: false
 *         description: Include detailed information
 *         schema:
 *           type: boolean
 *           default: false
 *     responses:
 *       200:
 *         description: Resource retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "resource123"
 *                     name:
 *                       type: string
 *                       example: "Resource Name"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                 message:
 *                   type: string
 *                   example: "Resource retrieved"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "INVALID_ID"
 *                 message:
 *                   type: string
 *                   example: "Invalid resource ID"
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       404:
 *         description: Resource not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authMiddleware, ResourceController.getResource);
```

---

## 📚 Complete API Endpoints Documentation

### Module 1: Authentication

#### POST /api/auth/register

```javascript
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, name]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: "securePassword123"
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId: { type: string }
 *                     email: { type: string }
 *                     token: { type: string }
 *       400:
 *         description: Invalid input or validation error
 *       409:
 *         description: Email already registered
 */
```

#### POST /api/auth/login

```javascript
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
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId: { type: string }
 *                     email: { type: string }
 *                     role: { type: string, enum: [user, admin] }
 *                     token: { type: string }
 *       401:
 *         description: Invalid credentials
 */
```

#### GET /api/auth/verify

```javascript
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId: { type: string }
 *                     email: { type: string }
 *                     role: { type: string }
 *       401:
 *         description: Token invalid or expired
 */
```

### Module 2: Digital Cards

#### POST /api/cards

```javascript
/**
 * @swagger
 * /api/cards:
 *   post:
 *     summary: Create digital card
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
 *               title:
 *                 type: string
 *                 example: "John's Card"
 *               slug:
 *                 type: string
 *                 pattern: "^[a-z0-9-]+$"
 *                 example: "johns-card"
 *               bio:
 *                 type: string
 *                 maxLength: 500
 *     responses:
 *       201:
 *         description: Card created successfully
 *       400:
 *         description: Invalid input
 *       409:
 *         description: Slug already taken
 */
```

#### GET /api/cards

```javascript
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
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Max items to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Items to skip
 *     responses:
 *       200:
 *         description: Cards list retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: string }
 *                       title: { type: string }
 *                       slug: { type: string }
 *                       bio: { type: string }
 *                       isPublished: { type: boolean }
 *                       createdAt: { type: string, format: date-time }
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total: { type: integer }
 *                     limit: { type: integer }
 *                     offset: { type: integer }
 *                     hasMore: { type: boolean }
 */
```

#### GET /api/cards/:id

```javascript
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
```

#### GET /api/cards/slug/:slug

```javascript
/**
 * @swagger
 * /api/cards/slug/{slug}:
 *   get:
 *     summary: Get card by slug (public)
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
```

#### PUT /api/cards/:id

```javascript
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
 *         description: Forbidden - not owner
 *       404:
 *         description: Card not found
 */
```

#### DELETE /api/cards/:id

```javascript
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
 *         description: Forbidden - not owner
 *       404:
 *         description: Card not found
 */
```

### Module 3: Chat & Conversations

#### POST /api/chat

```javascript
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
 *               cardId:
 *                 type: string
 *                 example: "card123"
 *               message:
 *                 type: string
 *                 example: "What is your expertise?"
 *               conversationId:
 *                 type: string
 *                 description: Optional - continue existing conversation
 *     responses:
 *       200:
 *         description: AI response generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     conversationId: { type: string }
 *                     response: { type: string }
 *                     metadata:
 *                       type: object
 *                       properties:
 *                         tone: { type: string }
 *                         confidence: { type: number }
 *       400:
 *         description: Invalid input
 *       429:
 *         description: Rate limited
 *       503:
 *         description: AI service unavailable
 */
```

#### GET /api/conversations

```javascript
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
 *         schema:
 *           type: string
 *           enum: [active, escalated, closed]
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *       - in: query
 *         name: offset
 *         schema: { type: integer, default: 0 }
 *     responses:
 *       200:
 *         description: Conversations list retrieved
 */
```

#### GET /api/conversations/:id

```javascript
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
```

### Module 4: Analytics

#### GET /api/analytics/cards/:cardId

```javascript
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data:
 *                   type: object
 *                   properties:
 *                     cardId: { type: string }
 *                     totalViews: { type: integer }
 *                     totalConversations: { type: integer }
 *                     averageResponseTime: { type: number }
 *                     aiAccuracy: { type: number }
 *                     createdAt: { type: string, format: date-time }
 */
```

---

## 🔍 Error Codes Reference

| Code | HTTP | Description |
|------|------|-------------|
| `MISSING_TOKEN` | 401 | Authorization header missing |
| `INVALID_TOKEN` | 401 | Token format invalid |
| `TOKEN_EXPIRED` | 401 | Token has expired |
| `MISSING_REQUIRED_FIELD` | 400 | Required field missing |
| `INVALID_INPUT` | 400 | Input format invalid |
| `INVALID_EMAIL` | 400 | Email format invalid |
| `INVALID_PASSWORD` | 400 | Password too weak |
| `INVALID_SLUG` | 400 | Slug format invalid |
| `INVALID_CREDENTIALS` | 401 | Email/password wrong |
| `EMAIL_ALREADY_EXISTS` | 409 | Email already registered |
| `SLUG_EXISTS` | 409 | Slug already taken |
| `UNAUTHORIZED` | 401 | Auth failed |
| `FORBIDDEN` | 403 | Permission denied |
| `NOT_FOUND` | 404 | Resource not found |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_SERVER_ERROR` | 500 | Server error |
| `SERVICE_UNAVAILABLE` | 503 | Service down |

---

## ✅ Swagger Configuration Example

```javascript
// config/swagger.js

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Persona Digital Twin API",
      version: "1.0.0",
      description: "API documentation for Persona-Based Digital Twin Card"
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: "Development server"
      },
      {
        url: "https://api.example.com",
        description: "Production server"
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      schemas: {
        Error: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            error: { type: "string" },
            message: { type: "string" }
          }
        },
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            email: { type: "string" },
            name: { type: "string" },
            role: { type: "string", enum: ["user", "admin"] },
            createdAt: { type: "string", format: "date-time" }
          }
        },
        Card: {
          type: "object",
          properties: {
            id: { type: "string" },
            userId: { type: "string" },
            title: { type: "string" },
            slug: { type: "string" },
            bio: { type: "string" },
            isPublished: { type: "boolean" },
            createdAt: { type: "string", format: "date-time" }
          }
        }
      }
    },
    security: [{ BearerAuth: [] }]
  },
  apis: ["./src/routes/*.js"]
};

module.exports = swaggerOptions;
```

---

## 📋 Documentation Checklist

Trước khi release API:

- ✅ All endpoints documented?
- ✅ Request/response schemas correct?
- ✅ Error codes documented?
- ✅ Authentication requirements clear?
- ✅ Rate limits specified?
- ✅ Examples provided?
- ✅ Swagger/OpenAPI valid?
- ✅ Response status codes correct?

---

**Version:** 1.0
**Last Updated:** 2026
**Status:** Active ✅
