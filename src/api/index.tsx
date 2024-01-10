import axios from 'axios';

const api = axios.create({
	baseURL: 'https://recruitment-test.gltkdev.com',
});

export default api;
