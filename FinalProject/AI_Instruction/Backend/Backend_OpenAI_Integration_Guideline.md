# Backend OpenAI Integration Guideline

**Hướng dẫn chi tiết cho việc tích hợp OpenAI API trong Backend của dự án Persona-Based Digital Twin Card.**

---

## 📋 OpenAI Integration là gì?

OpenAI Integration là việc gọi OpenAI API để sinh ra AI responses cho AI Twin. Sử dụng gpt-4o-mini model với persona, knowledge base, và safety guardrails.

**Trách nhiệm:**
- ✅ Call OpenAI API
- ✅ Build system prompts
- ✅ Manage knowledge base (RAG)
- ✅ Implement guardrails
- ✅ Handle errors & fallbacks
- ✅ Track costs
- ✅ Cache responses

---

## 🏗️ Architecture

```
Request Flow:
1. Receive message from Frontend
   ↓
2. Load card's AI configuration
   ↓
3. Build system prompt
   - Global guardrails
   - Card's custom prompt
   - Knowledge base context
   ↓
4. Call OpenAI API (gpt-4o-mini)
   ↓
5. Validate response against guardrails
   ↓
6. Store in Firestore
   ↓
7. Return to Frontend
```

---

## 💾 Setup OpenAI Client

```javascript
// config/openai.js

const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID
});

module.exports = openai;
```

### Environment Variables

```bash
# .env
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
OPENAI_ORG_ID=org-xxxxxxxxxxxxx
OPENAI_MODEL=gpt-4o-mini
OPENAI_MAX_TOKENS=500
OPENAI_TEMPERATURE=0.7
```

---

## 🤖 System Prompt Building

### Complete System Prompt Structure

```javascript
// services/aiService.js

/**
 * Build comprehensive system prompt
 * Combines global rules, card config, and knowledge base
 */
function buildSystemPrompt(card, globalRules) {
  return `
${globalRules.systemGuidelines}

---

CARD OWNER PROFILE
==================
Name: ${card.fullName}
Job Title: ${card.jobTitle}
Experience: ${card.experience}

You are ${card.fullName}'s AI assistant. Answer as if you are them.

CUSTOM INSTRUCTIONS
===================
${card.aiConfig.systemPrompt}

TONE OF VOICE
=============
${card.aiConfig.toneOfVoice}

KNOWLEDGE BASE
==============
${formatKnowledgeBase(card.aiConfig.knowledgeBase)}

IMPORTANT RULES
===============
1. Only answer based on provided information
2. Don't fabricate facts about ${card.fullName}
3. Be helpful, professional, and respectful
4. If you don't know something, say so
5. Suggest contacting ${card.fullName} directly for urgent matters

---
`.trim();
}

/**
 * Format knowledge base for context
 */
function formatKnowledgeBase(kb) {
  if (!kb || kb.length === 0) {
    return "No specific knowledge base provided.";
  }

  return kb
    .map((item, index) => \`\${index + 1}. \${item.title}: \${item.content}\`)
    .join("\n");
}
```

### Global Safety Guidelines

```javascript
const GLOBAL_GUARDRAILS = {
  systemGuidelines: \`
You are an AI assistant representing someone's professional profile.

PROHIBITED TOPICS:
- Do not discuss politics, religion, or controversial issues
- Do not share personal contact information
- Do not make promises on behalf of the card owner
- Do not provide medical, legal, or financial advice
- Do not engage in inappropriate conversations

SAFETY RULES:
- Keep responses under 500 characters
- Be factual and avoid speculation
- Maintain professional tone
- Respect user privacy
- Don't repeat conversations to others
  \`,
  prohibitedTopics: [
    "politics",
    "religion",
    "personal finance",
    "medical advice",
    "legal advice"
  ],
  temperature: 0.7,
  maxTokens: 500,
  topP: 0.9
};
```

---

## 📤 Call OpenAI API

### Basic API Call

```javascript
/**
 * Generate AI response
 */
async function generateAIResponse(systemPrompt, userMessage) {
  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS) || 500,
      temperature: parseFloat(process.env.OPENAI_TEMPERATURE) || 0.7,
      top_p: 0.9
    });

    return {
      content: response.choices[0].message.content,
      usage: {
        promptTokens: response.usage.prompt_tokens,
        completionTokens: response.usage.completion_tokens
      },
      model: response.model,
      created: response.created
    };
  } catch (error) {
    logger.error("OpenAI API error", { error });
    throw error;
  }
}
```

### Streaming Response (Optional)

```javascript
/**
 * Stream AI response (for real-time updates to frontend)
 */
async function streamAIResponse(systemPrompt, userMessage, onChunk) {
  try {
    const stream = openai.chat.completions.stream({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    let fullContent = "";

    stream.on("text", (text) => {
      fullContent += text;
      onChunk(text);  // Send to frontend
    });

    const finalMessage = await stream.finalMessage();
    return fullContent;
  } catch (error) {
    logger.error("Stream error", { error });
    throw error;
  }
}
```

---

## 🛡️ Guardrails Implementation

### Response Validation

```javascript
/**
 * Validate response against guardrails
 */
function validateAIResponse(response, guardrails) {
  // Check length
  if (response.length > 2000) {
    return {
      valid: false,
      reason: "Response too long",
      fallback: "Response was too long. Please try again."
    };
  }

  // Check for prohibited content
  for (const topic of guardrails.prohibitedTopics) {
    if (response.toLowerCase().includes(topic.toLowerCase())) {
      return {
        valid: false,
        reason: "Prohibited topic detected",
        fallback: "I cannot discuss that topic."
      };
    }
  }

  // Check for harmful patterns
  const harmfulPatterns = [
    /hack|crack|exploit/i,
    /kill|murder|harm/i,
    /steal|rob|fraud/i
  ];

  for (const pattern of harmfulPatterns) {
    if (pattern.test(response)) {
      return {
        valid: false,
        reason: "Harmful content detected",
        fallback: "I cannot provide that response."
      };
    }
  }

  return { valid: true };
}
```

### Error Handling & Fallback

```javascript
/**
 * Complete AI response flow with error handling
 */
async function chatWithAI(cardId, message, conversationId = null) {
  try {
    // Load card
    const card = await CardService.getCardById(cardId);
    if (!card) {
      return {
        success: true,
        response: "Card not found. Please try again.",
        isFallback: true
      };
    }

    // Check if AI is enabled
    if (!card.aiConfig || !card.aiConfig.enabled) {
      return {
        success: true,
        response: "AI is currently disabled for this card.",
        isFallback: true
      };
    }

    // Rate limit check
    const rateLimitOk = await checkRateLimit(cardId);
    if (!rateLimitOk) {
      return {
        success: true,
        response: "You've sent too many messages. Please wait a moment.",
        isFallback: true
      };
    }

    // Build prompt
    const systemPrompt = buildSystemPrompt(card, GLOBAL_GUARDRAILS);

    // Call OpenAI
    const aiResponse = await generateAIResponse(systemPrompt, message);

    // Validate response
    const validation = validateAIResponse(
      aiResponse.content,
      GLOBAL_GUARDRAILS
    );

    if (!validation.valid) {
      logger.warn("Guardrail violation", {
        cardId,
        reason: validation.reason
      });

      return {
        success: true,
        response: validation.fallback,
        isFallback: true
      };
    }

    // Store conversation
    let convId = conversationId;
    if (!convId) {
      const conv = await ConversationService.createConversation({
        cardId,
        visitorId: "visitor_" + generateId(),
        status: "active"
      });
      convId = conv.id;
    }

    // Store messages
    await MessageService.createMessage({
      conversationId: convId,
      sender: "visitor",
      content: message,
      createdAt: admin.firestore.Timestamp.now()
    });

    await MessageService.createMessage({
      conversationId: convId,
      sender: "ai",
      content: aiResponse.content,
      metadata: {
        tokens: aiResponse.usage.completionTokens,
        model: aiResponse.model
      },
      createdAt: admin.firestore.Timestamp.now()
    });

    // Track cost
    await trackOpenAICost(cardId, aiResponse.usage);

    return {
      success: true,
      conversationId: convId,
      response: aiResponse.content,
      isFallback: false
    };

  } catch (error) {
    logger.error("Chat error", { error, cardId });

    // Handle specific errors
    if (error.code === "rate_limit_exceeded") {
      return {
        success: true,
        response: "The service is busy. Please try again in a moment.",
        isFallback: true
      };
    }

    if (error.code === "server_error") {
      return {
        success: true,
        response: "The service is experiencing issues. Please leave a message.",
        isFallback: true
      };
    }

    if (error.code === "invalid_api_key") {
      logger.fatal("Invalid OpenAI API key", { error });
      return {
        success: false,
        error: "SERVER_ERROR",
        message: "AI service is unavailable"
      };
    }

    // Generic fallback
    return {
      success: true,
      response: "I'm having trouble responding. Please try again.",
      isFallback: true
    };
  }
}
```

---

## 💰 Cost Optimization & Tracking

### Cost Calculator

```javascript
/**
 * Calculate API costs
 * Prices as of 2026 (check OpenAI pricing page for updates)
 */
class OpenAICostTracker {
  static PRICES = {
    "gpt-4o-mini": {
      inputToken: 0.00015,    // per token
      outputToken: 0.0006     // per token
    },
    "gpt-4": {
      inputToken: 0.03,
      outputToken: 0.06
    }
  };

  static calculateCost(model, inputTokens, outputTokens) {
    const prices = this.PRICES[model];
    if (!prices) {
      throw new Error(`Unknown model: ${model}`);
    }

    const inputCost = inputTokens * prices.inputToken;
    const outputCost = outputTokens * prices.outputToken;
    const totalCost = inputCost + outputCost;

    return {
      inputCost,
      outputCost,
      totalCost,
      currency: "USD"
    };
  }

  static async trackUsage(cardId, usage, model = "gpt-4o-mini") {
    const cost = this.calculateCost(
      model,
      usage.promptTokens,
      usage.completionTokens
    );

    // Store in Firestore for analytics
    await db.collection("api_costs").add({
      cardId,
      model,
      inputTokens: usage.promptTokens,
      outputTokens: usage.completionTokens,
      cost: cost.totalCost,
      createdAt: admin.firestore.Timestamp.now()
    });

    return cost;
  }

  static async getDailySpending(cardId, date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const snapshot = await db
      .collection("api_costs")
      .where("cardId", "==", cardId)
      .where("createdAt", ">=", admin.firestore.Timestamp.fromDate(startOfDay))
      .where("createdAt", "<=", admin.firestore.Timestamp.fromDate(endOfDay))
      .get();

    let totalSpending = 0;
    snapshot.forEach(doc => {
      totalSpending += doc.data().cost || 0;
    });

    return totalSpending;
  }
}
```

### Cost Limits

```javascript
/**
 * Enforce daily API spending limit
 */
async function checkCostLimit(cardId, dailyLimit = 10) {
  const today = new Date();
  const spending = await OpenAICostTracker.getDailySpending(cardId, today);

  if (spending > dailyLimit) {
    logger.warn("Daily cost limit exceeded", { cardId, spending, limit: dailyLimit });
    return false;
  }

  return true;
}

// Usage in chatWithAI
if (!await checkCostLimit(cardId)) {
  return {
    success: true,
    response: "Daily API limit reached. Please try tomorrow.",
    isFallback: true
  };
}
```

---

## 🔄 Caching Responses

```javascript
/**
 * Cache AI responses to reduce API calls
 */
class ResponseCache {
  constructor(ttl = 3600000) {  // 1 hour default
    this.cache = new Map();
    this.ttl = ttl;
  }

  generateKey(message, systemPromptHash) {
    return `${systemPromptHash}:${message.toLowerCase()}`;
  }

  set(key, response) {
    this.cache.set(key, {
      response,
      timestamp: Date.now()
    });
  }

  get(key) {
    const cached = this.cache.get(key);

    if (!cached) return null;

    // Check if expired
    if (Date.now() - cached.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return cached.response;
  }

  clear() {
    this.cache.clear();
  }
}

const responseCache = new ResponseCache();

// Usage
async function generateAIResponseWithCache(systemPrompt, message) {
  const promptHash = generateHash(systemPrompt);
  const cacheKey = responseCache.generateKey(message, promptHash);

  // Check cache
  const cached = responseCache.get(cacheKey);
  if (cached) {
    logger.info("Cache hit", { cacheKey });
    return cached;
  }

  // Call API
  const response = await generateAIResponse(systemPrompt, message);

  // Cache result
  responseCache.set(cacheKey, response);

  return response;
}
```

---

## ✅ Testing OpenAI Integration

```javascript
/**
 * Test AI response generation
 */
describe("OpenAI Integration", () => {
  it("should generate valid response", async () => {
    const prompt = "You are a helpful assistant.";
    const message = "What is 2+2?";

    const response = await generateAIResponse(prompt, message);

    expect(response).toHaveProperty("content");
    expect(response).toHaveProperty("usage");
    expect(response.content.length).toBeGreaterThan(0);
  });

  it("should validate response against guardrails", async () => {
    const response = "I will help you hack a system.";

    const validation = validateAIResponse(response, GLOBAL_GUARDRAILS);

    expect(validation.valid).toBe(false);
    expect(validation.fallback).toBeDefined();
  });

  it("should handle API errors gracefully", async () => {
    // Mock API error
    openai.chat.completions.create = jest.fn()
      .mockRejectedValue(new Error("API Error"));

    const result = await chatWithAI("card123", "test");

    expect(result.isFallback).toBe(true);
    expect(result.success).toBe(true);
  });

  it("should track costs correctly", async () => {
    const cost = OpenAICostTracker.calculateCost(
      "gpt-4o-mini",
      100,  // 100 input tokens
      50    // 50 output tokens
    );

    expect(cost.totalCost).toBeCloseTo(0.045, 5);
  });
});
```

---

## 📋 Best Practices

### 1. **Always validate inputs**
```javascript
if (!cardId || typeof cardId !== "string") {
  throw new Error("Invalid cardId");
}

if (!message || message.trim().length === 0) {
  throw new Error("Message cannot be empty");
}
```

### 2. **Implement retry logic**
```javascript
async function callOpenAIWithRetry(prompt, message, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await generateAIResponse(prompt, message);
    } catch (error) {
      if (i < maxRetries - 1 && error.code === "server_error") {
        await delay(1000 * (i + 1));  // Exponential backoff
        continue;
      }
      throw error;
    }
  }
}
```

### 3. **Monitor token usage**
```javascript
logger.info("AI API usage", {
  cardId,
  inputTokens: usage.promptTokens,
  outputTokens: usage.completionTokens,
  totalTokens: usage.promptTokens + usage.completionTokens,
  estimatedCost: (usage.promptTokens * 0.00015) + (usage.completionTokens * 0.0006)
});
```

### 4. **Set reasonable timeouts**
```javascript
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 30000); // 30 seconds

try {
  const response = await openai.chat.completions.create({
    // ... config
  }, {
    signal: controller.signal
  });
} finally {
  clearTimeout(timeout);
}
```

---

## ✅ Checklist

Trước khi push OpenAI integration:

- ✅ API key configured in .env?
- ✅ System prompt comprehensive?
- ✅ Guardrails implemented?
- ✅ Error handling complete?
- ✅ Rate limiting in place?
- ✅ Costs tracked?
- ✅ Responses cached?
- ✅ Tests written?
- ✅ Logging sufficient?

---

**Version:** 1.0
**Last Updated:** 2026
**Status:** Active ✅
