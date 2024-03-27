import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1';
const api = axios.create({ baseURL: API_URL });

// Helper function to perform API requests
const sendRequest = async (method, url, data = {}, token = '') => {
	const config = {
		method,
		url,
		data,
		...(token && { headers: { Authorization: `Bearer ${token}` } }),
	};
	return api(config);
};

// Authenticate the user
export const loginApi = (email, password) => {
	return sendRequest('post', '/user/login', { email, password });
};

// Retrieve the user's profile details
export const fetchUserProfile = (token) => {
	return sendRequest('post', '/user/profile', {}, token);
};

// Updates the user's profile details
export const updateUserProfileApi = (userData, token) => {
	return sendRequest('put', '/user/profile', userData, token);
};
