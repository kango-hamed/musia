import { beforeEach, describe, expect, it } from '@jest/globals';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import { app } from '../../src/app';
import { prismaMock } from '../prisma-mock';

describe('Auth Integration Tests', () => {
  const mockUser = {
    id: 'user-123',
    email: 'test@example.com',
    name: 'Test User',
    password: 'hashedpassword',
    role: 'viewer' as const,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      // Mock finding existing user (null = user does not exist)
      prismaMock.user.findUnique.mockResolvedValue(null);

      // Mock bcrypt.hash to return a predictable hash
      const hashedPassword = await bcrypt.hash('password123', 10);

      // Mock creating user
      prismaMock.user.create.mockResolvedValue({
        ...mockUser,
        password: hashedPassword
      });

      const res = await request(app).post('/api/auth/register').send({
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123'
      });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user.email).toBe('test@example.com');
      expect(res.body.data.accessToken).toBeDefined();
    });

    it('should return error if user already exists', async () => {
      // Mock finding existing user (found)
      prismaMock.user.findUnique.mockResolvedValue(mockUser);

      const res = await request(app).post('/api/auth/register').send({
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123'
      });

      expect(res.status).toBeGreaterThanOrEqual(400);
      expect(res.body.success).toBe(false);
    });

    it('should return 400 for missing required fields', async () => {
      const res = await request(app).post('/api/auth/register').send({
        email: 'test@example.com'
        // missing name and password
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login successfully with valid credentials', async () => {
      // Create a real bcrypt hash for testing
      const realBcryptHash = await bcrypt.hash('password123', 10);

      prismaMock.user.findUnique.mockResolvedValue({
        ...mockUser,
        password: realBcryptHash
      });

      const res = await request(app).post('/api/auth/login').send({
        email: 'test@example.com',
        password: 'password123'
      });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.accessToken).toBeDefined();
      expect(res.body.data.refreshToken).toBeDefined();
      expect(res.body.data.user).toBeDefined();
      expect(res.body.data.user.email).toBe('test@example.com');
    });

    it('should fail with invalid password', async () => {
      const realBcryptHash = await bcrypt.hash('password123', 10);

      prismaMock.user.findUnique.mockResolvedValue({
        ...mockUser,
        password: realBcryptHash
      });

      const res = await request(app).post('/api/auth/login').send({
        email: 'test@example.com',
        password: 'wrongpassword'
      });

      expect(res.status).toBeGreaterThanOrEqual(400);
      expect(res.body.success).toBe(false);
    });

    it('should fail with non-existent user', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      const res = await request(app).post('/api/auth/login').send({
        email: 'nonexistent@example.com',
        password: 'password123'
      });

      expect(res.status).toBeGreaterThanOrEqual(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /api/auth/refresh', () => {
    it('should refresh token with valid refresh token', async () => {
      const refreshToken = jwt.sign(
        { userId: 'user-123' },
        process.env.JWT_REFRESH_SECRET || 'refresh_secret',
        { expiresIn: '7d' }
      );

      prismaMock.user.findUnique.mockResolvedValue(mockUser);

      const res = await request(app).post('/api/auth/refresh').send({ refreshToken });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.accessToken).toBeDefined();
    });

    it('should fail with invalid refresh token', async () => {
      const res = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken: 'invalid-token' });

      expect(res.status).toBeGreaterThanOrEqual(400);
      expect(res.body.success).toBe(false);
    });

    it('should fail with missing refresh token', async () => {
      const res = await request(app).post('/api/auth/refresh').send({});

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
});
