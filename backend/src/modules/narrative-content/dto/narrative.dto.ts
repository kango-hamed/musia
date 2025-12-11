import { z } from 'zod';

export const createNarrativeSchema = z.object({
  artworkId: z.string().cuid('Invalid artwork ID'),
  version: z.string().default('standard'), // "standard", "kids", "expert"
  language: z.string().default('fr'),
  textContent: z.string().min(1, 'Text content is required'),
  audioUrl: z.url().optional().or(z.literal('')),
  duration: z.number().int().optional()
});

export const updateNarrativeSchema = createNarrativeSchema.partial().omit({ artworkId: true }); // Cannot change which artwork it belongs to

export type CreateNarrativeDto = z.infer<typeof createNarrativeSchema>;
export type UpdateNarrativeDto = z.infer<typeof updateNarrativeSchema>;
