import type { Prisma } from '../../../generated/prisma/client';

import { prisma } from '../../database/prisma';

export type CreateUserInput = Pick<Prisma.UserCreateInput, 'email' | 'name'>;

class UserService {
  async listUsers() {
    return prisma.user.findMany({
      include: { posts: true }
    });
  }

  async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: { posts: true }
    });
  }

  async createUser(data: CreateUserInput) {
    return prisma.user.create({ data });
  }
}

export const userService = new UserService();
