import { writable } from 'svelte/store';

export const isAuthenticated = writable<boolean>(false);

export const checkAuth = () => {
	const token = localStorage.getItem('accessToken');
	isAuthenticated.set(!!token);
	return !!token;
};
