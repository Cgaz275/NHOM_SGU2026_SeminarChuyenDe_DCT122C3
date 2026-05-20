/**
 * Testing Fixtures Index
 * 
 * Tập trung all test data fixtures cho Persona-Based Digital Twin Card System
 * Tuân thủ: test_cases_guideline.md & test_suite_guideline.md
 * 
 * Structure:
 * - auth.fixtures.ts: Authentication & Authorization test data
 * - card-profile.fixtures.ts: Card/Profile management test data
 * - ai-chat.fixtures.ts: AI Digital Twin chatbot test data
 * - common.fixtures.ts: Shared/common test data
 * - index.ts: This file - central exports & helpers
 */

// ============================================================
// EXPORT ALL FIXTURES
// ============================================================

// Authentication fixtures
export * from './auth.fixtures';

// Card/Profile fixtures
export * from './card-profile.fixtures';

// AI Chat fixtures
export * from './ai-chat.fixtures';

// ============================================================
// GLOBAL TEST UTILITIES
// ============================================================

import * as AuthFixtures from './auth.fixtures';
import * as CardFixtures from './card-profile.fixtures';
import * as ChatFixtures from './ai-chat.fixtures';

/**
 * Database/Firestore mock data
 * Use in Jest unit tests to mock Firestore operations
 */
export const mockFirestoreData = {
  users: {
    'test-user-001': AuthFixtures.validUsers.user1,
    'test-user-002': AuthFixtures.validUsers.user2,
    'test-card-owner-001': AuthFixtures.validUsers.cardOwner,
    'test-admin-001': AuthFixtures.validUsers.admin,
  },
  cards: {
    'card-001': CardFixtures.validCards.card1,
    'card-002': CardFixtures.validCards.card2,
  },
  knowledgeBases: {
    'kb-john-001': ChatFixtures.validKnowledgeBases.kb_john,
    'kb-jane-001': ChatFixtures.validKnowledgeBases.kb_jane,
  },
};

/**
 * Common test helper functions
 */
export class TestFixtures {
  /**
   * Get all test data for a specific module
   */
  static getModuleTestData(module: 'auth' | 'card' | 'chat') {
    switch (module) {
      case 'auth':
        return {
          validUsers: AuthFixtures.validUsers,
          invalidUsers: AuthFixtures.invalidUsers,
          registrationTests: AuthFixtures.registrationTestData,
          loginTests: AuthFixtures.loginTestData,
          oauthTests: AuthFixtures.googleOAuthTestData,
          passwordResetTests: AuthFixtures.passwordResetTestData,
          sessionTests: AuthFixtures.sessionTestData,
          authorizationTests: AuthFixtures.authorizationTestData,
        };
      case 'card':
        return {
          validCards: CardFixtures.validCards,
          creationTests: CardFixtures.cardCreationTestData,
          editingTests: CardFixtures.cardEditingTestData,
          publishingTests: CardFixtures.cardPublishingTestData,
          previewTests: CardFixtures.cardPreviewTestData,
          deletionTests: CardFixtures.cardDeletionTestData,
          slugTests: CardFixtures.slugTestData,
          sectionTests: CardFixtures.sectionTestData,
        };
      case 'chat':
        return {
          knowledgeBases: ChatFixtures.validKnowledgeBases,
          messageTests: ChatFixtures.chatMessageTestData,
          validationTests: ChatFixtures.aiResponseValidationTestData,
          historyTests: ChatFixtures.conversationHistoryTestData,
          takeoverTests: ChatFixtures.humanTakeoverTestData,
          fallbackTests: ChatFixtures.fallbackTestData,
          accuracyTests: ChatFixtures.accuracyTestingTestData,
        };
      default:
        throw new Error(`Unknown module: ${module}`);
    }
  }

  /**
   * Get test case by ID (all modules)
   */
  static getTestCase(caseId: string) {
    const [module, ...rest] = caseId.split('_');
    const id = rest.join('_');

    switch (module) {
      case 'TC':
        // Can't determine module from TC prefix, need more context
        return null;
      default:
        return null;
    }
  }

  /**
   * Count total test cases in fixtures
   */
  static countTotalTestCases() {
    const auth =
      Object.keys(AuthFixtures.registrationTestData).length +
      Object.keys(AuthFixtures.loginTestData).length +
      Object.keys(AuthFixtures.googleOAuthTestData).length +
      Object.keys(AuthFixtures.passwordResetTestData).length +
      Object.keys(AuthFixtures.sessionTestData).length +
      Object.keys(AuthFixtures.authorizationTestData).length;

    const card =
      Object.keys(CardFixtures.cardCreationTestData).length +
      Object.keys(CardFixtures.cardEditingTestData).length +
      Object.keys(CardFixtures.cardPublishingTestData).length +
      Object.keys(CardFixtures.cardPreviewTestData).length +
      Object.keys(CardFixtures.cardDeletionTestData).length +
      Object.keys(CardFixtures.slugTestData).length +
      Object.keys(CardFixtures.sectionTestData).length;

    const chat =
      Object.keys(ChatFixtures.chatMessageTestData).length +
      Object.keys(ChatFixtures.aiResponseValidationTestData).length +
      Object.keys(ChatFixtures.conversationHistoryTestData).length +
      Object.keys(ChatFixtures.humanTakeoverTestData).length +
      Object.keys(ChatFixtures.fallbackTestData).length +
      Object.keys(ChatFixtures.accuracyTestingTestData).length;

    return { auth, card, chat, total: auth + card + chat };
  }

  /**
   * Print fixture summary
   */
  static printSummary() {
    const counts = this.countTotalTestCases();
    console.log(`
╔════════════════════════════════════════════╗
║   Testing Fixtures Summary                 ║
╚════════════════════════════════════════════╝

📋 Module Breakdown:
  • Authentication:     ${counts.auth} test cases
  • Card/Profile:       ${counts.card} test cases
  • AI/Chat:            ${counts.chat} test cases
  ─────────────────────────────────────
  • TOTAL:              ${counts.total} test cases

🎯 Priority:
  • Critical (P0):      Authentication module
  • High (P1):          Card/Profile, AI Digital Twin
  • Medium (P2):        Inbox, Human Takeover

📊 Test Data:
  • Valid test users:   ${Object.keys(AuthFixtures.validUsers).length}
  • Valid test cards:   ${Object.keys(CardFixtures.validCards).length}
  • Knowledge bases:    ${Object.keys(ChatFixtures.validKnowledgeBases).length}

✅ Ready for:
  • Jest unit tests
  • Cypress E2E tests
  • Postman API tests
  • Manual testing
    `);
  }
}

/**
 * Reset all fixtures (for test cleanup)
 */
export function resetAllFixtures() {
  AuthFixtures.resetAuthFixtures();
  CardFixtures.resetCardFixtures();
  ChatFixtures.resetChatFixtures();
  return true;
}

/**
 * Export mock Firestore data for Jest setup
 */
export const firestoreMockData = mockFirestoreData;

/**
 * Fixture initialization
 */
export const initializeFixtures = () => {
  return {
    users: mockFirestoreData.users,
    cards: mockFirestoreData.cards,
    knowledgeBases: mockFirestoreData.knowledgeBases,
  };
};

// ============================================================
// TYPESCRIPT TYPES FOR TEST DATA
// ============================================================

export type AuthTestType = 'registration' | 'login' | 'oauth' | 'passwordReset' | 'session' | 'authorization';
export type CardTestType = 'creation' | 'editing' | 'publishing' | 'preview' | 'deletion' | 'slug' | 'section';
export type ChatTestType = 'message' | 'validation' | 'history' | 'takeover' | 'fallback' | 'accuracy';

export type TestUser = typeof AuthFixtures.validUsers[keyof typeof AuthFixtures.validUsers];
export type TestCard = typeof CardFixtures.validCards[keyof typeof CardFixtures.validCards];
export type TestKnowledgeBase =
  typeof ChatFixtures.validKnowledgeBases[keyof typeof ChatFixtures.validKnowledgeBases];

// ============================================================
// DEFAULT EXPORT
// ============================================================

export default {
  // Test data exports
  auth: AuthFixtures,
  card: CardFixtures,
  chat: ChatFixtures,

  // Utilities
  TestFixtures,
  resetAllFixtures,
  firestoreMockData,
  initializeFixtures,

  // Summary
  summary: () => TestFixtures.printSummary(),
  countTestCases: () => TestFixtures.countTotalTestCases(),
};
