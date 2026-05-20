/**
 * Authentication Test Fixtures
 * 
 * Cung cấp dữ liệu test chuẩn hóa cho tất cả Authentication-related tests
 * Tuân thủ: test_cases_guideline.md & TEST PLAN.md
 */

// ============================================================
// USER TEST DATA
// ============================================================

export const validUsers = {
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

// ============================================================
// INVALID TEST DATA (For Error Cases)
// ============================================================

export const invalidUsers = {
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
  invalidEmailDomain: {
    email: 'test@invalid',
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
  xssAttempt: {
    email: 'test@example.com',
    password: '<script>alert("xss")</script>',
  },
  specialCharacters: {
    email: 'test+special!@example.com',
    password: '!@#$%^&*()Pass123',
  },
  veryLongEmail: {
    email: 'a'.repeat(300) + '@example.com',
    password: 'ValidPassword123!',
  },
  veryLongPassword: {
    email: 'test@example.com',
    password: 'x'.repeat(1000),
  },
};

// ============================================================
// REGISTRATION TEST CASES DATA
// ============================================================

export const registrationTestData = {
  TC_AUTH_001: {
    // Happy path: Valid registration
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
      message: 'Registration successful',
    },
  },

  TC_AUTH_002: {
    // Error: Invalid email format
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
      errorMessage: 'Please enter a valid email address',
    },
  },

  TC_AUTH_003: {
    // Error: Email already exists
    input: {
      email: 'alice@example.com', // Already registered
      password: 'NewPassword123!',
      confirmPassword: 'NewPassword123!',
      displayName: 'Duplicate User',
    },
    expected: {
      success: false,
      statusCode: 409,
      errorMessage: 'Email already registered',
    },
  },

  TC_AUTH_004: {
    // Error: Passwords don't match
    input: {
      email: 'test@example.com',
      password: 'Password123!',
      confirmPassword: 'Password456!',
      displayName: 'Test User',
    },
    expected: {
      success: false,
      errorField: 'confirmPassword',
      errorMessage: 'Passwords do not match',
    },
  },

  TC_AUTH_005: {
    // Error: Weak password
    input: {
      email: 'test@example.com',
      password: 'weak123',
      confirmPassword: 'weak123',
      displayName: 'Test User',
    },
    expected: {
      success: false,
      errorField: 'password',
      errorMessage: 'Password must be at least 8 characters and contain uppercase, lowercase, number, and special character',
    },
  },

  TC_AUTH_006: {
    // Error: Missing required fields
    input: {
      email: 'test@example.com',
      password: '',
      displayName: 'Test User',
    },
    expected: {
      success: false,
      missingFields: ['password', 'confirmPassword'],
    },
  },

  TC_AUTH_007: {
    // Edge case: Email with special characters
    input: {
      email: 'user+tag@example.co.uk',
      password: 'ValidPassword123!',
      confirmPassword: 'ValidPassword123!',
      displayName: 'Special Email User',
    },
    expected: {
      success: true,
      statusCode: 201,
    },
  },

  TC_AUTH_008: {
    // Edge case: Unicode characters in display name
    input: {
      email: 'unicode@example.com',
      password: 'ValidPassword123!',
      confirmPassword: 'ValidPassword123!',
      displayName: 'Nguyễn Văn A',
    },
    expected: {
      success: true,
      statusCode: 201,
    },
  },

  TC_AUTH_009: {
    // Security: XSS attempt in displayName
    input: {
      email: 'xss@example.com',
      password: 'ValidPassword123!',
      confirmPassword: 'ValidPassword123!',
      displayName: '<script>alert("xss")</script>',
    },
    expected: {
      success: true,
      statusCode: 201,
      displayName: '&lt;script&gt;alert("xss")&lt;/script&gt;', // Should be escaped
    },
  },

  TC_AUTH_010: {
    // Security: SQL Injection attempt
    input: {
      email: "admin' OR '1'='1",
      password: 'ValidPassword123!',
      confirmPassword: 'ValidPassword123!',
      displayName: 'SQL Injection Test',
    },
    expected: {
      success: false,
      errorMessage: 'Invalid email format',
    },
  },
};

// ============================================================
// LOGIN TEST CASES DATA
// ============================================================

export const loginTestData = {
  TC_AUTH_011: {
    // Happy path: Valid login
    input: {
      email: 'alice@example.com',
      password: 'SecurePass123!',
    },
    expected: {
      success: true,
      statusCode: 200,
      hasToken: true,
      hasUserId: true,
      redirectUrl: '/dashboard',
    },
  },

  TC_AUTH_012: {
    // Error: Wrong password
    input: {
      email: 'alice@example.com',
      password: 'WrongPassword123!',
    },
    expected: {
      success: false,
      statusCode: 401,
      errorMessage: 'Invalid email or password',
    },
  },

  TC_AUTH_013: {
    // Error: User not found
    input: {
      email: 'nonexistent@example.com',
      password: 'SomePassword123!',
    },
    expected: {
      success: false,
      statusCode: 401,
      errorMessage: 'Invalid email or password',
    },
  },

  TC_AUTH_014: {
    // Error: Invalid email format
    input: {
      email: 'invalid.email',
      password: 'SecurePass123!',
    },
    expected: {
      success: false,
      statusCode: 400,
      errorMessage: 'Please enter a valid email address',
    },
  },

  TC_AUTH_015: {
    // Error: Missing email
    input: {
      email: '',
      password: 'SecurePass123!',
    },
    expected: {
      success: false,
      errorField: 'email',
    },
  },

  TC_AUTH_016: {
    // Error: Missing password
    input: {
      email: 'alice@example.com',
      password: '',
    },
    expected: {
      success: false,
      errorField: 'password',
    },
  },

  TC_AUTH_017: {
    // Brute force: Multiple failed attempts
    input: {
      email: 'alice@example.com',
      password: 'WrongPassword',
    },
    attempts: 5,
    expected: {
      success: false,
      afterAttempts: 5,
      shouldBlock: true,
      blockMessage: 'Too many login attempts. Please try again later',
    },
  },

  TC_AUTH_018: {
    // Case sensitivity: Email should be case-insensitive
    input: {
      email: 'ALICE@EXAMPLE.COM',
      password: 'SecurePass123!',
    },
    expected: {
      success: true,
      statusCode: 200,
    },
  },

  TC_AUTH_019: {
    // Token validity
    input: {
      email: 'alice@example.com',
      password: 'SecurePass123!',
    },
    expected: {
      success: true,
      token: {
        type: 'JWT',
        hasExpiresIn: true,
        expiresInMs: 86400000, // 24 hours
      },
    },
  },

  TC_AUTH_020: {
    // Response time (Performance)
    input: {
      email: 'alice@example.com',
      password: 'SecurePass123!',
    },
    expected: {
      maxResponseTime: 500, // milliseconds
      statusCode: 200,
    },
  },
};

// ============================================================
// GOOGLE OAUTH TEST DATA
// ============================================================

export const googleOAuthTestData = {
  TC_AUTH_021: {
    // Happy path: Google OAuth login
    input: {
      googleToken: 'valid-google-token-xxx',
    },
    expected: {
      success: true,
      statusCode: 200,
      hasToken: true,
      userCreated: false, // User already exists
    },
  },

  TC_AUTH_022: {
    // Happy path: Google OAuth registration (New user)
    input: {
      googleToken: 'valid-google-token-new-user',
    },
    expected: {
      success: true,
      statusCode: 201,
      userCreated: true,
    },
  },

  TC_AUTH_023: {
    // Error: Invalid token
    input: {
      googleToken: 'invalid-token',
    },
    expected: {
      success: false,
      statusCode: 401,
      errorMessage: 'Invalid authentication token',
    },
  },

  TC_AUTH_024: {
    // Error: Expired token
    input: {
      googleToken: 'expired-token-xxx',
    },
    expected: {
      success: false,
      statusCode: 401,
      errorMessage: 'Token has expired',
    },
  },
};

// ============================================================
// PASSWORD RESET TEST DATA
// ============================================================

export const passwordResetTestData = {
  TC_AUTH_025: {
    // Happy path: Request password reset
    input: {
      email: 'alice@example.com',
    },
    expected: {
      success: true,
      statusCode: 200,
      message: 'Password reset email sent',
      emailSent: true,
    },
  },

  TC_AUTH_026: {
    // Happy path: Verify reset token
    input: {
      email: 'alice@example.com',
      resetToken: 'valid-reset-token-xxx',
    },
    expected: {
      success: true,
      statusCode: 200,
      tokenValid: true,
    },
  },

  TC_AUTH_027: {
    // Happy path: Reset password with token
    input: {
      resetToken: 'valid-reset-token-xxx',
      newPassword: 'NewSecurePass456!',
      confirmPassword: 'NewSecurePass456!',
    },
    expected: {
      success: true,
      statusCode: 200,
      message: 'Password reset successfully',
    },
  },

  TC_AUTH_028: {
    // Error: Invalid email
    input: {
      email: 'nonexistent@example.com',
    },
    expected: {
      success: false,
      statusCode: 404,
      errorMessage: 'User not found',
    },
  },

  TC_AUTH_029: {
    // Error: Invalid reset token
    input: {
      resetToken: 'invalid-token-xxx',
      newPassword: 'NewSecurePass456!',
    },
    expected: {
      success: false,
      statusCode: 401,
      errorMessage: 'Reset token invalid or expired',
    },
  },

  TC_AUTH_030: {
    // Error: Token expired
    input: {
      resetToken: 'expired-reset-token-xxx',
      newPassword: 'NewSecurePass456!',
    },
    expected: {
      success: false,
      statusCode: 401,
      errorMessage: 'Reset token has expired',
    },
  },
};

// ============================================================
// SESSION & TOKEN TEST DATA
// ============================================================

export const sessionTestData = {
  TC_AUTH_031: {
    // Happy path: Check session validity
    input: {
      token: 'valid-jwt-token-xxx',
    },
    expected: {
      success: true,
      statusCode: 200,
      isValid: true,
      userId: 'test-user-001',
      expiresAt: expect.any(Number),
    },
  },

  TC_AUTH_032: {
    // Error: Invalid token
    input: {
      token: 'invalid-jwt-token',
    },
    expected: {
      success: false,
      statusCode: 401,
      errorMessage: 'Invalid token',
    },
  },

  TC_AUTH_033: {
    // Error: Expired token
    input: {
      token: 'expired-jwt-token-xxx',
    },
    expected: {
      success: false,
      statusCode: 401,
      errorMessage: 'Token expired',
    },
  },

  TC_AUTH_034: {
    // Happy path: Refresh token
    input: {
      refreshToken: 'valid-refresh-token-xxx',
    },
    expected: {
      success: true,
      statusCode: 200,
      newAccessToken: expect.any(String),
    },
  },

  TC_AUTH_035: {
    // Error: Refresh token expired
    input: {
      refreshToken: 'expired-refresh-token-xxx',
    },
    expected: {
      success: false,
      statusCode: 401,
      errorMessage: 'Refresh token expired',
    },
  },

  TC_AUTH_036: {
    // Happy path: Logout
    input: {
      token: 'valid-jwt-token-xxx',
    },
    expected: {
      success: true,
      statusCode: 200,
      message: 'Logout successful',
      tokenInvalidated: true,
    },
  },
};

// ============================================================
// AUTHORIZATION TEST DATA
// ============================================================

export const authorizationTestData = {
  TC_AUTH_037: {
    // Happy path: Card owner accessing dashboard
    input: {
      userId: 'test-card-owner-001',
      role: 'card_owner',
      endpoint: '/api/dashboard',
    },
    expected: {
      success: true,
      statusCode: 200,
      hasAccess: true,
    },
  },

  TC_AUTH_038: {
    // Error: User accessing admin endpoint without permission
    input: {
      userId: 'test-user-001',
      role: 'user',
      endpoint: '/api/admin/users',
    },
    expected: {
      success: false,
      statusCode: 403,
      errorMessage: 'Forbidden: Insufficient permissions',
    },
  },

  TC_AUTH_039: {
    // Happy path: Admin accessing admin endpoint
    input: {
      userId: 'test-admin-001',
      role: 'admin',
      endpoint: '/api/admin/users',
    },
    expected: {
      success: true,
      statusCode: 200,
    },
  },

  TC_AUTH_040: {
    // Error: Accessing protected route without token
    input: {
      endpoint: '/api/profile',
      token: null,
    },
    expected: {
      success: false,
      statusCode: 401,
      errorMessage: 'Unauthorized: Token required',
    },
  },
};

// ============================================================
// EXPORT HELPER FUNCTIONS
// ============================================================

/**
 * Lấy test user theo ID
 */
export function getTestUser(userId: keyof typeof validUsers) {
  return validUsers[userId];
}

/**
 * Lấy test data cho một test case cụ thể
 */
export function getTestCaseData(
  type: 'registration' | 'login' | 'oauth' | 'passwordReset' | 'session' | 'authorization',
  caseId: string,
) {
  const dataMap = {
    registration: registrationTestData,
    login: loginTestData,
    oauth: googleOAuthTestData,
    passwordReset: passwordResetTestData,
    session: sessionTestData,
    authorization: authorizationTestData,
  };

  return dataMap[type][caseId as any];
}

/**
 * Tạo test user ngẫu nhiên
 */
export function createRandomTestUser() {
  const randomId = Math.random().toString(36).substring(7);
  return {
    email: `testuser${randomId}@example.com`,
    password: `TestPass${randomId}123!`,
    displayName: `Test User ${randomId}`,
  };
}

/**
 * Reset authentication test data to initial state
 */
export function resetAuthFixtures() {
  // Clear any cached data
  // Reset test accounts
  // Reinitialize database
  return true;
}
