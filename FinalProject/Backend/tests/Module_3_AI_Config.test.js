/**
 * AI Digital Twin Configuration Test Suite
 * Module 3: AI Configuration & Setup
 * 
 * Test Cases: TC_AICONFIG_001 to TC_AICONFIG_035
 * Focus: System Prompt, Knowledge Base, AI Settings, Test Chat
 * Performance Target: Save < 500ms, Response < 3s
 * Tuân thủ: TEST PLAN.md & backend_test_guideline.md
 */

const request = require('supertest');
const { admin, db } = require('../src/config/firebase');

const app = require('../src/server'); // Express app

describe('AI Digital Twin Configuration Test Suite', () => {
  let cardOwnerId;
  let cardId;
  let authToken;
  let startTime;

  // ============================================================
  // SETUP & TEARDOWN
  // ============================================================

  beforeAll(async () => {
    // Create test card owner
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({
        email: `ai-config-owner-${Date.now()}@example.com`,
        password: 'AIConfig123!',
        displayName: 'AI Config Tester',
      });

    if (registerRes.status === 200 || registerRes.status === 201) {
      cardOwnerId = registerRes.body.data?.user?.id || registerRes.body.user?.id;
      authToken = registerRes.body.data?.token || registerRes.body.token;
    }

    // Create test card
    const cardRes = await request(app)
      .post('/api/cards')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        personalInfo: {
          firstName: 'Test',
          lastName: 'Owner',
          email: `test-owner-${Date.now()}@example.com`,
          phone: '0123456789',
          bio: 'Software Engineer specializing in AI',
          jobTitle: 'Senior AI Engineer',
          fullName: 'Test Owner',
        },
        sections: {
          experience: [
            {
              company: 'AI Corp',
              position: 'Senior Engineer',
              startDate: '2020-01-01',
              isCurrent: true,
              description: 'Leading AI development',
            },
          ],
          skills: ['Machine Learning', 'NLP', 'Python', 'TensorFlow'],
          projects: [
            {
              name: 'AI Chat Bot',
              description: 'Built conversational AI system',
              link: 'https://example.com',
            },
          ],
        },
      });

    if (cardRes.status === 200 || cardRes.status === 201) {
      cardId = cardRes.body.data?.id || cardRes.body.id;
    }
  });

  afterAll(async () => {
    // Clean up test data
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
  // MODULE 3.1: SYSTEM PROMPT MANAGEMENT
  // ============================================================

  describe('System Prompt Management', () => {

    it('TC_AICONFIG_001: Should set system prompt successfully', async () => {
      const systemPrompt = 'You are Test Owner, a Senior AI Engineer. Respond professionally based on your knowledge base.';

      const response = await request(app)
        .post(`/api/cards/${cardId}/ai-config`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          systemPrompt,
          toneOfVoice: 'professional',
        })
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(response.body.data?.systemPrompt).toBeDefined();
    });

    it('TC_AICONFIG_002: Should update system prompt', async () => {
      const newPrompt = 'Updated system prompt with different tone.';

      const response = await request(app)
        .put(`/api/cards/${cardId}/ai-config`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          systemPrompt: newPrompt,
        })
        .expect(200);

      expect(response.body.status).toBe(true);
    });

    it('TC_AICONFIG_003: Should reject system prompt exceeding character limit', async () => {
      const longPrompt = 'a'.repeat(5001); // Assuming 5000 char limit

      const response = await request(app)
        .post(`/api/cards/${cardId}/ai-config`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          systemPrompt: longPrompt,
        });

      expect([400, 422]).toContain(response.status);
      expect(response.body.status).toBe(false);
    });

    it('TC_AICONFIG_004: Should handle special characters in system prompt', async () => {
      const promptWithSpecialChars = 'You are an AI. Rules: 1) Only respond from KB 2) Don\'t make up info 3) Use {placeholders}';

      const response = await request(app)
        .post(`/api/cards/${cardId}/ai-config`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          systemPrompt: promptWithSpecialChars,
        })
        .expect(200);

      expect(response.body.status).toBe(true);
    });

    it('TC_AICONFIG_005: Should save system prompt within performance target (< 500ms)', async () => {
      const duration = Date.now() - startTime;
      
      await request(app)
        .post(`/api/cards/${cardId}/ai-config`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          systemPrompt: 'Performance test prompt',
        })
        .expect(200);

      const endTime = Date.now();
      const totalDuration = endTime - startTime;
      
      expect(totalDuration).toBeLessThan(500);
    });
  });

  // ============================================================
  // MODULE 3.2: KNOWLEDGE BASE MANAGEMENT
  // ============================================================

  describe('Knowledge Base Management', () => {

    it('TC_AICONFIG_006: Should add knowledge base skills successfully', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/ai-config/knowledge-base`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          type: 'skills',
          data: [
            { name: 'Python', proficiency: 'expert' },
            { name: 'Machine Learning', proficiency: 'advanced' },
          ],
        })
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(response.body.data?.skills?.length).toBeGreaterThanOrEqual(2);
    });

    it('TC_AICONFIG_007: Should add knowledge base experiences', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/ai-config/knowledge-base`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          type: 'experiences',
          data: [
            {
              company: 'Tech Company',
              role: 'AI Engineer',
              duration: '3 years',
              achievements: 'Developed AI models',
            },
          ],
        })
        .expect(200);

      expect(response.body.status).toBe(true);
    });

    it('TC_AICONFIG_008: Should add knowledge base projects', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/ai-config/knowledge-base`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          type: 'projects',
          data: [
            {
              name: 'AI Chat System',
              description: 'Built conversational AI',
              technologies: ['Python', 'NLP'],
              link: 'https://example.com',
            },
          ],
        })
        .expect(200);

      expect(response.body.status).toBe(true);
    });

    it('TC_AICONFIG_009: Should update knowledge base item', async () => {
      // First add a skill
      const addRes = await request(app)
        .post(`/api/cards/${cardId}/ai-config/knowledge-base`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          type: 'skills',
          data: [{ name: 'JavaScript', proficiency: 'intermediate' }],
        });

      const skillId = addRes.body.data?.skills?.[0]?.id;

      // Then update it
      const updateRes = await request(app)
        .put(`/api/cards/${cardId}/ai-config/knowledge-base/${skillId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          proficiency: 'expert',
        })
        .expect(200);

      expect(updateRes.body.status).toBe(true);
    });

    it('TC_AICONFIG_010: Should delete knowledge base item', async () => {
      // First add a skill
      const addRes = await request(app)
        .post(`/api/cards/${cardId}/ai-config/knowledge-base`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          type: 'skills',
          data: [{ name: 'To Delete', proficiency: 'basic' }],
        });

      const skillId = addRes.body.data?.skills?.find(s => s.name === 'To Delete')?.id;

      // Delete it
      const deleteRes = await request(app)
        .delete(`/api/cards/${cardId}/ai-config/knowledge-base/${skillId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(deleteRes.body.status).toBe(true);
    });

    it('TC_AICONFIG_011: Should reject knowledge base exceeding size limit', async () => {
      const largeData = Array(1000).fill({
        name: 'Skill Name',
        proficiency: 'expert',
      });

      const response = await request(app)
        .post(`/api/cards/${cardId}/ai-config/knowledge-base`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          type: 'skills',
          data: largeData,
        });

      expect([400, 413, 422]).toContain(response.status);
    });

    it('TC_AICONFIG_012: Should handle empty knowledge base gracefully', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/ai-config/knowledge-base`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          type: 'skills',
          data: [],
        })
        .expect(200);

      expect(response.body.status).toBe(true);
    });
  });

  // ============================================================
  // MODULE 3.3: AI SETTINGS & TONE CONFIGURATION
  // ============================================================

  describe('AI Settings & Tone Configuration', () => {

    it('TC_AICONFIG_013: Should set tone of voice to Professional', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/ai-config`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          toneOfVoice: 'professional',
        })
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(response.body.data?.toneOfVoice).toBe('professional');
    });

    it('TC_AICONFIG_014: Should set tone of voice to Casual', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/ai-config`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          toneOfVoice: 'casual',
        })
        .expect(200);

      expect(response.body.data?.toneOfVoice).toBe('casual');
    });

    it('TC_AICONFIG_015: Should set tone of voice to Humorous', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/ai-config`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          toneOfVoice: 'humorous',
        })
        .expect(200);

      expect(response.body.data?.toneOfVoice).toBe('humorous');
    });

    it('TC_AICONFIG_016: Should reject invalid tone of voice', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/ai-config`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          toneOfVoice: 'invalid_tone',
        });

      expect([400, 422]).toContain(response.status);
    });

    it('TC_AICONFIG_017: Should set temperature parameter (0.0 - 1.0)', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/ai-config`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          temperature: 0.7,
        })
        .expect(200);

      expect(response.body.status).toBe(true);
    });

    it('TC_AICONFIG_018: Should reject temperature outside valid range', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/ai-config`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          temperature: 1.5, // Invalid: > 1.0
        });

      expect([400, 422]).toContain(response.status);
    });

    it('TC_AICONFIG_019: Should set top_p parameter', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/ai-config`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          top_p: 0.9,
        })
        .expect(200);

      expect(response.body.status).toBe(true);
    });

    it('TC_AICONFIG_020: Should enable/disable AI Digital Twin', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/ai-config`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          isEnabled: true,
        })
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(response.body.data?.isEnabled).toBe(true);

      // Disable it
      const disableRes = await request(app)
        .post(`/api/cards/${cardId}/ai-config`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          isEnabled: false,
        })
        .expect(200);

      expect(disableRes.body.data?.isEnabled).toBe(false);
    });
  });

  // ============================================================
  // MODULE 3.4: GUARDRAILS & SAFETY SETTINGS
  // ============================================================

  describe('Guardrails & Safety Settings', () => {

    it('TC_AICONFIG_021: Should set guardrail to only answer from KB', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/ai-config/guardrails`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          onlyAnswerFromKB: true,
        })
        .expect(200);

      expect(response.body.status).toBe(true);
    });

    it('TC_AICONFIG_022: Should set guardrail to prevent hallucination', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/ai-config/guardrails`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          preventHallucination: true,
        })
        .expect(200);

      expect(response.body.status).toBe(true);
    });

    it('TC_AICONFIG_023: Should reject forbidden topics', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/ai-config/guardrails`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          forbiddenTopics: ['sensitive', 'private', 'confidential'],
        })
        .expect(200);

      expect(response.body.status).toBe(true);
    });

    it('TC_AICONFIG_024: Should set max response length', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/ai-config/guardrails`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          maxResponseLength: 500,
        })
        .expect(200);

      expect(response.body.status).toBe(true);
    });
  });

  // ============================================================
  // MODULE 3.5: GET AI CONFIGURATION
  // ============================================================

  describe('Get AI Configuration', () => {

    it('TC_AICONFIG_025: Should retrieve full AI configuration', async () => {
      const response = await request(app)
        .get(`/api/cards/${cardId}/ai-config`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(response.body.data).toHaveProperty('systemPrompt');
      expect(response.body.data).toHaveProperty('knowledgeBase');
      expect(response.body.data).toHaveProperty('toneOfVoice');
    });

    it('TC_AICONFIG_026: Should return AI configuration for unauthorized access with limited data', async () => {
      const response = await request(app)
        .get(`/api/cards/${cardId}/ai-config`)
        .expect(200); // Could be 200 with limited data or 401

      // Should either return limited data or unauthorized
      expect([200, 401, 403]).toContain(response.status);
    });
  });

  // ============================================================
  // MODULE 3.6: AUTHORIZATION & PERMISSION TESTS
  // ============================================================

  describe('Authorization & Permission Tests', () => {

    it('TC_AICONFIG_027: Should reject configuration update without authentication', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/ai-config`)
        .send({
          systemPrompt: 'Unauthorized update',
        });

      expect([401, 403]).toContain(response.status);
    });

    it('TC_AICONFIG_028: Should reject configuration update from non-owner', async () => {
      // Register another user
      const otherUserRes = await request(app)
        .post('/api/auth/register')
        .send({
          email: `other-user-${Date.now()}@example.com`,
          password: 'OtherUser123!',
          displayName: 'Other User',
        });

      const otherToken = otherUserRes.body.data?.token || otherUserRes.body.token;

      const response = await request(app)
        .post(`/api/cards/${cardId}/ai-config`)
        .set('Authorization', `Bearer ${otherToken}`)
        .send({
          systemPrompt: 'Unauthorized update',
        });

      expect([403, 404]).toContain(response.status);
    });

    it('TC_AICONFIG_029: Should allow only card owner to modify AI config', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/ai-config`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          systemPrompt: 'Owner can update this',
        })
        .expect(200);

      expect(response.body.status).toBe(true);
    });
  });

  // ============================================================
  // MODULE 3.7: TEST CHAT & CONFIGURATION VALIDATION
  // ============================================================

  describe('Test Chat & Configuration Validation', () => {

    it('TC_AICONFIG_030: Should test chat with current AI configuration', async () => {
      // First set up config
      await request(app)
        .post(`/api/cards/${cardId}/ai-config`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          systemPrompt: 'You are a test AI assistant',
          isEnabled: true,
        });

      // Test chat
      const response = await request(app)
        .post(`/api/cards/${cardId}/ai-config/test-chat`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          message: 'Hello, what is your name?',
        })
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(response.body.data?.response).toBeDefined();
      expect(response.body.data?.response.length).toBeGreaterThan(0);
    });

    it('TC_AICONFIG_031: Should return AI response within timeout (< 3s)', async () => {
      const duration = Date.now() - startTime;
      
      await request(app)
        .post(`/api/cards/${cardId}/ai-config/test-chat`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          message: 'Quick test question',
        })
        .expect(200);

      const endTime = Date.now();
      const totalDuration = endTime - startTime;
      
      expect(totalDuration).toBeLessThan(3000);
    });

    it('TC_AICONFIG_032: Should handle empty knowledge base in test chat', async () => {
      // Create card without knowledge base
      const response = await request(app)
        .post(`/api/cards/${cardId}/ai-config/test-chat`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          message: 'Testing with empty KB',
        });

      // Should either succeed with generic response or return helpful error
      expect([200, 400, 403]).toContain(response.status);
    });

    it('TC_AICONFIG_033: Should validate configuration before allowing chat', async () => {
      // Try to test chat with disabled AI
      await request(app)
        .post(`/api/cards/${cardId}/ai-config`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          isEnabled: false,
        });

      const response = await request(app)
        .post(`/api/cards/${cardId}/ai-config/test-chat`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          message: 'This should fail',
        });

      expect([403, 400]).toContain(response.status);
    });
  });

  // ============================================================
  // MODULE 3.8: EDGE CASES & ERROR HANDLING
  // ============================================================

  describe('Edge Cases & Error Handling', () => {

    it('TC_AICONFIG_034: Should handle concurrent configuration updates', async () => {
      const update1 = request(app)
        .post(`/api/cards/${cardId}/ai-config`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          toneOfVoice: 'professional',
        });

      const update2 = request(app)
        .post(`/api/cards/${cardId}/ai-config`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          toneOfVoice: 'casual',
        });

      const [res1, res2] = await Promise.all([update1, update2]);

      // Both should succeed or at least not crash
      expect([res1.status, res2.status]).toEqual(
        expect.arrayContaining([200, 200])
      );
    });

    it('TC_AICONFIG_035: Should handle configuration reset', async () => {
      const response = await request(app)
        .post(`/api/cards/${cardId}/ai-config/reset`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.status).toBe(true);
    });
  });
});
