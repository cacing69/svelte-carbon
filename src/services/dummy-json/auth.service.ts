import type { LoginDto, LoginResponse } from './dtos/login.dto';
import dummyJsonHttp from '../../http/dummy-json.http';


const path = 'auth';

export const login = async (payload: LoginDto): Promise<LoginResponse> => {
	const { data } = await dummyJsonHttp.post(`${path}/login`, payload);

	return data;
};

export const refresh = async () => {
    const { data } = await dummyJsonHttp.post(`${path}/refresh`, {
        refreshToken: localStorage.getItem('refreshToken'),
        expiresInMins: 30,
    });

	return data;
};

export const profile = async () => {
	const { data } = await dummyJsonHttp.get(`${path}/me`);

	return data;
};
