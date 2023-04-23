module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testMatch: [
    '<rootDir>/src/**/*.spec.ts'
  ],
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/app/$1'
  },
  setupFilesAfterEnv: [
    '<rootDir>/src/setup-jest.ts'
  ],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json'
    }
  },
  coverageReporters: [
    'lcovonly',
    'text-summary'
  ],
  collectCoverageFrom: [
    '<rootDir>/src/app/**/*.ts'
  ],
};
