import { Router } from 'express';

import { postRoutes } from '../modules/posts/post.routes';
import { userRoutes } from '../modules/users/user.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

export { router as routes };
