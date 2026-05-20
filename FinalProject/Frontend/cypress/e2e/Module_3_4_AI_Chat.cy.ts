/**
 * Module 3 & 4: AI Twin Configuration & Chat UI Test Suite
 * Testing: AI Config, Knowledge Base, Test Chat flows
 * Priority: Very High
 */

describe('Module 3 & 4: AI Twin Configuration & Chat UI Test Suite', () => {
  const testUser = {
    email: 'test@example.com',
    password: 'SecurePass123!',
  };

  const aiConfig = {
    systemPrompt: 'You are a professional AI assistant representing John Doe',
    tone: 'Professional',
    temperature: 0.7,
  };

  before(() => {
    cy.login(testUser.email, testUser.password);
  });

  // ==================== AI Configuration Sub-Suite ====================
  describe('TC_AI_UI_001-008: AI Twin Configuration', () => {
    beforeEach(() => {
      cy.createCard({ name: 'Test Card', email: 'test@card.com' });
      cy.visit('/dashboard/ai-config');
    });

    it('TC_AI_UI_001: Should display AI configuration form', () => {
      cy.get('[data-testid="ai-config-form"]').should('be.visible');
      cy.get('[data-testid="system-prompt-textarea"]').should('exist');
      cy.get('[data-testid="tone-select"]').should('exist');
      cy.get('[data-testid="knowledge-base-section"]').should('exist');
    });

    it('TC_AI_UI_002: Should set system prompt', () => {
      cy.get('[data-testid="system-prompt-textarea"]').type(aiConfig.systemPrompt);
      cy.get('[data-testid="save-ai-config-btn"]').click();
      cy.get('[data-testid="config-save-success"]').should('be.visible');
    });

    it('TC_AI_UI_003: Should show character counter for prompt', () => {
      cy.get('[data-testid="system-prompt-textarea"]').type('Short prompt');
      cy.get('[data-testid="prompt-char-count"]').should('contain', '12/5000');
    });

    it('TC_AI_UI_004: Should enforce prompt character limit', () => {
      const longPrompt = 'A'.repeat(5001);
      cy.get('[data-testid="system-prompt-textarea"]').type(longPrompt);
      cy.get('[data-testid="prompt-limit-error"]').should('be.visible');
      cy.get('[data-testid="save-ai-config-btn"]').should('be.disabled');
    });

    it('TC_AI_UI_005: Should set tone of voice', () => {
      cy.get('[data-testid="tone-select"]').select('Professional');
      cy.get('[data-testid="tone-description"]').should('contain', 'formal');
    });

    it('TC_AI_UI_006: Should adjust temperature slider', () => {
      cy.get('[data-testid="temperature-slider"]').invoke('val', 0.7).trigger('input');
      cy.get('[data-testid="temperature-value"]').should('contain', '0.7');
    });

    it('TC_AI_UI_007: Should toggle AI Digital Twin enable/disable', () => {
      cy.get('[data-testid="ai-enable-toggle"]').click();
      cy.get('[data-testid="ai-enable-toggle"]').should('have.attr', 'aria-checked', 'true');
    });

    it('TC_AI_UI_008: Should show guardrails configuration', () => {
      cy.get('[data-testid="guardrails-section"]').should('be.visible');
      cy.get('[data-testid="only-kb-guardrail-checkbox"]').should('exist');
      cy.get('[data-testid="forbidden-topics-input"]').should('exist');
    });
  });

  // ==================== Knowledge Base Management Sub-Suite ====================
  describe('TC_AI_UI_009-016: Knowledge Base Management', () => {
    beforeEach(() => {
      cy.createCard({ name: 'Test Card', email: 'test@card.com' });
      cy.visit('/dashboard/ai-config');
    });

    it('TC_AI_UI_009: Should display knowledge base section', () => {
      cy.get('[data-testid="knowledge-base-section"]').should('be.visible');
      cy.get('[data-testid="add-skill-btn"]').should('be.visible');
      cy.get('[data-testid="add-experience-btn"]').should('be.visible');
    });

    it('TC_AI_UI_010: Should add skill to knowledge base', () => {
      cy.get('[data-testid="add-skill-btn"]').click();
      cy.get('[data-testid="skill-name-input"]').type('Python');
      cy.get('[data-testid="skill-description-textarea"]').type('Expert in Python programming');
      cy.get('[data-testid="add-skill-confirm-btn"]').click();

      cy.get('[data-testid="skill-item"]').should('contain', 'Python');
    });

    it('TC_AI_UI_011: Should add experience to knowledge base', () => {
      cy.get('[data-testid="add-experience-btn"]').click();
      cy.get('[data-testid="exp-company-input"]').type('Tech Corp');
      cy.get('[data-testid="exp-role-input"]').type('Senior Engineer');
      cy.get('[data-testid="exp-start-date"]').type('2020-01-01');
      cy.get('[data-testid="add-experience-confirm-btn"]').click();

      cy.get('[data-testid="experience-item"]').should('contain', 'Tech Corp');
    });

    it('TC_AI_UI_012: Should add project to knowledge base', () => {
      cy.get('[data-testid="add-project-btn"]').click();
      cy.get('[data-testid="proj-name-input"]').type('Cool App');
      cy.get('[data-testid="proj-description-textarea"]').type('An awesome project');
      cy.get('[data-testid="add-project-confirm-btn"]').click();

      cy.get('[data-testid="project-item"]').should('contain', 'Cool App');
    });

    it('TC_AI_UI_013: Should edit knowledge base item', () => {
      cy.get('[data-testid="skill-item"]').first().find('[data-testid="kb-edit-btn"]').click();
      cy.get('[data-testid="skill-name-input"]').clear().type('Updated Skill');
      cy.get('[data-testid="kb-confirm-edit-btn"]').click();

      cy.get('[data-testid="skill-item"]').should('contain', 'Updated Skill');
    });

    it('TC_AI_UI_014: Should delete knowledge base item with confirmation', () => {
      cy.get('[data-testid="skill-item"]').first().find('[data-testid="kb-delete-btn"]').click();
      cy.get('[data-testid="delete-kb-modal"]').should('be.visible');
      cy.get('[data-testid="confirm-delete-btn"]').click();

      cy.get('[data-testid="skill-delete-success"]').should('be.visible');
    });

    it('TC_AI_UI_015: Should show knowledge base size indicator', () => {
      cy.get('[data-testid="kb-size-info"]').should('contain', 'KB size');
    });

    it('TC_AI_UI_016: Should support drag and drop reordering', () => {
      cy.get('[data-testid="skill-item"]').first().trigger('mousedown', { which: 1 });
      cy.get('[data-testid="skill-item"]').eq(1).trigger('mousemove').trigger('mouseup');

      cy.get('[data-testid="reorder-success"]').should('be.visible');
    });
  });

  // ==================== Test Chat Sub-Suite ====================
  describe('TC_AI_UI_017-023: Test Chat Functionality', () => {
    beforeEach(() => {
      cy.createCard({ name: 'Test Card', email: 'test@card.com' });
      cy.visit('/dashboard/ai-config');
    });

    it('TC_AI_UI_017: Should open test chat widget', () => {
      cy.get('[data-testid="test-chat-btn"]').click();
      cy.get('[data-testid="test-chat-modal"]').should('be.visible');
      cy.get('[data-testid="test-chat-input"]').should('exist');
    });

    it('TC_AI_UI_018: Should send message in test chat', () => {
      cy.get('[data-testid="test-chat-btn"]').click();
      cy.get('[data-testid="test-chat-input"]').type('What is your background?');
      cy.get('[data-testid="test-chat-send-btn"]').click();

      cy.get('[data-testid="test-user-message"]').should('contain', 'What is your background?');
    });

    it('TC_AI_UI_019: Should display AI response in test chat', () => {
      cy.get('[data-testid="test-chat-btn"]').click();
      cy.get('[data-testid="test-chat-input"]').type('Tell me about your experience');
      cy.get('[data-testid="test-chat-send-btn"]').click();

      cy.get('[data-testid="test-ai-message"]', { timeout: 5000 }).should('be.visible');
    });

    it('TC_AI_UI_020: Should show loading state during AI response', () => {
      cy.get('[data-testid="test-chat-btn"]').click();
      cy.get('[data-testid="test-chat-input"]').type('Hello');
      cy.get('[data-testid="test-chat-send-btn"]').click();

      cy.get('[data-testid="test-chat-loading"]').should('be.visible');
    });

    it('TC_AI_UI_021: Should handle empty test chat gracefully', () => {
      cy.get('[data-testid="test-chat-btn"]').click();
      cy.get('[data-testid="empty-kb-warning"]').should('be.visible');
    });

    it('TC_AI_UI_022: Should clear test chat history', () => {
      cy.get('[data-testid="test-chat-btn"]').click();
      cy.get('[data-testid="test-chat-input"]').type('Test message');
      cy.get('[data-testid="test-chat-send-btn"]').click();

      cy.get('[data-testid="clear-test-chat-btn"]').click();
      cy.get('[data-testid="test-chat-message"]').should('not.exist');
    });

    it('TC_AI_UI_023: Should close test chat modal', () => {
      cy.get('[data-testid="test-chat-btn"]').click();
      cy.get('[data-testid="close-test-chat-modal"]').click();

      cy.get('[data-testid="test-chat-modal"]').should('not.be.visible');
    });
  });

  // ==================== Chat Widget (Public) Sub-Suite ====================
  describe('TC_AI_UI_024-032: Public Chat Widget', () => {
    beforeEach(() => {
      cy.createCard({ name: 'Test Card', email: 'test@card.com' });
      cy.publishCard();
      cy.visit('/test-card');
    });

    it('TC_AI_UI_024: Should display chat widget on public profile', () => {
      cy.get('[data-testid="chat-widget"]').should('be.visible');
      cy.get('[data-testid="chat-header"]').should('contain', 'Chat');
    });

    it('TC_AI_UI_025: Should open chat on click', () => {
      cy.get('[data-testid="chat-widget"]').click();
      cy.get('[data-testid="chat-input"]').should('be.visible');
    });

    it('TC_AI_UI_026: Should send message to AI', () => {
      cy.get('[data-testid="chat-widget"]').click();
      cy.get('[data-testid="chat-input"]').type('What do you do?');
      cy.get('[data-testid="chat-send-btn"]').click();

      cy.get('[data-testid="user-message"]').should('contain', 'What do you do?');
    });

    it('TC_AI_UI_027: Should display AI response', () => {
      cy.get('[data-testid="chat-widget"]').click();
      cy.get('[data-testid="chat-input"]').type('Tell me about yourself');
      cy.get('[data-testid="chat-send-btn"]').click();

      cy.get('[data-testid="ai-message"]', { timeout: 5000 }).should('be.visible');
    });

    it('TC_AI_UI_028: Should handle chat timeout gracefully', () => {
      cy.get('[data-testid="chat-widget"]').click();
      cy.get('[data-testid="chat-input"]').type('Message');
      cy.get('[data-testid="chat-send-btn"]').click();

      // Wait for 3+ seconds
      cy.wait(3500);
      cy.get('[data-testid="chat-timeout-message"]', { timeout: 1000 }).should('be.visible');
    });

    it('TC_AI_UI_029: Should show message timestamps', () => {
      cy.get('[data-testid="chat-widget"]').click();
      cy.get('[data-testid="chat-input"]').type('Hello');
      cy.get('[data-testid="chat-send-btn"]').click();

      cy.get('[data-testid="message-timestamp"]').should('be.visible');
    });

    it('TC_AI_UI_030: Should support rapid message sending', () => {
      cy.get('[data-testid="chat-widget"]').click();
      cy.get('[data-testid="chat-input"]').type('Message 1');
      cy.get('[data-testid="chat-send-btn"]').click();
      cy.get('[data-testid="chat-input"]').type('Message 2');
      cy.get('[data-testid="chat-send-btn"]').click();

      cy.get('[data-testid="user-message"]').should('have.length', 2);
    });

    it('TC_AI_UI_031: Should handle special characters in messages', () => {
      cy.get('[data-testid="chat-widget"]').click();
      cy.get('[data-testid="chat-input"]').type('Hi! How are you? 😊');
      cy.get('[data-testid="chat-send-btn"]').click();

      cy.get('[data-testid="user-message"]').should('contain', '😊');
    });

    it('TC_AI_UI_032: Should close chat widget', () => {
      cy.get('[data-testid="chat-widget"]').click();
      cy.get('[data-testid="close-chat-btn"]').click();

      cy.get('[data-testid="chat-input"]').should('not.be.visible');
    });
  });

  // ==================== Accessibility & Responsive ====================
  describe('TC_AI_UI_033-035: Accessibility & Responsive', () => {
    beforeEach(() => {
      cy.createCard({ name: 'Test Card', email: 'test@card.com' });
      cy.publishCard();
    });

    it('TC_AI_UI_033: Should be accessible on keyboard navigation', () => {
      cy.visit('/test-card');
      cy.get('[data-testid="chat-widget"]').focus();
      cy.realPress('Enter');
      cy.get('[data-testid="chat-input"]').should('have.focus');
    });

    it('TC_AI_UI_034: Should be responsive on mobile chat', () => {
      cy.viewport('iphone-12');
      cy.visit('/test-card');
      cy.get('[data-testid="chat-widget"]').should('be.visible');
      cy.get('[data-testid="chat-widget"]').click();
      cy.get('[data-testid="chat-input"]').should('be.visible');
    });

    it('TC_AI_UI_035: Chat response should arrive within 3 seconds', () => {
      cy.visit('/test-card');
      cy.get('[data-testid="chat-widget"]').click();

      const startTime = Date.now();
      cy.get('[data-testid="chat-input"]').type('Quick test');
      cy.get('[data-testid="chat-send-btn"]').click();
      cy.get('[data-testid="ai-message"]', { timeout: 3000 }).should('be.visible');

      const responseTime = Date.now() - startTime;
      expect(responseTime).to.be.lessThan(3000);
    });
  });
});
