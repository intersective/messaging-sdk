'use strict';
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['lcov', 'text', 'html'],
  // testResultsProcessor: 'jest-sonar-reporter',
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
  coverageDirectory: 'coverage/',
};
