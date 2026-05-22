/**
 * Module 2: Profile Builder & Card Editor UI Test Suite
 * Testing: Create, Edit, Preview, Publish card flows
 * Priority: Very High
 */

describe('Module 2: Profile Builder & Card Editor UI Test Suite', () => {
  const testUser = {
    email: 'test@example.com',
    password: 'SecurePass123!',
  };

  const cardData = {
    name: 'John Doe',
    title: 'Full Stack Developer',
    bio: 'Passionate about building amazing products',
    email: 'john@example.com',
    phone: '+1234567890',
    website: 'https://johndoe.com',
    avatar: 'cypress/fixtures/avatar.jpg',
  };

  before(() => {
    cy.login(testUser.email, testUser.password);
  });

  beforeEach(() => {
    cy.visit('/dashboard/cards');
  });

  // ==================== Create Card Sub-Suite ====================
  describe('TC_PROFILE_UI_001-008: Create New Card', () => {
    beforeEach(() => {
      cy.visit('/dashboard/cards');
      cy.get('[data-testid="new-card-btn"]').click();
    });

    it('TC_PROFILE_UI_001: Should display card creation form', () => {
      cy.get('[data-testid="card-form"]').should('be.visible');
      cy.get('[data-testid="card-name-input"]').should('exist');
      cy.get('[data-testid="card-title-input"]').should('exist');
      cy.get('[data-testid="card-bio-textarea"]').should('exist');
      cy.get('[data-testid="card-email-input"]').should('exist');
      cy.get('[data-testid="card-phone-input"]').should('exist');
      cy.get('[data-testid="save-card-btn"]').should('be.disabled');
    });

    it('TC_PROFILE_UI_002: Should create card with basic information', () => {
      cy.get('[data-testid="card-name-input"]').type(cardData.name);
      cy.get('[data-testid="card-title-input"]').type(cardData.title);
      cy.get('[data-testid="card-bio-textarea"]').type(cardData.bio);
      cy.get('[data-testid="card-email-input"]').type(cardData.email);
      cy.get('[data-testid="card-phone-input"]').type(cardData.phone);

      cy.get('[data-testid="save-card-btn"]').should('not.be.disabled').click();
      cy.get('[data-testid="save-success-toast"]').should('be.visible');
      cy.url().should('include', '/dashboard/cards/');
    });

    it('TC_PROFILE_UI_003: Should validate required fields', () => {
      cy.get('[data-testid="save-card-btn"]').click();
      cy.get('[data-testid="name-required-error"]').should('be.visible');
    });

    it('TC_PROFILE_UI_004: Should validate email format', () => {
      cy.get('[data-testid="card-name-input"]').type(cardData.name);
      cy.get('[data-testid="card-email-input"]').type('invalid-email');

      cy.get('[data-testid="email-format-error"]').should('be.visible');
      cy.get('[data-testid="save-card-btn"]').should('be.disabled');
    });

    it('TC_PROFILE_UI_005: Should upload avatar image', () => {
      cy.get('[data-testid="avatar-upload-btn"]').click();
      cy.get('[data-testid="avatar-input"]').selectFile(cardData.avatar);
      cy.get('[data-testid="avatar-preview"]').should('be.visible');
    });

    it('TC_PROFILE_UI_006: Should show character counter for bio', () => {
      cy.get('[data-testid="card-bio-textarea"]').type('Short bio');
      cy.get('[data-testid="bio-char-count"]').should('contain', '10/500');
    });

    it('TC_PROFILE_UI_007: Should reject oversized image files', () => {
      cy.get('[data-testid="avatar-upload-btn"]').click();
      // Create a mock large file
      const largeFile = 'cypress/fixtures/large-image.jpg';
      cy.get('[data-testid="avatar-input"]').selectFile(largeFile, { force: true });
      cy.get('[data-testid="file-size-error"]').should('be.visible');
    });

    it('TC_PROFILE_UI_008: Should support drag and drop for avatar', () => {
      cy.get('[data-testid="avatar-drop-zone"]').selectFile(cardData.avatar, { action: 'drag-drop' });
      cy.get('[data-testid="avatar-preview"]').should('be.visible');
    });
  });

  // ==================== Edit Card Sub-Suite ====================
  describe('TC_PROFILE_UI_009-014: Edit Existing Card', () => {
    beforeEach(() => {
      // Create a test card first
      cy.createCard(cardData);
      cy.visit('/dashboard/cards');
      cy.get('[data-testid="card-edit-btn"]').first().click();
    });

    it('TC_PROFILE_UI_009: Should load card data for editing', () => {
      cy.get('[data-testid="card-name-input"]').should('have.value', cardData.name);
      cy.get('[data-testid="card-title-input"]').should('have.value', cardData.title);
      cy.get('[data-testid="card-email-input"]').should('have.value', cardData.email);
    });

    it('TC_PROFILE_UI_010: Should update card information', () => {
      const updatedName = 'Jane Doe';
      cy.get('[data-testid="card-name-input"]').clear().type(updatedName);
      cy.get('[data-testid="save-card-btn"]').click();

      cy.get('[data-testid="save-success-toast"]').should('be.visible');
      cy.visit('/dashboard/cards');
      cy.get('[data-testid="card-name"]').first().should('contain', updatedName);
    });

    it('TC_PROFILE_UI_011: Should add social media links', () => {
      cy.get('[data-testid="add-social-link-btn"]').click();
      cy.get('[data-testid="social-platform-select"]').select('linkedin');
      cy.get('[data-testid="social-url-input"]').type('https://linkedin.com/in/johndoe');

      cy.get('[data-testid="save-card-btn"]').click();
      cy.get('[data-testid="save-success-toast"]').should('be.visible');
    });

    it('TC_PROFILE_UI_012: Should update avatar', () => {
      cy.get('[data-testid="avatar-upload-btn"]').click();
      cy.get('[data-testid="avatar-input"]').selectFile('cypress/fixtures/new-avatar.jpg');
      cy.get('[data-testid="save-card-btn"]').click();

      cy.get('[data-testid="save-success-toast"]').should('be.visible');
    });

    it('TC_PROFILE_UI_013: Should delete social link with confirmation', () => {
      cy.get('[data-testid="social-link-delete-btn"]').first().click();
      cy.get('[data-testid="delete-confirmation-modal"]').should('be.visible');
      cy.get('[data-testid="confirm-delete-btn"]').click();

      cy.get('[data-testid="delete-success-toast"]').should('be.visible');
    });

    it('TC_PROFILE_UI_014: Should show unsaved changes warning on leave', () => {
      cy.get('[data-testid="card-name-input"]').clear().type('Changed Name');
      cy.visit('/dashboard');

      cy.get('[data-testid="unsaved-changes-modal"]').should('be.visible');
      cy.get('[data-testid="discard-changes-btn"]').click();
    });
  });

  // ==================== Card Preview Sub-Suite ====================
  describe('TC_PROFILE_UI_015-020: Real-time Preview', () => {
    beforeEach(() => {
      cy.visit('/dashboard/cards');
      cy.get('[data-testid="new-card-btn"]').click();
    });

    it('TC_PROFILE_UI_015: Should display live preview panel', () => {
      cy.get('[data-testid="card-preview-panel"]').should('be.visible');
      cy.get('[data-testid="preview-toggle"]').should('be.visible');
    });

    it('TC_PROFILE_UI_016: Should update preview as user types', () => {
      cy.get('[data-testid="card-name-input"]').type(cardData.name);
      cy.get('[data-testid="preview-name"]').should('contain', cardData.name);
    });

    it('TC_PROFILE_UI_017: Should toggle between mobile and desktop preview', () => {
      cy.get('[data-testid="preview-device-toggle"]').click();
      cy.get('[data-testid="card-preview-panel"]').should('have.class', 'mobile-view');

      cy.get('[data-testid="preview-device-toggle"]').click();
      cy.get('[data-testid="card-preview-panel"]').should('have.class', 'desktop-view');
    });

    it('TC_PROFILE_UI_018: Should support dark mode preview', () => {
      cy.get('[data-testid="dark-mode-toggle"]').click();
      cy.get('[data-testid="card-preview-panel"]').should('have.class', 'dark-mode');
    });

    it('TC_PROFILE_UI_019: Should update avatar preview immediately', () => {
      cy.get('[data-testid="avatar-upload-btn"]').click();
      cy.get('[data-testid="avatar-input"]').selectFile(cardData.avatar);
      cy.get('[data-testid="preview-avatar"]').should('have.attr', 'src').and('include', 'avatar');
    });

    it('TC_PROFILE_UI_020: Should preview sections dynamically', () => {
      cy.get('[data-testid="add-experience-btn"]').click();
      cy.get('[data-testid="experience-company-input"]').type('Tech Company');
      cy.get('[data-testid="preview-experience-section"]').should('contain', 'Tech Company');
    });
  });

  // ==================== Card Sections Sub-Suite ====================
  describe('TC_PROFILE_UI_021-026: Add/Edit/Delete Card Sections', () => {
    beforeEach(() => {
      cy.createCard(cardData);
      cy.visit('/dashboard/cards');
      cy.get('[data-testid="card-edit-btn"]').first().click();
    });

    it('TC_PROFILE_UI_021: Should add experience section', () => {
      cy.get('[data-testid="add-experience-btn"]').click();
      cy.get('[data-testid="experience-company-input"]').type('Tech Corp');
      cy.get('[data-testid="experience-role-input"]').type('Senior Developer');
      cy.get('[data-testid="experience-start-date"]').type('2020-01-01');
      cy.get('[data-testid="add-experience-confirm-btn"]').click();

      cy.get('[data-testid="experience-item"]').should('be.visible');
    });

    it('TC_PROFILE_UI_022: Should add skills section', () => {
      cy.get('[data-testid="add-skill-btn"]').click();
      cy.get('[data-testid="skill-name-input"]').type('React');
      cy.get('[data-testid="skill-level-select"]').select('Expert');
      cy.get('[data-testid="add-skill-confirm-btn"]').click();

      cy.get('[data-testid="skill-item"]').should('contain', 'React');
    });

    it('TC_PROFILE_UI_023: Should add project section', () => {
      cy.get('[data-testid="add-project-btn"]').click();
      cy.get('[data-testid="project-name-input"]').type('Awesome App');
      cy.get('[data-testid="project-description-textarea"]').type('A cool app');
      cy.get('[data-testid="project-link-input"]').type('https://awesomeapp.com');
      cy.get('[data-testid="add-project-confirm-btn"]').click();

      cy.get('[data-testid="project-item"]').should('contain', 'Awesome App');
    });

    it('TC_PROFILE_UI_024: Should edit existing experience', () => {
      cy.get('[data-testid="experience-item"]').first().find('[data-testid="experience-edit-btn"]').click();
      cy.get('[data-testid="experience-company-input"]').clear().type('New Company');
      cy.get('[data-testid="experience-edit-confirm-btn"]').click();

      cy.get('[data-testid="experience-item"]').should('contain', 'New Company');
    });

    it('TC_PROFILE_UI_025: Should delete section with confirmation', () => {
      cy.get('[data-testid="experience-item"]').first().find('[data-testid="experience-delete-btn"]').click();
      cy.get('[data-testid="delete-section-modal"]').should('be.visible');
      cy.get('[data-testid="confirm-section-delete-btn"]').click();

      cy.get('[data-testid="experience-item"]').should('not.exist');
    });

    it('TC_PROFILE_UI_026: Should reorder sections with drag and drop', () => {
      cy.get('[data-testid="skill-item"]').first().as('firstSkill');
      cy.get('[data-testid="skill-item"]').eq(1).as('secondSkill');

      cy.get('@firstSkill').trigger('mousedown', { which: 1 });
      cy.get('@secondSkill').trigger('mousemove').trigger('mouseup');

      cy.get('[data-testid="sections-reordered-toast"]').should('be.visible');
    });
  });

  // ==================== Save and Publish Sub-Suite ====================
  describe('TC_PROFILE_UI_027-030: Save Draft and Publish', () => {
    beforeEach(() => {
      cy.visit('/dashboard/cards');
      cy.get('[data-testid="new-card-btn"]').click();
    });

    it('TC_PROFILE_UI_027: Should save card as draft', () => {
      cy.get('[data-testid="card-name-input"]').type(cardData.name);
      cy.get('[data-testid="card-email-input"]').type(cardData.email);
      cy.get('[data-testid="save-draft-btn"]').click();

      cy.get('[data-testid="save-success-toast"]').should('be.visible');
      cy.get('[data-testid="card-status"]').should('contain', 'Draft');
    });

    it('TC_PROFILE_UI_028: Should publish card to public', () => {
      cy.createCard(cardData);
      cy.visit('/dashboard/cards');
      cy.get('[data-testid="card-publish-btn"]').first().click();

      cy.get('[data-testid="publish-modal"]').should('be.visible');
      cy.get('[data-testid="confirm-publish-btn"]').click();

      cy.get('[data-testid="publish-success-toast"]').should('be.visible');
      cy.get('[data-testid="card-status"]').first().should('contain', 'Published');
    });

    it('TC_PROFILE_UI_029: Should generate unique public URL on publish', () => {
      cy.createCard(cardData);
      cy.visit('/dashboard/cards');
      cy.get('[data-testid="card-actions-btn"]').first().click();
      cy.get('[data-testid="card-url"]').should('be.visible').and('contain', '/u/');
    });

    it('TC_PROFILE_UI_030: Should unpublish card', () => {
      cy.createCard(cardData);
      cy.publishCard();
      cy.visit('/dashboard/cards');
      cy.get('[data-testid="card-actions-btn"]').first().click();
      cy.get('[data-testid="card-unpublish-btn"]').click();

      cy.get('[data-testid="confirm-unpublish-btn"]').click();
      cy.get('[data-testid="card-status"]').first().should('not.contain', 'Published');
    });
  });

  // ==================== Responsive Design ====================
  describe('TC_PROFILE_UI_031-033: Responsive Design', () => {
    it('TC_PROFILE_UI_031: Should be responsive on mobile (375px)', () => {
      cy.viewport('iphone-12');
      cy.visit('/dashboard/cards');
      cy.get('[data-testid="new-card-btn"]').should('be.visible');
      cy.get('[data-testid="cards-list"]').should('be.visible');
    });

    it('TC_PROFILE_UI_032: Should be responsive on tablet (768px)', () => {
      cy.viewport('ipad-2');
      cy.visit('/dashboard/cards');
      cy.get('[data-testid="card-form"]').should('be.visible');
    });

    it('TC_PROFILE_UI_033: Should display side-by-side form and preview on desktop', () => {
      cy.viewport(1920, 1080);
      cy.visit('/dashboard/cards');
      cy.get('[data-testid="new-card-btn"]').click();
      cy.get('[data-testid="card-form"]').should('be.visible');
      cy.get('[data-testid="card-preview-panel"]').should('be.visible');
    });
  });

  // ==================== Performance ====================
  describe('TC_PROFILE_UI_034-035: Performance', () => {
    it('TC_PROFILE_UI_034: Form autosave should complete within 500ms', () => {
      cy.visit('/dashboard/cards');
      cy.get('[data-testid="new-card-btn"]').click();

      const startTime = Date.now();
      cy.get('[data-testid="card-name-input"]').type('Test');
      cy.get('[data-testid="autosave-indicator"]').should('contain', 'Saved');

      const saveTime = Date.now() - startTime;
      expect(saveTime).to.be.lessThan(500);
    });

    it('TC_PROFILE_UI_035: Image upload should complete within 3 seconds', () => {
      cy.visit('/dashboard/cards');
      cy.get('[data-testid="new-card-btn"]').click();

      const startTime = Date.now();
      cy.get('[data-testid="avatar-upload-btn"]').click();
      cy.get('[data-testid="avatar-input"]').selectFile(cardData.avatar);
      cy.get('[data-testid="avatar-preview"]').should('be.visible');

      const uploadTime = Date.now() - startTime;
      expect(uploadTime).to.be.lessThan(3000);
    });
  });
});
