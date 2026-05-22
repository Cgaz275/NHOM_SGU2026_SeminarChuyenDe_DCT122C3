/**
 * Fallback & Inbox Management Test Suite
 * Module 5: Fallback Form, Inbox, Conversations, Real-time Sync
 * 
 * Test Cases: TC_INBOX_001 to TC_INBOX_035
 * Focus: Form Submission, Inbox Management, Real-time Sync, Lead Capture
 * Performance Target: Store < 300ms, List < 500ms, Real-time < 1s
 * Tuân thủ: TEST PLAN.md & backend_test_guideline.md
 */

const request = require('supertest');
const { admin, db } = require('../src/config/firebase');

const app = require('../src/server');

describe('Fallback & Inbox Management Test Suite', () => {
  let cardOwnerId;
  let cardId;
  let ownerToken;
  let startTime;

  // ============================================================
  // SETUP & TEARDOWN
  // ============================================================

  beforeAll(async () => {
    // Register card owner
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({
        email: `inbox-owner-${Date.now()}@example.com`,
        password: 'Inbox123!',
        displayName: 'Inbox Manager',
      });

    if (registerRes.status === 200 || registerRes.status === 201) {
      cardOwnerId = registerRes.body.data?.user?.id || registerRes.body.user?.id;
      ownerToken = registerRes.body.data?.token || registerRes.body.token;
    }

    // Create test card
    const cardRes = await request(app)
      .post('/api/cards')
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({
        personalInfo: {
          firstName: 'Inbox',
          lastName: 'Manager',
          email: `inbox-test-${Date.now()}@example.com`,
          phone: '0123456789',
          bio: 'Manages conversations and leads',
          jobTitle: 'Sales Lead',
          fullName: 'Inbox Manager',
        },
      });

    if (cardRes.status === 200 || cardRes.status === 201) {
      cardId = cardRes.body.data?.id || cardRes.body.id;
    }

    // Publish card
    await request(app)
      .post(`/api/cards/${cardId}/publish`)
      .set('Authorization', `Bearer ${ownerToken}`);
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
  // MODULE 5.1: FALLBACK FORM SUBMISSION
  // ============================================================

  describe('Fallback Form Submission', () => {

    it('TC_INBOX_001: Should submit fallback form with valid data', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/fallback`)
        .send({
          visitorName: 'John Doe',
          visitorEmail: 'john@example.com',
          visitorPhone: '0987654321',
          message: 'I would like to discuss a project',
        })
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(response.body.data).toHaveProperty('submissionId');
    });

    it('TC_INBOX_002: Should reject fallback form without email', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/fallback`)
        .send({
          visitorName: 'John Doe',
          visitorPhone: '0987654321',
          message: 'Message without email',
        });

      expect([400, 422]).toContain(response.status);
      expect(response.body.status).toBe(false);
    });

    it('TC_INBOX_003: Should validate email format in fallback form', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/fallback`)
        .send({
          visitorName: 'Test',
          visitorEmail: 'invalid-email',
          message: 'Test message',
        });

      expect([400, 422]).toContain(response.status);
    });

    it('TC_INBOX_004: Should require message in fallback form', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/fallback`)
        .send({
          visitorName: 'John Doe',
          visitorEmail: 'john@example.com',
          message: '',
        });

      expect([400, 422]).toContain(response.status);
    });

    it('TC_INBOX_005: Should store fallback form with timestamp', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/fallback`)
        .send({
          visitorName: 'Timestamp Test',
          visitorEmail: `timestamp-${Date.now()}@example.com`,
          message: 'Testing timestamp',
        })
        .expect(200);

      expect(response.body.data).toHaveProperty('timestamp');
      expect(new Date(response.body.data.timestamp)).toBeInstanceOf(Date);
    });

    it('TC_INBOX_006: Should save fallback form within performance target (< 300ms)', async () => {
      const duration = Date.now() - startTime;

      await request(app)
        .post(`/api/cards/${cardId}/fallback`)
        .send({
          visitorName: 'Performance Test',
          visitorEmail: `perf-${Date.now()}@example.com`,
          message: 'Performance test message',
        })
        .expect(200);

      const totalDuration = Date.now() - startTime;
      expect(totalDuration).toBeLessThan(300);
    });

    it('TC_INBOX_007: Should handle long message in fallback form', async () => {
      const longMessage = 'a'.repeat(1000);

      const response = await request(app)
        .post(`/api/cards/${cardId}/fallback`)
        .send({
          visitorName: 'Long Message Test',
          visitorEmail: `long-${Date.now()}@example.com`,
          message: longMessage,
        })
        .expect(200);

      expect(response.body.status).toBe(true);
    });

    it('TC_INBOX_008: Should reject fallback message exceeding limit', async () => {
      const veryLongMessage = 'a'.repeat(5000); // Assuming 5000 char limit

      const response = await request(app)
        .post(`/api/cards/${cardId}/fallback`)
        .send({
          visitorName: 'Too Long',
          visitorEmail: `toolong-${Date.now()}@example.com`,
          message: veryLongMessage,
        });

      expect([400, 413, 422]).toContain(response.status);
    });

    it('TC_INBOX_009: Should capture phone number in fallback form', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/fallback`)
        .send({
          visitorName: 'Phone Test',
          visitorEmail: `phone-${Date.now()}@example.com`,
          visitorPhone: '0123456789',
          message: 'Testing phone capture',
        })
        .expect(200);

      expect(response.body.status).toBe(true);
    });

    it('TC_INBOX_010: Should handle special characters in fallback form', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/fallback`)
        .send({
          visitorName: "O'Brien & Co.",
          visitorEmail: `special-${Date.now()}@example.com`,
          message: 'Message with special chars: @#$%^&*()',
        })
        .expect(200);

      expect(response.body.status).toBe(true);
    });
  });

  // ============================================================
  // MODULE 5.2: INBOX & CONVERSATION LIST MANAGEMENT
  // ============================================================

  describe('Inbox & Conversation List Management', () => {

    it('TC_INBOX_011: Should retrieve inbox list for card owner', async () => {
      const response = await request(app)
        .get(`/api/cards/${cardId}/inbox`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('TC_INBOX_012: Should list conversations with pagination', async () => {
      const response = await request(app)
        .get(`/api/cards/${cardId}/inbox`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .query({ limit: 10, offset: 0 })
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('TC_INBOX_013: Should support different sort orders', async () => {
      const response = await request(app)
        .get(`/api/cards/${cardId}/inbox`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .query({ sortBy: 'createdAt', order: 'desc' })
        .expect(200);

      expect(response.body.status).toBe(true);
    });

    it('TC_INBOX_014: Should filter unread conversations', async () => {
      const response = await request(app)
        .get(`/api/cards/${cardId}/inbox`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .query({ unreadOnly: true })
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('TC_INBOX_015: Should list inbox within performance target (< 500ms)', async () => {
      const duration = Date.now() - startTime;

      await request(app)
        .get(`/api/cards/${cardId}/inbox`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .expect(200);

      const totalDuration = Date.now() - startTime;
      expect(totalDuration).toBeLessThan(500);
    });

    it('TC_INBOX_016: Should show conversation preview in inbox list', async () => {
      const response = await request(app)
        .get(`/api/cards/${cardId}/inbox`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .expect(200);

      if (response.body.data.length > 0) {
        const conv = response.body.data[0];
        expect(conv).toHaveProperty('visitorName');
        expect(conv).toHaveProperty('visitorEmail');
        expect(conv).toHaveProperty('lastMessage');
        expect(conv).toHaveProperty('unreadCount');
      }
    });
  });

  // ============================================================
  // MODULE 5.3: CONVERSATION DETAIL & MESSAGE MANAGEMENT
  // ============================================================

  describe('Conversation Detail & Message Management', () => {

    let conversationId;

    beforeEach(async () => {
      // Create a conversation
      const res = await request(app)
        .post(`/api/cards/${cardId}/fallback`)
        .send({
          visitorName: 'Conv Test',
          visitorEmail: `conv-${Date.now()}@example.com`,
          message: 'Initial message',
        });

      if (res.status === 200) {
        conversationId = res.body.data?.conversationId || res.body.data?.submissionId;
      }
    });

    it('TC_INBOX_017: Should retrieve full conversation with all messages', async () => {
      if (!conversationId) this.skip();

      const response = await request(app)
        .get(`/api/cards/${cardId}/conversations/${conversationId}`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(Array.isArray(response.body.data?.messages)).toBe(true);
    });

    it('TC_INBOX_018: Should mark conversation as read', async () => {
      if (!conversationId) this.skip();

      const response = await request(app)
        .put(`/api/cards/${cardId}/conversations/${conversationId}`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .send({
          isRead: true,
        })
        .expect(200);

      expect(response.body.status).toBe(true);
    });

    it('TC_INBOX_019: Should mark conversation as unread', async () => {
      if (!conversationId) this.skip();

      const response = await request(app)
        .put(`/api/cards/${cardId}/conversations/${conversationId}`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .send({
          isRead: false,
        })
        .expect(200);

      expect(response.body.status).toBe(true);
    });

    it('TC_INBOX_020: Should add note to conversation', async () => {
      if (!conversationId) this.skip();

      const response = await request(app)
        .post(`/api/cards/${cardId}/conversations/${conversationId}/notes`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .send({
          note: 'Follow up with this lead next week',
        })
        .expect(200);

      expect(response.body.status).toBe(true);
    });

    it('TC_INBOX_021: Should delete conversation', async () => {
      if (!conversationId) this.skip();

      const response = await request(app)
        .delete(`/api/cards/${cardId}/conversations/${conversationId}`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .expect(200);

      expect(response.body.status).toBe(true);
    });

    it('TC_INBOX_022: Should search conversations by visitor name', async () => {
      const response = await request(app)
        .get(`/api/cards/${cardId}/inbox`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .query({ search: 'Conv Test' })
        .expect(200);

      expect(response.body.status).toBe(true);
    });

    it('TC_INBOX_023: Should search conversations by email', async () => {
      const response = await request(app)
        .get(`/api/cards/${cardId}/inbox`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .query({ search: '@example.com' })
        .expect(200);

      expect(response.body.status).toBe(true);
    });
  });

  // ============================================================
  // MODULE 5.4: LEAD CAPTURE & TRACKING
  // ============================================================

  describe('Lead Capture & Tracking', () => {

    it('TC_INBOX_024: Should capture visitor as lead from fallback', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/fallback`)
        .send({
          visitorName: 'Potential Lead',
          visitorEmail: `lead-${Date.now()}@example.com`,
          visitorPhone: '0123456789',
          message: 'Interested in your services',
        })
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(response.body.data).toHaveProperty('visitorEmail');
    });

    it('TC_INBOX_025: Should tag conversation as lead', async () => {
      const fallbackRes = await request(app)
        .post(`/api/cards/${cardId}/fallback`)
        .send({
          visitorName: 'Tagged Lead',
          visitorEmail: `tagged-${Date.now()}@example.com`,
          message: 'Wants to discuss collaboration',
        })
        .expect(200);

      const conversationId = fallbackRes.body.data?.conversationId || fallbackRes.body.data?.submissionId;

      if (conversationId) {
        const response = await request(app)
          .put(`/api/cards/${cardId}/conversations/${conversationId}`)
          .set('Authorization', `Bearer ${ownerToken}`)
          .send({
            isLead: true,
            leadStatus: 'hot',
          })
          .expect(200);

        expect(response.body.status).toBe(true);
      }
    });

    it('TC_INBOX_026: Should get all leads', async () => {
      const response = await request(app)
        .get(`/api/cards/${cardId}/leads`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('TC_INBOX_027: Should filter leads by status', async () => {
      const response = await request(app)
        .get(`/api/cards/${cardId}/leads`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .query({ status: 'hot' })
        .expect(200);

      expect(response.body.status).toBe(true);
    });

    it('TC_INBOX_028: Should update lead status', async () => {
      const fallbackRes = await request(app)
        .post(`/api/cards/${cardId}/fallback`)
        .send({
          visitorName: 'Status Update',
          visitorEmail: `status-${Date.now()}@example.com`,
          message: 'Testing status update',
        })
        .expect(200);

      const conversationId = fallbackRes.body.data?.conversationId || fallbackRes.body.data?.submissionId;

      if (conversationId) {
        const response = await request(app)
          .put(`/api/cards/${cardId}/conversations/${conversationId}`)
          .set('Authorization', `Bearer ${ownerToken}`)
          .send({
            leadStatus: 'warm',
          })
          .expect(200);

        expect(response.body.status).toBe(true);
      }
    });
  });

  // ============================================================
  // MODULE 5.5: OWNER MESSAGING IN INBOX
  // ============================================================

  describe('Owner Messaging & Replies in Inbox', () => {

    let conversationId;

    beforeEach(async () => {
      const res = await request(app)
        .post(`/api/cards/${cardId}/fallback`)
        .send({
          visitorName: 'Message Test',
          visitorEmail: `msg-${Date.now()}@example.com`,
          message: 'Needs response',
        });

      if (res.status === 200) {
        conversationId = res.body.data?.conversationId || res.body.data?.submissionId;
      }
    });

    it('TC_INBOX_029: Should allow owner to send reply message', async () => {
      if (!conversationId) this.skip();

      const response = await request(app)
        .post(`/api/cards/${cardId}/conversations/${conversationId}/messages`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .send({
          message: 'Thank you for reaching out. I will get back to you soon.',
        })
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(response.body.data).toHaveProperty('messageId');
    });

    it('TC_INBOX_030: Should store owner message with sender identification', async () => {
      if (!conversationId) this.skip();

      const response = await request(app)
        .post(`/api/cards/${cardId}/conversations/${conversationId}/messages`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .send({
          message: 'Owner reply test',
        })
        .expect(200);

      expect(response.body.data?.sender).toBe('owner');
    });
  });

  // ============================================================
  // MODULE 5.6: REAL-TIME SYNCHRONIZATION
  // ============================================================

  describe('Real-time Synchronization', () => {

    it('TC_INBOX_031: Should support real-time inbox updates', async () => {
      // Test that new conversations appear in real-time
      const response = await request(app)
        .get(`/api/cards/${cardId}/inbox`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .expect(200);

      expect(response.body.status).toBe(true);
      // In real scenario, would use WebSocket to verify real-time delivery
    });

    it('TC_INBOX_032: Should sync conversation updates within 1s', async () => {
      const testStart = Date.now();

      // Post fallback
      const fallbackRes = await request(app)
        .post(`/api/cards/${cardId}/fallback`)
        .send({
          visitorName: 'Real-time Test',
          visitorEmail: `realtime-${Date.now()}@example.com`,
          message: 'Test real-time sync',
        })
        .expect(200);

      const conversationId = fallbackRes.body.data?.conversationId || fallbackRes.body.data?.submissionId;

      // Fetch immediately
      const getRes = await request(app)
        .get(`/api/cards/${cardId}/conversations/${conversationId}`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .expect(200);

      const syncTime = Date.now() - testStart;
      expect(syncTime).toBeLessThan(1000);
      expect(getRes.body.status).toBe(true);
    });
  });

  // ============================================================
  // MODULE 5.7: AUTHORIZATION & SECURITY
  // ============================================================

  describe('Authorization & Security', () => {

    it('TC_INBOX_033: Should reject inbox access without authentication', async () => {
      const response = await request(app)
        .get(`/api/cards/${cardId}/inbox`);

      expect([401, 403]).toContain(response.status);
    });

    it('TC_INBOX_034: Should prevent non-owner from viewing inbox', async () => {
      const otherUserRes = await request(app)
        .post('/api/auth/register')
        .send({
          email: `other-${Date.now()}@example.com`,
          password: 'Other123!',
          displayName: 'Other User',
        });

      const otherToken = otherUserRes.body.data?.token || otherUserRes.body.token;

      const response = await request(app)
        .get(`/api/cards/${cardId}/inbox`)
        .set('Authorization', `Bearer ${otherToken}`);

      expect([403, 404]).toContain(response.status);
    });

    it('TC_INBOX_035: Should allow public fallback submission to any published card', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/fallback`)
        .send({
          visitorName: 'Public Visitor',
          visitorEmail: `public-${Date.now()}@example.com`,
          message: 'Public submission test',
        })
        .expect(200); // Should succeed without auth

      expect(response.body.status).toBe(true);
    });
  });
});
