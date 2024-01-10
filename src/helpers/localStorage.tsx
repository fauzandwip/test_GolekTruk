export const setToken = (access_token: string) => {
	localStorage.setItem('access_token', access_token);
};

export const getToken = (): string | null => {
	return localStorage.getItem('access_token');
};
