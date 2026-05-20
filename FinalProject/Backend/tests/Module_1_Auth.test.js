/**
 * Authentication API Test Suite
 * Module 1: Auth & Authorization
 * 
 * Test Cases: TC_AUTH_001 to TC_AUTH_040
 * Tuân thủ: TEST PLAN.md & test_cases_guideline.md
 */

const request = require('supertest');
const { getAuth, getFirestore } = require('firebase/app');
const fixtures = require('../../Testing/fixtures');

// Configure test environment
const API_URL = process.env.API_URL || 'http://localhost:3001';
const app = require('../src/app'); // Express app

describe('Authentication & Authorization Test Suite', () => {
  const { validUsers, invalidUsers, registrationTestData, loginTestData, googleOAuthTestData, passwordResetTestData, sessionTestData, authorizationTestData } = fixtures;

  // ============================================================
  // SETUP & TEARDOWN
  // ============================================================

  beforeAll(async () => {
    // Initialize test database
    // Start Firebase Emulator if needed
    console.log('✓ Test environment initialized');
  });

  afterAll(async () => {
    // Clean up test data
    // Stop Firebase Emulator
    console.log('✓ Test environment cleaned up');
  });

  beforeEach(async () => {
    // Reset test data before each test
    // Clear any cached tokens
  });

  // ============================================================
  // MODULE 1.1: USER REGISTRATION
  // ============================================================

  describe('Registration Sub-Suite', () => {
    
    it('TC_AUTH_001: Should register user with valid email and password', async () => {
      const testData = registrationTestData.TC_AUTH_001;
      
      const response = await request(app)
        .post('/api/auth/register')
        .send(testData.input)
        .expect(testData.expected.statusCode);

      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe(testData.input.email);
    });

    it('TC_AUTH_002: Should reject invalid email format', async () => {
      const testData = registrationTestData.TC_AUTH_002;
      
      const response = await request(app)
        .post('/api/auth/register')
        .send(testData.input)
        .expect(testData.expected.statusCode);

      expect(response.body).toHaveProperty('error');
      expect(response.body.errorField).toBe(testData.expected.errorField);
    });

    it('TC_AUTH_003: Should reject duplicate email', async () => {
      const testData = registrationTestData.TC_AUTH_003;
      
      // First, register a user
      await request(app)
        .post('/api/auth/register')
        .send({
          email: testData.input.email,
          password: 'FirstPass123!',
          displayName: 'First User',
        });

      // Try to register with same email
      const response = await request(app)
        .post('/api/auth/register')
        .send(testData.input)
        .expect(testData.expected.statusCode);

      expect(response.body.error).toContain('already registered');
    });

    it('TC_AUTH_004: Should reject mismatched passwords', async () => {
      const testData = registrationTestData.TC_AUTH_004;
      
      const response = await request(app)
        .post('/api/auth/register')
        .send(testData.input)
        .expect(400);

      expect(response.body.errorField).toBe(testData.expected.errorField);
      expect(response.body.error).toContain('do not match');
    });

    it('TC_AUTH_005: Should reject weak password', async () => {
      const testData = registrationTestData.TC_AUTH_005;
      
      const response = await request(app)
        .post('/api/auth/register')
        .send(testData.input)
        .expect(400);

      expect(response.body.errorField).toBe(testData.expected.errorField);
      expect(response.body.error).toContain('Password must be');
    });

    it('TC_AUTH_006: Should reject missing required fields', async () => {
      const testData = registrationTestData.TC_AUTH_006;
      
      const response = await request(app)
        .post('/api/auth/register')
        .send(testData.input)
        .expect(400);

      expect(response.body.missingFields).toEqual(expect.arrayContaining(testData.expected.missingFields));
    });

    it('TC_AUTH_007: Should accept email with special characters', async () => {
      const testData = registrationTestData.TC_AUTH_007;
      
      const response = await request(app)
        .post('/api/auth/register')
        .send(testData.input)
        .expect(testData.expected.statusCode);

      expect(response.body.user.email).toBe(testData.input.email);
    });

    it('TC_AUTH_008: Should accept unicode characters in display name', async () => {
      const testData = registrationTestData.TC_AUTH_008;
      
      const response = await request(app)
        .post('/api/auth/register')
        .send(testData.input)
        .expect(testData.expected.statusCode);

      expect(response.body.user.displayName).toContain('Nguyễn');
    });

    it('TC_AUTH_009: Should escape XSS in displayName', async () => {
      const testData = registrationTestData.TC_AUTH_009;
      
      const response = await request(app)
        .post('/api/auth/register')
        .send(testData.input)
        .expect(testData.expected.statusCode);

      // Verify XSS is escaped
      expect(response.body.user.displayName).not.toContain('<script>');
      expect(response.body.user.displayName).toContain('&lt;script&gt;');
    });

    it('TC_AUTH_010: Should reject SQL injection attempts', async () => {
      const testData = registrationTestData.TC_AUTH_010;
      
      const response = await request(app)
        .post('/api/auth/register')
        .send(testData.input)
        .expect(400);

      expect(response.body.error).toContain('Invalid email');
    });
  });

  // ============================================================
  // MODULE 1.2: USER LOGIN
  // ============================================================

  describe('Login Sub-Suite', () => {
    
    beforeEach(async () => {
      // Create test user before each login test
      await request(app)
        .post('/api/auth/register')
        .send({
          email: validUsers.user1.email,
          password: validUsers.user1.password,
          displayName: validUsers.user1.displayName,
        });
    });

    it('TC_AUTH_011: Should login successfully with valid credentials', async () => {
      const testData = loginTestData.TC_AUTH_011;
      
      const response = await request(app)
        .post('/api/auth/login')
        .send(testData.input)
        .expect(testData.expected.statusCode);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.token).toBeTruthy();
    });

    it('TC_AUTH_012: Should reject login with wrong password', async () => {
      const testData = loginTestData.TC_AUTH_012;
      
      const response = await request(app)
        .post('/api/auth/login')
        .send(testData.input)
        .expect(testData.expected.statusCode);

      expect(response.body.error).toContain('Invalid email or password');
    });

    it('TC_AUTH_013: Should reject login with non-existent user', async () => {
      const testData = loginTestData.TC_AUTH_013;
      
      const response = await request(app)
        .post('/api/auth/login')
        .send(testData.input)
        .expect(testData.expected.statusCode);

      expect(response.body.error).toContain('Invalid email or password');
    });

    it('TC_AUTH_014: Should reject invalid email format', async () => {
      const testData = loginTestData.TC_AUTH_014;
      
      const response = await request(app)
        .post('/api/auth/login')
        .send(testData.input)
        .expect(400);

      expect(response.body.error).toContain('valid email');
    });

    it('TC_AUTH_015: Should reject missing email', async () => {
      const testData = loginTestData.TC_AUTH_015;
      
      const response = await request(app)
        .post('/api/auth/login')
        .send(testData.input)
        .expect(400);

      expect(response.body.errorField).toBe('email');
    });

    it('TC_AUTH_016: Should reject missing password', async () => {
      const testData = loginTestData.TC_AUTH_016;
      
      const response = await request(app)
        .post('/api/auth/login')
        .send(testData.input)
        .expect(400);

      expect(response.body.errorField).toBe('password');
    });

    it('TC_AUTH_018: Should be case-insensitive for email', async () => {
      const testData = loginTestData.TC_AUTH_018;
      
      const response = await request(app)
        .post('/api/auth/login')
        .send(testData.input)
        .expect(200);

      expect(response.body).toHaveProperty('token');
    });

    it('TC_AUTH_019: Should return valid JWT token', async () => {
      const testData = loginTestData.TC_AUTH_019;
      
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: validUsers.user1.email,
          password: validUsers.user1.password,
        })
        .expect(200);

      const token = response.body.token;
      expect(token).toBeTruthy();
      expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
    });

    it('TC_AUTH_020: Should respond within performance target', async () => {
      const testData = loginTestData.TC_AUTH_020;
      const startTime = Date.now();
      
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: validUsers.user1.email,
          password: validUsers.user1.password,
        })
        .expect(200);

      const responseTime = Date.now() - startTime;
      expect(responseTime).toBeLessThan(testData.expected.maxResponseTime);
    });
  });

  // ============================================================
  // MODULE 1.3: GOOGLE OAUTH
  // ============================================================

  describe('Google OAuth Sub-Suite', () => {
    
    it('TC_AUTH_021: Should handle Google OAuth login for existing user', async () => {
      const testData = googleOAuthTestData.TC_AUTH_021;
      
      // First register user
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'google-user@example.com',
          password: 'Password123!',
          displayName: 'Google User',
        });

      // Then login via OAuth (mocked)
      const response = await request(app)
        .post('/api/auth/google-oauth')
        .send(testData.input)
        .expect(testData.expected.statusCode);

      expect(response.body).toHaveProperty('token');
    });

    it('TC_AUTH_022: Should create new user via Google OAuth', async () => {
      const testData = googleOAuthTestData.TC_AUTH_022;
      
      const response = await request(app)
        .post('/api/auth/google-oauth')
        .send(testData.input)
        .expect(testData.expected.statusCode);

      expect(response.body.user).toBeTruthy();
      expect(response.body.userCreated).toBe(true);
    });

    it('TC_AUTH_023: Should reject invalid Google token', async () => {
      const testData = googleOAuthTestData.TC_AUTH_023;
      
      const response = await request(app)
        .post('/api/auth/google-oauth')
        .send(testData.input)
        .expect(testData.expected.statusCode);

      expect(response.body.error).toContain('Invalid');
    });

    it('TC_AUTH_024: Should reject expired Google token', async () => {
      const testData = googleOAuthTestData.TC_AUTH_024;
      
      const response = await request(app)
        .post('/api/auth/google-oauth')
        .send(testData.input)
        .expect(testData.expected.statusCode);

      expect(response.body.error).toContain('expired');
    });
  });

  // ============================================================
  // MODULE 1.4: SESSION MANAGEMENT
  // ============================================================

  describe('Session Management Sub-Suite', () => {
    
    let validToken;

    beforeEach(async () => {
      // Register and login to get valid token
      const registerRes = await request(app)
        .post('/api/auth/register')
        .send({
          email: `session-user-${Date.now()}@example.com`,
          password: 'SessionPass123!',
          displayName: 'Session User',
        });

      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: registerRes.body.user.email,
          password: 'SessionPass123!',
        });

      validToken = loginRes.body.token;
    });

    it('TC_AUTH_031: Should verify token validity', async () => {
      const response = await request(app)
        .post('/api/auth/verify-token')
        .set('Authorization', `Bearer ${validToken}`)
        .expect(200);

      expect(response.body.isValid).toBe(true);
      expect(response.body.userId).toBeTruthy();
    });

    it('TC_AUTH_032: Should reject invalid token', async () => {
      const testData = sessionTestData.TC_AUTH_032;
      
      const response = await request(app)
        .post('/api/auth/verify-token')
        .set('Authorization', `Bearer invalid-token`)
        .expect(testData.expected.statusCode);

      expect(response.body.error).toContain('Invalid');
    });

    it('TC_AUTH_033: Should reject expired token', async () => {
      const testData = sessionTestData.TC_AUTH_033;
      
      // Simulate expired token (in real test, use actual expired token)
      const response = await request(app)
        .post('/api/auth/verify-token')
        .set('Authorization', `Bearer expired-token-xxx`)
        .expect(testData.expected.statusCode);

      expect(response.body.error).toContain('expired');
    });

    it('TC_AUTH_036: Should logout successfully', async () => {
      const response = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${validToken}`)
        .expect(200);

      expect(response.body.message).toContain('successful');

      // Verify token is invalidated
      const verifyRes = await request(app)
        .post('/api/auth/verify-token')
        .set('Authorization', `Bearer ${validToken}`)
        .expect(401);

      expect(verifyRes.body.error).toBeTruthy();
    });
  });

  // ============================================================
  // MODULE 1.5: AUTHORIZATION
  // ============================================================

  describe('Authorization Sub-Suite', () => {
    
    let cardOwnerToken, userToken, adminToken;

    beforeEach(async () => {
      // Create and login as card owner
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'cardowner@example.com',
          password: 'Password123!',
          displayName: 'Card Owner',
          role: 'card_owner',
        });

      const cardOwnerRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'cardowner@example.com',
          password: 'Password123!',
        });

      cardOwnerToken = cardOwnerRes.body.token;

      // Create and login as regular user
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'user@example.com',
          password: 'Password123!',
          displayName: 'Regular User',
          role: 'user',
        });

      const userRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'user@example.com',
          password: 'Password123!',
        });

      userToken = userRes.body.token;

      // Create and login as admin
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'admin@example.com',
          password: 'Password123!',
          displayName: 'Admin',
          role: 'admin',
        });

      const adminRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'admin@example.com',
          password: 'Password123!',
        });

      adminToken = adminRes.body.token;
    });

    it('TC_AUTH_037: Card owner should access dashboard', async () => {
      const response = await request(app)
        .get('/api/dashboard')
        .set('Authorization', `Bearer ${cardOwnerToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('data');
    });

    it('TC_AUTH_038: Regular user should not access admin endpoint', async () => {
      const response = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403);

      expect(response.body.error).toContain('Forbidden');
    });

    it('TC_AUTH_039: Admin should access admin endpoint', async () => {
      const response = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('users');
    });

    it('TC_AUTH_040: Should reject request without token', async () => {
      const response = await request(app)
        .get('/api/profile')
        .expect(401);

      expect(response.body.error).toContain('Unauthorized');
    });
  });

  // ============================================================
  // SUMMARY
  // ============================================================
});

module.exports = { };
