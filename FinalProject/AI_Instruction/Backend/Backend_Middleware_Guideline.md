# Backend Middleware Guideline - Node.js + Express + Firebase

**Hướng dẫn chi tiết cho việc xây dựng Middlewares trong Backend của dự án Persona-Based Digital Twin Card.**

---

## 📋 Middleware là gì?

Middlewares là các functions chạy giữa request đến và response trả về. Chúng xử lý cross-cutting concerns như authentication, logging, validation, rate limiting, error handling.

**Trách nhiệm của Middlewares:**
- ✅ Authentication & Authorization
- ✅ Request validation
- ✅ Rate limiting
- ✅ Error handling
- ✅ Logging
- ✅ CORS handling
- ✅ Request/response transformation

---

## 🏗️ Cấu Trúc Middlewares

```
Backend/src/middlewares/
├── authMiddleware.js       ← JWT/Firebase token validation
├── errorHandler.js         ← Global error handling
├── rateLimiter.js          ← API rate limiting
├── validation.js           ← Request validation
└── logger.js               ← Logging middleware
```

---

## 💾 File Template cho Middlewares

### 1. **authMiddleware.js** - Authentication

```javascript
// middlewares/authMiddleware.js

const { admin } = require("../config/firebase");
const logger = require("../utils/logger");

/**
 * Authentication middleware
 * Validates Firebase token and sets req.user
 *
 * Usage: router.get("/protected", authMiddleware, controller)
 */
const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "MISSING_TOKEN",
        message: "Authorization token is required"
      });
    }

    const token = authHeader.substring(7); // Remove "Bearer "

    // Verify token with Firebase
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Get user from Firestore
    const userDoc = await admin
      .firestore()
      .collection("users")
      .doc(decodedToken.uid)
      .get();

    if (!userDoc.exists) {
      return res.status(401).json({
        success: false,
        error: "USER_NOT_FOUND",
        message: "User not found"
      });
    }

    // Set user in request
    req.user = {
      id: decodedToken.uid,
      email: decodedToken.email,
      ...userDoc.data()
    };

    next();
  } catch (error) {
    logger.error("Auth middleware error", { error });

    if (error.code === "auth/id-token-expired") {
      return res.status(401).json({
        success: false,
        error: "TOKEN_EXPIRED",
        message: "Token has expired"
      });
    }

    if (error.code === "auth/invalid-id-token") {
      return res.status(401).json({
        success: false,
        error: "INVALID_TOKEN",
        message: "Invalid token"
      });
    }

    return res.status(401).json({
      success: false,
      error: "UNAUTHORIZED",
      message: "Authentication failed"
    });
  }
};

/**
 * Optional auth middleware
 * Same as authMiddleware but doesn't block if no token
 * Sets req.user to null if no token
 */
const optionalAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      req.user = null;
      return next();
    }

    const token = authHeader.substring(7);
    const decodedToken = await admin.auth().verifyIdToken(token);

    const userDoc = await admin
      .firestore()
      .collection("users")
      .doc(decodedToken.uid)
      .get();

    req.user = userDoc.exists
      ? { id: decodedToken.uid, ...userDoc.data() }
      : null;

    next();
  } catch (error) {
    req.user = null;
    next();
  }
};

/**
 * Admin check middleware
 * Must be used after authMiddleware
 */
const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      error: "FORBIDDEN",
      message: "Only admins can access this resource"
    });
  }

  next();
};

module.exports = {
  authMiddleware,
  optionalAuthMiddleware,
  adminMiddleware
};
```

### 2. **errorHandler.js** - Error Handling

```javascript
// middlewares/errorHandler.js

const logger = require("../utils/logger");

/**
 * Global error handler middleware
 * Must be last middleware in app.use()
 *
 * Usage: app.use(errorHandler);
 */
const errorHandler = (err, req, res, next) => {
  logger.error("Unhandled error", {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    userId: req.user?.id
  });

  // Default error response
  const statusCode = err.statusCode || 500;
  const errorCode = err.errorCode || "INTERNAL_SERVER_ERROR";
  const message = err.message || "An unexpected error occurred";

  res.status(statusCode).json({
    success: false,
    error: errorCode,
    message
  });
};

/**
 * Custom error class for consistent error handling
 */
class AppError extends Error {
  constructor(message, statusCode = 500, errorCode = "INTERNAL_SERVER_ERROR") {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

/**
 * Async error handler wrapper
 * Wraps async functions to catch errors automatically
 *
 * Usage: router.get("/", asyncHandler(controllerFunction));
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
  errorHandler,
  AppError,
  asyncHandler
};
```

### 3. **rateLimiter.js** - Rate Limiting

```javascript
// middlewares/rateLimiter.js

const rateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis");
const logger = require("../utils/logger");

/**
 * General API rate limiter
 * 100 requests per 15 minutes per IP
 */
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,                   // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: "RATE_LIMITED",
    message: "Too many requests, please try again later"
  },
  standardHeaders: true,      // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false,       // Disable `X-RateLimit-*` headers
  skip: (req) => {
    // Skip rate limiting for admin users
    return req.user?.role === "admin";
  },
  keyGenerator: (req) => {
    // Rate limit by user ID if authenticated, else by IP
    return req.user?.id || req.ip;
  }
});

/**
 * Strict rate limiter for sensitive endpoints
 * 5 requests per 15 minutes
 *
 * Usage: router.post("/register", strictLimiter, controllerFunc);
 */
const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    error: "RATE_LIMITED",
    message: "Too many requests. Please try again in 15 minutes"
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.user?.role === "admin"
});

/**
 * Chat API rate limiter
 * 20 messages per 1 hour per conversation
 */
const chatLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,   // 1 hour
  max: 20,                     // 20 messages
  message: {
    success: false,
    error: "RATE_LIMITED",
    message: "You've reached the message limit. Please try again later"
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Rate limit by conversation ID
    return req.body?.conversationId || req.ip;
  }
});

/**
 * Create report limiter
 * 3 reports per 24 hours per IP
 */
const reportLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,  // 24 hours
  max: 3,
  message: {
    success: false,
    error: "RATE_LIMITED",
    message: "You can only submit 3 reports per day"
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = {
  generalLimiter,
  strictLimiter,
  chatLimiter,
  reportLimiter
};
```

### 4. **requestLogger.js** - Logging Middleware

```javascript
// middlewares/requestLogger.js

const logger = require("../utils/logger");

/**
 * Request logging middleware
 * Logs all incoming requests
 */
const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  // Log request
  logger.info("Incoming request", {
    method: req.method,
    path: req.path,
    query: req.query,
    userId: req.user?.id,
    ip: req.ip
  });

  // Hook into response to log response time
  res.on("finish", () => {
    const duration = Date.now() - startTime;

    logger.info("Request completed", {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userId: req.user?.id
    });

    // Alert if request is slow
    if (duration > 3000) {
      logger.warn("Slow request detected", {
        method: req.method,
        path: req.path,
        duration: `${duration}ms`
      });
    }
  });

  next();
};

module.exports = requestLogger;
```

### 5. **validation.js** - Request Validation

```javascript
// middlewares/validation.js

const logger = require("../utils/logger");

/**
 * Validate JSON body is not empty
 */
const validateBodyNotEmpty = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      error: "EMPTY_BODY",
      message: "Request body cannot be empty"
    });
  }
  next();
};

/**
 * Validate required fields
 * @param {Array<string>} fields - Required field names
 */
const validateRequiredFields = (fields) => {
  return (req, res, next) => {
    const missing = fields.filter(field => !req.body[field]);

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        error: "MISSING_FIELDS",
        message: `Missing required fields: ${missing.join(", ")}`
      });
    }

    next();
  };
};

/**
 * Validate email format
 */
const validateEmail = (req, res, next) => {
  if (!req.body.email) {
    return next();
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json({
      success: false,
      error: "INVALID_EMAIL",
      message: "Invalid email format"
    });
  }

  next();
};

/**
 * Validate password strength
 */
const validatePassword = (req, res, next) => {
  if (!req.body.password) {
    return next();
  }

  if (req.body.password.length < 6) {
    return res.status(400).json({
      success: false,
      error: "WEAK_PASSWORD",
      message: "Password must be at least 6 characters"
    });
  }

  next();
};

/**
 * Validate slug format
 */
const validateSlug = (req, res, next) => {
  if (!req.body.slug) {
    return next();
  }

  const slugRegex = /^[a-z0-9-]+$/;

  if (!slugRegex.test(req.body.slug)) {
    return res.status(400).json({
      success: false,
      error: "INVALID_SLUG",
      message: "Slug can only contain lowercase letters, numbers, and hyphens"
    });
  }

  next();
};

module.exports = {
  validateBodyNotEmpty,
  validateRequiredFields,
  validateEmail,
  validatePassword,
  validateSlug
};
```

---

## 📋 Cách sử dụng Middlewares

### Pattern 1: Global Middlewares (apply to all routes)

```javascript
// server.js
const express = require("express");
const app = express();

const { authMiddleware } = require("./middlewares/authMiddleware");
const { errorHandler } = require("./middlewares/errorHandler");
const requestLogger = require("./middlewares/requestLogger");

// Apply global middlewares BEFORE routes
app.use(express.json());
app.use(requestLogger);           // Log all requests

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", authMiddleware, require("./routes/userRoutes"));
app.use("/api/cards", authMiddleware, require("./routes/cardRoutes"));

// Error handler MUST be last
app.use(errorHandler);

module.exports = app;
```

### Pattern 2: Route-level Middlewares

```javascript
// routes/cardRoutes.js
const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middlewares/authMiddleware");
const { strictLimiter } = require("../middlewares/rateLimiter");
const { validateRequiredFields } = require("../middlewares/validation");

const CardController = require("../controllers/cardController");

// Different middleware combinations per route
router.get("/", authMiddleware, CardController.listCards);

router.post(
  "/",
  authMiddleware,
  strictLimiter,
  validateRequiredFields(["title", "slug"]),
  CardController.createCard
);

router.put("/:id", authMiddleware, CardController.updateCard);

module.exports = router;
```

### Pattern 3: Conditional Middlewares

```javascript
const conditionalAuth = (req, res, next) => {
  if (req.query.requireAuth === "true") {
    authMiddleware(req, res, next);
  } else {
    next();
  }
};

router.get("/public", conditionalAuth, ControllerFunc);
```

---

## ✅ Middleware Examples by Use Case

### Use Case 1: Protect Admin Routes

```javascript
router.get(
  "/admin/users",
  authMiddleware,
  adminMiddleware,
  AdminController.listUsers
);
```

### Use Case 2: Rate Limit Registration

```javascript
router.post(
  "/register",
  strictLimiter,
  validateRequiredFields(["email", "password"]),
  validateEmail,
  validatePassword,
  AuthController.register
);
```

### Use Case 3: Protect Sensitive Operations

```javascript
router.post(
  "/chat",
  chatLimiter,
  validateRequiredFields(["cardId", "message"]),
  ChatController.sendMessage
);
```

### Use Case 4: Soft Delete Pattern

```javascript
// Middleware to exclude deleted items
const excludeDeleted = (req, res, next) => {
  req.query.includeDeleted = false;
  next();
};

router.get("/cards", authMiddleware, excludeDeleted, CardController.listCards);
```

---

## 🔐 Security Middleware Tips

### 1. Always validate auth before sensitive operations

```javascript
router.delete("/:id", authMiddleware, ControllerFunc);  // ✅ GOOD
router.delete("/:id", ControllerFunc);                   // ❌ BAD
```

### 2. Use specific rate limiters for different endpoints

```javascript
// Different limits for different operations
router.post("/register", strictLimiter, ...);     // 5/15min
router.post("/login", strictLimiter, ...);        // 5/15min
router.post("/chat", chatLimiter, ...);           // 20/hour
router.post("/report", reportLimiter, ...);       // 3/day
```

### 3. Prevent privilege escalation

```javascript
// In controller, verify user can't change their own role
const updateData = {};
if (name) updateData.name = name;
// Don't allow: updateData.role = req.body.role;
```

---

## ✅ Middleware Checklist

Trước khi hoàn thành middleware:

- ✅ Có handle errors properly?
- ✅ Có log activities?
- ✅ Response format consistent?
- ✅ Có call `next()`?
- ✅ Không block legitimate requests?
- ✅ Có test với invalid inputs?

---

**Version:** 1.0
**Last Updated:** 2026
**Status:** Active ✅
