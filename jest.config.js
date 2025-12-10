export default {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: [
    'api/**/*.js',
    'agents/**/*.js',
    '!**/node_modules/**',
    '!**/dist/**'
  ],
  moduleFileExtensions: ['js', 'json'],
  transform: {},
};
