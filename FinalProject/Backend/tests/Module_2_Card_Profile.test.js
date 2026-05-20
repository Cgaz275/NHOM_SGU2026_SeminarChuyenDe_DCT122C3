/**
 * Card/Profile Management API Test Suite
 * Module 2: Card Management
 * 
 * Test Cases: TC_CARD_001 to TC_CARD_029
 * Tuân thủ: TEST PLAN.md & test_cases_guideline.md
 */

const request = require('supertest');
const fixtures = require('../../Testing/fixtures');

const API_URL = process.env.API_URL || 'http://localhost:3001';
const app = require('../src/app'); // Express app

describe('Card/Profile Management Test Suite', () => {
  const { validCards, cardCreationTestData, cardEditingTestData, cardPublishingTestData, cardPreviewTestData, cardDeletionTestData, slugTestData, sectionTestData } = fixtures;

  let testUserId;
  let authToken;
  let testCardId;

  // ============================================================
  // SETUP & TEARDOWN
  // ============================================================

  beforeAll(async () => {
    // Create test user and get auth token
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({
        email: `cardowner-${Date.now()}@example.com`,
        password: 'CardTest123!',
        displayName: 'Card Owner Test',
      });

    testUserId = registerRes.body.user.id;

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: registerRes.body.user.email,
        password: 'CardTest123!',
      });

    authToken = loginRes.body.token;
  });

  afterAll(async () => {
    // Clean up test data
  });

  beforeEach(async () => {
    // Reset test data
  });

  // ============================================================
  // MODULE 2.1: CARD CREATION
  // ============================================================

  describe('Card Creation Sub-Suite', () => {
    
    it('TC_CARD_001: Should create card with required fields', async () => {
      const testData = cardCreationTestData.TC_CARD_001;
      
      const response = await request(app)
        .post('/api/cards')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testData.input)
        .expect(testData.expected.statusCode);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('slug');
      expect(response.body.isDraft).toBe(true);
      expect(response.body.isPublished).toBe(false);

      testCardId = response.body.id; // Save for later tests
    });

    it('TC_CARD_002: Should create card with all fields', async () => {
      const testData = cardCreationTestData.TC_CARD_002;
      
      const response = await request(app)
        .post('/api/cards')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testData.input)
        .expect(testData.expected.statusCode);

      expect(response.body).toHaveProperty('id');
      expect(response.body.personalInfo.firstName).toBe(testData.input.personalInfo.firstName);
      expect(response.body.sections.experience).toHaveLength(1);
    });

    it('TC_CARD_003: Should reject missing required fields', async () => {
      const testData = cardCreationTestData.TC_CARD_003;
      
      const response = await request(app)
        .post('/api/cards')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testData.input)
        .expect(testData.expected.statusCode);

      expect(response.body.error).toBeTruthy();
      expect(response.body.missingFields).toEqual(expect.arrayContaining(testData.expected.missingFields));
    });

    it('TC_CARD_004: Should reject invalid email format', async () => {
      const testData = cardCreationTestData.TC_CARD_004;
      
      const response = await request(app)
        .post('/api/cards')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testData.input)
        .expect(testData.expected.statusCode);

      expect(response.body.errorField).toBe(testData.expected.errorField);
    });

    it('TC_CARD_005: Should accept bio with maximum length', async () => {
      const testData = cardCreationTestData.TC_CARD_005;
      
      const response = await request(app)
        .post('/api/cards')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testData.input)
        .expect(testData.expected.statusCode);

      expect(response.body.personalInfo.bio.length).toBe(500);
    });

    it('TC_CARD_006: Should accept unicode characters in name', async () => {
      const testData = cardCreationTestData.TC_CARD_006;
      
      const response = await request(app)
        .post('/api/cards')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testData.input)
        .expect(testData.expected.statusCode);

      expect(response.body.personalInfo.firstName).toContain('Nguyễn');
    });

    it('TC_CARD_007: Should escape XSS in bio', async () => {
      const testData = cardCreationTestData.TC_CARD_007;
      
      const response = await request(app)
        .post('/api/cards')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testData.input)
        .expect(testData.expected.statusCode);

      expect(response.body.personalInfo.bio).not.toContain('<script>');
      expect(response.body.personalInfo.bio).toContain('&lt;script&gt;');
    });
  });

  // ============================================================
  // MODULE 2.2: CARD EDITING
  // ============================================================

  describe('Card Editing Sub-Suite', () => {
    
    beforeEach(async () => {
      // Create a test card before each test
      const createRes = await request(app)
        .post('/api/cards')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          personalInfo: {
            firstName: 'Edit',
            lastName: 'Test',
            email: `edit-test-${Date.now()}@example.com`,
            bio: 'Test bio for editing',
          },
        });

      testCardId = createRes.body.id;
    });

    it('TC_CARD_008: Should update personal info', async () => {
      const testData = cardEditingTestData.TC_CARD_008;
      testData.input.cardId = testCardId;
      
      const response = await request(app)
        .put(`/api/cards/${testCardId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(testData.updates)
        .expect(testData.expected.statusCode);

      expect(response.body.personalInfo.bio).toBe(testData.updates.personalInfo.bio);
      expect(response.body.personalInfo.phone).toBe(testData.updates.personalInfo.phone);
    });

    it('TC_CARD_009: Should add experience section', async () => {
      const testData = cardEditingTestData.TC_CARD_009;
      
      const response = await request(app)
        .put(`/api/cards/${testCardId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(testData.updates)
        .expect(testData.expected.statusCode);

      expect(response.body.sections.experience).toHaveLength(1);
      expect(response.body.sections.experience[0].company).toBe('New Company');
    });

    it('TC_CARD_010: Should add skills', async () => {
      const testData = cardEditingTestData.TC_CARD_010;
      
      const response = await request(app)
        .put(`/api/cards/${testCardId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(testData.updates)
        .expect(testData.expected.statusCode);

      expect(response.body.sections.skills).toEqual(expect.arrayContaining(testData.updates.sections.skills));
    });

    it('TC_CARD_011: Should reject edit when user is not card owner', async () => {
      const testData = cardEditingTestData.TC_CARD_011;
      
      // Create another user
      const otherUserRes = await request(app)
        .post('/api/auth/register')
        .send({
          email: `other-user-${Date.now()}@example.com`,
          password: 'OtherUser123!',
          displayName: 'Other User',
        });

      const otherUserLoginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: otherUserRes.body.user.email,
          password: 'OtherUser123!',
        });

      const response = await request(app)
        .put(`/api/cards/${testCardId}`)
        .set('Authorization', `Bearer ${otherUserLoginRes.body.token}`)
        .send(testData.updates)
        .expect(testData.expected.statusCode);

      expect(response.body.error).toContain('Forbidden');
    });

    it('TC_CARD_012: Should return 404 for non-existent card', async () => {
      const testData = cardEditingTestData.TC_CARD_012;
      
      const response = await request(app)
        .put('/api/cards/nonexistent-card-id')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testData.updates)
        .expect(testData.expected.statusCode);

      expect(response.body.error).toContain('not found');
    });

    it('TC_CARD_013: Should update card within performance target', async () => {
      const testData = cardEditingTestData.TC_CARD_013;
      const startTime = Date.now();
      
      const response = await request(app)
        .put(`/api/cards/${testCardId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(testData.updates)
        .expect(200);

      const responseTime = Date.now() - startTime;
      expect(responseTime).toBeLessThan(testData.expected.maxResponseTime);
    });
  });

  // ============================================================
  // MODULE 2.3: CARD PUBLISHING
  // ============================================================

  describe('Card Publishing Sub-Suite', () => {
    
    beforeEach(async () => {
      // Create test card
      const createRes = await request(app)
        .post('/api/cards')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          personalInfo: {
            firstName: 'Publish',
            lastName: 'Test',
            email: `publish-test-${Date.now()}@example.com`,
            bio: 'Test card for publishing',
          },
        });

      testCardId = createRes.body.id;
    });

    it('TC_CARD_014: Should publish card successfully', async () => {
      const response = await request(app)
        .post(`/api/cards/${testCardId}/publish`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.isPublished).toBe(true);
      expect(response.body.isDraft).toBe(false);
      expect(response.body).toHaveProperty('slug');
    });

    it('TC_CARD_015: Should unpublish card', async () => {
      // First publish
      await request(app)
        .post(`/api/cards/${testCardId}/publish`)
        .set('Authorization', `Bearer ${authToken}`);

      // Then unpublish
      const response = await request(app)
        .post(`/api/cards/${testCardId}/unpublish`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.isPublished).toBe(false);
      expect(response.body.isDraft).toBe(true);
    });

    it('TC_CARD_016: Should reject publish with incomplete data', async () => {
      const testData = cardPublishingTestData.TC_CARD_016;
      
      // Create incomplete card
      const incompleteRes = await request(app)
        .post('/api/cards')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          personalInfo: {
            firstName: 'Incomplete',
            // Missing lastName, email, bio
          },
        });

      const response = await request(app)
        .post(`/api/cards/${incompleteRes.body.id}/publish`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(testData.expected.statusCode);

      expect(response.body.error).toContain('Cannot publish');
      expect(response.body.missingFields).toContain('lastName');
    });

    it('TC_CARD_017: Should reject publish with duplicate slug', async () => {
      const testData = cardPublishingTestData.TC_CARD_017;
      
      // Create and publish first card
      const card1Res = await request(app)
        .post('/api/cards')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          personalInfo: {
            firstName: 'John',
            lastName: 'Doe',
            email: `john-test-${Date.now()}@example.com`,
            bio: 'Test',
          },
        });

      await request(app)
        .post(`/api/cards/${card1Res.body.id}/publish`)
        .set('Authorization', `Bearer ${authToken}`);

      // Try to publish second card with same slug
      const card2Res = await request(app)
        .post('/api/cards')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          personalInfo: {
            firstName: 'John',
            lastName: 'Doe',
            email: `john-test-2-${Date.now()}@example.com`,
            bio: 'Test',
          },
        });

      const response = await request(app)
        .post(`/api/cards/${card2Res.body.id}/publish`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(testData.expected.statusCode);

      expect(response.body.error).toContain('Slug already in use');
    });
  });

  // ============================================================
  // MODULE 2.4: CARD PREVIEW
  // ============================================================

  describe('Card Preview Sub-Suite', () => {
    
    beforeEach(async () => {
      const createRes = await request(app)
        .post('/api/cards')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          personalInfo: {
            firstName: 'Preview',
            lastName: 'Test',
            email: `preview-test-${Date.now()}@example.com`,
            bio: 'Test for preview',
          },
        });

      testCardId = createRes.body.id;
    });

    it('TC_CARD_018: Should get preview of draft card', async () => {
      const response = await request(app)
        .get(`/api/cards/${testCardId}/preview`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.isPublished).toBe(false);
      expect(response.body.personalInfo).toBeTruthy();
    });

    it('TC_CARD_019: Should get preview of published card', async () => {
      // Publish first
      await request(app)
        .post(`/api/cards/${testCardId}/publish`)
        .set('Authorization', `Bearer ${authToken}`);

      const response = await request(app)
        .get(`/api/cards/${testCardId}/preview`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.isPublished).toBe(true);
    });
  });

  // ============================================================
  // MODULE 2.5: CARD DELETION
  // ============================================================

  describe('Card Deletion Sub-Suite', () => {
    
    it('TC_CARD_020: Should delete draft card', async () => {
      // Create card
      const createRes = await request(app)
        .post('/api/cards')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          personalInfo: {
            firstName: 'Delete',
            lastName: 'Draft',
            email: `delete-draft-${Date.now()}@example.com`,
            bio: 'Test delete draft',
          },
        });

      // Delete it
      const deleteRes = await request(app)
        .delete(`/api/cards/${createRes.body.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(deleteRes.body.message).toContain('deleted');

      // Verify it's gone
      await request(app)
        .get(`/api/cards/${createRes.body.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });

    it('TC_CARD_021: Should prevent delete of published card', async () => {
      // Create and publish card
      const createRes = await request(app)
        .post('/api/cards')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          personalInfo: {
            firstName: 'Delete',
            lastName: 'Published',
            email: `delete-pub-${Date.now()}@example.com`,
            bio: 'Test delete published',
          },
        });

      await request(app)
        .post(`/api/cards/${createRes.body.id}/publish`)
        .set('Authorization', `Bearer ${authToken}`);

      // Try to delete
      const response = await request(app)
        .delete(`/api/cards/${createRes.body.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(400);

      expect(response.body.error).toContain('Cannot delete published');
    });

    it('TC_CARD_022: Should reject delete when not card owner', async () => {
      // Create card
      const createRes = await request(app)
        .post('/api/cards')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          personalInfo: {
            firstName: 'Delete',
            lastName: 'Unauthorized',
            email: `delete-unauth-${Date.now()}@example.com`,
            bio: 'Test',
          },
        });

      // Create another user
      const otherUserRes = await request(app)
        .post('/api/auth/register')
        .send({
          email: `other-user-delete-${Date.now()}@example.com`,
          password: 'OtherUser123!',
          displayName: 'Other User',
        });

      const otherLoginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: otherUserRes.body.user.email,
          password: 'OtherUser123!',
        });

      // Try to delete as other user
      const response = await request(app)
        .delete(`/api/cards/${createRes.body.id}`)
        .set('Authorization', `Bearer ${otherLoginRes.body.token}`)
        .expect(403);

      expect(response.body.error).toContain('Forbidden');
    });
  });

  // ============================================================
  // MODULE 2.6: SLUG MANAGEMENT
  // ============================================================

  describe('Slug Management Sub-Suite', () => {
    
    it('TC_CARD_023: Should auto-generate unique slug', async () => {
      const testData = slugTestData.TC_CARD_023;
      
      const response = await request(app)
        .post('/api/cards')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          personalInfo: {
            firstName: testData.input.firstName,
            lastName: testData.input.lastName,
            email: `slug-test-${Date.now()}@example.com`,
            bio: 'Test slug',
          },
        })
        .expect(201);

      expect(response.body.slug).toMatch(testData.expected.slugFormat);
      expect(response.body.slug).toContain('john');
    });

    it('TC_CARD_024: Should accept custom slug', async () => {
      const testData = slugTestData.TC_CARD_024;
      
      const response = await request(app)
        .post('/api/cards')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          personalInfo: {
            firstName: 'Custom',
            lastName: 'Slug',
            email: `custom-slug-${Date.now()}@example.com`,
            bio: 'Test',
          },
          customSlug: testData.input.customSlug,
        })
        .expect(201);

      expect(response.body.slug).toBe(testData.input.customSlug);
    });

    it('TC_CARD_025: Should reject invalid slug format', async () => {
      const testData = slugTestData.TC_CARD_025;
      
      const response = await request(app)
        .post('/api/cards')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          personalInfo: {
            firstName: 'Test',
            lastName: 'User',
            email: `invalid-slug-${Date.now()}@example.com`,
            bio: 'Test',
          },
          customSlug: testData.input.customSlug,
        })
        .expect(400);

      expect(response.body.error).toContain('lowercase letters, numbers, and hyphens');
    });
  });

  // ============================================================
  // MODULE 2.7: SECTION MANAGEMENT
  // ============================================================

  describe('Section Management Sub-Suite', () => {
    
    beforeEach(async () => {
      const createRes = await request(app)
        .post('/api/cards')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          personalInfo: {
            firstName: 'Section',
            lastName: 'Test',
            email: `section-test-${Date.now()}@example.com`,
            bio: 'Test sections',
          },
        });

      testCardId = createRes.body.id;
    });

    it('TC_CARD_026: Should add experience section item', async () => {
      const testData = sectionTestData.TC_CARD_026;
      
      const response = await request(app)
        .post(`/api/cards/${testCardId}/sections/experience`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(testData.item)
        .expect(201);

      expect(response.body.sections.experience).toHaveLength(1);
      expect(response.body.sections.experience[0].company).toBe(testData.item.company);
    });

    it('TC_CARD_027: Should edit experience item', async () => {
      // Add experience first
      const addRes = await request(app)
        .post(`/api/cards/${testCardId}/sections/experience`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          company: 'Old Company',
          position: 'Developer',
          startDate: '2020-01-01',
        });

      const itemId = addRes.body.sections.experience[0].id;

      // Edit it
      const editRes = await request(app)
        .put(`/api/cards/${testCardId}/sections/experience/${itemId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          description: 'Updated description',
        })
        .expect(200);

      expect(editRes.body.sections.experience[0].description).toBe('Updated description');
    });

    it('TC_CARD_028: Should delete experience item', async () => {
      // Add experience first
      const addRes = await request(app)
        .post(`/api/cards/${testCardId}/sections/experience`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          company: 'Test Company',
          position: 'Developer',
          startDate: '2020-01-01',
        });

      const itemId = addRes.body.sections.experience[0].id;

      // Delete it
      const deleteRes = await request(app)
        .delete(`/api/cards/${testCardId}/sections/experience/${itemId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(deleteRes.body.sections.experience).toHaveLength(0);
    });

    it('TC_CARD_029: Should reorder sections', async () => {
      const testData = sectionTestData.TC_CARD_029;
      
      const response = await request(app)
        .post(`/api/cards/${testCardId}/reorder-sections`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          sections: testData.input.sections,
        })
        .expect(200);

      expect(response.body.sectionOrder).toEqual(testData.input.sections);
    });
  });
});

module.exports = {};
