/**
 * Test Helper Functions
 * 
 * Utility functions for Backend tests
 * - API request wrappers
 * - Database helpers
 * - Mock data generators
 */

const request = require('supertest');

/**
 * Create and register test user
 * @param {Object} app - Express app
 * @param {Object} userData - User data (email, password, displayName)
 * @returns {Promise<{user, token}>}
 */
async function createTestUser(app, userData = {}) {
  const defaultData = {
    email: `testuser-${Date.now()}@example.com`,
    password: 'TestPass123!',
    displayName: 'Test User',
    ...userData,
  };

  const response = await request(app)
    .post('/api/auth/register')
    .send(defaultData);

  const user = response.body.data?.user || response.body.user;
  const token = response.body.data?.token || response.body.token;

  return {
    user,
    token,
    email: defaultData.email,
    password: defaultData.password,
    status: response.status,
  };
}

/**
 * Login test user
 * @param {Object} app - Express app
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<{user, token}>}
 */
async function loginTestUser(app, email, password) {
  const response = await request(app)
    .post('/api/auth/login')
    .send({ email, password });

  const user = response.body.data?.user || response.body.user;
  const token = response.body.data?.token || response.body.token;

  return {
    user,
    token,
    status: response.status,
  };
}

/**
 * Make authenticated API request
 * @param {Object} app - Express app
 * @param {string} method - HTTP method (get, post, put, delete)
 * @param {string} endpoint - API endpoint
 * @param {string} token - JWT token
 * @param {Object} data - Request body (optional)
 * @returns {Promise<Response>}
 */
async function makeAuthRequest(app, method, endpoint, token, data = null) {
  let req = request(app)[method.toLowerCase()](endpoint);

  if (token) {
    req = req.set('Authorization', `Bearer ${token}`);
  }

  if (data && ['post', 'put', 'patch'].includes(method.toLowerCase())) {
    req = req.send(data);
  }

  return req;
}

/**
 * Create test card
 * @param {Object} app - Express app
 * @param {string} token - JWT token
 * @param {Object} cardData - Card data
 * @returns {Promise<Object>}
 */
async function createTestCard(app, token, cardData = {}) {
  const defaultData = {
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: `john-${Date.now()}@example.com`,
      phone: '+1234567890',
      bio: 'Full-stack developer',
      jobTitle: 'Senior Developer',
      fullName: 'John Doe',
    },
    sections: {
      experience: [
        {
          company: 'Tech Company',
          position: 'Senior Developer',
          startDate: '2020-01-01',
          isCurrent: true,
          description: 'Led development team',
        },
      ],
      skills: ['JavaScript', 'React', 'Node.js', 'Firebase'],
      projects: [
        {
          name: 'Project 1',
          description: 'Description',
          link: 'https://example.com',
        },
      ],
    },
    ...cardData,
  };

  const response = await request(app)
    .post('/api/cards')
    .set('Authorization', `Bearer ${token}`)
    .send(defaultData);

  const cardId = response.body.data?.id || response.body.id;
  return { ...response.body.data, id: cardId, status: response.status };
}

/**
 * Publish test card
 * @param {Object} app - Express app
 * @param {string} cardId - Card ID
 * @param {string} token - JWT token
 * @returns {Promise<Object>}
 */
async function publishTestCard(app, cardId, token) {
  const response = await request(app)
    .post(`/api/cards/${cardId}/publish`)
    .set('Authorization', `Bearer ${token}`);

  return { ...response.body.data, status: response.status };
}

/**
 * Configure AI for test card
 * @param {Object} app - Express app
 * @param {string} cardId - Card ID
 * @param {string} token - JWT token
 * @param {Object} aiConfig - AI configuration
 * @returns {Promise<Object>}
 */
async function configureAI(app, cardId, token, aiConfig = {}) {
  const defaultConfig = {
    systemPrompt: 'You are a helpful assistant.',
    toneOfVoice: 'professional',
    knowledgeBase: {
      experiences: 'Full-stack developer with 5+ years experience',
      skills: 'JavaScript, React, Node.js, Firebase',
      availability: 'Available for projects',
    },
    temperature: 0.7,
    isEnabled: true,
    ...aiConfig,
  };

  const response = await request(app)
    .post(`/api/cards/${cardId}/ai-config`)
    .set('Authorization', `Bearer ${token}`)
    .send(defaultConfig);

  return { ...response.body.data, status: response.status };
}

/**
 * Send test chat message
 * @param {Object} app - Express app
 * @param {string} cardId - Card ID
 * @param {string} message - Message text
 * @param {string} visitorEmail - Visitor email (optional)
 * @returns {Promise<Object>}
 */
async function sendTestMessage(app, cardId, message, visitorEmail = null) {
  const payload = {
    message,
  };

  if (visitorEmail) {
    payload.visitorEmail = visitorEmail;
    payload.visitorName = 'Test Visitor';
  }

  const response = await request(app)
    .post(`/api/cards/${cardId}/chat`)
    .send(payload);

  return { ...response.body.data, status: response.status };
}

/**
 * Get test user with admin role
 * @param {Object} app - Express app
 * @returns {Promise<{user, token}>}
 */
async function createAdminTestUser(app) {
  const adminData = {
    email: `admin-${Date.now()}@example.com`,
    password: 'AdminPass123!',
    displayName: 'Admin User',
    role: 'admin',
  };

  const response = await request(app)
    .post('/api/auth/register')
    .send(adminData);

  const user = response.body.data?.user || response.body.user;
  const token = response.body.data?.token || response.body.token;

  return {
    user,
    token,
    email: adminData.email,
    status: response.status,
  };
}

/**
 * Generate random test data
 */
function generateRandomData() {
  const timestamp = Date.now();
  return {
    randomString: Math.random().toString(36).substring(7),
    randomEmail: `test${timestamp}@example.com`,
    randomId: `test-id-${timestamp}`,
  };
}

/**
 * Wait for async operation
 * @param {number} ms - Milliseconds to wait
 */
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Cleanup test data after test
 * @param {Object} app - Express app
 * @param {string} token - JWT token
 * @param {string} userId - User ID to delete
 */
async function cleanupTestUser(app, token, userId) {
  // Implement cleanup logic if needed
  return true;
}

module.exports = {
  createTestUser,
  loginTestUser,
  makeAuthRequest,
  createTestCard,
  publishTestCard,
  configureAI,
  sendTestMessage,
  createAdminTestUser,
  generateRandomData,
  wait,
  cleanupTestUser,
};
