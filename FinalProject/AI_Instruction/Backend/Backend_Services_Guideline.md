# Backend Services Guideline - Node.js + Express + Firebase

**Hướng dẫn chi tiết cho việc xây dựng Services (Business Logic) trong Backend của dự án Persona-Based Digital Twin Card.**

---

## 📋 Services là gì?

Services chứa business logic - những quy tắc nghiệp vụ, xử lý dữ liệu, và giao tiếp với Firestore. Controllers gọi Services để xử lý logic, không trực tiếp gọi database.

**Trách nhiệm của Services:**
- ✅ Business logic
- ✅ Firestore CRUD operations
- ✅ Data validation & transformation
- ✅ Complex queries
- ✅ Data aggregation
- ✅ Transaction handling
- ✅ Error handling (domain-specific)

**Không phải trách nhiệm:**
- ❌ HTTP request/response
- ❌ Routing
- ❌ Middleware logic

---

## 🏗️ Cấu Trúc Services

```
Backend/src/services/
├── authService.js               ← Auth business logic
├── userService.js               ← User operations
├── cardService.js               ← Card operations
├── aiService.js                 ← AI Twin logic
├── conversationService.js       ← Conversation logic
├── messageService.js            ← Message operations
├── analyticsService.js          ← Analytics calculation
└── reportService.js             ← Report processing
```

---

## 💾 File Template cho Services

```javascript
// services/exampleService.js

const { db, admin } = require("../config/firebase");
const logger = require("../utils/logger");

class ExampleService {
  /**
   * Get example by ID
   * @param {string} id - Example ID
   * @returns {Promise<Object>} Example data or null if not found
   */
  static async getById(id) {
    try {
      const docRef = db.collection("examples").doc(id);
      const doc = await docRef.get();

      if (!doc.exists) {
        return null;
      }

      return {
        id: doc.id,
        ...doc.data()
      };
    } catch (error) {
      logger.error("Error getting example by ID", { error, id });
      throw new Error("Failed to fetch example");
    }
  }

  /**
   * Create new example
   * @param {Object} data - Example data
   * @returns {Promise<Object>} Created example with ID
   */
  static async create(data) {
    try {
      // Validate data
      if (!data.name) {
        throw new Error("Name is required");
      }

      // Add timestamps
      const timestamp = admin.firestore.Timestamp.now();
      const docData = {
        ...data,
        createdAt: data.createdAt || timestamp,
        updatedAt: data.updatedAt || timestamp
      };

      // Create document
      const docRef = await db.collection("examples").add(docData);

      return {
        id: docRef.id,
        ...docData
      };
    } catch (error) {
      logger.error("Error creating example", { error });
      throw error;
    }
  }

  /**
   * Update example
   * @param {string} id - Example ID
   * @param {Object} data - Update data
   * @returns {Promise<Object>} Updated example
   */
  static async update(id, data) {
    try {
      const docRef = db.collection("examples").doc(id);

      // Verify document exists
      const doc = await docRef.get();
      if (!doc.exists) {
        throw new Error("Example not found");
      }

      // Update with timestamp
      const updateData = {
        ...data,
        updatedAt: admin.firestore.Timestamp.now()
      };

      await docRef.update(updateData);

      // Return updated document
      const updated = await docRef.get();
      return {
        id: updated.id,
        ...updated.data()
      };
    } catch (error) {
      logger.error("Error updating example", { error, id });
      throw error;
    }
  }

  /**
   * Delete example
   * @param {string} id - Example ID
   * @returns {Promise<void>}
   */
  static async delete(id) {
    try {
      const docRef = db.collection("examples").doc(id);

      // Verify document exists
      const doc = await docRef.get();
      if (!doc.exists) {
        throw new Error("Example not found");
      }

      // Delete document
      await docRef.delete();
    } catch (error) {
      logger.error("Error deleting example", { error, id });
      throw error;
    }
  }

  /**
   * List examples for user
   * @param {string} userId - User ID
   * @param {number} limit - Max documents to fetch
   * @param {number} offset - Documents to skip
   * @returns {Promise<Object>} { examples, total, hasMore }
   */
  static async listByUser(userId, limit = 10, offset = 0) {
    try {
      // Get total count
      const countQuery = db.collection("examples").where("userId", "==", userId);
      const countSnapshot = await countQuery.get();
      const total = countSnapshot.size;

      // Get paginated results
      const query = db
        .collection("examples")
        .where("userId", "==", userId)
        .orderBy("createdAt", "desc")
        .limit(limit)
        .offset(offset);

      const snapshot = await query.get();

      const examples = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return {
        examples,
        total,
        hasMore: offset + limit < total
      };
    } catch (error) {
      logger.error("Error listing examples", { error, userId });
      throw new Error("Failed to list examples");
    }
  }

  /**
   * Search examples
   * @param {string} userId - User ID
   * @param {string} searchTerm - Search query
   * @returns {Promise<Array>} Matching examples
   */
  static async search(userId, searchTerm) {
    try {
      // Note: Firestore doesn't have full-text search
      // This is a simple implementation - for production use Algolia/ElasticSearch

      const query = db
        .collection("examples")
        .where("userId", "==", userId)
        .orderBy("name")
        .startAt(searchTerm)
        .endAt(searchTerm + "\uf8ff");

      const snapshot = await query.get();

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      logger.error("Error searching examples", { error });
      throw new Error("Search failed");
    }
  }
}

module.exports = ExampleService;
```

---

## 📋 Chi tiết các Services

### 1. **authService.js** - Authentication

```javascript
class AuthService {
  static async register(email, password, name) {
    try {
      // Create Firebase auth user
      const userRecord = await admin.auth().createUser({
        email,
        password
      });

      // Create user document in Firestore
      const userDoc = {
        id: userRecord.uid,
        email,
        name,
        role: "user",
        isActive: true,
        createdAt: admin.firestore.Timestamp.now(),
        updatedAt: admin.firestore.Timestamp.now()
      };

      await db.collection("users").doc(userRecord.uid).set(userDoc);

      // Generate token
      const token = await admin.auth().createCustomToken(userRecord.uid);

      return {
        userId: userRecord.uid,
        email,
        token
      };
    } catch (error) {
      logger.error("Registration error", { error });
      throw error;
    }
  }

  static async login(email, password) {
    try {
      // Verify credentials (using Firebase client SDK in production)
      // For backend, use custom token approach
      const user = await db
        .collection("users")
        .where("email", "==", email)
        .get();

      if (user.empty) {
        throw new Error("Invalid credentials");
      }

      const userData = user.docs[0].data();

      // Generate token
      const token = await admin.auth().createCustomToken(userData.id);

      return {
        userId: userData.id,
        email: userData.email,
        role: userData.role,
        token
      };
    } catch (error) {
      logger.error("Login error", { error });
      throw error;
    }
  }

  static async verify(userId) {
    try {
      const userDoc = await db.collection("users").doc(userId).get();

      if (!userDoc.exists) {
        throw new Error("User not found");
      }

      return {
        userId,
        email: userDoc.data().email,
        role: userDoc.data().role,
        isValid: true
      };
    } catch (error) {
      logger.error("Token verification error", { error });
      throw error;
    }
  }
}

module.exports = AuthService;
```

### 2. **userService.js** - User Management

```javascript
class UserService {
  static async getUserById(userId) {
    try {
      const docRef = db.collection("users").doc(userId);
      const doc = await docRef.get();

      if (!doc.exists) {
        return null;
      }

      const data = doc.data();
      // Don't expose sensitive fields
      delete data.passwordHash;

      return {
        id: doc.id,
        ...data
      };
    } catch (error) {
      logger.error("Error getting user", { error, userId });
      throw new Error("Failed to fetch user");
    }
  }

  static async updateUser(userId, updateData) {
    try {
      const docRef = db.collection("users").doc(userId);

      const docSnap = await docRef.get();
      if (!docSnap.exists) {
        throw new Error("User not found");
      }

      // Prevent changing sensitive fields
      delete updateData.id;
      delete updateData.email;
      delete updateData.role;

      updateData.updatedAt = admin.firestore.Timestamp.now();

      await docRef.update(updateData);

      const updated = await docRef.get();
      return {
        id: updated.id,
        ...updated.data()
      };
    } catch (error) {
      logger.error("Error updating user", { error, userId });
      throw error;
    }
  }

  static async deleteUser(userId) {
    try {
      const docRef = db.collection("users").doc(userId);

      const docSnap = await docRef.get();
      if (!docSnap.exists) {
        throw new Error("User not found");
      }

      // Soft delete: mark as inactive
      await docRef.update({
        isActive: false,
        deletedAt: admin.firestore.Timestamp.now(),
        updatedAt: admin.firestore.Timestamp.now()
      });

      // Alternative: Hard delete
      // await docRef.delete();
    } catch (error) {
      logger.error("Error deleting user", { error, userId });
      throw error;
    }
  }

  static async listUsers(limit = 20, offset = 0) {
    try {
      // Get total count
      const countSnapshot = await db.collection("users").get();
      const total = countSnapshot.size;

      // Get paginated results
      const snapshot = await db
        .collection("users")
        .where("isActive", "==", true)
        .orderBy("createdAt", "desc")
        .limit(limit)
        .offset(offset)
        .get();

      const users = snapshot.docs.map(doc => {
        const data = doc.data();
        delete data.passwordHash;
        return {
          id: doc.id,
          ...data
        };
      });

      return {
        users,
        total,
        hasMore: offset + limit < total
      };
    } catch (error) {
      logger.error("Error listing users", { error });
      throw new Error("Failed to list users");
    }
  }
}

module.exports = UserService;
```

### 3. **cardService.js** - Card Operations

```javascript
class CardService {
  static async createCard(cardData) {
    try {
      // Validate slug uniqueness
      const existing = await db
        .collection("cards")
        .where("slug", "==", cardData.slug)
        .limit(1)
        .get();

      if (!existing.empty) {
        throw new Error("Slug already exists");
      }

      const docRef = await db.collection("cards").add(cardData);

      return {
        id: docRef.id,
        ...cardData
      };
    } catch (error) {
      logger.error("Error creating card", { error });
      throw error;
    }
  }

  static async getCardById(cardId) {
    try {
      const doc = await db.collection("cards").doc(cardId).get();

      if (!doc.exists) {
        return null;
      }

      return {
        id: doc.id,
        ...doc.data()
      };
    } catch (error) {
      logger.error("Error getting card", { error, cardId });
      throw new Error("Failed to fetch card");
    }
  }

  static async getCardBySlug(slug) {
    try {
      const query = db.collection("cards").where("slug", "==", slug).limit(1);
      const snapshot = await query.get();

      if (snapshot.empty) {
        return null;
      }

      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      };
    } catch (error) {
      logger.error("Error getting card by slug", { error, slug });
      throw new Error("Failed to fetch card");
    }
  }

  static async updateCard(cardId, updateData) {
    try {
      const docRef = db.collection("cards").doc(cardId);

      const docSnap = await docRef.get();
      if (!docSnap.exists) {
        throw new Error("Card not found");
      }

      // If slug is being changed, check uniqueness
      if (updateData.slug && updateData.slug !== docSnap.data().slug) {
        const existing = await db
          .collection("cards")
          .where("slug", "==", updateData.slug)
          .limit(1)
          .get();

        if (!existing.empty) {
          throw new Error("Slug already taken");
        }
      }

      updateData.updatedAt = admin.firestore.Timestamp.now();

      await docRef.update(updateData);

      const updated = await docRef.get();
      return {
        id: updated.id,
        ...updated.data()
      };
    } catch (error) {
      logger.error("Error updating card", { error, cardId });
      throw error;
    }
  }

  static async deleteCard(cardId) {
    try {
      const docRef = db.collection("cards").doc(cardId);

      const docSnap = await docRef.get();
      if (!docSnap.exists) {
        throw new Error("Card not found");
      }

      // Soft delete
      await docRef.update({
        isDeleted: true,
        isPublished: false,
        deletedAt: admin.firestore.Timestamp.now(),
        updatedAt: admin.firestore.Timestamp.now()
      });
    } catch (error) {
      logger.error("Error deleting card", { error, cardId });
      throw error;
    }
  }

  static async listCardsByUser(userId, limit = 10, offset = 0) {
    try {
      // Get total
      const countSnapshot = await db
        .collection("cards")
        .where("userId", "==", userId)
        .where("isDeleted", "!=", true)
        .get();

      const total = countSnapshot.size;

      // Get paginated
      const snapshot = await db
        .collection("cards")
        .where("userId", "==", userId)
        .where("isDeleted", "!=", true)
        .orderBy("isDeleted", "asc")
        .orderBy("createdAt", "desc")
        .limit(limit)
        .offset(offset)
        .get();

      const cards = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return {
        cards,
        total,
        hasMore: offset + limit < total
      };
    } catch (error) {
      logger.error("Error listing cards", { error });
      throw new Error("Failed to list cards");
    }
  }

  static async publishCard(cardId) {
    try {
      return await this.updateCard(cardId, { isPublished: true });
    } catch (error) {
      throw error;
    }
  }

  static async unpublishCard(cardId) {
    try {
      return await this.updateCard(cardId, { isPublished: false });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CardService;
```

### 4. **conversationService.js** - Conversation Logic

```javascript
class ConversationService {
  static async createConversation(conversationData) {
    try {
      const timestamp = admin.firestore.Timestamp.now();
      const data = {
        ...conversationData,
        status: "active",
        createdAt: timestamp,
        updatedAt: timestamp
      };

      const docRef = await db.collection("conversations").add(data);

      return {
        id: docRef.id,
        ...data
      };
    } catch (error) {
      logger.error("Error creating conversation", { error });
      throw error;
    }
  }

  static async getConversation(conversationId) {
    try {
      const doc = await db.collection("conversations").doc(conversationId).get();

      if (!doc.exists) {
        return null;
      }

      return {
        id: doc.id,
        ...doc.data()
      };
    } catch (error) {
      logger.error("Error getting conversation", { error });
      throw error;
    }
  }

  static async listConversations(userId, cardId, status, limit = 20, offset = 0) {
    try {
      let query = db.collection("conversations");

      if (cardId) {
        query = query.where("cardId", "==", cardId);
      }

      if (status) {
        query = query.where("status", "==", status);
      }

      // Get total
      const countSnapshot = await query.get();
      const total = countSnapshot.size;

      // Get paginated
      const snapshot = await query
        .orderBy("updatedAt", "desc")
        .limit(limit)
        .offset(offset)
        .get();

      const conversations = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return {
        conversations,
        total,
        hasMore: offset + limit < total
      };
    } catch (error) {
      logger.error("Error listing conversations", { error });
      throw error;
    }
  }

  static async escalateConversation(conversationId, reason) {
    try {
      const docRef = db.collection("conversations").doc(conversationId);

      await docRef.update({
        status: "escalated",
        escalationReason: reason,
        escalatedAt: admin.firestore.Timestamp.now(),
        updatedAt: admin.firestore.Timestamp.now()
      });

      const updated = await docRef.get();
      return {
        id: updated.id,
        ...updated.data()
      };
    } catch (error) {
      logger.error("Error escalating conversation", { error });
      throw error;
    }
  }

  static async closeConversation(conversationId) {
    try {
      const docRef = db.collection("conversations").doc(conversationId);

      await docRef.update({
        status: "closed",
        closedAt: admin.firestore.Timestamp.now(),
        updatedAt: admin.firestore.Timestamp.now()
      });

      const updated = await docRef.get();
      return {
        id: updated.id,
        ...updated.data()
      };
    } catch (error) {
      logger.error("Error closing conversation", { error });
      throw error;
    }
  }
}

module.exports = ConversationService;
```

---

## ✅ Service Best Practices

### 1. **Always use try-catch**
```javascript
static async getItem(id) {
  try {
    // Logic here
  } catch (error) {
    logger.error("Error getting item", { error, id });
    throw error;  // Re-throw for controller to handle
  }
}
```

### 2. **Validation in Service (not just Controller)**
```javascript
static async create(data) {
  try {
    // Validate critical data
    if (!data.name || typeof data.name !== "string") {
      throw new Error("Invalid name");
    }

    // Business rule validation
    if (data.age < 18) {
      throw new Error("Must be 18 or older");
    }

    // Continue...
  } catch (error) {
    throw error;
  }
}
```

### 3. **Consistent Timestamps**
```javascript
const timestamp = admin.firestore.Timestamp.now();
const data = {
  ...input,
  createdAt: timestamp,
  updatedAt: timestamp
};
```

### 4. **Query Optimization**
```javascript
// ✅ GOOD: Indexed query with where + orderBy
db.collection("items")
  .where("userId", "==", userId)
  .where("status", "==", "active")
  .orderBy("createdAt", "desc")
  .limit(20)
  .get()

// ❌ BAD: Fetch all then filter
const items = await db.collection("items").get();
const filtered = items.docs
  .map(d => d.data())
  .filter(i => i.userId === userId && i.status === "active")
  .slice(0, 20);
```

### 5. **Pagination Pattern**
```javascript
static async list(limit = 10, offset = 0) {
  try {
    // Get total count
    const countSnapshot = await db.collection("items").get();
    const total = countSnapshot.size;

    // Get paginated results
    const snapshot = await db
      .collection("items")
      .orderBy("createdAt", "desc")
      .limit(limit)
      .offset(offset)
      .get();

    const items = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return {
      items,
      total,
      limit,
      offset,
      hasMore: offset + limit < total
    };
  } catch (error) {
    throw error;
  }
}
```

---

## 🔐 Security in Services

```javascript
// Remove sensitive data before returning
static async getUser(userId) {
  const doc = await db.collection("users").doc(userId).get();
  const data = doc.data();
  
  // Don't expose sensitive fields
  delete data.passwordHash;
  delete data.apiKey;
  
  return { id: doc.id, ...data };
}

// Prevent unauthorized updates
static async updateUser(userId, updateData) {
  // Don't allow changing role/permissions
  delete updateData.role;
  delete updateData.isAdmin;
  
  // Continue with safe update...
}

// Validate ownership before operations
static async deleteCard(cardId, userId) {
  const card = await db.collection("cards").doc(cardId).get();
  
  if (card.data().userId !== userId) {
    throw new Error("Unauthorized: Not card owner");
  }
  
  // Continue with delete...
}
```

---

## ✅ Service Checklist

Trước khi hoàn thành service:

- ✅ Có validate inputs?
- ✅ Có xử lý errors?
- ✅ Có log errors?
- ✅ Có sử dụng timestamps?
- ✅ Queries efficient?
- ✅ Không hardcode values?
- ✅ Có prevent unauthorized access?
- ✅ Có JSDoc comments?

---

**Version:** 1.0
**Last Updated:** 2026
**Status:** Active ✅
