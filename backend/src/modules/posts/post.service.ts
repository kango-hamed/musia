import type { Prisma } from '../../../generated/prisma/client';

import { prisma } from '../../database/prisma';

export type CreatePostInput = Pick<Prisma.PostCreateInput, 'title' | 'content'> & {
  authorId: string;
};

class PostService {
  async listPosts() {
    return prisma.post.findMany({
      include: { author: true }
    });
  }

  async getPostById(id: string) {
    return prisma.post.findUnique({
      where: { id },
      include: { author: true }
    });
  }

  async createPost({ title, content, authorId }: CreatePostInput) {
    return prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: { id: authorId }
        }
      },
      include: { author: true }
    });
  }
}

export const postService = new PostService();
