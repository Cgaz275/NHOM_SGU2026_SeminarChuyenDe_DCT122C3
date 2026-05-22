/**
 * Jest Setup File
 * 
 * Runs before each test suite
 * - Initialize test database
 * - Setup test utilities
 * - Configure mock data
 */

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
process.env.FIREBASE_STORAGE_EMULATOR_HOST = 'localhost:9199';

// Global test timeout
jest.setTimeout(10000);

// Mock console in test mode (optional)
// global.console = {
//   ...console,
//   log: jest.fn(),
//   warn: jest.fn(),
//   error: jest.fn(),
// };

console.log('✓ Jest test environment initialized');
