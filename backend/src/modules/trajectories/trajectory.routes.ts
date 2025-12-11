import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import { TrajectoryController } from './trajectory.controller';

const router = Router();
const trajectoryController = new TrajectoryController();

// Public routes (Read-only for Chatbot)
router.get('/', trajectoryController.findAll);
router.get('/:id', trajectoryController.findOne);

// Protected routes (Modifications)
router.use(authenticate);
router.post('/', trajectoryController.create);
router.patch('/:id', trajectoryController.update);
router.delete('/:id', trajectoryController.remove);

export default router;
