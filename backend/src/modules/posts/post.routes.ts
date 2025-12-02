import { Router } from 'express';

import { postController } from './post.controller';

const router = Router();

router.get('/', postController.list);
router.get('/:id', postController.getById);
router.post('/', postController.create);

export { router as postRoutes };
