import { z } from 'zod';

export const createArtworkSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  title: z.string().min(1, 'Title is required'),
  artist: z.string().optional(),
  description: z.string().optional(),
  period: z.string().optional(),
  style: z.string().optional(),
  collection: z.string().optional(),
  positionX: z.number().optional(),
  positionY: z.number().optional(),
  floor: z.number().int().default(0),
  room: z.string().optional(),
  orientation: z.number().default(0),
  imageUrl: z.url().optional().or(z.literal(''))
});

export const updateArtworkSchema = createArtworkSchema.partial();

export type CreateArtworkDto = z.infer<typeof createArtworkSchema>;
export type UpdateArtworkDto = z.infer<typeof updateArtworkSchema>;
