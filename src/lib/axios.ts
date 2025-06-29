import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, 
  withCredentials: false,       //  کوکی و سشن  
  headers: {
    'Content-Type': 'application/json',
  },
});

// ‌اتچِ توکن به هدر و هندلِ خطا
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined'
    ? localStorage.getItem('token')
    : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      // logout()
    }
    return Promise.reject(error);
  },
);

export default api;
