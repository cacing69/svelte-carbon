
import dummyJsonHttp from '../../http/dummy-json.http';
import type { UsersResponse } from './dtos/users.dto';

const path = 'users';

export const getUsers = async (queryParams: unknown = {}): Promise<UsersResponse> => {
	const { data } = await dummyJsonHttp.get(`${path}`, {params: queryParams});

	return data;
};

export const searchUsers = async (queryParams: unknown = {}): Promise<UsersResponse> => {
	const { data } = await dummyJsonHttp.get(`${path}/search`, { params: queryParams });

	return data;
};
