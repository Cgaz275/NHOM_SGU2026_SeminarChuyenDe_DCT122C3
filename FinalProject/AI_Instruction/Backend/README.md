# Backend Guidelines - Index

**Tài liệu hướng dẫn chi tiết cho Backend Development của dự án Persona-Based Digital Twin Card.**

---

## 📚 Danh sách Guideline Files

Mỗi file chứa hướng dẫn chi tiết cho một phần cụ thể của Backend:

| File | Mô tả | Đối tượng |
|------|-------|----------|
| **Backend_Controllers_Guideline.md** | Xây dựng Controllers - HTTP request handlers | Backend Developers |
| **Backend_Routes_Guideline.md** | Xây dựng Routes - API endpoints | Backend Developers |
| **Backend_Services_Guideline.md** | Xây dựng Services - Business logic & Firestore | Backend Developers |
| **Backend_Middleware_Guideline.md** | Xây dựng Middlewares - Auth, validation, rate limit | Backend Developers |
| **Backend_API_Documentation_Guideline.md** | API Documentation - Swagger/OpenAPI | Backend Developers |
| **Backend_Firestore_Guideline.md** | Firestore operations - CRUD, queries, optimization | Backend Developers |
| **Backend_OpenAI_Integration_Guideline.md** | OpenAI integration - AI responses, guardrails | Backend Developers |

---

## 🎯 Quick Start

### Khi bắt đầu một feature mới:

1. **Đọc PRD & Architecture**
   - `AI_Instruction/Source of truth/PRD.pdf`
   - `AI_Instruction/Source of truth/Architecht & Database.pdf`

2. **Thiết kế API**
   - Đọc → Backend_API_Documentation_Guideline.md
   - Định nghĩa endpoints, request/response schemas

3. **Xây dựng Controller**
   - Đọc → Backend_Controllers_Guideline.md
   - Validate input, call service, format response

4. **Xây dựng Routes**
   - Đọc → Backend_Routes_Guideline.md
   - Định nghĩa HTTP methods, paths, middlewares

5. **Xây dựng Services**
   - Đọc → Backend_Services_Guideline.md
   - Implement business logic, Firestore operations

6. **Xây dựng Middlewares (nếu cần)**
   - Đọc → Backend_Middleware_Guideline.md
   - Auth, validation, rate limiting

7. **Xây dựng Firestore Operations**
   - Đọc → Backend_Firestore_Guideline.md
   - Queries, transactions, optimization

8. **Xây dựng OpenAI Integration (nếu AI feature)**
   - Đọc → Backend_OpenAI_Integration_Guideline.md
   - System prompts, guardrails, fallbacks

---

## 📁 Backend Folder Structure

```
Backend/
├── src/
│   ├── config/              ← Firebase, Swagger config
│   ├── controllers/         ← HTTP handlers (authController.js, etc)
│   ├── routes/              ← API routes (authRoutes.js, etc)
│   ├── services/            ← Business logic (authService.js, etc)
│   ├── middlewares/         ← Auth, validation, error handling
│   ├── utils/               ← Helper functions
│   ├── knowledge-base/      ← AI knowledge base
│   ├── server.js            ← Express app initialization
│   ├── seed.js              ← Database seeding
│   └── set-admin.js         ← Admin setup script
│
├── tests/                   ← Test files
├── package.json
└── .env.example
```

---

## 🔄 File Dependencies

```
Request → Routes → Controllers → Services → Firestore

Middlewares (Auth, Validation) intercept at Routes level
```

**Recommended reading order:**
1. Backend_Routes_Guideline.md (understand endpoint structure)
2. Backend_Controllers_Guideline.md (understand request handling)
3. Backend_Services_Guideline.md (understand business logic)
4. Backend_Middleware_Guideline.md (understand interceptors)
5. Backend_Firestore_Guideline.md (understand data persistence)
6. Backend_API_Documentation_Guideline.md (document what you built)
7. Backend_OpenAI_Integration_Guideline.md (if using AI)

---

## ✅ Standard Code Patterns

### Controller Pattern
```javascript
exports.handleRequest = async (req, res) => {
  try {
    // 1. Validate input
    // 2. Check authorization
    // 3. Call service
    // 4. Return response
  } catch (error) {
    // Handle error
  }
};
```

### Service Pattern
```javascript
static async businessLogic(data) {
  try {
    // 1. Validate data
    // 2. Business rule checks
    // 3. Firestore operations
    // 4. Return result
  } catch (error) {
    logger.error("Error", { error });
    throw error;
  }
}
```

### Route Pattern
```javascript
router.post(
  "/endpoint",
  authMiddleware,
  validateMiddleware,
  rateLimitMiddleware,
  controllerFunction
);
```

---

## 🔐 Security Checklist

Before pushing any code:

- ✅ Input validation (type, length, format)
- ✅ Authentication required for sensitive endpoints
- ✅ Authorization checked (owner, admin)
- ✅ No hardcoded secrets
- ✅ SQL injection prevention (Firestore handles this)
- ✅ XSS prevention in responses
- ✅ Rate limiting on sensitive operations
- ✅ Error messages don't leak info
- ✅ Firestore rules defined
- ✅ HTTPS enforced in production

---

## 📊 API Response Format

**All responses must follow this format:**

### Success
```javascript
{
  "success": true,
  "data": { /* payload */ },
  "message": "Operation successful"
}
```

### Error
```javascript
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Vietnamese error message"
}
```

### Paginated
```javascript
{
  "success": true,
  "data": [ /* items */ ],
  "pagination": { "total": 100, "limit": 10, "offset": 0, "hasMore": true }
}
```

---

## 🧪 Testing

Before committing:

```bash
# Unit tests (Services)
npm run test

# Integration tests (API endpoints)
npm run test:integration

# All tests
npm run test:all

# With coverage
npm run test:coverage
```

---

## 📚 Related Documents

| Document | Purpose | Location |
|----------|---------|----------|
| **Backend_Agent_Guideline.md** | Complete backend overview | `AI_Instruction\Backend\` |
| **Testing_Agent_Guideline.md** | Testing strategy | `AI_Instruction\Testing\` |
| **PRD.pdf** | Feature requirements | `AI_Instruction\Source of truth\` |
| **Architecture & Database.pdf** | System design & data models | `AI_Instruction\Source of truth\` |

---

## 🤝 Common Workflows

### Add a New API Endpoint

1. Update `Architecht & Database.pdf` with schema
2. Write `Backend_API_Documentation_Guideline.md` with Swagger docs
3. Create route in `Backend_Routes_Guideline.md` pattern
4. Create controller following `Backend_Controllers_Guideline.md`
5. Create service following `Backend_Services_Guideline.md`
6. Add Firestore operations using `Backend_Firestore_Guideline.md`
7. Add tests
8. Test with Postman or curl
9. Update Swagger docs
10. Commit with clear message

### Add Authentication to Route

1. Check `Backend_Middleware_Guideline.md`
2. Add `authMiddleware` to route
3. Access `req.user` in controller
4. Test with/without token

### Optimize Slow Query

1. Check `Backend_Firestore_Guideline.md` - Performance section
2. Add database index
3. Use `select()` to limit fields
4. Implement pagination
5. Monitor query time

### Handle Errors Gracefully

1. Check `Backend_Controllers_Guideline.md` - Error handling
2. Use consistent error codes
3. Log with context
4. Return user-friendly message (Vietnamese)

---

## 🎓 Learning Resources

- **Express.js** → https://expressjs.com/
- **Firebase Admin SDK** → https://firebase.google.com/docs
- **Firestore** → https://firebase.google.com/docs/firestore
- **OpenAI API** → https://platform.openai.com/docs
- **Swagger/OpenAPI** → https://swagger.io/

---

## 💡 Tips & Tricks

### Useful Commands

```bash
# Start dev server
npm run dev

# Run tests
npm run test

# Run specific test file
npm run test -- Module_1_Auth

# Check Swagger docs
# Navigate to http://localhost:PORT/api-docs

# Generate Firebase key
firebase auth:export users.json --format=json
```

### Common Mistakes to Avoid

1. ❌ Directly query Firestore in controllers (use services)
2. ❌ Hardcode configuration values (use environment variables)
3. ❌ Skip input validation (do it in both controller & service)
4. ❌ Return internal errors to frontend (catch and transform)
5. ❌ N+1 queries (batch or denormalize)
6. ❌ No timestamps on records (always add createdAt/updatedAt)
7. ❌ Soft delete without checking isDeleted flag
8. ❌ Cache without TTL (causes stale data)

---

## 📞 Support & Questions

- Review relevant guideline files
- Check example implementations
- Refer to PRD for requirements
- Check Architecture for data models
- Test with Postman before integrating

---

## 📝 Versioning

| Version | Changes | Date |
|---------|---------|------|
| 1.0 | Initial guidelines | 2026 |

---

**Remember:** 
- Follow guidelines consistently
- Write tests for new code
- Document API changes
- Review error handling
- Monitor performance
- Keep security in mind

Happy coding! 🚀

---

Generated from: `Backend_Agent_Guideline.md`  
Last Updated: 2026
