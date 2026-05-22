# Backend Firestore Operations Guideline

**Hướng dẫn chi tiết cho việc làm việc với Firestore trong Backend của dự án Persona-Based Digital Twin Card.**

---

## 📋 Firestore là gì?

Firestore (Cloud Firestore) là NoSQL database từ Firebase. Lưu trữ dữ liệu dưới dạng documents trong collections.

**Trách nhiệm của Firestore Layer:**
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Efficient queries
- ✅ Data consistency
- ✅ Transaction handling
- ✅ Batch operations
- ✅ Pagination
- ✅ Search & filtering

---

## 🏗️ Firestore Collections & Data Models

### Collections Structure

```
users/
├── user123
│   ├── email: string
│   ├── name: string
│   ├── role: "user" | "admin"
│   ├── isActive: boolean
│   ├── createdAt: Timestamp
│   └── updatedAt: Timestamp

cards/
├── card123
│   ├── userId: string
│   ├── title: string
│   ├── slug: string (unique)
│   ├── bio: string
│   ├── isPublished: boolean
│   ├── aiConfig: object
│   ├── createdAt: Timestamp
│   └── updatedAt: Timestamp

conversations/
├── conv123
│   ├── cardId: string
│   ├── visitorId: string
│   ├── status: "active" | "escalated" | "closed"
│   ├── createdAt: Timestamp
│   └── updatedAt: Timestamp

messages/
├── msg123
│   ├── conversationId: string
│   ├── sender: "visitor" | "ai" | "human"
│   ├── content: string
│   ├── createdAt: Timestamp
│   └── metadata: object
```

---

## 💾 Basic Firestore Operations

### 1. **Create (Add/Set)**

```javascript
// Option 1: Add (auto-generates ID)
const docRef = await db.collection("users").add({
  email: "user@example.com",
  name: "John Doe",
  role: "user",
  createdAt: admin.firestore.Timestamp.now(),
  updatedAt: admin.firestore.Timestamp.now()
});

console.log("Created with ID:", docRef.id);

// Option 2: Set (specific ID)
await db.collection("users").doc("user123").set({
  email: "user@example.com",
  name: "John Doe",
  createdAt: admin.firestore.Timestamp.now()
});

// Option 3: Set with merge (don't overwrite existing fields)
await db.collection("users").doc("user123").set(
  { name: "Jane Doe", updatedAt: admin.firestore.Timestamp.now() },
  { merge: true }
);
```

### 2. **Read (Get)**

```javascript
// Get single document
const doc = await db.collection("users").doc("user123").get();

if (doc.exists) {
  console.log("Document data:", doc.data());
  console.log("Document ID:", doc.id);
} else {
  console.log("Document not found");
}

// Get all documents in collection
const snapshot = await db.collection("users").get();

snapshot.forEach(doc => {
  console.log(doc.id, "=>", doc.data());
});
```

### 3. **Update**

```javascript
// Update specific fields (doesn't overwrite other fields)
await db.collection("users").doc("user123").update({
  name: "Jane Doe",
  updatedAt: admin.firestore.Timestamp.now()
});

// Update nested field
await db.collection("cards").doc("card123").update({
  "aiConfig.tone": "professional",
  "aiConfig.updatedAt": admin.firestore.Timestamp.now()
});

// Delete a field
await db.collection("users").doc("user123").update({
  tempField: admin.firestore.FieldValue.delete()
});
```

### 4. **Delete**

```javascript
// Delete document
await db.collection("users").doc("user123").delete();

// Soft delete (set flag instead)
await db.collection("users").doc("user123").update({
  isDeleted: true,
  deletedAt: admin.firestore.Timestamp.now()
});
```

---

## 🔍 Query Operations

### Basic Queries

```javascript
// WHERE clause (single condition)
const snapshot = await db
  .collection("cards")
  .where("userId", "==", "user123")
  .get();

// Multiple WHERE clauses (AND)
const snapshot = await db
  .collection("cards")
  .where("userId", "==", "user123")
  .where("isPublished", "==", true)
  .get();

// ORDER BY
const snapshot = await db
  .collection("cards")
  .where("userId", "==", "user123")
  .orderBy("createdAt", "desc")
  .get();

// LIMIT
const snapshot = await db
  .collection("cards")
  .where("userId", "==", "user123")
  .limit(10)
  .get();

// OFFSET & PAGINATION
const snapshot = await db
  .collection("cards")
  .where("userId", "==", "user123")
  .orderBy("createdAt", "desc")
  .limit(10)
  .offset(20)
  .get();
```

### Advanced Queries

```javascript
// Range queries
const snapshot = await db
  .collection("conversations")
  .where("createdAt", ">=", startDate)
  .where("createdAt", "<=", endDate)
  .get();

// Array contains
const snapshot = await db
  .collection("cards")
  .where("tags", "array-contains", "favorite")
  .get();

// In query
const snapshot = await db
  .collection("messages")
  .where("status", "in", ["sent", "delivered"])
  .get();

// Exists query (check if field exists)
const snapshot = await db
  .collection("cards")
  .where("aiConfig", "!=", null)
  .get();
```

---

## ⚡ Performance Optimization

### 1. **Use Indexes for Complex Queries**

```javascript
// This query needs composite index
db.collection("cards")
  .where("userId", "==", userId)
  .where("isPublished", "==", true)
  .orderBy("createdAt", "desc")
  .get()

// Firestore will suggest creating index in console
```

### 2. **Avoid N+1 Queries**

```javascript
// ❌ BAD: N+1 pattern
const conversations = await db.collection("conversations").get();
for (const conv of conversations.docs) {
  const messages = await db
    .collection("messages")
    .where("conversationId", "==", conv.id)
    .get();  // N extra queries!
}

// ✅ GOOD: Single query
const messages = await db
  .collection("messages")
  .where("cardId", "==", cardId)
  .get();

// Group messages by conversation
const grouped = {};
messages.docs.forEach(doc => {
  const data = doc.data();
  const convId = data.conversationId;
  if (!grouped[convId]) grouped[convId] = [];
  grouped[convId].push({ id: doc.id, ...data });
});
```

### 3. **Limit Fields Returned**

```javascript
// Only get needed fields (reduces data transfer)
const snapshot = await db
  .collection("cards")
  .where("userId", "==", userId)
  .select("title", "slug", "isPublished")
  .get();
```

### 4. **Cache & Reuse Results**

```javascript
// Cache user data
const userCache = new Map();

async function getUser(userId) {
  if (userCache.has(userId)) {
    return userCache.get(userId);
  }

  const user = await db.collection("users").doc(userId).get();
  const userData = { id: user.id, ...user.data() };

  // Cache for 5 minutes
  userCache.set(userId, userData);
  setTimeout(() => userCache.delete(userId), 5 * 60 * 1000);

  return userData;
}
```

---

## 🔄 Transactions & Batch Operations

### Transactions (Atomic Operations)

```javascript
// Transaction: ensure multiple updates succeed together
const db = admin.firestore();

const transaction = db.transaction();

try {
  await transaction.runTransaction(async (txn) => {
    // Read
    const cardRef = db.collection("cards").doc(cardId);
    const cardDoc = await txn.get(cardRef);

    if (!cardDoc.exists) {
      throw new Error("Card not found");
    }

    const cardData = cardDoc.data();

    // Update card
    txn.update(cardRef, {
      viewCount: cardData.viewCount + 1,
      updatedAt: admin.firestore.Timestamp.now()
    });

    // Create analytics entry
    const analyticsRef = db.collection("analytics").doc();
    txn.set(analyticsRef, {
      cardId: cardId,
      event: "view",
      createdAt: admin.firestore.Timestamp.now()
    });
  });

  console.log("Transaction successful");
} catch (error) {
  console.error("Transaction failed:", error);
  throw error;
}
```

### Batch Operations

```javascript
// Batch: multiple writes (up to 500)
const batch = db.batch();

// Add multiple documents
batch.set(db.collection("users").doc("user1"), { name: "User 1" });
batch.set(db.collection("users").doc("user2"), { name: "User 2" });

// Update
batch.update(db.collection("users").doc("user3"), { status: "active" });

// Delete
batch.delete(db.collection("users").doc("user4"));

// Commit all
await batch.commit();
console.log("Batch operation completed");
```

---

## 📊 Common Firestore Patterns

### Pattern 1: Pagination

```javascript
class PaginationHelper {
  static async paginate(collection, pageSize = 10, pageNumber = 1) {
    const offset = (pageNumber - 1) * pageSize;

    // Get total count
    const countSnapshot = await db.collection(collection).get();
    const total = countSnapshot.size;

    // Get page
    const snapshot = await db
      .collection(collection)
      .orderBy("createdAt", "desc")
      .limit(pageSize)
      .offset(offset)
      .get();

    return {
      items: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
      total,
      pageSize,
      pageNumber,
      totalPages: Math.ceil(total / pageSize),
      hasMore: offset + pageSize < total
    };
  }
}

// Usage
const result = await PaginationHelper.paginate("cards", 10, 2);
console.log(result);
```

### Pattern 2: Search (Simple)

```javascript
// Simple prefix search (not full-text)
async function searchCards(userId, searchTerm) {
  const snapshot = await db
    .collection("cards")
    .where("userId", "==", userId)
    .orderBy("title")
    .startAt(searchTerm)
    .endAt(searchTerm + "\uf8ff")
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

// For production, use Algolia or ElasticSearch
```

### Pattern 3: Counter Pattern

```javascript
// Instead of updating counter for every event (creates contention)
// Use sharding pattern

async function incrementCardViews(cardId) {
  const shardId = Math.floor(Math.random() * 10); // 0-9 shards
  const shardRef = db
    .collection("cards")
    .doc(cardId)
    .collection("views_shards")
    .doc(`shard_${shardId}`);

  await shardRef.update({
    count: admin.firestore.FieldValue.increment(1)
  });
}

async function getCardViewCount(cardId) {
  const snapshot = await db
    .collection("cards")
    .doc(cardId)
    .collection("views_shards")
    .get();

  let total = 0;
  snapshot.forEach(doc => {
    total += doc.data().count || 0;
  });

  return total;
}
```

### Pattern 4: Denormalization

```javascript
// Store frequently accessed data in parent document
// Instead of joining (not supported in Firestore)

const cardData = {
  id: "card123",
  userId: "user123",
  title: "Card Title",
  slug: "card-title",
  
  // Denormalized user data
  userName: "John Doe",
  userEmail: "john@example.com",
  
  // Denormalized stats
  viewCount: 42,
  conversationCount: 5,
  
  createdAt: Timestamp.now()
};

// When user name changes, update card document too
await batch.update(cardRef, { userName: newName });
```

---

## 🔐 Firestore Security Rules

```javascript
// firestore.rules

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection
    match /users/{userId} {
      allow read: if request.auth.uid == userId || hasRole('admin');
      allow write: if request.auth.uid == userId && !request.resource.data.role;
      allow delete: if hasRole('admin');
    }
    
    // Cards collection
    match /cards/{cardId} {
      allow read: if true; // Public read
      allow create: if request.auth.uid != null && 
                       request.resource.data.userId == request.auth.uid;
      allow update: if request.auth.uid == resource.data.userId ||
                       hasRole('admin');
      allow delete: if request.auth.uid == resource.data.userId ||
                       hasRole('admin');
    }
    
    // Conversations collection
    match /conversations/{convId} {
      allow read: if request.auth.uid == resource.data.visitorId ||
                     request.auth.uid == resource.data.ownerId ||
                     hasRole('admin');
      allow create: if request.auth.uid != null;
      allow update: if request.auth.uid == resource.data.ownerId ||
                       hasRole('admin');
    }
  }
  
  // Helper functions
  function hasRole(role) {
    return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == role;
  }
}
```

---

## ✅ Firestore Best Practices

### 1. **Always use try-catch**
```javascript
try {
  const doc = await db.collection("users").doc(userId).get();
} catch (error) {
  logger.error("Firestore error", { error });
  throw error;
}
```

### 2. **Use timestamps consistently**
```javascript
const timestamp = admin.firestore.Timestamp.now();
// Use this for all createdAt/updatedAt fields
```

### 3. **Name collections in lowercase**
```javascript
✅ db.collection("users")
❌ db.collection("Users")
```

### 4. **Denormalize for reads, normalize for writes**
```javascript
// Denormalize frequently accessed data
// But be careful with update consistency
```

### 5. **Use exists check before delete**
```javascript
const doc = await ref.get();
if (doc.exists) {
  await ref.delete();
}
```

### 6. **Validate unique fields in Service**
```javascript
const existing = await db
  .collection("cards")
  .where("slug", "==", slug)
  .limit(1)
  .get();

if (!existing.empty) {
  throw new Error("Slug already exists");
}
```

---

## 📋 Firestore Checklist

Trước khi push code:

- ✅ Queries efficient (no N+1)?
- ✅ Using indexes for complex queries?
- ✅ Timestamps handled consistently?
- ✅ Soft delete instead of hard delete?
- ✅ Transaction for atomic operations?
- ✅ Security rules defined?
- ✅ Error handling in place?
- ✅ Performance tested?

---

**Version:** 1.0
**Last Updated:** 2026
**Status:** Active ✅
