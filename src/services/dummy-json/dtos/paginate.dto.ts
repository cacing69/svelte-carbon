import { z } from 'zod';

export const PaginateSchema= z.object({
	limit: z.number(),
	skip: z.number()
});

export type PaginateDto = z.infer<typeof PaginateSchema>;