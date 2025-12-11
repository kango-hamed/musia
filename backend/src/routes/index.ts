import { Router } from 'express';

import { artworkRouter } from '../modules/artworks';
import { authRouter } from '../modules/auth';
import { narrativeRouter } from '../modules/narrative-content';

const router = Router();

router.use('/auth', authRouter);
router.use('/artworks', artworkRouter);
router.use('/narratives', narrativeRouter);

export { router as routes };
