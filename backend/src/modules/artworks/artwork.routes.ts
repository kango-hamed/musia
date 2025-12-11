import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import { upload } from '../../middlewares/upload.middleware';
import { ArtworkController } from './artwork.controller';

const router = Router();
const artworkController = new ArtworkController();

// Public routes (Read-only) - Optional: make these public so the chatbot can access them easily?
// For now, let's keep them public for ease of development/chatbot access,
// or protected if strict security is needed.
// Plan said "protected for now" for modifications, maybe read is public?
// Let's make read public for the chatbot interaction simulation.

// Public routes (Read-only)
router.get('/', artworkController.findAll);
router.get('/:id', artworkController.findOne);
router.get('/:id/narratives', artworkController.getNarratives);

// Protected routes (Modifications)
router.use(authenticate);
router.post('/', artworkController.create);
router.patch('/:id', artworkController.update);
router.delete('/:id', artworkController.remove);

router.post('/:id/image', upload.single('file'), artworkController.uploadImage);
router.post('/:id/narratives', artworkController.createNarrative);

export default router;
