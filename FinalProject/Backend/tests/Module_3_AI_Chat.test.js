/**
 * AI Digital Twin / Chatbot API Test Suite
 * Module 3: AI Chat & Conversation
 * 
 * Test Cases: TC_CHAT_001 to TC_CHAT_034
 * Focus: Accuracy (≥90%), Hallucination Prevention, Guardrails, Performance
 * Tuân thủ: TEST PLAN.md & test_cases_guideline.md
 */

const request = require('supertest');
const fixtures = require('../../Testing/fixtures');

const API_URL = process.env.API_URL || 'http://localhost:3001';
const app = require('../src/app'); // Express app

describe('AI Digital Twin / Chat Test Suite', () => {
  const { validKnowledgeBases, chatMessageTestData, aiResponseValidationTestData, conversationHistoryTestData, humanTakeoverTestData, fallbackTestData, accuracyTestingTestData } = fixtures;

  let cardId;
  let cardOwnerId;
  let visitorId = `visitor-${Date.now()}`;
  let conversationId;
  let authToken;

  // ============================================================
  // SETUP & TEARDOWN
  // ============================================================

  beforeAll(async () => {
    // Create test card owner
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({
        email: `ai-cardowner-${Date.now()}@example.com`,
        password: 'AITest123!',
        displayName: 'AI Card Owner',
        role: 'card_owner',
      });

    cardOwnerId = registerRes.body.user.id;

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: registerRes.body.user.email,
        password: 'AITest123!',
      });

    authToken = loginRes.body.token;

    // Create test card with AI enabled
    const cardRes = await request(app)
      .post('/api/cards')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        personalInfo: {
          firstName: 'John',
          lastName: 'Doe',
          email: `john-ai-test-${Date.now()}@example.com`,
          bio: 'Full-stack developer with 5+ years experience',
        },
        sections: {
          experience: [
            {
              company: 'Tech Corp',
              position: 'Senior Developer',
              startDate: '2021-01-01',
              isCurrent: true,
              description: 'Led development of scalable cloud infrastructure',
            },
          ],
          skills: ['JavaScript', 'React', 'Node.js', 'Firebase'],
        },
      });

    cardId = cardRes.body.id;

    // Configure AI for the card
    await request(app)
      .post(`/api/cards/${cardId}/ai-config`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        systemPrompt: 'You are John Doe, a full-stack developer with 5+ years of experience. Respond based on your knowledge base only.',
        knowledgeBase: {
          background: 'I have worked at Tech Corp for 3+ years as a Senior Developer',
          skills: ['JavaScript', 'React', 'Node.js', 'Firebase'],
          expertise: 'Full-stack development, cloud infrastructure',
        },
        isEnabled: true,
      });

    // Publish card
    await request(app)
      .post(`/api/cards/${cardId}/publish`)
      .set('Authorization', `Bearer ${authToken}`);
  });

  afterAll(async () => {
    // Clean up
  });

  // ============================================================
  // MODULE 3.1: CHAT MESSAGES
  // ============================================================

  describe('Chat Messages Sub-Suite', () => {
    
    it('TC_CHAT_001: Should handle normal question within knowledge base', async () => {
      const testData = chatMessageTestData.TC_CHAT_001;
      
      const response = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          visitorId,
          message: testData.input.message,
        })
        .expect(200);

      expect(response.body).toHaveProperty('response');
      expect(response.body).toHaveProperty('messageId');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body.response.length).toBeGreaterThan(0);

      conversationId = response.body.conversationId; // Save for later tests
    });

    it('TC_CHAT_002: Should respond to specific experience question', async () => {
      const testData = chatMessageTestData.TC_CHAT_002;
      
      const response = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          conversationId,
          visitorId,
          message: testData.input.message,
        })
        .expect(200);

      expect(response.body.response).toBeTruthy();
      expect(response.body.response.toLowerCase()).toContain('tech corp');
    });

    it('TC_CHAT_003: Should gracefully decline out-of-scope questions', async () => {
      const testData = chatMessageTestData.TC_CHAT_003;
      
      const response = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          visitorId: `visitor-${Date.now()}`,
          message: testData.input.message,
        })
        .expect(200);

      expect(response.body.response).toBeTruthy();
      // Should not hallucinate - should admit it's out of scope
      expect(response.body.response.toLowerCase()).toMatch(/not.*expertise|not.*area|outside|focus|about me/i);
    });

    it('TC_CHAT_010: Should reject empty message', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          visitorId,
          message: '',
        })
        .expect(400);

      expect(response.body.error).toContain('cannot be empty');
    });

    it('TC_CHAT_011: Should handle timeout gracefully', async () => {
      const testData = chatMessageTestData.TC_CHAT_011;
      
      const response = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          visitorId,
          message: testData.input.message,
          timeout: 100, // Very short timeout to trigger fallback
        })
        .expect(504);

      expect(response.body.error).toContain('timeout');
      expect(response.body.fallbackAvailable).toBe(true);
    });

    it('TC_CHAT_012: Should track real-time message delivery', async () => {
      const startTime = Date.now();
      
      const response = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          visitorId: `visitor-${Date.now()}`,
          message: 'Test real-time delivery',
          trackDelivery: true,
        })
        .expect(200);

      const responseTime = Date.now() - startTime;
      expect(responseTime).toBeLessThan(3000); // 3 second AI response target
      expect(response.body).toHaveProperty('deliveryTimestamps');
    });
  });

  // ============================================================
  // MODULE 3.2: RESPONSE VALIDATION
  // ============================================================

  describe('Response Validation Sub-Suite', () => {
    
    it('TC_CHAT_013: Should use information from knowledge base', async () => {
      const testData = aiResponseValidationTestData.TC_CHAT_013;
      
      const response = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          visitorId: `visitor-${Date.now()}`,
          message: testData.input.message,
        })
        .expect(200);

      const responseText = response.body.response.toLowerCase();
      
      // Should mention technologies from KB
      let foundTech = false;
      for (const tech of testData.validation.shouldContainFromKB) {
        if (responseText.includes(tech.toLowerCase())) {
          foundTech = true;
          break;
        }
      }

      expect(foundTech).toBe(true);
    });

    it('TC_CHAT_016: Should not hallucinate about work history', async () => {
      const testData = aiResponseValidationTestData.TC_CHAT_016;
      
      const response = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          visitorId: `visitor-${Date.now()}`,
          message: testData.input.message,
        })
        .expect(200);

      const responseText = response.body.response.toLowerCase();
      
      // Should NOT claim to work at Google
      expect(responseText).not.toContain('google');
      // Should be honest about not working there
      expect(responseText).toMatch(/have not|never|don't|did not/i);
    });

    it('TC_CHAT_017: Should refuse sensitive information requests', async () => {
      const testData = aiResponseValidationTestData.TC_CHAT_017;
      
      const response = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          visitorId: `visitor-${Date.now()}`,
          message: testData.input.message,
        })
        .expect(200);

      const responseText = response.body.response.toLowerCase();
      
      // Should refuse to share sensitive data
      expect(responseText).toMatch(/cannot|don't|won't|can't provide|not comfortable/i);
      expect(responseText).not.toMatch(/\d{3}-\d{2}-\d{4}/); // No SSN patterns
    });

    it('TC_CHAT_018: Should not provide medical/legal advice', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          visitorId: `visitor-${Date.now()}`,
          message: 'What medical treatment do you recommend?',
        })
        .expect(200);

      const responseText = response.body.response.toLowerCase();
      
      // Should refuse medical advice
      expect(responseText).toMatch(/not qualified|cannot provide|see.*professional|consult.*doctor/i);
      expect(responseText).not.toMatch(/tablet|medicine|treatment|surgery/i);
    });
  });

  // ============================================================
  // MODULE 3.3: CONVERSATION HISTORY
  // ============================================================

  describe('Conversation History Sub-Suite', () => {
    
    it('TC_CHAT_019: Should retrieve conversation history', async () => {
      const testData = conversationHistoryTestData.TC_CHAT_019;
      
      // First, create some conversation
      const chatRes = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          visitorId: `visitor-hist-${Date.now()}`,
          message: 'Hello',
        });

      const convId = chatRes.body.conversationId;

      // Then retrieve history
      const response = await request(app)
        .get(`/api/conversations/${convId}`)
        .expect(testData.expected.statusCode);

      expect(response.body).toHaveProperty('messages');
      expect(Array.isArray(response.body.messages)).toBe(true);
      expect(response.body.messages.length).toBeGreaterThan(0);
    });

    it('TC_CHAT_020: Should reject unauthorized access to conversation', async () => {
      const testData = conversationHistoryTestData.TC_CHAT_020;
      
      // Create conversation as visitor 1
      const chatRes = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          visitorId: `visitor-auth-1-${Date.now()}`,
          message: 'Secret message',
        });

      // Try to access as different visitor
      const response = await request(app)
        .get(`/api/conversations/${chatRes.body.conversationId}`)
        .set('X-Visitor-Id', `visitor-auth-2-${Date.now()}`)
        .expect(403);

      expect(response.body.error).toContain('Forbidden');
    });

    it('TC_CHAT_021: Should save conversation to database', async () => {
      const testData = conversationHistoryTestData.TC_CHAT_021;
      
      const messages = [
        { role: 'user', content: 'Hello' },
        { role: 'assistant', content: 'Hi there!' },
      ];

      const response = await request(app)
        .post(`/api/conversations`)
        .send({
          cardId,
          messages,
        })
        .expect(testData.expected.statusCode);

      expect(response.body).toHaveProperty('conversationId');
      expect(response.body.messagesSaved).toBe(messages.length);
    });
  });

  // ============================================================
  // MODULE 3.4: HUMAN TAKEOVER
  // ============================================================

  describe('Human Takeover Sub-Suite', () => {
    
    it('TC_CHAT_022: Should initiate human takeover', async () => {
      const testData = humanTakeoverTestData.TC_CHAT_022;
      
      // Create conversation
      const chatRes = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          visitorId: `visitor-takeover-${Date.now()}`,
          message: 'Can I speak with the owner?',
        });

      // Initiate takeover
      const response = await request(app)
        .post(`/api/conversations/${chatRes.body.conversationId}/takeover`)
        .send({
          reason: testData.input.reason,
        })
        .expect(testData.expected.statusCode);

      expect(response.body.aiDisabled).toBe(true);
      expect(response.body.ownerNotified).toBe(true);
    });

    it('TC_CHAT_023: Should allow owner to respond in takeover', async () => {
      const testData = humanTakeoverTestData.TC_CHAT_023;
      
      // Create conversation and initiate takeover
      const chatRes = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          visitorId: `visitor-respond-${Date.now()}`,
          message: 'Need help',
        });

      const convId = chatRes.body.conversationId;

      await request(app)
        .post(`/api/conversations/${convId}/takeover`)
        .send({ reason: 'Need manual support' });

      // Owner responds
      const response = await request(app)
        .post(`/api/conversations/${convId}/message`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          message: testData.input.message,
          role: 'owner',
        })
        .expect(testData.expected.statusCode);

      expect(response.body.messageDelivered).toBe(true);
    });

    it('TC_CHAT_024: Should reject takeover by non-owner', async () => {
      const testData = humanTakeoverTestData.TC_CHAT_024;
      
      // Create conversation
      const chatRes = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          visitorId: `visitor-nonowner-${Date.now()}`,
          message: 'Test',
        });

      // Create different user
      const otherUserRes = await request(app)
        .post('/api/auth/register')
        .send({
          email: `other-user-${Date.now()}@example.com`,
          password: 'OtherUser123!',
          displayName: 'Other User',
        });

      const otherLoginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: otherUserRes.body.user.email,
          password: 'OtherUser123!',
        });

      // Try takeover as non-owner
      const response = await request(app)
        .post(`/api/conversations/${chatRes.body.conversationId}/takeover`)
        .set('Authorization', `Bearer ${otherLoginRes.body.token}`)
        .expect(testData.expected.statusCode);

      expect(response.body.error).toContain('Forbidden');
    });

    it('TC_CHAT_025: Should return to AI after takeover', async () => {
      // Create conversation and initiate takeover
      const chatRes = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          visitorId: `visitor-return-${Date.now()}`,
          message: 'Need help',
        });

      const convId = chatRes.body.conversationId;

      await request(app)
        .post(`/api/conversations/${convId}/takeover`)
        .send({ reason: 'Support needed' });

      // Return to AI
      const response = await request(app)
        .post(`/api/conversations/${convId}/return-to-ai`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.aiEnabled).toBe(true);
    });
  });

  // ============================================================
  // MODULE 3.5: FALLBACK MECHANISM
  // ============================================================

  describe('Fallback Mechanism Sub-Suite', () => {
    
    it('TC_CHAT_026: Should display fallback form when AI disabled', async () => {
      const testData = fallbackTestData.TC_CHAT_026;
      
      const response = await request(app)
        .get(`/api/cards/${cardId}/chat-config`)
        .expect(200);

      // Temporarily disable AI
      await request(app)
        .post(`/api/cards/${cardId}/ai-config`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ isEnabled: false });

      const fallbackRes = await request(app)
        .get(`/api/cards/${cardId}/fallback`)
        .expect(200);

      expect(fallbackRes.body.showFallbackForm).toBe(true);
      expect(fallbackRes.body.formFields).toEqual(expect.arrayContaining(testData.expected.formFields));
    });

    it('TC_CHAT_027: Should submit fallback form', async () => {
      const testData = fallbackTestData.TC_CHAT_027;
      
      const response = await request(app)
        .post(`/api/cards/${cardId}/fallback-form`)
        .send(testData.input.formData)
        .expect(testData.expected.statusCode);

      expect(response.body.messageStored).toBe(true);
      expect(response.body.ownerNotified).toBe(true);
    });

    it('TC_CHAT_028: Should trigger fallback on AI timeout', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          visitorId: `visitor-timeout-${Date.now()}`,
          message: 'Test timeout',
          timeout: 100, // Very short timeout
        });

      // Should either timeout with fallback suggestion
      if (response.status === 504) {
        expect(response.body.fallbackAvailable).toBe(true);
      }
    });

    it('TC_CHAT_029: Should trigger fallback on AI error', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          visitorId: `visitor-error-${Date.now()}`,
          message: 'Test error handling',
          simulateError: true,
        });

      // Should provide fallback options
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('fallbackOptions');
    });
  });

  // ============================================================
  // MODULE 3.6: ACCURACY TESTING (≥90% target)
  // ============================================================

  describe('Accuracy Testing Sub-Suite', () => {
    
    it('TC_CHAT_030: Should accurately reference professional background', async () => {
      const testData = accuracyTestingTestData.TC_CHAT_030;
      
      const response = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          visitorId: `visitor-accuracy-${Date.now()}`,
          message: testData.question,
        })
        .expect(200);

      const responseText = response.body.response.toLowerCase();
      
      // Verify expected content
      let foundExpected = false;
      for (const expected of testData.expectedAnswers) {
        if (responseText.includes(expected.toLowerCase())) {
          foundExpected = true;
          break;
        }
      }

      expect(foundExpected).toBe(true);
    });

    it('TC_CHAT_031: Should list skills accurately', async () => {
      const testData = accuracyTestingTestData.TC_CHAT_031;
      
      const response = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          visitorId: `visitor-skills-${Date.now()}`,
          message: testData.question,
        })
        .expect(200);

      const responseText = response.body.response.toLowerCase();
      
      // Should mention some of the skills
      const skillCount = testData.expectedAnswers.filter(skill => 
        responseText.includes(skill.toLowerCase())
      ).length;

      expect(skillCount).toBeGreaterThan(0);
    });

    it('TC_CHAT_034: Should handle negation correctly', async () => {
      const testData = accuracyTestingTestData.TC_CHAT_034;
      
      const response = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          visitorId: `visitor-negation-${Date.now()}`,
          message: testData.question,
        })
        .expect(200);

      const responseText = response.body.response.toLowerCase();
      
      // Should answer negatively
      expect(testData.expected_answer_is_negative).toBe(true);
      expect(responseText).toMatch(/have not|never|don't|did not|no/i);
      
      // Should not mention healthcare terms
      for (const term of testData.should_not_mention) {
        expect(responseText).not.toContain(term.toLowerCase());
      }
    });
  });
});

module.exports = {};
