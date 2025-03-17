import type { LoginDto } from './dtos/login.dto';
import dummyJsonHttp from '../../http/dummy-json.http';


const path = 'auth';

export const postLogin = async (payload: LoginDto) => {
	const { data } = await dummyJsonHttp.post(`${path}/login`, payload);

	return data;
};

export const postRefresh = async () => {
    const { data } = await dummyJsonHttp.post(`${path}/refresh`, {
        refreshToken: localStorage.getItem('refreshToken'),
        expiresInMins: 30,
    });

	return data;
};

export const getMe = async () => {
	const { data } = await dummyJsonHttp.get(`${path}/me`);

	return data;
};
