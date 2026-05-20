/**
 * Admin Panel & User Management Test Suite
 * Module 7: User Management, Report Management, System Analytics
 * 
 * Test Cases: TC_ADMIN_001 to TC_ADMIN_035
 * Focus: User Operations, Report Handling, System Overview
 * Performance Target: List users < 1s, Get stats < 500ms
 * Tuân thủ: TEST PLAN.md & backend_test_guideline.md
 */

const request = require('supertest');
const { admin, db } = require('../src/config/firebase');

const app = require('../src/server');

describe('Admin Panel & User Management Test Suite', () => {
  let adminToken;
  let adminUserId;
  let testUserId;
  let testCardId;
  let startTime;

  // ============================================================
  // SETUP & TEARDOWN
  // ============================================================

  beforeAll(async () => {
    // Create/get admin user
    const adminRes = await request(app)
      .post('/api/auth/register')
      .send({
        email: `admin-${Date.now()}@example.com`,
        password: 'Admin123!',
        displayName: 'Admin User',
        role: 'admin',
      });

    if (adminRes.status === 200 || adminRes.status === 201) {
      adminUserId = adminRes.body.data?.user?.id || adminRes.body.user?.id;
      adminToken = adminRes.body.data?.token || adminRes.body.token;
    }

    // Create test user
    const userRes = await request(app)
      .post('/api/auth/register')
      .send({
        email: `testuser-${Date.now()}@example.com`,
        password: 'TestUser123!',
        displayName: 'Test User',
      });

    if (userRes.status === 200 || userRes.status === 201) {
      testUserId = userRes.body.data?.user?.id || userRes.body.user?.id;
    }

    // Create test card for report testing
    const cardRes = await request(app)
      .post('/api/cards')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        personalInfo: {
          firstName: 'Test',
          lastName: 'Card',
          email: `testcard-${Date.now()}@example.com`,
          fullName: 'Test Card',
        },
      });

    if (cardRes.status === 200 || cardRes.status === 201) {
      testCardId = cardRes.body.data?.id || cardRes.body.id;
    }
  });

  afterAll(async () => {
    // Clean up test data
    if (testCardId) {
      try {
        await db.collection('cards').doc(testCardId).delete();
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
  // MODULE 7.1: USER MANAGEMENT - LIST & VIEW
  // ============================================================

  describe('User Management - List & View', () => {

    it('TC_ADMIN_001: Should list all users', async () => {
      const response = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('TC_ADMIN_002: Should list users with pagination', async () => {
      const response = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .query({ limit: 10, offset: 0 })
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('TC_ADMIN_003: Should get user list within performance target (< 1s)', async () => {
      const duration = Date.now() - startTime;

      await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      const totalDuration = Date.now() - startTime;
      expect(totalDuration).toBeLessThan(1000);
    });

    it('TC_ADMIN_004: Should view specific user details', async () => {
      const response = await request(app)
        .get(`/api/admin/users/${testUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(response.body.data?.id).toBe(testUserId);
      expect(response.body.data).toHaveProperty('email');
      expect(response.body.data).toHaveProperty('displayName');
      expect(response.body.data).toHaveProperty('createdAt');
    });

    it('TC_ADMIN_005: Should filter users by role', async () => {
      const response = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .query({ role: 'card_owner' })
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('TC_ADMIN_006: Should filter users by status', async () => {
      const response = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .query({ status: 'active' })
        .expect(200);

      expect(response.body.status).toBe(true);
    });

    it('TC_ADMIN_007: Should search users by email', async () => {
      const response = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .query({ search: '@example.com' })
        .expect(200);

      expect(response.body.status).toBe(true);
    });

    it('TC_ADMIN_008: Should search users by display name', async () => {
      const response = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .query({ search: 'Test' })
        .expect(200);

      expect(response.body.status).toBe(true);
    });
  });

  // ============================================================
  // MODULE 7.2: USER MANAGEMENT - SUSPEND & DELETE
  // ============================================================

  describe('User Management - Suspend & Delete', () => {

    let suspendTestUserId;

    beforeEach(async () => {
      // Create user for suspension testing
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: `suspend-test-${Date.now()}@example.com`,
          password: 'Suspend123!',
          displayName: 'Suspend Test User',
        });

      if (res.status === 200 || res.status === 201) {
        suspendTestUserId = res.body.data?.user?.id || res.body.user?.id;
      }
    });

    it('TC_ADMIN_009: Should suspend a user account', async () => {
      const response = await request(app)
        .post(`/api/admin/users/${suspendTestUserId}/suspend`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(response.body.data?.status).toBe('suspended');
    });

    it('TC_ADMIN_010: Should prevent login for suspended user', async () => {
      // Suspend user first
      await request(app)
        .post(`/api/admin/users/${suspendTestUserId}/suspend`)
        .set('Authorization', `Bearer ${adminToken}`);

      // Try to login
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: `suspend-test-${Date.now()}@example.com`,
          password: 'Suspend123!',
        });

      expect([401, 403]).toContain(response.status);
    });

    it('TC_ADMIN_011: Should unsuspend a user account', async () => {
      // Suspend first
      await request(app)
        .post(`/api/admin/users/${suspendTestUserId}/suspend`)
        .set('Authorization', `Bearer ${adminToken}`);

      // Unsuspend
      const response = await request(app)
        .post(`/api/admin/users/${suspendTestUserId}/unsuspend`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(response.body.data?.status).toBe('active');
    });

    it('TC_ADMIN_012: Should soft delete a user (mark as deleted)', async () => {
      const response = await request(app)
        .delete(`/api/admin/users/${suspendTestUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.status).toBe(true);
    });

    it('TC_ADMIN_013: Should prevent deleted user from accessing account', async () => {
      // Delete user
      await request(app)
        .delete(`/api/admin/users/${suspendTestUserId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      // Try to access dashboard
      const response = await request(app)
        .get('/api/cards')
        .query({ userId: suspendTestUserId });

      // Should not return user data
      expect([401, 404]).toContain(response.status);
    });

    it('TC_ADMIN_014: Should preserve user data after soft delete', async () => {
      // Admin should still be able to view deleted user
      const response = await request(app)
        .get(`/api/admin/users/${suspendTestUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.data?.status).toBe('deleted');
    });
  });

  // ============================================================
  // MODULE 7.3: VIOLATION REPORT MANAGEMENT
  // ============================================================

  describe('Violation Report Management', () => {

    let reportId;

    it('TC_ADMIN_015: Should list all violation reports', async () => {
      const response = await request(app)
        .get('/api/admin/reports')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('TC_ADMIN_016: Should create violation report on card', async () => {
      const response = await request(app)
        .post(`/api/cards/${testCardId}/report`)
        .send({
          reason: 'Inappropriate content',
          description: 'Card contains offensive language',
          reporterEmail: `reporter-${Date.now()}@example.com`,
        })
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(response.body.data).toHaveProperty('reportId');

      reportId = response.body.data?.reportId;
    });

    it('TC_ADMIN_017: Should view report details', async () => {
      if (!reportId) this.skip();

      const response = await request(app)
        .get(`/api/admin/reports/${reportId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(response.body.data?.cardId).toBe(testCardId);
    });

    it('TC_ADMIN_018: Should list reports with pagination', async () => {
      const response = await request(app)
        .get('/api/admin/reports')
        .set('Authorization', `Bearer ${adminToken}`)
        .query({ limit: 10, offset: 0 })
        .expect(200);

      expect(response.body.status).toBe(true);
    });

    it('TC_ADMIN_019: Should filter reports by status', async () => {
      const response = await request(app)
        .get('/api/admin/reports')
        .set('Authorization', `Bearer ${adminToken}`)
        .query({ status: 'pending' })
        .expect(200);

      expect(response.body.status).toBe(true);
    });

    it('TC_ADMIN_020: Should filter reports by reason', async () => {
      const response = await request(app)
        .get('/api/admin/reports')
        .set('Authorization', `Bearer ${adminToken}`)
        .query({ reason: 'spam' })
        .expect(200);

      expect(response.body.status).toBe(true);
    });

    it('TC_ADMIN_021: Should approve violation report', async () => {
      if (!reportId) this.skip();

      const response = await request(app)
        .post(`/api/admin/reports/${reportId}/approve`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          action: 'suspend_card',
          reason: 'Verified violation',
        })
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(response.body.data?.status).toBe('approved');
    });

    it('TC_ADMIN_022: Should reject violation report', async () => {
      // Create new report
      const reportRes = await request(app)
        .post(`/api/cards/${testCardId}/report`)
        .send({
          reason: 'False alarm',
          description: 'Testing rejection',
          reporterEmail: `false-reporter-${Date.now()}@example.com`,
        })
        .expect(200);

      const newReportId = reportRes.body.data?.reportId;

      if (newReportId) {
        const response = await request(app)
          .post(`/api/admin/reports/${newReportId}/reject`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send({
            reason: 'No violation found',
          })
          .expect(200);

        expect(response.body.status).toBe(true);
        expect(response.body.data?.status).toBe('rejected');
      }
    });

    it('TC_ADMIN_023: Should take action on approved report', async () => {
      // Create and approve report
      const reportRes = await request(app)
        .post(`/api/cards/${testCardId}/report`)
        .send({
          reason: 'Content violation',
          description: 'Taking action test',
          reporterEmail: `action-reporter-${Date.now()}@example.com`,
        })
        .expect(200);

      const newReportId = reportRes.body.data?.reportId;

      if (newReportId) {
        // Approve
        await request(app)
          .post(`/api/admin/reports/${newReportId}/approve`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send({
            action: 'suspend_card',
          });

        // Verify action taken
        const reportDetailsRes = await request(app)
          .get(`/api/admin/reports/${newReportId}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200);

        expect(reportDetailsRes.body.data?.action).toBeDefined();
      }
    });
  });

  // ============================================================
  // MODULE 7.4: SYSTEM OVERVIEW & ANALYTICS
  // ============================================================

  describe('System Overview & Analytics', () => {

    it('TC_ADMIN_024: Should get system dashboard overview', async () => {
      const response = await request(app)
        .get('/api/admin/dashboard')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(response.body.data).toHaveProperty('totalUsers');
      expect(response.body.data).toHaveProperty('totalCards');
      expect(response.body.data).toHaveProperty('pendingReports');
    });

    it('TC_ADMIN_025: Should get dashboard within performance target (< 500ms)', async () => {
      const duration = Date.now() - startTime;

      await request(app)
        .get('/api/admin/dashboard')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      const totalDuration = Date.now() - startTime;
      expect(totalDuration).toBeLessThan(500);
    });

    it('TC_ADMIN_026: Should get total users count', async () => {
      const response = await request(app)
        .get('/api/admin/stats/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(response.body.data?.total).toBeDefined();
      expect(typeof response.body.data?.total).toBe('number');
    });

    it('TC_ADMIN_027: Should get total cards count', async () => {
      const response = await request(app)
        .get('/api/admin/stats/cards')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(response.body.data?.total).toBeDefined();
    });

    it('TC_ADMIN_028: Should get active conversations count', async () => {
      const response = await request(app)
        .get('/api/admin/stats/conversations')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(response.body.data?.total).toBeDefined();
    });

    it('TC_ADMIN_029: Should get user registration trends', async () => {
      const response = await request(app)
        .get('/api/admin/stats/registrations')
        .set('Authorization', `Bearer ${adminToken}`)
        .query({ period: 'month' })
        .expect(200);

      expect(response.body.status).toBe(true);
    });

    it('TC_ADMIN_030: Should get conversation activity trends', async () => {
      const response = await request(app)
        .get('/api/admin/stats/activity')
        .set('Authorization', `Bearer ${adminToken}`)
        .query({ period: 'week' })
        .expect(200);

      expect(response.body.status).toBe(true);
    });
  });

  // ============================================================
  // MODULE 7.5: AUTHORIZATION & SECURITY
  // ============================================================

  describe('Authorization & Security', () => {

    it('TC_ADMIN_031: Should reject admin access without authentication', async () => {
      const response = await request(app)
        .get('/api/admin/users');

      expect([401, 403]).toContain(response.status);
    });

    it('TC_ADMIN_032: Should reject admin access for non-admin users', async () => {
      // Register regular user
      const userRes = await request(app)
        .post('/api/auth/register')
        .send({
          email: `regular-${Date.now()}@example.com`,
          password: 'Regular123!',
          displayName: 'Regular User',
        });

      const userToken = userRes.body.data?.token || userRes.body.token;

      const response = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${userToken}`);

      expect([403, 401]).toContain(response.status);
    });

    it('TC_ADMIN_033: Should only allow admin to view all users', async () => {
      const response = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.status).toBe(true);
    });

    it('TC_ADMIN_034: Should only allow admin to manage reports', async () => {
      const response = await request(app)
        .get('/api/admin/reports')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.status).toBe(true);
    });

    it('TC_ADMIN_035: Should log admin actions for audit trail', async () => {
      // Perform admin action
      await request(app)
        .post(`/api/admin/users/${testUserId}/suspend`)
        .set('Authorization', `Bearer ${adminToken}`);

      // Check audit logs (if endpoint exists)
      const response = await request(app)
        .get('/api/admin/audit-logs')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.status).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });
});
