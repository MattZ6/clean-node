module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/data/usecases/**/*.ts',
    '<rootDir>/src/utils/**/*.ts',
    '<rootDir>/src/presentation/controllers/**/*.ts',
    '<rootDir>/src/infra/**/*.ts',
    '!<rootDir>/src/**/*.protocols.ts',
    '!<rootDir>/src/**/*.types.ts',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
};
