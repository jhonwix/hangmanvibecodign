// Test setup file
// This file runs before all tests

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '5432';
process.env.DB_USER = 'hangman_user';
process.env.DB_PASSWORD = 'hangman_pass';
process.env.DB_NAME = 'hangman_test_db';

// Global test timeout
jest.setTimeout(10000);

// Mock console methods to reduce noise in tests (optional)
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
