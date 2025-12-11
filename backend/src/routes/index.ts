import { Router } from 'express';

import { artworkRouter } from '../modules/artworks';
import { authRouter } from '../modules/auth';

const router = Router();

router.use('/auth', authRouter);
router.use('/artworks', artworkRouter);

export { router as routes };
