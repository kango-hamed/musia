import { NextFunction, Request, Response } from 'express';

import { AppError } from '../../errors/app-error';
import { ErrorCode } from '../../errors/error-codes';
import { validateId } from '../../utils/validators';
import { createPostSchema } from './dto/create-post.dto';
import { postService } from './post.service';

export const postController = {
  list: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await postService.listPosts();
      res.json(posts);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = validateId(req.params.id, 'Post');
      const post = await postService.getPostById(id);

      if (!post) {
        throw new AppError('Post not found', {
          statusCode: 404,
          code: ErrorCode.NOT_FOUND
        });
      }

      res.json(post);
    } catch (error) {
      next(error);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = createPostSchema.parse(req.body);

      const post = await postService.createPost(payload);
      res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  }
};
