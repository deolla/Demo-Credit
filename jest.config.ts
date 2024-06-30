// this file is used to configure jest for typescript
// it tells jest to use ts-jest to compile typescript files
// it also tells jest to use the tsconfig.json file for configuration
// it tells jest to use the setup.ts file for setup
// it tells jest to use the test folder for tests
// it also tells jest to use the test environment node

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  roots: ['<rootDir>/test'],
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/test/**/*.test.ts'],
  setupFilesAfterEnv: ['./test/setup.ts'],
  testTimeout: 30000,
  verbose: true,
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
