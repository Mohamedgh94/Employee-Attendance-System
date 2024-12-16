import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
};

export const attendanceApi = {
  checkIn: async (locationId: string) => {
    const response = await api.post('/attendance/check-in', { locationId });
    return response.data;
  },
  checkOut: async (recordId: string) => {
    const response = await api.post(`/attendance/check-out/${recordId}`);
    return response.data;
  },
  getUserRecords: async (userId: string) => {
    const response = await api.get(`/attendance/user/${userId}`);
    return response.data;
  },
  getActiveRecords: async () => {
    const response = await api.get('/attendance/active');
    return response.data;
  },
};