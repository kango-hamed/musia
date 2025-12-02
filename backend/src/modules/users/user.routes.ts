import { Router } from 'express';

import { userController } from './user.controller';

const router = Router();

router.get('/', userController.list);
router.get('/:id', userController.getById);
router.post('/', userController.create);

export { router as userRoutes };
