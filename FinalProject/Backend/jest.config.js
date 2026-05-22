/**
 * Jest Configuration
 * 
 * Configure Jest for Backend API testing
 */

module.exports = {
  displayName: 'Backend Tests',
  testEnvironment: 'node',

  // Test files pattern
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],

  // Setup files
  globalSetup: '<rootDir>/tests/setup.js',
  // globalTeardown: '<rootDir>/tests/teardown.js',

  // Setup test database before each file
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.js'],

  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/index.js',
  ],
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  // Test timeout (default: 5000ms)
  testTimeout: 10000,

  // Verbose output
  verbose: true,

  // Module paths
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // Transform files
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },

  // Bail on first test failure (optional)
  // bail: 1,

  // Detect open handles (useful for debugging)
  detectOpenHandles: true,

  // Notification of test results
  notify: false,
};
