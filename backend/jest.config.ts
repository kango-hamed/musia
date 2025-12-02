import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  moduleFileExtensions: ['js', 'ts', 'json'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts']
};

export default config;
