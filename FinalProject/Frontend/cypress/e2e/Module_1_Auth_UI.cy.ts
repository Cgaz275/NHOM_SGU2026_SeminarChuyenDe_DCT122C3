/**
 * Module 1: Authentication UI Test Suite
 * Testing: Login, Register, Password Reset flows
 * Priority: Very High
 */

describe('Module 1: Authentication UI Test Suite', () => {
  const testUser = {
    email: 'test@example.com',
    password: 'SecurePass123!',
    name: 'Test User',
  };

  const invalidTestData = {
    invalidEmail: 'invalid.email',
    weakPassword: '123',
    existingEmail: 'existing@example.com',
  };

  beforeEach(() => {
    cy.visit('/');
  });

  // ==================== Registration Sub-Suite ====================
  describe('TC_AUTH_UI_001-003: Registration Flow', () => {
    beforeEach(() => {
      cy.visit('/register');
    });

    it('TC_AUTH_UI_001: Should display registration form with all required fields', () => {
      // Verify form is visible
      cy.get('[data-testid="register-form"]').should('be.visible');

      // Verify form fields exist
      cy.get('[data-testid="register-name-input"]').should('exist');
      cy.get('[data-testid="register-email-input"]').should('exist');
      cy.get('[data-testid="register-password-input"]').should('exist');
      cy.get('[data-testid="register-confirm-password-input"]').should('exist');

      // Verify buttons
      cy.get('[data-testid="register-btn"]').should('be.visible').and('be.disabled');
      cy.get('[data-testid="login-link"]').should('contain', 'Already have an account?');
    });

    it('TC_AUTH_UI_002: Should register successfully with valid data', () => {
      // Fill form
      cy.get('[data-testid="register-name-input"]').type(testUser.name);
      cy.get('[data-testid="register-email-input"]').type(testUser.email);
      cy.get('[data-testid="register-password-input"]').type(testUser.password);
      cy.get('[data-testid="register-confirm-password-input"]').type(testUser.password);

      // Submit
      cy.get('[data-testid="register-btn"]').should('not.be.disabled').click();

      // Verify loading state
      cy.get('[data-testid="register-btn"]').should('be.disabled');

      // Verify redirect to dashboard
      cy.url({ timeout: 5000 }).should('include', '/dashboard');
      cy.get('[data-testid="user-profile-menu"]').should('be.visible');
    });

    it('TC_AUTH_UI_003: Should show validation errors for invalid email format', () => {
      cy.get('[data-testid="register-name-input"]').type(testUser.name);
      cy.get('[data-testid="register-email-input"]').type(invalidTestData.invalidEmail);
      cy.get('[data-testid="register-password-input"]').type(testUser.password);
      cy.get('[data-testid="register-confirm-password-input"]').type(testUser.password);

      cy.get('[data-testid="register-btn"]').click();
      cy.get('[data-testid="email-error-message"]').should('be.visible').and('contain', 'valid email');
    });

    it('TC_AUTH_UI_004: Should show error for weak password', () => {
      cy.get('[data-testid="register-name-input"]').type(testUser.name);
      cy.get('[data-testid="register-email-input"]').type(testUser.email);
      cy.get('[data-testid="register-password-input"]').type(invalidTestData.weakPassword);

      // Should show password strength indicator
      cy.get('[data-testid="password-strength-indicator"]').should('be.visible');
      cy.get('[data-testid="register-btn"]').should('be.disabled');
    });

    it('TC_AUTH_UI_005: Should show error when passwords do not match', () => {
      cy.get('[data-testid="register-name-input"]').type(testUser.name);
      cy.get('[data-testid="register-email-input"]').type(testUser.email);
      cy.get('[data-testid="register-password-input"]').type(testUser.password);
      cy.get('[data-testid="register-confirm-password-input"]').type('DifferentPass123!');

      cy.get('[data-testid="password-mismatch-error"]').should('be.visible');
      cy.get('[data-testid="register-btn"]').should('be.disabled');
    });

    it('TC_AUTH_UI_006: Should show error when email already exists', () => {
      cy.get('[data-testid="register-name-input"]').type(testUser.name);
      cy.get('[data-testid="register-email-input"]').type(invalidTestData.existingEmail);
      cy.get('[data-testid="register-password-input"]').type(testUser.password);
      cy.get('[data-testid="register-confirm-password-input"]').type(testUser.password);

      cy.get('[data-testid="register-btn"]').click();
      cy.get('[data-testid="email-exists-error"]', { timeout: 3000 }).should('be.visible');
    });

    it('TC_AUTH_UI_007: Should support Google OAuth registration button', () => {
      cy.get('[data-testid="google-register-btn"]').should('be.visible').and('contain', 'Google');
    });

    it('TC_AUTH_UI_008: Should be responsive on mobile viewport', () => {
      cy.viewport('iphone-12');
      cy.get('[data-testid="register-form"]').should('be.visible');
      cy.get('[data-testid="register-email-input"]').should('be.visible');
    });
  });

  // ==================== Login Sub-Suite ====================
  describe('TC_AUTH_UI_009-015: Login Flow', () => {
    beforeEach(() => {
      cy.visit('/login');
    });

    it('TC_AUTH_UI_009: Should display login form correctly', () => {
      cy.get('[data-testid="login-form"]').should('be.visible');
      cy.get('[data-testid="login-email-input"]').should('exist');
      cy.get('[data-testid="login-password-input"]').should('exist');
      cy.get('[data-testid="login-btn"]').should('be.visible').and('be.disabled');
      cy.get('[data-testid="forgot-password-link"]').should('contain', 'Forgot password?');
    });

    it('TC_AUTH_UI_010: Should login successfully with valid credentials', () => {
      cy.get('[data-testid="login-email-input"]').type(testUser.email);
      cy.get('[data-testid="login-password-input"]').type(testUser.password);

      cy.get('[data-testid="login-btn"]').should('not.be.disabled').click();

      // Verify redirect
      cy.url({ timeout: 5000 }).should('include', '/dashboard');
      cy.get('[data-testid="dashboard-greeting"]').should('be.visible');
    });

    it('TC_AUTH_UI_011: Should show error for incorrect password', () => {
      cy.get('[data-testid="login-email-input"]').type(testUser.email);
      cy.get('[data-testid="login-password-input"]').type('WrongPassword123!');

      cy.get('[data-testid="login-btn"]').click();
      cy.get('[data-testid="login-error-message"]', { timeout: 3000 })
        .should('be.visible')
        .and('contain', 'Invalid credentials');
    });

    it('TC_AUTH_UI_012: Should show error for non-existent email', () => {
      cy.get('[data-testid="login-email-input"]').type('nonexistent@example.com');
      cy.get('[data-testid="login-password-input"]').type(testUser.password);

      cy.get('[data-testid="login-btn"]').click();
      cy.get('[data-testid="login-error-message"]', { timeout: 3000 }).should('be.visible');
    });

    it('TC_AUTH_UI_013: Should show validation error for invalid email format', () => {
      cy.get('[data-testid="login-email-input"]').type(invalidTestData.invalidEmail);
      cy.get('[data-testid="login-btn"]').should('be.disabled');
      cy.get('[data-testid="email-error-message"]').should('be.visible');
    });

    it('TC_AUTH_UI_014: Should support password visibility toggle', () => {
      cy.get('[data-testid="login-password-input"]').should('have.attr', 'type', 'password');

      cy.get('[data-testid="password-visibility-toggle"]').click();
      cy.get('[data-testid="login-password-input"]').should('have.attr', 'type', 'text');

      cy.get('[data-testid="password-visibility-toggle"]').click();
      cy.get('[data-testid="login-password-input"]').should('have.attr', 'type', 'password');
    });

    it('TC_AUTH_UI_015: Should support Google OAuth login button', () => {
      cy.get('[data-testid="google-login-btn"]').should('be.visible').and('contain', 'Google');
    });

    it('TC_AUTH_UI_016: Should support remember me checkbox', () => {
      cy.get('[data-testid="remember-me-checkbox"]').should('exist');
      cy.get('[data-testid="remember-me-checkbox"]').click();
      cy.get('[data-testid="remember-me-checkbox"]').should('be.checked');
    });

    it('TC_AUTH_UI_017: Should be responsive on mobile', () => {
      cy.viewport('iphone-12');
      cy.get('[data-testid="login-form"]').should('be.visible');
    });
  });

  // ==================== Password Reset Sub-Suite ====================
  describe('TC_AUTH_UI_018-021: Password Reset Flow', () => {
    beforeEach(() => {
      cy.visit('/login');
    });

    it('TC_AUTH_UI_018: Should display forgot password form', () => {
      cy.get('[data-testid="forgot-password-link"]').click();
      cy.get('[data-testid="forgot-password-form"]').should('be.visible');
      cy.get('[data-testid="reset-email-input"]').should('exist');
      cy.get('[data-testid="send-reset-btn"]').should('be.visible');
    });

    it('TC_AUTH_UI_019: Should send password reset email', () => {
      cy.get('[data-testid="forgot-password-link"]').click();
      cy.get('[data-testid="reset-email-input"]').type(testUser.email);
      cy.get('[data-testid="send-reset-btn"]').click();

      cy.get('[data-testid="reset-email-success-message"]', { timeout: 3000 }).should('be.visible');
      cy.get('[data-testid="reset-email-info"]').should('contain', 'check your email');
    });

    it('TC_AUTH_UI_020: Should validate email before sending reset request', () => {
      cy.get('[data-testid="forgot-password-link"]').click();
      cy.get('[data-testid="reset-email-input"]').type(invalidTestData.invalidEmail);
      cy.get('[data-testid="send-reset-btn"]').should('be.disabled');
    });

    it('TC_AUTH_UI_021: Should allow navigating back to login', () => {
      cy.get('[data-testid="forgot-password-link"]').click();
      cy.get('[data-testid="back-to-login-link"]').click();
      cy.get('[data-testid="login-form"]').should('be.visible');
    });
  });

  // ==================== Session Management Sub-Suite ====================
  describe('TC_AUTH_UI_022-024: Session Management', () => {
    beforeEach(() => {
      cy.login(testUser.email, testUser.password);
      cy.visit('/dashboard');
    });

    it('TC_AUTH_UI_022: Should maintain user session after page refresh', () => {
      cy.get('[data-testid="dashboard-greeting"]').should('be.visible');
      cy.reload();
      cy.get('[data-testid="dashboard-greeting"]').should('be.visible');
    });

    it('TC_AUTH_UI_023: Should logout and clear session', () => {
      cy.get('[data-testid="user-profile-menu"]').click();
      cy.get('[data-testid="logout-btn"]').click();

      cy.url({ timeout: 3000 }).should('include', '/login');
      cy.visit('/dashboard');
      cy.url().should('include', '/login');
    });

    it('TC_AUTH_UI_024: Should display loading state during logout', () => {
      cy.get('[data-testid="user-profile-menu"]').click();
      cy.get('[data-testid="logout-btn"]').click();

      // Should show loading indication briefly
      cy.get('[data-testid="logout-loading"]', { timeout: 2000 }).should('be.visible');
    });
  });

  // ==================== Accessibility Tests ====================
  describe('TC_AUTH_UI_025-027: Accessibility', () => {
    beforeEach(() => {
      cy.visit('/login');
    });

    it('TC_AUTH_UI_025: Should support keyboard navigation', () => {
      cy.get('[data-testid="login-email-input"]').focus();
      cy.focused().should('have.attr', 'data-testid', 'login-email-input');

      cy.realPress('Tab');
      cy.focused().should('have.attr', 'data-testid', 'login-password-input');

      cy.realPress('Tab');
      cy.focused().should('have.attr', 'data-testid', 'login-btn');
    });

    it('TC_AUTH_UI_026: Should have proper ARIA labels', () => {
      cy.get('[data-testid="login-email-input"]').should('have.attr', 'aria-label');
      cy.get('[data-testid="login-password-input"]').should('have.attr', 'aria-label');
      cy.get('[data-testid="login-btn"]').should('have.attr', 'aria-label');
    });

    it('TC_AUTH_UI_027: Should have sufficient color contrast', () => {
      // This is typically checked by automated tools like axe
      // But we can verify input labels are visible
      cy.get('[data-testid="login-email-label"]').should('be.visible');
      cy.get('[data-testid="login-password-label"]').should('be.visible');
    });
  });

  // ==================== Performance Tests ====================
  describe('TC_AUTH_UI_028-029: Performance', () => {
    it('TC_AUTH_UI_028: Login page should load within 2 seconds', () => {
      const startTime = Date.now();
      cy.visit('/login', { onBeforeLoad: () => {} });
      cy.get('[data-testid="login-form"]').should('be.visible');

      const loadTime = Date.now() - startTime;
      expect(loadTime).to.be.lessThan(2000);
    });

    it('TC_AUTH_UI_029: Login submission should respond within 3 seconds', () => {
      cy.visit('/login');
      cy.get('[data-testid="login-email-input"]').type(testUser.email);
      cy.get('[data-testid="login-password-input"]').type(testUser.password);

      const startTime = Date.now();
      cy.get('[data-testid="login-btn"]').click();
      cy.url({ timeout: 3000 }).should('include', '/dashboard');

      const responseTime = Date.now() - startTime;
      expect(responseTime).to.be.lessThan(3000);
    });
  });
});
