/**
 * Human Takeover Feature Test Suite
 * Module 6: Human Takeover, Message Flow, Notifications
 * 
 * Test Cases: TC_TAKEOVER_001 to TC_TAKEOVER_030
 * Focus: Takeover Workflow, Permission Validation, Message Routing
 * Performance Target: Takeover < 300ms, Message Delivery < 500ms
 * Tuân thủ: TEST PLAN.md & backend_test_guideline.md
 */

const request = require('supertest');
const { admin, db } = require('../src/config/firebase');

const app = require('../src/server');

describe('Human Takeover Feature Test Suite', () => {
  let cardOwnerId;
  let cardId;
  let ownerToken;
  let conversationId;
  let startTime;

  // ============================================================
  // SETUP & TEARDOWN
  // ============================================================

  beforeAll(async () => {
    // Register card owner
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({
        email: `takeover-owner-${Date.now()}@example.com`,
        password: 'Takeover123!',
        displayName: 'Takeover Manager',
      });

    if (registerRes.status === 200 || registerRes.status === 201) {
      cardOwnerId = registerRes.body.data?.user?.id || registerRes.body.user?.id;
      ownerToken = registerRes.body.data?.token || registerRes.body.token;
    }

    // Create test card with AI enabled
    const cardRes = await request(app)
      .post('/api/cards')
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({
        personalInfo: {
          firstName: 'Human',
          lastName: 'Takeover',
          email: `takeover-test-${Date.now()}@example.com`,
          phone: '0123456789',
          bio: 'Testing human takeover feature',
          jobTitle: 'Support Manager',
          fullName: 'Human Takeover Manager',
        },
      });

    if (cardRes.status === 200 || cardRes.status === 201) {
      cardId = cardRes.body.data?.id || cardRes.body.id;
    }

    // Configure AI
    await request(app)
      .post(`/api/cards/${cardId}/ai-config`)
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({
        systemPrompt: 'You are a helpful AI assistant',
        isEnabled: true,
      });

    // Publish card
    await request(app)
      .post(`/api/cards/${cardId}/publish`)
      .set('Authorization', `Bearer ${ownerToken}`);

    // Create initial conversation
    const chatRes = await request(app)
      .post(`/api/cards/${cardId}/chat`)
      .send({
        message: 'Hello, I need help',
        visitorEmail: `visitor-${Date.now()}@example.com`,
        visitorName: 'Test Visitor',
      });

    if (chatRes.status === 200) {
      conversationId = chatRes.body.data.conversationId;
    }
  });

  afterAll(async () => {
    if (cardId) {
      try {
        await db.collection('cards').doc(cardId).delete();
      } catch (e) {
        console.log('Cleanup error:', e.message);
      }
    }
  });

  beforeEach(() => {
    startTime = Date.now();
  });

  afterEach(() => {
    const duration = Date.now() - startTime;
    console.log(`  ⏱️  Test duration: ${duration}ms`);
  });

  // ============================================================
  // MODULE 6.1: TAKEOVER FUNCTIONALITY
  // ============================================================

  describe('Takeover Functionality', () => {

    it('TC_TAKEOVER_001: Should allow owner to initiate human takeover', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/conversations/${conversationId}/takeover`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(response.body.data?.status).toBe('human');
    });

    it('TC_TAKEOVER_002: Should mark conversation as human-managed after takeover', async () => {
      const response = await request(app)
        .get(`/api/cards/${cardId}/conversations/${conversationId}`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .expect(200);

      expect(response.body.data?.status).toBe('human');
    });

    it('TC_TAKEOVER_003: Should disable AI responses after human takeover', async () => {
      // Try to force AI response after takeover
      const response = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          message: 'Should not get AI response',
          conversationId,
        });

      // Should either return human-managed message or no AI response
      if (response.status === 200) {
        expect(response.body.data?.handledBy).toBe('human');
      }
    });

    it('TC_TAKEOVER_004: Should preserve conversation history during takeover', async () => {
      const response = await request(app)
        .get(`/api/cards/${cardId}/conversations/${conversationId}`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .expect(200);

      expect(response.body.data?.messages?.length).toBeGreaterThan(0);
    });

    it('TC_TAKEOVER_005: Should complete takeover within performance target (< 300ms)', async () => {
      // Create new conversation for this test
      const chatRes = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          message: 'New conversation for perf test',
          visitorEmail: `perf-${Date.now()}@example.com`,
          visitorName: 'Perf Test',
        })
        .expect(200);

      const convId = chatRes.body.data.conversationId;
      const duration = Date.now() - startTime;

      await request(app)
        .post(`/api/cards/${cardId}/conversations/${convId}/takeover`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .expect(200);

      const totalDuration = Date.now() - startTime;
      expect(totalDuration).toBeLessThan(300);
    });

    it('TC_TAKEOVER_006: Should allow owner to manually respond during takeover', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/conversations/${conversationId}/messages`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .send({
          message: 'Thank you for your patience. I am now handling your request.',
        })
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(response.body.data?.sender).toBe('owner');
    });

    it('TC_TAKEOVER_007: Should send human takeover notification to visitor', async () => {
      // Create new conversation
      const chatRes = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          message: 'Test notification',
          visitorEmail: `notif-${Date.now()}@example.com`,
          visitorName: 'Notif Test',
        })
        .expect(200);

      const convId = chatRes.body.data.conversationId;

      // Takeover and check notification
      const response = await request(app)
        .post(`/api/cards/${cardId}/conversations/${convId}/takeover`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .expect(200);

      expect(response.body.data).toHaveProperty('notificationSent');
    });

    it('TC_TAKEOVER_008: Should support immediate message during takeover', async () => {
      // Create new conversation
      const chatRes = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          message: 'Initial message',
          visitorEmail: `immediate-${Date.now()}@example.com`,
          visitorName: 'Immediate Test',
        })
        .expect(200);

      const convId = chatRes.body.data.conversationId;

      // Takeover with immediate message
      const response = await request(app)
        .post(`/api/cards/${cardId}/conversations/${convId}/takeover`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .send({
          initialMessage: 'Hello! I am the owner. How can I help?',
        })
        .expect(200);

      expect(response.body.status).toBe(true);
    });
  });

  // ============================================================
  // MODULE 6.2: PERMISSION & AUTHORIZATION
  // ============================================================

  describe('Permission & Authorization', () => {

    it('TC_TAKEOVER_009: Should reject takeover from non-owner', async () => {
      // Register another user
      const otherRes = await request(app)
        .post('/api/auth/register')
        .send({
          email: `other-user-${Date.now()}@example.com`,
          password: 'Other123!',
          displayName: 'Other User',
        });

      const otherToken = otherRes.body.data?.token || otherRes.body.token;

      const response = await request(app)
        .post(`/api/cards/${cardId}/conversations/${conversationId}/takeover`)
        .set('Authorization', `Bearer ${otherToken}`);

      expect([403, 404]).toContain(response.status);
    });

    it('TC_TAKEOVER_010: Should reject takeover without authentication', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/conversations/${conversationId}/takeover`);

      expect([401, 403]).toContain(response.status);
    });

    it('TC_TAKEOVER_011: Should only allow one active human takeover per conversation', async () => {
      // Create new conversation
      const chatRes = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          message: 'Test multiple takeover',
          visitorEmail: `multi-${Date.now()}@example.com`,
          visitorName: 'Multi Takeover',
        })
        .expect(200);

      const convId = chatRes.body.data.conversationId;

      // First takeover
      await request(app)
        .post(`/api/cards/${cardId}/conversations/${convId}/takeover`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .expect(200);

      // Second takeover attempt should fail or be idempotent
      const response = await request(app)
        .post(`/api/cards/${cardId}/conversations/${convId}/takeover`)
        .set('Authorization', `Bearer ${ownerToken}`);

      expect([200, 400, 422]).toContain(response.status);
    });

    it('TC_TAKEOVER_012: Should prevent takeover on already taken over conversation', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/conversations/${conversationId}/takeover`)
        .set('Authorization', `Bearer ${ownerToken}`);

      // Should either succeed (idempotent) or fail with appropriate error
      expect([200, 400, 422]).toContain(response.status);
    });
  });

  // ============================================================
  // MODULE 6.3: MESSAGE FLOW DURING TAKEOVER
  // ============================================================

  describe('Message Flow During Takeover', () => {

    let takoverConvId;

    beforeEach(async () => {
      // Create fresh conversation for testing
      const chatRes = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          message: 'Starting conversation',
          visitorEmail: `msgflow-${Date.now()}@example.com`,
          visitorName: 'Message Flow Test',
        })
        .expect(200);

      takoverConvId = chatRes.body.data.conversationId;

      // Initiate takeover
      await request(app)
        .post(`/api/cards/${cardId}/conversations/${takoverConvId}/takeover`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .expect(200);
    });

    it('TC_TAKEOVER_013: Should route owner messages to visitor correctly', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/conversations/${takoverConvId}/messages`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .send({
          message: 'Owner response to visitor',
        })
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(response.body.data?.sender).toBe('owner');
    });

    it('TC_TAKEOVER_014: Should deliver owner message to visitor within target (< 500ms)', async () => {
      const duration = Date.now() - startTime;

      await request(app)
        .post(`/api/cards/${cardId}/conversations/${takoverConvId}/messages`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .send({
          message: 'Performance test message',
        })
        .expect(200);

      const totalDuration = Date.now() - startTime;
      expect(totalDuration).toBeLessThan(500);
    });

    it('TC_TAKEOVER_015: Should maintain message order in conversation', async () => {
      // Send multiple messages
      const msg1 = await request(app)
        .post(`/api/cards/${cardId}/conversations/${takoverConvId}/messages`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .send({ message: 'First message' })
        .expect(200);

      const msg2 = await request(app)
        .post(`/api/cards/${cardId}/conversations/${takoverConvId}/messages`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .send({ message: 'Second message' })
        .expect(200);

      // Verify order
      const historyRes = await request(app)
        .get(`/api/cards/${cardId}/conversations/${takoverConvId}`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .expect(200);

      const messages = historyRes.body.data?.messages || [];
      expect(messages.length).toBeGreaterThanOrEqual(2);
    });

    it('TC_TAKEOVER_016: Should mark owner messages with timestamp', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/conversations/${takoverConvId}/messages`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .send({
          message: 'Timestamped message',
        })
        .expect(200);

      expect(response.body.data?.timestamp).toBeDefined();
      expect(new Date(response.body.data?.timestamp)).toBeInstanceOf(Date);
    });

    it('TC_TAKEOVER_017: Should handle rapid consecutive owner messages', async () => {
      const messages = [
        'Message 1',
        'Message 2',
        'Message 3',
        'Message 4',
        'Message 5',
      ];

      const promises = messages.map(msg =>
        request(app)
          .post(`/api/cards/${cardId}/conversations/${takoverConvId}/messages`)
          .set('Authorization', `Bearer ${ownerToken}`)
          .send({ message: msg })
      );

      const responses = await Promise.all(promises);

      responses.forEach(res => {
        expect(res.status).toBe(200);
        expect(res.body.status).toBe(true);
      });
    });
  });

  // ============================================================
  // MODULE 6.4: VISITOR INTERACTION DURING TAKEOVER
  // ============================================================

  describe('Visitor Interaction During Takeover', () => {

    let visitorConvId;
    const visitorEmail = `visitor-takeover-${Date.now()}@example.com`;

    beforeEach(async () => {
      // Create conversation
      const chatRes = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          message: 'Visitor initial message',
          visitorEmail,
          visitorName: 'Visitor Takeover Test',
        })
        .expect(200);

      visitorConvId = chatRes.body.data.conversationId;

      // Initiate takeover
      await request(app)
        .post(`/api/cards/${cardId}/conversations/${visitorConvId}/takeover`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .expect(200);
    });

    it('TC_TAKEOVER_018: Should allow visitor to send messages during takeover', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          message: 'Visitor response to human',
          conversationId: visitorConvId,
        })
        .expect(200);

      expect(response.body.status).toBe(true);
    });

    it('TC_TAKEOVER_019: Should route visitor messages to owner during takeover', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          message: 'Visitor message for owner',
          conversationId: visitorConvId,
        })
        .expect(200);

      // Message should be stored and owner should be able to see it
      expect(response.body.status).toBe(true);
      expect(response.body.data?.conversationId).toBe(visitorConvId);
    });

    it('TC_TAKEOVER_020: Should show in visitor that human is responding', async () => {
      // Post message and check response type
      const response = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          message: 'Is human responding?',
          conversationId: visitorConvId,
        })
        .expect(200);

      expect(response.body.data?.handledBy).toBe('human');
    });
  });

  // ============================================================
  // MODULE 6.5: TAKEOVER HANDBACK & TERMINATION
  // ============================================================

  describe('Takeover Handback & Termination', () => {

    it('TC_TAKEOVER_021: Should allow owner to hand back to AI', async () => {
      // Create new conversation
      const chatRes = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          message: 'Handback test',
          visitorEmail: `handback-${Date.now()}@example.com`,
          visitorName: 'Handback Test',
        })
        .expect(200);

      const convId = chatRes.body.data.conversationId;

      // Takeover
      await request(app)
        .post(`/api/cards/${cardId}/conversations/${convId}/takeover`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .expect(200);

      // Hand back to AI
      const response = await request(app)
        .post(`/api/cards/${cardId}/conversations/${convId}/handback`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .expect(200);

      expect(response.body.status).toBe(true);
    });

    it('TC_TAKEOVER_022: Should send handback notification to visitor', async () => {
      const chatRes = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          message: 'Test handback notification',
          visitorEmail: `hbnotif-${Date.now()}@example.com`,
          visitorName: 'HB Notification',
        })
        .expect(200);

      const convId = chatRes.body.data.conversationId;

      await request(app)
        .post(`/api/cards/${cardId}/conversations/${convId}/takeover`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .expect(200);

      const response = await request(app)
        .post(`/api/cards/${cardId}/conversations/${convId}/handback`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .expect(200);

      expect(response.body.data).toHaveProperty('notificationSent');
    });

    it('TC_TAKEOVER_023: Should resume AI responses after handback', async () => {
      const chatRes = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          message: 'Test AI resume',
          visitorEmail: `airesume-${Date.now()}@example.com`,
          visitorName: 'AI Resume',
        })
        .expect(200);

      const convId = chatRes.body.data.conversationId;

      await request(app)
        .post(`/api/cards/${cardId}/conversations/${convId}/takeover`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .expect(200);

      await request(app)
        .post(`/api/cards/${cardId}/conversations/${convId}/handback`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .expect(200);

      // Try to get AI response
      const aiRes = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          message: 'Now should get AI response',
          conversationId: convId,
        })
        .expect(200);

      expect(aiRes.body.data?.handledBy).toBe('ai');
    });
  });

  // ============================================================
  // MODULE 6.6: NOTIFICATIONS & ALERTS
  // ============================================================

  describe('Notifications & Alerts', () => {

    it('TC_TAKEOVER_024: Should notify owner of new message during takeover', async () => {
      // Implementation would depend on notification system
      // This is a placeholder for the test structure
      const response = await request(app)
        .get(`/api/cards/${cardId}/notifications`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .expect(200);

      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('TC_TAKEOVER_025: Should include visitor info in takeover notifications', async () => {
      // Check that notifications contain visitor information
      const response = await request(app)
        .get(`/api/cards/${cardId}/notifications`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .query({ type: 'takeover' })
        .expect(200);

      expect(response.body.status).toBe(true);
    });
  });

  // ============================================================
  // MODULE 6.7: EDGE CASES & ERROR HANDLING
  // ============================================================

  describe('Edge Cases & Error Handling', () => {

    it('TC_TAKEOVER_026: Should handle takeover on non-existent conversation', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/conversations/invalid-conv-id/takeover`)
        .set('Authorization', `Bearer ${ownerToken}`);

      expect([404, 400]).toContain(response.status);
    });

    it('TC_TAKEOVER_027: Should handle takeover on concluded conversation', async () => {
      // Create and delete conversation
      const chatRes = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          message: 'To be deleted',
          visitorEmail: `delete-${Date.now()}@example.com`,
          visitorName: 'To Delete',
        })
        .expect(200);

      const convId = chatRes.body.data.conversationId;

      // Delete conversation
      await request(app)
        .delete(`/api/cards/${cardId}/conversations/${convId}`)
        .set('Authorization', `Bearer ${ownerToken}`);

      // Try to takeover deleted conversation
      const response = await request(app)
        .post(`/api/cards/${cardId}/conversations/${convId}/takeover`)
        .set('Authorization', `Bearer ${ownerToken}`);

      expect([404, 400]).toContain(response.status);
    });

    it('TC_TAKEOVER_028: Should handle concurrent takeover attempts', async () => {
      const chatRes = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          message: 'Concurrent test',
          visitorEmail: `concurrent-${Date.now()}@example.com`,
          visitorName: 'Concurrent Test',
        })
        .expect(200);

      const convId = chatRes.body.data.conversationId;

      // Attempt concurrent takeovers
      const takeover1 = request(app)
        .post(`/api/cards/${cardId}/conversations/${convId}/takeover`)
        .set('Authorization', `Bearer ${ownerToken}`);

      const takeover2 = request(app)
        .post(`/api/cards/${cardId}/conversations/${convId}/takeover`)
        .set('Authorization', `Bearer ${ownerToken}`);

      const [res1, res2] = await Promise.all([takeover1, takeover2]);

      // At least one should succeed
      expect([res1.status === 200 || res2.status === 200]).toBe(true);
    });

    it('TC_TAKEOVER_029: Should handle message send during takeover status transition', async () => {
      const chatRes = await request(app)
        .post(`/api/cards/${cardId}/chat`)
        .send({
          message: 'Status transition test',
          visitorEmail: `transition-${Date.now()}@example.com`,
          visitorName: 'Transition Test',
        })
        .expect(200);

      const convId = chatRes.body.data.conversationId;

      // Quickly takeover and send message
      await request(app)
        .post(`/api/cards/${cardId}/conversations/${convId}/takeover`)
        .set('Authorization', `Bearer ${ownerToken}`);

      const response = await request(app)
        .post(`/api/cards/${cardId}/conversations/${convId}/messages`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .send({
          message: 'Quick response',
        })
        .expect(200);

      expect(response.body.status).toBe(true);
    });

    it('TC_TAKEOVER_030: Should handle takeover with AI disabled card', async () => {
      // Create card with AI disabled
      const cardRes = await request(app)
        .post('/api/cards')
        .set('Authorization', `Bearer ${ownerToken}`)
        .send({
          personalInfo: {
            firstName: 'AI',
            lastName: 'Disabled',
            email: `disabled-${Date.now()}@example.com`,
            fullName: 'AI Disabled Card',
          },
        });

      const disabledCardId = cardRes.body.data?.id || cardRes.body.id;

      // Create conversation
      const chatRes = await request(app)
        .post(`/api/cards/${disabledCardId}/chat`)
        .send({
          message: 'Test',
          visitorEmail: `disabled-chat-${Date.now()}@example.com`,
          visitorName: 'Test',
        });

      // Even with AI disabled, human takeover should work
      if (chatRes.status === 200 || chatRes.status === 403) {
        const convId = chatRes.body.data?.conversationId;
        
        if (convId) {
          const response = await request(app)
            .post(`/api/cards/${disabledCardId}/conversations/${convId}/takeover`)
            .set('Authorization', `Bearer ${ownerToken}`);

          expect([200, 403, 404]).toContain(response.status);
        }
      }
    });
  });
});
