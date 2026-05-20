# Architecture & Database Documentation

**Persona-Based Digital Twin Card System**

---

## 1. Introduction

### 1.1 Document Purpose

This document serves as the **Single Source of Truth** for the complete system architecture, database design, data processing flow, and security standards for the Persona Digital Twin Card project. It provides a solid foundation for technical decisions, development, deployment, and maintenance.

### 1.2 Scope

This document covers:
- Complete backend architecture design (Node.js)
- Firestore data structure and models
- Integration with third-party services (Firebase Auth, Cloud Storage, OpenAI API)
- Real-time interaction mechanisms
- System security and protection measures

### 1.3 Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | 20.x+ | Server runtime |
| **Express.js** | 4.x | REST API framework |
| **Firebase Cloud Firestore** | Latest | Primary NoSQL database |
| **Firebase Authentication** | Latest | User authentication (JWT) |
| **Firebase Cloud Storage** | Latest | File storage (images, documents) |
| **OpenAI API** | gpt-4o-mini | AI Digital Twin engine |
| **Next.js** | 15.x | Frontend framework |

### 1.4 Assumptions & Constraints

- System requires continuous internet connectivity for AI processing and real-time data synchronization
- Firestore applies query limits and NoSQL structure, requiring partially denormalized schema for read optimization
- AI chat consumes significant token costs, requiring strict Rate Limiting implementation
- All sensitive operations must go through Node.js middleware (no direct Frontend-to-Firestore writes)

---

## 2. High-Level System Architecture

### 2.1 System Overview

Persona Digital Card follows a **Client-Server architecture combined with Backend-as-a-Service (BaaS)** from Firebase. The Node.js backend serves as the **controller layer**, handling complex business logic, AI interactions, and access control for Firestore through the Firebase Admin SDK.

```
User → Frontend (Next.js) → Express API (Node.js Backend)
        ↓
    Firebase Admin SDK
        ↓
    ├─ Firebase Auth
    ├─ Firestore Database
    ├─ Cloud Storage
    └─ OpenAI API
```

### 2.2 Layered Architecture (3-Tier)

Backend follows strict **3-Tier Architecture**:

**1. Routes Layer (Routing & Middleware)**
- Receives incoming HTTP requests
- Applies authentication and rate limiting middleware
- Routes requests to appropriate controllers

**2. Controller Layer (Request Processing)**
- Validates input data
- Coordinates workflow from Services
- Implements Global Error Handler
- Returns standardized JSON responses

**3. Service Layer (Business Logic)**
- Contains core business logic
- Directly interacts with Firestore
- Handles external API calls (OpenAI)
- Manages data transformation and validation

### 2.3 Data Flow Diagram

```
1. User accesses Frontend (Next.js)
   ↓
2. Frontend sends API request with Bearer Token (Firebase JWT)
   ↓
3. Backend verifies token with Firebase Auth
   ↓
4. If valid: Execute business logic (fetch context, call AI, store results)
   ↓
5. Firestore operations (CRUD)
   ↓
6. For AI requests: Fetch knowledge from DB → Send to OpenAI with System Prompt
   ↓
7. Process response and save to messages collection
   ↓
8. Return standardized JSON response to Frontend
   ↓
9. Frontend displays results in UI
```

### 2.4 Real-Time Features Architecture

The system uses **Firestore Client SDK's snapshot listeners** on the frontend to listen to changes in Inbox and Chat messages without requiring a separate WebSocket/Socket.io connection on the Node.js backend, significantly reducing server load.

---

## 3. System Components

### 3.1 Frontend (Next.js 15)

- SSR/SSG application optimized for SEO (especially for public personal card links)
- RESTful API communication with backend
- Client-side state management for real-time updates
- Responsive design with mobile-first approach

### 3.2 Backend API (Node.js + Express.js)

- Lightweight, stateless Express application
- Easily scalable on-demand (Google Cloud Run, App Engine)
- Data normalization and validation
- AI safety guardrails implementation
- API abuse prevention

### 3.3 Authentication Service (Firebase Auth)

- Handles registration and login (Email/Password, OAuth providers)
- Issues JWT Access Tokens
- Session management

### 3.4 Database (Firebase Cloud Firestore)

- NoSQL document-based database
- Sub-100ms query response time
- Optimized for high-frequency read operations

### 3.5 File Storage (Firebase Cloud Storage)

- Stores avatars, cover images, and QR codes
- Returns public URLs via Firebase CDN

### 3.6 AI Service (OpenAI API)

- Uses gpt-4o-mini model for cost efficiency
- Provides natural language processing for Digital Twin
- Receives system prompts with user knowledge context (RAG)

### 3.7 External Services

- QR Code generation (internal library)
- vCard/NFC generation for physical card access
- Analytics tracking

---

## 4. Firebase Cloud Firestore Database Design

### 4.1 Design Principles

- **NoSQL philosophy**: Data accessed together is stored together
- **Reference-based relationships**: Use document IDs for relationships between Users and Cards
- **Nested objects**: Embed AI configuration directly in Card documents for read optimization
- **Soft deletes**: Mark deleted records instead of permanent removal for analytics preservation
- **Denormalization**: Partially denormalize schema to optimize read operations

### 4.2 Collections & Documents Structure

```
Firestore DB
├── users/                          [Collection: User Accounts]
│   └── {userId}/
│       ├── email: string
│       ├── phone: string
│       ├── fullName: string
│       ├── role: "admin" | "user"
│       ├── authProvider: string
│       ├── isVerified: boolean
│       ├── avatarUrl: string
│       ├── kycStatus: "pending" | "verified" | "rejected"
│       ├── status: "active" | "banned"
│       └── createdAt: timestamp
│
├── cards/                          [Collection: Digital Cards]
│   └── {cardId}/
│       ├── userId: reference
│       ├── slug: string (unique URL identifier)
│       ├── fullName: string
│       ├── jobTitle: string
│       ├── slogan: string
│       ├── bio: string
│       ├── status: "active" | "hidden" | "deleted"
│       ├── isPhonePublic: boolean
│       ├── isEmailPublic: boolean
│       ├── avatarUrl: string
│       ├── coverUrl: string
│       ├── createdAt: timestamp
│       ├── deletedAt: timestamp
│       ├── theme: {
│       │   ├── templateId: reference
│       │   ├── primaryColor: string
│       │   ├── font: string
│       │   └── mode: "dark" | "light"
│       ├── aiConfig: {
│       │   ├── aiStatus: "Ready" | "Disabled" | "Error"
│       │   ├── systemPrompt: string
│       │   ├── knowledgeData: object
│       │   ├── toneOfVoice: string
│       │   └── isAiPaused: boolean
│       ├── socialLinks: [
│       │   {
│       │       ├── platform: string
│       │       └── url: string
│       │   }
│       ]
│       └── messages/               [SubCollection: Inbox Messages]
│           └── {messageId}/
│               ├── senderName: string
│               ├── senderEmail: string
│               ├── senderPhone: string
│               ├── content: string
│               ├── isRead: boolean
│               ├── isDeleted: boolean
│               └── createdAt: timestamp
│
├── reports/                        [Collection: Content Reports]
│   └── {reportId}/
│       ├── cardId: reference
│       ├── reporterEmail: string
│       ├── reason: string
│       ├── status: "pending" | "resolved"
│       └── createdAt: timestamp
│
├── analytics_cards/                [Collection: Card Analytics]
│   └── {cardId}/                   (Document ID matches card ID)
│       ├── totalViews: number
│       ├── vcfDownloads: number
│       ├── aiChatInteractions: number
│       └── lastUpdated: timestamp
│
└── ai_knowledge_base/              [Collection: Global AI Rules]
    └── global_rules/
        ├── safetyGuidelines: string
        ├── prohibitedTopics: [string]
        ├── jailbreakPatterns: [string]
        └── updatedAt: timestamp
```

### 4.3 Key Collection Details

**Users**: Store user account information with role-based access control (admin/user)

**Cards**: Digital business cards with embedded AI configuration and theme settings

**Messages**: Inbox for static contact form submissions and manual messages (SubCollection)

**Reports**: Community-submitted content violation reports

**Analytics_Cards**: Performance metrics with shared document ID pattern for 1:1 mapping

**AI_Knowledge_Base**: Global safety rules and guardrails

---

## 5. Data Models & Schemas

### 5.1 User Model

```typescript
interface User {
  email: string;              // Unique login identifier
  phone: string;              // Contact number
  fullName: string;           // Full name
  role: "admin" | "user";    // Access control role
  authProvider: string;       // "password" | "google" | etc.
  isVerified: boolean;        // Email verification status
  avatarUrl: string;          // Profile picture URL (Cloud Storage)
  kycStatus: "pending" | "verified" | "rejected";
  status: "active" | "banned"; // Account status control
  createdAt: timestamp;       // Account creation time
}
```

**Purpose**: Store user account information and manage access control for the platform.

### 5.2 Digital Card Model

```typescript
interface DigitalCard {
  userId: string;             // Reference to User (1:N relationship)
  slug: string;               // Unique URL identifier (e.g., "@anthony-simon")
  fullName: string;           // Display name
  jobTitle: string;           // Professional title
  slogan: string;             // Personal tagline
  bio: string;                // Biography/description
  status: "active" | "hidden" | "deleted";
  isPhonePublic: boolean;     // Privacy control
  isEmailPublic: boolean;     // Privacy control
  avatarUrl: string;          // Profile picture
  coverUrl: string;           // Cover image
  createdAt: timestamp;       // Card creation time
  deletedAt?: timestamp;      // Soft delete timestamp (if deleted)
  
  theme: {                    // UI customization
    templateId: string;       // Design template reference
    primaryColor: string;     // Brand color
    font: string;             // Typography choice
    mode: "dark" | "light";   // Color scheme
  };
  
  aiConfig: {                 // Digital Twin configuration
    aiStatus: "Ready" | "Disabled" | "Error";
    systemPrompt: string;     // AI personality prompt
    knowledgeData: {          // RAG context (key-value pairs)
      [key: string]: any;
    };
    toneOfVoice: string;      // Communication style
    isAiPaused: boolean;      // Human takeover flag
  };
  
  socialLinks: Array<{        // Dynamic social media links
    platform: string;         // "github" | "twitter" | etc.
    url: string;              // Link URL
  }>;
}
```

**Purpose**: Primary entity representing a digital business card with AI configuration.

### 5.3 Reports Model

```typescript
interface Report {
  cardId: string;             // Reference to Card being reported
  reporterEmail: string;      // Reporter's email
  reason: string;             // Violation reason
  status: "pending" | "resolved";
  createdAt: timestamp;       // Report submission time
}
```

**Purpose**: Track community-submitted content violation reports for moderation.

### 5.4 Message Model (Inbox)

```typescript
interface Message {
  cardId: string;             // Reference to Card (SubCollection parent)
  senderName: string;         // Visitor's name
  senderEmail: string;        // Visitor's email (for reply)
  senderPhone: string;        // Visitor's phone
  content: string;            // Message content
  isRead: boolean;            // Read status for notifications
  isDeleted: boolean;         // Soft delete flag
  createdAt: timestamp;       // Message submission time
}
```

**Purpose**: Store static contact form submissions and manual messages in card inbox.

### 5.5 AI Knowledge Base Model

```typescript
interface AiKnowledgeBase {
  // Collection: ai_knowledge_base
  // Document: global_rules
  
  safetyGuidelines: string;   // Guardrails text
  prohibitedTopics: string[]; // Topics to refuse
  jailbreakPatterns: string[]; // Patterns to block
  updatedAt: timestamp;
}
```

**Purpose**: Store global AI safety rules mixed with user-specific system prompts.

### 5.6 Analytics Model

```typescript
interface Analytics {
  // Document ID matches cardId for 1:1 relationship
  totalViews: number;         // Page view count
  vcfDownloads: number;       // vCard download count
  aiChatInteractions: number; // AI chat interaction count
  lastUpdated: timestamp;     // Last update time
}
```

**Purpose**: Track card performance metrics independently from card configuration.

---

## 6. Relationships Between Collections

### 6.1 Users → Cards (1:N Reference Relationship)

**Business Logic**: One user account can create and own multiple digital cards representing different personas (e.g., Developer Card, Investor Card). However, each card belongs to exactly one user at any time.

**Implementation**: Each document in the `cards` collection contains a `userId` field (string) storing the user's document ID. Query example:
```javascript
db.collection('cards').where('userId', '==', req.user.uid)
```

### 6.2 Cards → Messages (1:N Subcollection Relationship)

**Business Logic**: Each card has its own isolated Inbox for contact form submissions and manual messages received when AI is disabled or customer requests direct contact.

**Implementation**: Messages are stored as a subcollection directly nested within card documents:
```
Path: /cards/{cardId}/messages/{messageId}
```

This design leverages Firebase Security Rules for precise access control and optimizes read performance for inbox queries.

### 6.3 Cards → Analytics (1:1 Shared Document ID)

**Business Logic**: Each card has exactly one associated analytics record tracking views, downloads, and AI interactions. Statistics update frequently and should be stored separately to avoid repeated writes to card configuration.

**Implementation**: Analytics documents use the same ID as their corresponding card:
```javascript
db.collection('analytics_cards').doc(cardId).get()
```

This creates a 1:1 mapping without storing redundant data in the card document.

### 6.4 Cards → Reports (1:N Reference Relationship)

**Business Logic**: A card can receive multiple independent violation reports from community users. Admin team uses aggregated report counts to identify problematic cards for moderation action.

**Implementation**: Reports collection stores `cardId` as a reference field. Admin queries by card:
```javascript
db.collection('reports').where('cardId', '==', cardId).get()
```

---

## 7. Authentication & Authorization

### 7.1 Firebase Auth Integration

All login flows originate from the frontend. The frontend receives a Firebase JWT (IdToken) and transmits it via HTTP Header:
```
Authorization: Bearer <token>
```

The backend verifies the token using Firebase Admin SDK.

### 7.2 Role-Based Access Control

Firebase Auth doesn't provide built-in roles, so the backend middleware automatically maps the JWT's `uid` to user documents in Firestore and checks the `role` field:

```javascript
// Verification middleware
const verifyAdmin = async (req, res, next) => {
  const userDoc = await db.collection('users').doc(req.user.uid).get();
  if (userDoc.data().role !== 'admin') {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  next();
};
```

### 7.3 Security Rules

Although Node.js uses Firebase Admin SDK (which bypasses normal Security Rules), all client requests **must** go through the Node.js backend middleware for strict access control. Direct Frontend-to-Firestore writes are forbidden except for real-time listening.

### 7.4 JWT Management

- Tokens are short-lived (hours)
- Logout destroys the token on client
- Firebase Auth invalidates the session

---

## 8. API Design (Node.js + Express Backend)

### 8.1 API Architecture Overview

Base URL: `/api/v1`

#### Authentication Endpoints
```
POST /auth/register          Register new account
POST /auth/login             Login with credentials
POST /auth/forgot-password   Password recovery
```

#### User Management Endpoints
```
GET  /users/me              Get current user profile
PUT  /users/me              Update user profile (eKYC)
GET  /users                 List all users (Admin only)
PUT  /users/:id/status      Ban/unban user (Admin only)
```

#### Card Management Endpoints
```
POST   /cards               Create new card
GET    /cards/:slug         View public card (by URL slug)
GET    /cards               Get user's cards
PUT    /cards/:cardId       Update card information/theme
DELETE /cards/:cardId       Soft delete card
PUT    /cards/:cardId/ai-config    Configure AI Digital Twin
POST   /cards/:cardId/upload-docs  Upload knowledge base documents
```

#### Chat & Messaging Endpoints
```
POST /chat/cards/:cardId/chat      Chat with AI Persona
POST /cards/:cardId/messages       Send static message/contact form
GET  /cards/:cardId/messages       Fetch inbox messages
PUT  /messages/:messageId/read     Mark message as read
```

#### Analytics Endpoints
```
POST /analytics/cards/:cardId/track-vcf   Track vCard downloads
GET  /analytics/cards/:cardId             Get card analytics
GET  /analytics/global                    Get system statistics (Admin only)
```

#### Reports & Moderation Endpoints
```
POST /reports                       Submit violation report
GET  /reports                       View reports (Admin only)
PUT  /reports/:reportId/resolve     Resolve report & take action (Admin only)
```

### 8.2 Route Organization

Routes are organized into separate files:
- `authRoutes.js` - Authentication endpoints
- `userRoutes.js` - User profile management
- `cardRoutes.js` - Card CRUD and configuration
- `chatRoutes.js` - AI chat endpoint
- `analyticsRoutes.js` - Statistics and tracking
- `reportRoutes.js` - Content moderation

### 8.3 Middleware Stack

```
Client Request
    ↓
Error Handler (wraps all routes)
    ↓
Authentication Middleware (verifyToken)
    ↓
Rate Limit Middleware
    - Global: 100 req/15 minutes
    - Chat AI: 10 req/1 minute
    ↓
Route Handler
    ↓
Input Validation
    ↓
Business Logic (Service Layer)
    ↓
Response Handler
```

### 8.4 Global Error Handler

All errors are caught by a global middleware that:
- Removes stack traces in production
- Returns standardized JSON format: `{ status, message }`
- Returns Vietnamese error messages
- Prevents information leakage

---

## 9. AI Digital Twin Integration

### 9.1 AI Prompting Architecture

Uses a simplified RAG (Retrieval-Augmented Generation) approach:
- Context is embedded statically as text in the OpenAI message system
- No vector database needed for simplicity

### 9.2 Knowledge Base Generation

Instead of complex vector databases, the user's profile data is parsed into a compact JSON structure and injected into the system prompt:

```json
{
  "name": "Anthony Simon",
  "jobTitle": "Software Engineer",
  "bio": "Full-stack developer with 10 years experience",
  "slogan": "Building the future",
  "socialLinks": [
    { "platform": "github", "url": "..." },
    { "platform": "twitter", "url": "..." }
  ],
  "customKnowledge": {
    // Custom fields added by user
  }
}
```

### 9.3 System Prompt + Guardrails

The API flow:
1. Read card's `aiConfig.systemPrompt` from database
2. Fetch global rules from `ai_knowledge_base` collection
3. Combine into final system message
4. Append user query as user message
5. Send to OpenAI API
6. Return cleaned, Vietnamese-formatted response

```javascript
const systemMessage = `
${globalRules}

---

${cardData.aiConfig.systemPrompt}

About the card owner:
${JSON.stringify(knowledgeData)}
`;
```

### 9.4 Human Takeover Mechanism

When admin pauses AI (sets `isAiPaused = true`):
- Chat endpoint detects this flag
- Returns hardcoded message: "Card owner is busy, please leave a message!"
- Message is stored in inbox subcollection
- No OpenAI API call is made

### 9.5 AI Error Fallback Strategy

When OpenAI API is overloaded or rate-limited:
```javascript
try {
  response = await openai.createChatCompletion(...);
} catch (error) {
  return res.json({
    success: true,
    message: "The inbox is overloaded right now. Please leave a message!"
  });
}
```

---

## 10. File Storage Architecture

### 10.1 Firebase Cloud Storage Structure

Files are organized by folder:
```
gs://bucket/
├── avatars/{userId}/           User profile pictures
├── covers/{cardId}/            Card cover images
├── qr-codes/{cardId}/          QR code images
└── documents/{cardId}/         Knowledge base documents (PDFs, etc.)
```

### 10.2 Access Control

- **Upload**: Only authenticated users can upload files to their own folder
- **Read**: Public access (anyone can download via URL)
- **Security**: Files are served with CDN caching and expiring download URLs

### 10.3 Integration with Firestore

After upload, the backend stores the public download URL in the appropriate Firestore document:
```javascript
// After uploading to Cloud Storage
const downloadUrl = await admin.storage().bucket().file(path).getSignedUrl({
  version: 'v4',
  action: 'read',
  expires: Date.now() + 15*24*60*60*1000, // 15 days
});

// Store in Firestore
await db.collection('users').doc(userId).update({
  avatarUrl: downloadUrl
});
```

---

## 11. Security & Data Protection

### 11.1 Firestore Security Rules

Although Admin SDK is used for backend operations, the rules define the intended access patterns:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users: Only own profile visible, except admins
    match /users/{userId} {
      allow read: if request.auth.uid == userId || 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
      allow write: if request.auth.uid == userId;
    }
    
    // Cards: Public read, authenticated owner can write
    match /cards/{cardId} {
      allow read: if true; // Public view
      allow write: if request.auth.uid == resource.data.userId;
      allow delete: if request.auth.uid == resource.data.userId;
      
      // Messages subcollection: Owner can read, anyone can write
      match /messages/{messageId} {
        allow read: if request.auth.uid == get(/databases/$(database)/documents/cards/$(cardId)).data.userId;
        allow create: if true; // Public can submit
      }
    }
    
    // Reports: Anyone can submit, admins can manage
    match /reports/{reportId} {
      allow create: if true;
      allow read, write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Analytics: Public read
    match /analytics_cards/{cardId} {
      allow read: if true;
      allow write: if false; // Only backend can write
    }
  }
}
```

### 11.2 Rate Limiting & Anti-Spam

```javascript
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // 100 requests per window
  message: 'Too many requests from this IP'
});

const chatLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,   // 1 minute
  max: 10,                    // 10 requests per minute
  skip: (req) => req.user?.role === 'admin'
});

app.use(globalLimiter);
app.post('/chat/:cardId', chatLimiter, chatController);
```

Prevents billing attacks on OpenAI API and system resource exhaustion.

### 11.3 Data Privacy & Consent

- Email and phone fields are **never** returned to frontend unless explicitly set as public
- User privacy preferences (`isEmailPublic`, `isPhonePublic`) are enforced at the API level
- All personal data is never logged or exposed in error messages

```javascript
// Response sanitization
const sanitizeCard = (card) => {
  const sanitized = { ...card };
  if (!card.isEmailPublic) delete sanitized.email;
  if (!card.isPhonePublic) delete sanitized.phone;
  return sanitized;
};
```

### 11.4 Input Sanitization & Validation

Before processing user input in AI prompts:
```javascript
const sanitizeInput = (text) => {
  // Remove XSS scripts
  text = text.replace(/<script[^>]*>.*?<\/script>/gi, '');
  // Remove HTML tags
  text = text.replace(/<[^>]*>/g, '');
  // Limit length
  if (text.length > 5000) text = text.substring(0, 5000);
  return text.trim();
};
```

Prevents prompt injection and jailbreak attempts.

---

## 12. Performance & Scaling

### 12.1 Firestore Indexing Strategy

Create composite indexes for frequently queried combinations:

```
Collection: cards
- (userId, status): For user's card listings
- (slug): For public card retrieval
- (createdAt, status): For time-based queries
```

### 12.2 Query Optimization

- **Avoid**: Fetching entire documents when only 2-3 fields are needed
- **Use**: Projection queries to fetch specific fields only
- **Limit**: Default query results to 50 documents with pagination

```javascript
// Good
const cards = await db.collection('cards')
  .where('userId', '==', uid)
  .select('slug', 'fullName', 'avatarUrl')
  .limit(50)
  .get();

// Avoid
const cards = await db.collection('cards')
  .where('userId', '==', uid)
  .get(); // Gets all fields
```

### 12.3 Caching Strategy

For high-traffic endpoints like public card view (`GET /cards/:slug`):
- Implement Redis caching (future enhancement)
- Cache time-to-live: 1 hour (cards are rarely updated)
- Cache invalidation: Update on card modification

```javascript
const cacheKey = `card:${slug}`;
const cached = await redis.get(cacheKey);
if (cached) return cached;

const card = await db.collection('cards')
  .where('slug', '==', slug)
  .limit(1)
  .get();

await redis.setex(cacheKey, 3600, JSON.stringify(card)); // 1 hour TTL
```

### 12.4 Cost Optimization

**Firestore**:
- Index wisely to avoid over-indexing
- Denormalize selectively to reduce queries
- Monitor read/write operations

**OpenAI API**:
- Limit max output tokens to 300-500 to prevent runaway costs
- Use `gpt-4o-mini` model for best price-to-performance ratio
- Implement request validation before calling API

```javascript
const response = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [{ role: 'system', content: systemPrompt }, ...messages],
  max_tokens: 500, // Hard limit
  temperature: 0.7
});
```

---

## 13. Deployment & Environment

### 13.1 Environment Variables

```
# Firebase Configuration
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
FIREBASE_DATABASE_URL=

# OpenAI Configuration
OPENAI_API_KEY=

# Backend Configuration
PORT=3001
NODE_ENV=production
API_VERSION=v1
```

### 13.2 Deployment Target

- **Frontend**: Vercel / Netlify (Next.js optimized)
- **Backend**: Google Cloud Run / App Engine (stateless Node.js)
- **Database**: Firebase Firestore (managed BaaS)
- **Storage**: Firebase Cloud Storage (CDN included)

### 13.3 Monitoring & Logging

- Use Cloud Logging for centralized log aggregation
- Monitor Firestore costs and quota usage
- Track OpenAI API usage and costs
- Set up alerts for errors and performance degradation

---

## 14. Architectural Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Firestore quota exceeded | Service unavailable | Implement rate limiting, monitor usage, scale quotas |
| OpenAI API failures | Chat unavailable | Implement fallback mechanism, circuit breaker pattern |
| Token exhaustion in AI | Unexpected costs | Set max_tokens limit, implement per-user quotas |
| User data breach | Privacy violation | Encrypt sensitive fields, implement audit logging |
| Prompt injection attacks | AI jailbreak | Input sanitization, guardrails system prompt |
| N+1 query problems | Performance degradation | Use projection queries, implement caching |

---

## 15. API Response Format

All API responses follow a standardized format:

**Success Response**:
```json
{
  "success": true,
  "data": { },
  "message": "Operation successful"
}
```

**Error Response**:
```json
{
  "success": false,
  "error": "Error code",
  "message": "Error description in Vietnamese"
}
```

---

## 16. Future Enhancements

- [ ] Vector database integration (Pinecone) for advanced RAG
- [ ] WebSocket support for real-time chat streaming
- [ ] Email notifications (NodeMailer / SendGrid)
- [ ] Mobile app integration (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support for AI responses

---

**Document Version**: 1.0  
**Last Updated**: 2026  
**Status**: Active ✅  

*This document is the Single Source of Truth for all system architecture decisions. Any changes to architecture must be reflected here immediately.*
