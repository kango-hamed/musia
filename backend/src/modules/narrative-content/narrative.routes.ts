import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import { upload } from '../../middlewares/upload.middleware';
import { NarrativeController } from './narrative.controller';

const router = Router();
const narrativeController = new NarrativeController();

// Public routes (Read-only) - Chatbot needs to read these
router.get('/', narrativeController.findAll);
router.get('/:id', narrativeController.findOne);

// Protected routes (Modifications)
router.use(authenticate);
router.post('/', narrativeController.create);
router.patch('/:id', narrativeController.update);
router.delete('/:id', narrativeController.remove);
router.post('/:id/audio', upload.single('file'), narrativeController.uploadAudio);

export default router;
