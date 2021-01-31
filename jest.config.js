module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/data/usecases/**/*.ts',
    '!<rootDir>/src/data/usecases/**/*.protocols.ts',
    '<rootDir>/src/utils/**/*.ts',
    '<rootDir>/src/presentation/controllers/**/*.ts',
    '!<rootDir>/src/presentation/controllers/**/*.protocols.ts',
    '<rootDir>/src/infra/**/*.ts',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
};
