# Backend Controllers Guideline - Node.js + Express + Firebase

**Hướng dẫn chi tiết cho việc xây dựng Controllers trong Backend của dự án Persona-Based Digital Twin Card.**

---

## 📋 Controllers là gì?

Controllers là những files chứa các hàm xử lý HTTP requests từ Routes. Chúng là nơi xác nhận input, gọi Services, và trả về responses.

**Trách nhiệm của Controllers:**
- ✅ Nhận request từ client
- ✅ Xác thực (authentication & authorization)
- ✅ Validate input data
- ✅ Gọi Services để xử lý business logic
- ✅ Format response
- ✅ Xử lý errors

**Không phải trách nhiệm:**
- ❌ Business logic (để cho Services)
- ❌ Database operations (để cho Services)
- ❌ Routing (để cho Routes)

---

## 🏗️ Cấu Trúc Controllers

```
Backend/src/controllers/
├── authController.js            ← Authentication (register, login, logout, verify)
├── userController.js            ← User management (CRUD, profile)
├── cardController.js            ← Digital card (CRUD, publish, slug)
├── conversationController.js    ← Conversations (list, get, create)
├── messageController.js         ← Messages (send, list, read)
├── chatController.js            ← Chat with AI (send message, get history)
├── reportController.js          ← Reports (create, list, update status)
└── analyticsController.js       ← Analytics (card stats, conversation stats, admin dashboard)
```

---

## 💾 File Template cho Controller

```javascript
// controllers/exampleController.js

const { db, admin } = require("../config/firebase");
const ExampleService = require("../services/exampleService");
const logger = require("../utils/logger");

/**
 * GET /api/examples/:id
 * Get example by ID
 */
exports.getExample = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate input
    if (!id) {
      return res.status(400).json({
        success: false,
        error: "MISSING_REQUIRED_FIELD",
        message: "ID is required"
      });
    }

    // Call service
    const example = await ExampleService.getById(id);

    // Check if found
    if (!example) {
      return res.status(404).json({
        success: false,
        error: "NOT_FOUND",
        message: "Example not found"
      });
    }

    // Return response
    res.status(200).json({
      success: true,
      data: example,
      message: "Example retrieved successfully"
    });

  } catch (error) {
    logger.error("Error in getExample", { error, id: req.params.id });
    res.status(500).json({
      success: false,
      error: "INTERNAL_SERVER_ERROR",
      message: "Failed to retrieve example"
    });
  }
};

/**
 * POST /api/examples
 * Create new example
 */
exports.createExample = async (req, res) => {
  try {
    const userId = req.user.id;  // From auth middleware
    const { name, description } = req.body;

    // Validate input
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "INVALID_INPUT",
        message: "Name is required and must be a non-empty string"
      });
    }

    if (description && description.length > 500) {
      return res.status(400).json({
        success: false,
        error: "INVALID_INPUT",
        message: "Description must be under 500 characters"
      });
    }

    // Prepare data
    const exampleData = {
      name: name.trim(),
      description: description?.trim() || "",
      userId,
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now()
    };

    // Call service
    const result = await ExampleService.create(exampleData);

    // Return response
    res.status(201).json({
      success: true,
      data: result,
      message: "Example created successfully"
    });

  } catch (error) {
    logger.error("Error in createExample", { error, userId: req.user?.id });
    res.status(500).json({
      success: false,
      error: "INTERNAL_SERVER_ERROR",
      message: "Failed to create example"
    });
  }
};

/**
 * PUT /api/examples/:id
 * Update example
 */
exports.updateExample = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { name, description } = req.body;

    // Validate input
    if (!id) {
      return res.status(400).json({
        success: false,
        error: "MISSING_REQUIRED_FIELD",
        message: "ID is required"
      });
    }

    // Check authorization
    const example = await ExampleService.getById(id);
    if (!example) {
      return res.status(404).json({
        success: false,
        error: "NOT_FOUND",
        message: "Example not found"
      });
    }

    if (example.userId !== userId) {
      return res.status(403).json({
        success: false,
        error: "FORBIDDEN",
        message: "You don't have permission to update this example"
      });
    }

    // Validate new data
    const updateData = {};
    if (name !== undefined) {
      if (typeof name !== "string" || name.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: "INVALID_INPUT",
          message: "Name must be a non-empty string"
        });
      }
      updateData.name = name.trim();
    }

    if (description !== undefined) {
      if (description.length > 500) {
        return res.status(400).json({
          success: false,
          error: "INVALID_INPUT",
          message: "Description must be under 500 characters"
        });
      }
      updateData.description = description.trim();
    }

    updateData.updatedAt = admin.firestore.Timestamp.now();

    // Call service
    const result = await ExampleService.update(id, updateData);

    // Return response
    res.status(200).json({
      success: true,
      data: result,
      message: "Example updated successfully"
    });

  } catch (error) {
    logger.error("Error in updateExample", { error, id: req.params.id });
    res.status(500).json({
      success: false,
      error: "INTERNAL_SERVER_ERROR",
      message: "Failed to update example"
    });
  }
};

/**
 * DELETE /api/examples/:id
 * Delete example
 */
exports.deleteExample = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Validate input
    if (!id) {
      return res.status(400).json({
        success: false,
        error: "MISSING_REQUIRED_FIELD",
        message: "ID is required"
      });
    }

    // Check authorization
    const example = await ExampleService.getById(id);
    if (!example) {
      return res.status(404).json({
        success: false,
        error: "NOT_FOUND",
        message: "Example not found"
      });
    }

    if (example.userId !== userId) {
      return res.status(403).json({
        success: false,
        error: "FORBIDDEN",
        message: "You don't have permission to delete this example"
      });
    }

    // Call service
    await ExampleService.delete(id);

    // Return response
    res.status(200).json({
      success: true,
      data: null,
      message: "Example deleted successfully"
    });

  } catch (error) {
    logger.error("Error in deleteExample", { error, id: req.params.id });
    res.status(500).json({
      success: false,
      error: "INTERNAL_SERVER_ERROR",
      message: "Failed to delete example"
    });
  }
};
```

---

## 📋 Chi tiết các Controllers

### 1. **authController.js** - Authentication

**Endpoints:**
- `POST /api/auth/register` → `register()`
- `POST /api/auth/login` → `login()`
- `POST /api/auth/logout` → `logout()`
- `GET /api/auth/verify` → `verify()`

**Implement:**
```javascript
exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate inputs
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: "INVALID_EMAIL",
        message: "Email is required and must be valid"
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "INVALID_PASSWORD",
        message: "Password must be at least 6 characters"
      });
    }

    if (!name || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "INVALID_NAME",
        message: "Name is required"
      });
    }

    // Call service
    const result = await AuthService.register(email, password, name);

    res.status(201).json({
      success: true,
      data: result,
      message: "User registered successfully"
    });

  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      return res.status(409).json({
        success: false,
        error: "EMAIL_ALREADY_EXISTS",
        message: "Email already registered"
      });
    }

    logger.error("Register error", { error });
    res.status(500).json({
      success: false,
      error: "INTERNAL_SERVER_ERROR",
      message: "Failed to register user"
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "MISSING_CREDENTIALS",
        message: "Email and password are required"
      });
    }

    // Call service
    const result = await AuthService.login(email, password);

    res.status(200).json({
      success: true,
      data: result,
      message: "Login successful"
    });

  } catch (error) {
    if (error.message === "Invalid credentials") {
      return res.status(401).json({
        success: false,
        error: "INVALID_CREDENTIALS",
        message: "Email or password is incorrect"
      });
    }

    logger.error("Login error", { error });
    res.status(500).json({
      success: false,
      error: "INTERNAL_SERVER_ERROR",
      message: "Login failed"
    });
  }
};

exports.verify = async (req, res) => {
  try {
    const userId = req.user.id;  // From auth middleware

    const user = await AuthService.verify(userId);

    res.status(200).json({
      success: true,
      data: user,
      message: "Token is valid"
    });

  } catch (error) {
    res.status(401).json({
      success: false,
      error: "INVALID_TOKEN",
      message: "Token verification failed"
    });
  }
};
```

---

### 2. **userController.js** - User Management

**Endpoints:**
- `GET /api/users/:id` → `getUser()`
- `PUT /api/users/:id` → `updateUser()`
- `GET /api/users` → `listUsers()` (admin only)
- `DELETE /api/users/:id` → `deleteUser()` (admin only)

**Implement:**
```javascript
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // User can only get their own profile, admins can get any
    if (userId !== id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        error: "FORBIDDEN",
        message: "You don't have permission to view this profile"
      });
    }

    const user = await UserService.getUserById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "NOT_FOUND",
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      data: user,
      message: "User profile retrieved"
    });

  } catch (error) {
    logger.error("Get user error", { error });
    res.status(500).json({
      success: false,
      error: "INTERNAL_SERVER_ERROR",
      message: "Failed to retrieve user"
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { name, profileImage, bio } = req.body;

    // User can only update their own profile
    if (userId !== id) {
      return res.status(403).json({
        success: false,
        error: "FORBIDDEN",
        message: "You can only update your own profile"
      });
    }

    // Validate inputs
    if (name && (typeof name !== "string" || name.trim().length === 0)) {
      return res.status(400).json({
        success: false,
        error: "INVALID_INPUT",
        message: "Name must be a non-empty string"
      });
    }

    const updateData = {};
    if (name) updateData.name = name.trim();
    if (profileImage) updateData.profileImage = profileImage;
    if (bio) updateData.bio = bio.trim();

    updateData.updatedAt = admin.firestore.Timestamp.now();

    const result = await UserService.updateUser(id, updateData);

    res.status(200).json({
      success: true,
      data: result,
      message: "Profile updated successfully"
    });

  } catch (error) {
    logger.error("Update user error", { error });
    res.status(500).json({
      success: false,
      error: "INTERNAL_SERVER_ERROR",
      message: "Failed to update profile"
    });
  }
};

exports.listUsers = async (req, res) => {
  try {
    // Admin only
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        error: "FORBIDDEN",
        message: "Only admins can list users"
      });
    }

    const { limit = 20, offset = 0 } = req.query;

    const result = await UserService.listUsers(
      parseInt(limit),
      parseInt(offset)
    );

    res.status(200).json({
      success: true,
      data: result.users,
      pagination: {
        total: result.total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: result.hasMore
      },
      message: "Users list retrieved"
    });

  } catch (error) {
    logger.error("List users error", { error });
    res.status(500).json({
      success: false,
      error: "INTERNAL_SERVER_ERROR",
      message: "Failed to list users"
    });
  }
};
```

---

### 3. **cardController.js** - Digital Card

**Endpoints:**
- `POST /api/cards` → `createCard()`
- `GET /api/cards/:id` → `getCard()`
- `PUT /api/cards/:id` → `updateCard()`
- `DELETE /api/cards/:id` → `deleteCard()`
- `GET /api/cards/slug/:slug` → `getCardBySlug()`
- `GET /api/cards` → `listCards()`

**Implement:**
```javascript
exports.createCard = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, slug, bio } = req.body;

    // Validate inputs
    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "INVALID_INPUT",
        message: "Title is required"
      });
    }

    if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
      return res.status(400).json({
        success: false,
        error: "INVALID_SLUG",
        message: "Slug must contain only lowercase letters, numbers, and hyphens"
      });
    }

    // Check slug uniqueness
    const existingCard = await CardService.getCardBySlug(slug);
    if (existingCard) {
      return res.status(409).json({
        success: false,
        error: "SLUG_EXISTS",
        message: "This slug is already taken"
      });
    }

    const cardData = {
      userId,
      title: title.trim(),
      slug: slug.toLowerCase(),
      bio: bio?.trim() || "",
      isPublished: false,
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now()
    };

    const result = await CardService.createCard(cardData);

    res.status(201).json({
      success: true,
      data: result,
      message: "Card created successfully"
    });

  } catch (error) {
    logger.error("Create card error", { error });
    res.status(500).json({
      success: false,
      error: "INTERNAL_SERVER_ERROR",
      message: "Failed to create card"
    });
  }
};

exports.getCardBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const card = await CardService.getCardBySlug(slug);

    if (!card) {
      return res.status(404).json({
        success: false,
        error: "NOT_FOUND",
        message: "Card not found"
      });
    }

    res.status(200).json({
      success: true,
      data: card,
      message: "Card retrieved"
    });

  } catch (error) {
    logger.error("Get card by slug error", { error });
    res.status(500).json({
      success: false,
      error: "INTERNAL_SERVER_ERROR",
      message: "Failed to retrieve card"
    });
  }
};

exports.listCards = async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit = 10, offset = 0 } = req.query;

    const result = await CardService.listCardsByUser(
      userId,
      parseInt(limit),
      parseInt(offset)
    );

    res.status(200).json({
      success: true,
      data: result.cards,
      pagination: {
        total: result.total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: result.hasMore
      },
      message: "Cards list retrieved"
    });

  } catch (error) {
    logger.error("List cards error", { error });
    res.status(500).json({
      success: false,
      error: "INTERNAL_SERVER_ERROR",
      message: "Failed to list cards"
    });
  }
};
```

---

## ✅ Naming Conventions

### Controller Function Names

```javascript
// GET operations
getExample()            ← Get single resource
getExampleById()        ← Explicit ID-based get
getExampleBySlug()      ← Get by unique slug
listExamples()          ← List/search multiple
getExampleCards()       ← Get nested resource

// POST operations (Create)
createExample()         ← Create new resource
registerUser()          ← Special: register user
loginUser()             ← Special: login

// PUT operations (Update)
updateExample()         ← Update resource
publishCard()           ← Special: publish card

// DELETE operations
deleteExample()         ← Delete resource (soft or hard)

// Others
verifyToken()           ← Verify something
validateInput()         ← Validate data
```

---

## 🔐 Authorization Pattern

```javascript
// Pattern 1: Owner Check (Most common)
if (resource.userId !== req.user.id) {
  return res.status(403).json({
    success: false,
    error: "FORBIDDEN",
    message: "You don't have permission"
  });
}

// Pattern 2: Admin Check
if (req.user.role !== "admin") {
  return res.status(403).json({
    success: false,
    error: "FORBIDDEN",
    message: "Only admins can access this"
  });
}

// Pattern 3: Role-Based
if (!["admin", "moderator"].includes(req.user.role)) {
  return res.status(403).json({
    success: false,
    error: "FORBIDDEN",
    message: "Insufficient permissions"
  });
}
```

---

## 🛡️ Input Validation Pattern

```javascript
// Pattern 1: Single field
if (!email || typeof email !== "string" || email.trim().length === 0) {
  return res.status(400).json({
    success: false,
    error: "INVALID_EMAIL",
    message: "Email is required and must be a non-empty string"
  });
}

// Pattern 2: Complex validation
function validateCardInput(cardData) {
  const errors = [];

  if (!cardData.title) {
    errors.push("Title is required");
  }

  if (!/^[a-z0-9-]+$/.test(cardData.slug)) {
    errors.push("Slug format invalid");
  }

  if (cardData.bio && cardData.bio.length > 500) {
    errors.push("Bio too long");
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

// Usage
const validation = validateCardInput(req.body);
if (!validation.valid) {
  return res.status(400).json({
    success: false,
    error: "VALIDATION_ERROR",
    message: validation.errors.join(", ")
  });
}
```

---

## 📝 Error Response Format

**Mọi error response phải tuân thủ format sau:**

```javascript
{
  "success": false,
  "error": "ERROR_CODE",                    // ← Unique error code
  "message": "Human-readable message"       // ← Vietnamese message
}
```

**Common Error Codes:**

| Code | HTTP | Meaning |
|------|------|---------|
| `MISSING_REQUIRED_FIELD` | 400 | Missing required field |
| `INVALID_INPUT` | 400 | Invalid input format |
| `INVALID_EMAIL` | 400 | Email format invalid |
| `INVALID_PASSWORD` | 400 | Password invalid |
| `VALIDATION_ERROR` | 400 | Multiple validation errors |
| `EMAIL_ALREADY_EXISTS` | 409 | Email already registered |
| `SLUG_EXISTS` | 409 | Slug already taken |
| `UNAUTHORIZED` | 401 | Missing/invalid token |
| `INVALID_CREDENTIALS` | 401 | Wrong email/password |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `INTERNAL_SERVER_ERROR` | 500 | Server error |
| `SERVICE_UNAVAILABLE` | 503 | Service down |

---

## ✅ Controller Checklist

Trước khi hoàn thành controller:

- ✅ Có validate tất cả inputs?
- ✅ Có check authorization?
- ✅ Có xử lý errors?
- ✅ Có call services đúng?
- ✅ Response format đúng?
- ✅ HTTP status codes đúng?
- ✅ Có log errors?
- ✅ Có viết JSDoc comments?

---

**Version:** 1.0
**Last Updated:** 2026
**Status:** Active ✅
