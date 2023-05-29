import axios from 'axios';
const API_BASE = 'https://nf-api.onrender.com/api/v1/holidaze';

const USER_KEY = 'user';

export const getStoredUsername = () => {
  const user = JSON.parse(localStorage.getItem(USER_KEY));
  return user?.name || null;
};

export const getStoredObj = () => {
  const user = localStorage.getItem(USER_KEY);
  return JSON.parse(user);
};

export const getStoredToken = () => {
  const user = JSON.parse(localStorage.getItem(USER_KEY));
  return user?.token || null;
};

const instance = axios.create({
  baseURL: API_BASE,
});

instance.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
};
