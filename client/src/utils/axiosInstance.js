import axios from 'axios';
import useAuthStore from '../store/authStore';

const getBaseUrl = () => {
    let url = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    if (!url.endsWith('/api')) {
        url += '/api';
    }
    return url;
};

const axiosInstance = axios.create({
    baseURL: getBaseUrl(),
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests if available
axiosInstance.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
