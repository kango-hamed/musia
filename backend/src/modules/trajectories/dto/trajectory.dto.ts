import { z } from 'zod';

const createTrajectoryStepSchema = z.object({
  artworkId: z.cuid('Invalid artwork ID'),
  narrativeContentId: z.cuid('Invalid narrative content ID').optional(),
  stepOrder: z.number().int().min(1, 'Step order must be positive'),
  stopDuration: z.number().int().optional().default(0), // Time in seconds
  positionX: z.number().optional(), // Providing for future proofing
  positionY: z.number().optional()
});

export const createTrajectorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  theme: z.string().optional(),
  estimatedDuration: z.number().int().optional().default(0), // Minutes
  difficultyLevel: z.string().default('all'), // "kids", "expert", "all"
  maxVisitors: z.number().int().optional(),
  steps: z.array(createTrajectoryStepSchema).optional().default([])
});

export const updateTrajectorySchema = createTrajectorySchema.partial();

export type CreateTrajectoryDto = z.infer<typeof createTrajectorySchema>;
export type UpdateTrajectoryDto = z.infer<typeof updateTrajectorySchema>;
