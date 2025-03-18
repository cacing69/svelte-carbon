export let isAuthenticated = $state(false);
export const checkAuth = () => {
	const token = localStorage.getItem('accessToken');
	isAuthenticated = !!token;
	return !!token;
};
