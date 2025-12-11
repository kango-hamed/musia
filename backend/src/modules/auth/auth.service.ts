import { env } from '../../config/env';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../database/prisma';
import {
  ForgotPasswordDto,
  LoginDto,
  RefreshTokenDto,
  RegisterDto,
  ResetPasswordDto
} from './dto/auth.dto';

export class AuthService {
  private generateTokens(userId: string, role: string) {
    const accessToken = jwt.sign({ userId, role }, env.JWT_SECRET, {
      expiresIn: '15m'
    });

    const refreshToken = jwt.sign({ userId }, env.JWT_REFRESH_SECRET, {
      expiresIn: '7d'
    });

    return { accessToken, refreshToken };
  }

  async register(data: RegisterDto) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
        role: 'viewer' // Default role for safety
      }
    });

    const tokens = this.generateTokens(user.id, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      ...tokens
    };
  }

  async login(data: LoginDto) {
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const tokens = this.generateTokens(user.id, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      ...tokens
    };
  }

  async refreshToken(data: RefreshTokenDto) {
    try {
      const payload = jwt.verify(data.refreshToken, env.JWT_REFRESH_SECRET) as { userId: string };

      const user = await prisma.user.findUnique({
        where: { id: payload.userId }
      });

      if (!user) {
        throw new Error('User not found');
      }

      const tokens = this.generateTokens(user.id, user.role);

      return tokens;
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  async logout() {
    return { success: true };
  }

  async forgotPassword(data: ForgotPasswordDto) {
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (!user) {
      return { success: true };
    }

    const resetToken = jwt.sign({ userId: user.id, type: 'reset' }, env.JWT_SECRET, {
      expiresIn: '1h'
    });

    // In production: await emailService.sendResetEmail(user.email, resetToken);
    console.log(`Reset token for ${user.email}: ${resetToken}`);

    return { success: true };
  }

  async resetPassword(data: ResetPasswordDto) {
    try {
      const payload = jwt.verify(data.token, env.JWT_SECRET) as {
        userId: string;
        type: string;
      };

      if (payload.type !== 'reset') {
        throw new Error('Invalid token type');
      }

      const hashedPassword = await bcrypt.hash(data.newPassword, 10);

      await prisma.user.update({
        where: { id: payload.userId },
        data: { password: hashedPassword }
      });

      return { success: true };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || 'Invalid or expired reset token');
      }
      throw new Error('Invalid or expired reset token');
    }
  }
}
