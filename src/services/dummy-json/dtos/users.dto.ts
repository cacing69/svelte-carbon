import { z } from 'zod';

export const CoordinatesSchema = z.object({
	lat: z.number(),
	lng: z.number()
});

export const AddressSchema = z.object({
	address: z.string(),
	city: z.string(),
	state: z.string(),
	stateCode: z.string(),
	postalCode: z.string(),
	coordinates: CoordinatesSchema,
	country: z.string()
});

export const HairSchema = z.object({
	color: z.string(),
	type: z.string()
});

export const BankSchema = z.object({
	cardExpire: z.string(),
	cardNumber: z.string(),
	cardType: z.string(),
	currency: z.string(),
	iban: z.string()
});

export const CompanySchema = z.object({
	department: z.string(),
	name: z.string(),
	title: z.string(),
	address: AddressSchema
});

export const CryptoSchema = z.object({
	coin: z.string(),
	wallet: z.string(),
	network: z.string()
});

export const UserSchema = z.object({
	id: z.number(),
	firstName: z.string(),
	lastName: z.string(),
	maidenName: z.string(),
	age: z.number(),
	gender: z.string(),
	email: z.string(),
	phone: z.string(),
	username: z.string(),
	password: z.string(),
	birthDate: z.string(),
	image: z.string(),
	bloodGroup: z.string(),
	height: z.number(),
	weight: z.number(),
	eyeColor: z.string(),
	hair: HairSchema,
	ip: z.string(),
	address: AddressSchema,
	macAddress: z.string(),
	university: z.string(),
	bank: BankSchema,
	company: CompanySchema,
	ein: z.string(),
	ssn: z.string(),
	userAgent: z.string(),
	crypto: CryptoSchema,
	role: z.enum(['admin', 'moderator', 'user']),
	isDeleted: z.boolean(),
	deletedOn: z.string().datetime()
});

export const UsersResponseSchema = z.object({
	users: z.array(UserSchema),
	total: z.number(),
	skip: z.number(),
	limit: z.number()
});

export type UserResponse = z.infer<typeof UserSchema>;

export type Coordinates = z.infer<typeof CoordinatesSchema>;
export type Address = z.infer<typeof AddressSchema>;
export type Hair = z.infer<typeof HairSchema>;
export type Bank = z.infer<typeof BankSchema>;
export type Company = z.infer<typeof CompanySchema>;
export type Crypto = z.infer<typeof CryptoSchema>;
export type User = z.infer<typeof UserSchema>;

export type UsersResponse = z.infer<typeof UsersResponseSchema>;
