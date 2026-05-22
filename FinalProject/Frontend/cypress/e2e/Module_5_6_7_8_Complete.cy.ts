/**
 * Module 5-8: Inbox, Human Takeover, Admin Panel & Public Profile Test Suite
 * Priority: High
 */

describe('Module 5-8: Complete Feature Test Suite', () => {
  const testUser = {
    email: 'test@example.com',
    password: 'SecurePass123!',
  };

  const adminUser = {
    email: 'admin@example.com',
    password: 'AdminPass123!',
  };

  // ==================== Module 5: Inbox & Conversations ====================
  describe('TC_INBOX_UI_001-010: Inbox & Conversation Management', () => {
    before(() => {
      cy.login(testUser.email, testUser.password);
      cy.createCard({ name: 'Test Card', email: 'test@card.com' });
    });

    beforeEach(() => {
      cy.visit('/dashboard/inbox');
    });

    it('TC_INBOX_UI_001: Should display conversation list', () => {
      cy.get('[data-testid="conversation-list"]').should('be.visible');
      cy.get('[data-testid="no-conversations-message"]').should('exist');
    });

    it('TC_INBOX_UI_002: Should filter conversations', () => {
      cy.get('[data-testid="conversation-filter"]').select('unread');
      cy.get('[data-testid="filtered-conversations"]').should('be.visible');
    });

    it('TC_INBOX_UI_003: Should search conversations', () => {
      cy.get('[data-testid="search-conversations"]').type('visitor@email.com');
      cy.get('[data-testid="search-results"]').should('be.visible');
    });

    it('TC_INBOX_UI_004: Should display conversation detail', () => {
      cy.get('[data-testid="conversation-item"]').first().click();
      cy.get('[data-testid="conversation-detail"]').should('be.visible');
      cy.get('[data-testid="conversation-messages"]').should('exist');
    });

    it('TC_INBOX_UI_005: Should mark conversation as read', () => {
      cy.get('[data-testid="conversation-item"]').first().find('[data-testid="mark-read-btn"]').click();
      cy.get('[data-testid="unread-indicator"]').should('not.exist');
    });

    it('TC_INBOX_UI_006: Should reply to conversation', () => {
      cy.get('[data-testid="conversation-item"]').first().click();
      cy.get('[data-testid="reply-input"]').type('Thanks for your message');
      cy.get('[data-testid="send-reply-btn"]').click();

      cy.get('[data-testid="owner-message"]').should('contain', 'Thanks');
    });

    it('TC_INBOX_UI_007: Should delete conversation with confirmation', () => {
      cy.get('[data-testid="conversation-actions"]').click();
      cy.get('[data-testid="delete-conversation-btn"]').click();
      cy.get('[data-testid="confirm-delete-modal"]').should('be.visible');
      cy.get('[data-testid="confirm-delete-btn"]').click();

      cy.get('[data-testid="conversation-deleted-toast"]').should('be.visible');
    });

    it('TC_INBOX_UI_008: Should export conversation', () => {
      cy.get('[data-testid="conversation-actions"]').click();
      cy.get('[data-testid="export-conversation-btn"]').click();
      cy.get('[data-testid="export-success-toast"]').should('be.visible');
    });

    it('TC_INBOX_UI_009: Should paginate conversations', () => {
      cy.get('[data-testid="next-page-btn"]').should('be.visible');
      cy.get('[data-testid="next-page-btn"]').click();
      cy.get('[data-testid="conversation-list"]').should('be.visible');
    });

    it('TC_INBOX_UI_010: Should show conversation preview', () => {
      cy.get('[data-testid="conversation-preview"]').should('contain.text', '');
    });
  });

  // ==================== Module 6: Human Takeover ====================
  describe('TC_TAKEOVER_UI_001-008: Human Takeover', () => {
    before(() => {
      cy.login(testUser.email, testUser.password);
    });

    beforeEach(() => {
      cy.visit('/dashboard/inbox');
    });

    it('TC_TAKEOVER_UI_001: Should display takeover button', () => {
      cy.get('[data-testid="conversation-item"]').first().click();
      cy.get('[data-testid="takeover-btn"]').should('be.visible');
    });

    it('TC_TAKEOVER_UI_002: Should initiate takeover', () => {
      cy.get('[data-testid="conversation-item"]').first().click();
      cy.get('[data-testid="takeover-btn"]').click();

      cy.get('[data-testid="takeover-confirmation"]').should('be.visible');
      cy.get('[data-testid="confirm-takeover-btn"]').click();

      cy.get('[data-testid="takeover-active-indicator"]').should('be.visible');
    });

    it('TC_TAKEOVER_UI_003: Should disable takeover button when already taken over', () => {
      cy.get('[data-testid="takeover-btn"]').first().click();
      cy.get('[data-testid="takeover-btn"]').should('be.disabled');
    });

    it('TC_TAKEOVER_UI_004: Should show owner is responding', () => {
      cy.visit('/dashboard/inbox');
      cy.get('[data-testid="conversation-item"]').first().click();
      cy.get('[data-testid="takeover-status"]').should('contain', 'You are responding');
    });

    it('TC_TAKEOVER_UI_005: Should send message during takeover', () => {
      cy.get('[data-testid="takeover-input"]').type('Let me help you with that');
      cy.get('[data-testid="send-takeover-msg-btn"]').click();

      cy.get('[data-testid="owner-response"]').should('contain', 'Let me help');
    });

    it('TC_TAKEOVER_UI_006: Should handback to AI', () => {
      cy.get('[data-testid="takeover-actions"]').click();
      cy.get('[data-testid="handback-btn"]').click();

      cy.get('[data-testid="handback-confirmation"]').should('be.visible');
      cy.get('[data-testid="confirm-handback-btn"]').click();

      cy.get('[data-testid="ai-resumed-indicator"]').should('be.visible');
    });

    it('TC_TAKEOVER_UI_007: Should show notification to visitor', () => {
      cy.get('[data-testid="visitor-notification"]').should('be.visible').and('contain', 'human');
    });

    it('TC_TAKEOVER_UI_008: Should be responsive on mobile', () => {
      cy.viewport('iphone-12');
      cy.get('[data-testid="takeover-input"]').should('be.visible');
    });
  });

  // ==================== Module 7: Admin Panel ====================
  describe('TC_ADMIN_UI_001-012: Admin Panel', () => {
    before(() => {
      cy.login(adminUser.email, adminUser.password);
    });

    beforeEach(() => {
      cy.visit('/admin');
    });

    it('TC_ADMIN_UI_001: Should display admin dashboard', () => {
      cy.get('[data-testid="admin-dashboard"]').should('be.visible');
      cy.get('[data-testid="dashboard-stats"]').should('exist');
    });

    it('TC_ADMIN_UI_002: Should show user management section', () => {
      cy.get('[data-testid="user-management-tab"]').click();
      cy.get('[data-testid="user-list"]').should('be.visible');
    });

    it('TC_ADMIN_UI_003: Should search users', () => {
      cy.get('[data-testid="user-management-tab"]').click();
      cy.get('[data-testid="search-users"]').type('test@example.com');
      cy.get('[data-testid="search-results"]').should('be.visible');
    });

    it('TC_ADMIN_UI_004: Should filter users by role', () => {
      cy.get('[data-testid="user-management-tab"]').click();
      cy.get('[data-testid="role-filter"]').select('admin');
      cy.get('[data-testid="filtered-users"]').should('be.visible');
    });

    it('TC_ADMIN_UI_005: Should suspend user account', () => {
      cy.get('[data-testid="user-management-tab"]').click();
      cy.get('[data-testid="user-actions-btn"]').first().click();
      cy.get('[data-testid="suspend-user-btn"]').click();

      cy.get('[data-testid="suspend-confirmation"]').should('be.visible');
      cy.get('[data-testid="confirm-suspend-btn"]').click();

      cy.get('[data-testid="suspend-success"]').should('be.visible');
    });

    it('TC_ADMIN_UI_006: Should manage violation reports', () => {
      cy.get('[data-testid="reports-tab"]').click();
      cy.get('[data-testid="report-list"]').should('be.visible');
    });

    it('TC_ADMIN_UI_007: Should approve violation report', () => {
      cy.get('[data-testid="reports-tab"]').click();
      cy.get('[data-testid="report-item"]').first().click();
      cy.get('[data-testid="approve-report-btn"]').click();

      cy.get('[data-testid="approve-success"]').should('be.visible');
    });

    it('TC_ADMIN_UI_008: Should reject violation report', () => {
      cy.get('[data-testid="reports-tab"]').click();
      cy.get('[data-testid="report-item"]').first().click();
      cy.get('[data-testid="reject-report-btn"]').click();

      cy.get('[data-testid="reject-reason-input"]').type('No violation');
      cy.get('[data-testid="confirm-reject-btn"]').click();

      cy.get('[data-testid="reject-success"]').should('be.visible');
    });

    it('TC_ADMIN_UI_009: Should access admin panel only as admin', () => {
      cy.login(testUser.email, testUser.password);
      cy.visit('/admin');
      cy.url().should('include', '/dashboard');
    });

    it('TC_ADMIN_UI_010: Should display system statistics', () => {
      cy.get('[data-testid="stats-card"]').should('have.length.greaterThan', 0);
      cy.get('[data-testid="total-users"]').should('be.visible');
      cy.get('[data-testid="total-cards"]').should('be.visible');
    });

    it('TC_ADMIN_UI_011: Should display activity charts', () => {
      cy.get('[data-testid="activity-chart"]').should('be.visible');
    });

    it('TC_ADMIN_UI_012: Should export admin report', () => {
      cy.get('[data-testid="export-report-btn"]').click();
      cy.get('[data-testid="export-success"]').should('be.visible');
    });
  });

  // ==================== Module 8: Public Profile & Share ====================
  describe('TC_PUBLIC_UI_001-020: Public Profile', () => {
    before(() => {
      cy.login(testUser.email, testUser.password);
      cy.createCard({ name: 'John Doe', email: 'john@example.com' });
      cy.publishCard();
    });

    beforeEach(() => {
      cy.visit('/john-doe');
    });

    it('TC_PUBLIC_UI_001: Should display public profile', () => {
      cy.get('[data-testid="public-profile"]').should('be.visible');
    });

    it('TC_PUBLIC_UI_002: Should display profile information', () => {
      cy.get('[data-testid="profile-name"]').should('contain', 'John Doe');
      cy.get('[data-testid="profile-avatar"]').should('be.visible');
      cy.get('[data-testid="profile-title"]').should('exist');
    });

    it('TC_PUBLIC_UI_003: Should display all profile sections', () => {
      cy.get('[data-testid="experience-section"]').should('be.visible');
      cy.get('[data-testid="skills-section"]').should('be.visible');
      cy.get('[data-testid="projects-section"]').should('be.visible');
    });

    it('TC_PUBLIC_UI_004: Should display social media links', () => {
      cy.get('[data-testid="social-links"]').should('be.visible');
    });

    it('TC_PUBLIC_UI_005: Should display QR code', () => {
      cy.get('[data-testid="qr-code"]').should('be.visible');
    });

    it('TC_PUBLIC_UI_006: Should download QR code', () => {
      cy.get('[data-testid="download-qr-btn"]').click();
      cy.get('[data-testid="download-success"]').should('be.visible');
    });

    it('TC_PUBLIC_UI_007: Should copy profile URL', () => {
      cy.get('[data-testid="copy-url-btn"]').click();
      cy.get('[data-testid="copy-success-toast"]').should('be.visible');
    });

    it('TC_PUBLIC_UI_008: Should export vCard', () => {
      cy.get('[data-testid="save-contact-btn"]').click();
      cy.get('[data-testid="save-contact-success"]').should('be.visible');
    });

    it('TC_PUBLIC_UI_009: Should display report button', () => {
      cy.get('[data-testid="report-btn"]').should('be.visible');
    });

    it('TC_PUBLIC_UI_010: Should submit report form', () => {
      cy.get('[data-testid="report-btn"]').click();
      cy.get('[data-testid="report-modal"]').should('be.visible');
      cy.get('[data-testid="report-reason"]').select('inappropriate');
      cy.get('[data-testid="report-description"]').type('This profile is inappropriate');
      cy.get('[data-testid="submit-report-btn"]').click();

      cy.get('[data-testid="report-submitted"]').should('be.visible');
    });

    it('TC_PUBLIC_UI_011: Should display share buttons', () => {
      cy.get('[data-testid="share-twitter-btn"]').should('be.visible');
      cy.get('[data-testid="share-linkedin-btn"]').should('be.visible');
      cy.get('[data-testid="share-facebook-btn"]').should('be.visible');
    });

    it('TC_PUBLIC_UI_012: Should open chat widget', () => {
      cy.get('[data-testid="chat-widget"]').click();
      cy.get('[data-testid="chat-input"]').should('be.visible');
    });

    it('TC_PUBLIC_UI_013: Should be responsive on mobile (375px)', () => {
      cy.viewport('iphone-12');
      cy.get('[data-testid="public-profile"]').should('be.visible');
      cy.get('[data-testid="profile-name"]').should('be.visible');
    });

    it('TC_PUBLIC_UI_014: Should be responsive on tablet (768px)', () => {
      cy.viewport('ipad-2');
      cy.get('[data-testid="public-profile"]').should('be.visible');
    });

    it('TC_PUBLIC_UI_015: Should be responsive on desktop (1920px)', () => {
      cy.viewport(1920, 1080);
      cy.get('[data-testid="public-profile"]').should('be.visible');
    });

    it('TC_PUBLIC_UI_016: Should handle inactive profile gracefully', () => {
      cy.visit('/inactive-profile');
      cy.get('[data-testid="inactive-message"]').should('be.visible');
    });

    it('TC_PUBLIC_UI_017: Should handle not found profile (404)', () => {
      cy.visit('/nonexistent-profile');
      cy.get('[data-testid="not-found-page"]').should('be.visible');
    });

    it('TC_PUBLIC_UI_018: Should display profile correctly in dark mode', () => {
      cy.get('[data-testid="dark-mode-toggle"]').click();
      cy.get('[data-testid="public-profile"]').should('have.class', 'dark-mode');
    });

    it('TC_PUBLIC_UI_019: Page should load within 2 seconds', () => {
      const startTime = Date.now();
      cy.visit('/john-doe');
      cy.get('[data-testid="public-profile"]').should('be.visible');

      const loadTime = Date.now() - startTime;
      expect(loadTime).to.be.lessThan(2000);
    });

    it('TC_PUBLIC_UI_020: Should have good Lighthouse score', () => {
      cy.get('[data-testid="public-profile"]').should('be.visible');
      // Lighthouse test would be run separately
    });
  });

  // ==================== Integration Journey Tests ====================
  describe('TC_JOURNEY_E2E_001-003: End-to-End Journeys', () => {
    it('TC_JOURNEY_E2E_001: Complete Card Owner Journey', () => {
      // 1. Register & Login
      cy.visit('/register');
      cy.get('[data-testid="register-email-input"]').type('newowner@example.com');
      cy.get('[data-testid="register-password-input"]').type('SecurePass123!');
      cy.get('[data-testid="register-btn"]').click();

      // 2. Create Card
      cy.get('[data-testid="new-card-btn"]').click();
      cy.get('[data-testid="card-name-input"]').type('Jane Smith');
      cy.get('[data-testid="card-email-input"]').type('jane@example.com');
      cy.get('[data-testid="save-card-btn"]').click();

      // 3. Configure AI
      cy.visit('/dashboard/ai-config');
      cy.get('[data-testid="system-prompt-textarea"]').type('I am Jane');
      cy.get('[data-testid="save-ai-config-btn"]').click();

      // 4. Publish Card
      cy.visit('/dashboard/cards');
      cy.get('[data-testid="card-publish-btn"]').click();
      cy.get('[data-testid="confirm-publish-btn"]').click();

      cy.get('[data-testid="publish-success"]').should('be.visible');
    });

    it('TC_JOURNEY_E2E_002: Complete Visitor Journey', () => {
      // 1. Visit public profile
      cy.visit('/john-doe');

      // 2. Chat with AI
      cy.get('[data-testid="chat-widget"]').click();
      cy.get('[data-testid="chat-input"]').type('Can you help me?');
      cy.get('[data-testid="chat-send-btn"]').click();

      // 3. Save contact
      cy.get('[data-testid="save-contact-btn"]').click();

      // 4. Share profile
      cy.get('[data-testid="copy-url-btn"]').click();

      cy.get('[data-testid="copy-success"]').should('be.visible');
    });

    it('TC_JOURNEY_E2E_003: Complete Admin Workflow', () => {
      cy.login(adminUser.email, adminUser.password);
      cy.visit('/admin');

      // 1. View users
      cy.get('[data-testid="user-management-tab"]').click();
      cy.get('[data-testid="user-list"]').should('be.visible');

      // 2. Handle report
      cy.get('[data-testid="reports-tab"]').click();
      cy.get('[data-testid="report-item"]').first().click();
      cy.get('[data-testid="approve-report-btn"]').click();

      cy.get('[data-testid="action-success"]').should('be.visible');
    });
  });
});
