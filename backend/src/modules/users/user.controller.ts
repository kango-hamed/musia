import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../errors/app-error';
import { ErrorCode } from '../../errors/error-codes';
import { validateId } from '../../utils/validators';
import { createUserSchema } from './dto/create-user.dto';
import { userService } from './user.service';

export const userController = {
  list: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userService.listUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = validateId(req.params.id, 'User');
      const user = await userService.getUserById(id);

      if (!user) {
        throw new AppError('User not found', {
          statusCode: 404,
          code: ErrorCode.NOT_FOUND
        });
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = createUserSchema.parse(req.body);
      const user = await userService.createUser(payload);

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
};
