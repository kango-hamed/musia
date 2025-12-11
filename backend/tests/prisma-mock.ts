import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
// Mock the prisma module before importing
jest.mock('../src/database/prisma', () => ({
  __esModule: true,
  prisma: mockDeep<PrismaClient>()
}));

// Import the mocked prisma instance
import { prisma } from '../src/database/prisma';
import { beforeEach } from 'node:test';

// Reset mocks before each test
beforeEach(() => {
  mockReset(prismaMock);
});

// Export the typed mock
export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
