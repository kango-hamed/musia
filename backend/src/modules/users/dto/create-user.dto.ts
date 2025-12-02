import { z } from 'zod';
import { commonSchemas, optionalSchemas } from '../../../utils/validators';

/**
 * Create User DTO
 */
export const createUserSchema = z.object({
  email: commonSchemas.email,
  name: optionalSchemas.name
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
