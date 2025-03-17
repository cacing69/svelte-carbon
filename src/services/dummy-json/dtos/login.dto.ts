import { z } from 'zod';

export const LoginSchema = z.object({
	username: z.string().min(6),
	password: z.string().min(6),
})

export type LoginDto = z.infer<typeof LoginSchema>;

export interface LoginResponseDto {
	id: number;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	gender: string;
	image: string;
	accessToken: string;
	refreshToken: string;
}
