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
    .post('/api/v1/auth/register')
    .send(defaultData);

  return {
    user: response.body.data,
    token: response.body.data?.token,
    email: defaultData.email,
    password: defaultData.password,
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
    .post('/api/v1/auth/login')
    .send({ email, password });

  return {
    user: response.body.data,
    token: response.body.data?.token,
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
      location: 'San Francisco, CA',
      avatar: 'https://via.placeholder.com/150',
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
          title: 'Project 1',
          description: 'Description',
          link: 'https://example.com',
        },
      ],
    },
    socialLinks: [
      {
        platform: 'github',
        url: 'https://github.com/user',
      },
      {
        platform: 'linkedin',
        url: 'https://linkedin.com/in/user',
      },
    ],
    ...cardData,
  };

  const response = await makeAuthRequest(app, 'post', '/api/v1/cards', token, defaultData);

  return response.body.data;
}

/**
 * Publish test card
 * @param {Object} app - Express app
 * @param {string} cardId - Card ID
 * @param {string} token - JWT token
 * @returns {Promise<Object>}
 */
async function publishTestCard(app, cardId, token) {
  const response = await makeAuthRequest(app, 'post', `/api/v1/cards/${cardId}/publish`, token);
  return response.body.data;
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
    tone: 'professional',
    knowledgeBase: {
      experiences: 'Full-stack developer with 5+ years experience',
      skills: 'JavaScript, React, Node.js, Firebase',
      availability: 'Available for projects',
    },
    guardrails: {
      onlyAnswerFromKB: true,
      preventHallucination: true,
    },
    temperature: 0.7,
    ...aiConfig,
  };

  const response = await makeAuthRequest(app, 'post', `/api/v1/cards/${cardId}/ai-config`, token, defaultConfig);

  return response.body.data;
}

/**
 * Send test chat message
 * @param {Object} app - Express app
 * @param {string} cardId - Card ID
 * @param {string} visitorId - Visitor ID
 * @param {string} message - Message text
 * @returns {Promise<Object>}
 */
async function sendTestMessage(app, cardId, visitorId, message) {
  const response = await request(app)
    .post(`/api/v1/chat/${cardId}/send`)
    .send({
      visitorId,
      message,
      timestamp: new Date().toISOString(),
    });

  return response.body.data;
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
    .post('/api/v1/auth/register')
    .send(adminData);

  return {
    user: response.body.data,
    token: response.body.data?.token,
    email: adminData.email,
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
