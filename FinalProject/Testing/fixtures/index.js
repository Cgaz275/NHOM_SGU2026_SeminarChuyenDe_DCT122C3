/**
 * Testing Fixtures Index (CommonJS)
 * 
 * Central test data fixtures cho Persona-Based Digital Twin Card System
 */

// ============================================================
// AUTH FIXTURES
// ============================================================

const validUsers = {
  user1: {
    id: 'test-user-001',
    email: 'alice@example.com',
    password: 'SecurePass123!',
    displayName: 'Alice Johnson',
    avatar: 'https://via.placeholder.com/150?text=Alice',
    createdAt: new Date('2026-01-10'),
  },
  user2: {
    id: 'test-user-002',
    email: 'bob@example.com',
    password: 'BobSecure456!',
    displayName: 'Bob Smith',
    avatar: 'https://via.placeholder.com/150?text=Bob',
    createdAt: new Date('2026-01-11'),
  },
  cardOwner: {
    id: 'test-card-owner-001',
    email: 'john.doe@example.com',
    password: 'JohnDoePwd789!',
    displayName: 'John Doe',
    role: 'card_owner',
    avatar: 'https://via.placeholder.com/150?text=John',
  },
  admin: {
    id: 'test-admin-001',
    email: 'admin@example.com',
    password: 'AdminSecure999!',
    displayName: 'Admin User',
    role: 'admin',
  },
};

const invalidUsers = {
  noEmail: {
    email: '',
    password: 'ValidPassword123!',
  },
  noPassword: {
    email: 'valid@example.com',
    password: '',
  },
  invalidEmailFormat: {
    email: 'invalid.email',
    password: 'ValidPassword123!',
  },
  weakPassword: {
    email: 'test@example.com',
    password: 'weak123',
  },
  sqlInjection: {
    email: "test' OR '1'='1",
    password: 'test',
  },
};

const registrationTestData = {
  TC_AUTH_001: {
    input: {
      email: 'newuser@example.com',
      password: 'NewUserPass123!',
      confirmPassword: 'NewUserPass123!',
      displayName: 'New User',
    },
    expected: {
      success: true,
      statusCode: 201,
      redirectUrl: '/dashboard',
    },
  },
  TC_AUTH_002: {
    input: {
      email: 'invalid.email',
      password: 'ValidPassword123!',
      confirmPassword: 'ValidPassword123!',
      displayName: 'Test User',
    },
    expected: {
      success: false,
      statusCode: 400,
      errorField: 'email',
    },
  },
  TC_AUTH_003: {
    input: {
      email: 'alice@example.com',
      password: 'NewPassword123!',
      confirmPassword: 'NewPassword123!',
      displayName: 'Duplicate User',
    },
    expected: {
      success: false,
      statusCode: 409,
    },
  },
};

const loginTestData = {
  TC_AUTH_011: {
    input: {
      email: 'alice@example.com',
      password: 'SecurePass123!',
    },
    expected: {
      success: true,
      statusCode: 200,
    },
  },
  TC_AUTH_012: {
    input: {
      email: 'alice@example.com',
      password: 'WrongPassword123!',
    },
    expected: {
      success: false,
      statusCode: 401,
      errorMessage: 'Invalid credentials',
    },
  },
};

const passwordResetTestData = {
  TC_AUTH_031: {
    input: {
      email: 'alice@example.com',
    },
    expected: {
      success: true,
      statusCode: 200,
    },
  },
};

const sessionTestData = {
  TC_AUTH_019: {
    expected: {
      success: true,
      statusCode: 200,
    },
  },
};

const authorizationTestData = {
  TC_AUTH_027: {
    expected: {
      requiresAuth: true,
      statusCode: 401,
    },
  },
};

const googleOAuthTestData = {
  TC_AUTH_023: {
    input: {
      googleToken: 'valid-google-token',
      displayName: 'Google User',
    },
    expected: {
      success: true,
      statusCode: 201,
    },
  },
};

// ============================================================
// CARD FIXTURES
// ============================================================

const validCards = {
  card1: {
    id: 'card-001',
    ownerId: 'test-user-001',
    name: 'Alice Johnson',
    title: 'Software Engineer',
    bio: 'Full stack developer',
    email: 'alice@example.com',
    phone: '+1234567890',
    website: 'https://alice.dev',
    avatar: 'https://via.placeholder.com/150',
    status: 'published',
    createdAt: new Date('2026-01-10'),
  },
  card2: {
    id: 'card-002',
    ownerId: 'test-user-002',
    name: 'Bob Smith',
    title: 'Product Manager',
    bio: 'Building awesome products',
    email: 'bob@example.com',
    phone: '+1234567891',
    website: 'https://bob.com',
    avatar: 'https://via.placeholder.com/150',
    status: 'draft',
    createdAt: new Date('2026-01-11'),
  },
};

const cardCreationTestData = {
  TC_CARD_001: {
    input: {
      name: 'John Doe',
      title: 'Developer',
      bio: 'Passionate developer',
      email: 'john@example.com',
    },
    expected: {
      success: true,
      statusCode: 201,
    },
  },
};

const cardEditingTestData = {
  TC_CARD_009: {
    input: {
      cardId: 'card-001',
      updates: {
        title: 'Senior Software Engineer',
      },
    },
    expected: {
      success: true,
      statusCode: 200,
    },
  },
};

const cardPublishingTestData = {
  TC_CARD_017: {
    input: {
      cardId: 'card-001',
    },
    expected: {
      success: true,
      statusCode: 200,
      status: 'published',
    },
  },
};

const cardPreviewTestData = {
  TC_CARD_015: {
    expected: {
      success: true,
      statusCode: 200,
    },
  },
};

const cardDeletionTestData = {
  TC_CARD_027: {
    input: {
      cardId: 'card-001',
    },
    expected: {
      success: true,
      statusCode: 200,
    },
  },
};

const slugTestData = {
  TC_CARD_017: {
    expected: {
      success: true,
    },
  },
};

const sectionTestData = {
  TC_CARD_021: {
    input: {
      section: 'experience',
    },
    expected: {
      success: true,
    },
  },
};

// ============================================================
// AI CHAT FIXTURES
// ============================================================

const validKnowledgeBases = {
  kb_john: {
    id: 'kb-john-001',
    cardId: 'card-john-001',
    systemPrompt: 'You are John Doe, a software engineer',
    tone: 'Professional',
    temperature: 0.7,
    skills: ['JavaScript', 'React', 'Node.js'],
    experience: [
      {
        company: 'Tech Corp',
        role: 'Senior Engineer',
        startDate: '2020-01-01',
      },
    ],
  },
  kb_jane: {
    id: 'kb-jane-001',
    cardId: 'card-jane-001',
    systemPrompt: 'You are Jane Smith, a product manager',
    tone: 'Friendly',
    temperature: 0.8,
    skills: ['Product Strategy', 'User Research'],
    experience: [
      {
        company: 'Product Co',
        role: 'Product Manager',
        startDate: '2019-06-01',
      },
    ],
  },
};

const chatMessageTestData = {
  TC_CHATBOT_001: {
    input: {
      cardId: 'card-john-001',
      visitorEmail: 'visitor@example.com',
      message: 'What is your background?',
    },
    expected: {
      success: true,
      statusCode: 200,
      hasResponse: true,
    },
  },
};

const aiResponseValidationTestData = {
  TC_CHATBOT_007: {
    input: {
      message: 'Tell me about your skills',
    },
    expected: {
      success: true,
      relevance: 'high',
    },
  },
};

const conversationHistoryTestData = {
  TC_CHATBOT_030: {
    input: {
      cardId: 'card-john-001',
    },
    expected: {
      success: true,
      statusCode: 200,
      hasMessages: true,
    },
  },
};

const humanTakeoverTestData = {
  TC_TAKEOVER_001: {
    input: {
      conversationId: 'conv-001',
      cardId: 'card-john-001',
    },
    expected: {
      success: true,
      statusCode: 200,
    },
  },
};

const fallbackTestData = {
  TC_INBOX_001: {
    input: {
      cardId: 'card-john-001',
      visitorEmail: 'visitor@example.com',
      visitorName: 'John Visitor',
      message: 'I would like to connect',
    },
    expected: {
      success: true,
      statusCode: 201,
    },
  },
};

const accuracyTestingTestData = {
  TC_CHATBOT_031: {
    expected: {
      responseTime: '<3s',
    },
  },
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function resetAllFixtures() {
  console.log('✓ Fixtures reset');
  return true;
}

function resetAuthFixtures() {
  console.log('✓ Auth fixtures reset');
}

function resetCardFixtures() {
  console.log('✓ Card fixtures reset');
}

function resetChatFixtures() {
  console.log('✓ Chat fixtures reset');
}

// ============================================================
// EXPORTS
// ============================================================

module.exports = {
  // Auth fixtures
  validUsers,
  invalidUsers,
  registrationTestData,
  loginTestData,
  passwordResetTestData,
  sessionTestData,
  authorizationTestData,
  googleOAuthTestData,

  // Card fixtures
  validCards,
  cardCreationTestData,
  cardEditingTestData,
  cardPublishingTestData,
  cardPreviewTestData,
  cardDeletionTestData,
  slugTestData,
  sectionTestData,

  // AI Chat fixtures
  validKnowledgeBases,
  chatMessageTestData,
  aiResponseValidationTestData,
  conversationHistoryTestData,
  humanTakeoverTestData,
  fallbackTestData,
  accuracyTestingTestData,

  // Helper functions
  resetAllFixtures,
  resetAuthFixtures,
  resetCardFixtures,
  resetChatFixtures,
};
