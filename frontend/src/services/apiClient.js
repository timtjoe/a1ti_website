// src/services/apiClient.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/v1',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 204) return {};
    const body = response.data;
    if (body && typeof body === 'object' && 'data' in body) {
      if ('meta' in body) return body;
      return body.data;
    }
    return body;
  },
  (error) => {
    const status = error.response?.status;
    const errorBody = error.response?.data;
    const appErr = new Error('An unexpected error occurred');
    appErr.status = status;

    const errorType = errorBody?.type
      ? errorBody.type.split('/').pop()?.toUpperCase().replace(/-/g, '_')
      : null;
    appErr.code = errorType || status || 'UNKNOWN_ERR';

    if (Array.isArray(errorBody?.errors)) {
      appErr.errors = errorBody.errors;
    }

    if (!status) {
      appErr.message = 'Network Error: Unable to connect to server.';
    } else {
      appErr.message =
        errorBody?.meta?.detail ||
        errorBody?.detail ||
        errorBody?.message ||
        'Request could not be processed.';
    }

    return Promise.reject(appErr);
  }
);

class ApiClient {
  get(endpoint, config) {
    return axiosInstance.get(endpoint, config);
  }
  post(endpoint, data, config) {
    return axiosInstance.post(endpoint, data, config);
  }
  put(endpoint, data, config) {
    return axiosInstance.put(endpoint, data, config);
  }
  patch(endpoint, data, config) {
    return axiosInstance.patch(endpoint, data, config);
  }
  delete(endpoint, config) {
    return axiosInstance.delete(endpoint, config);
  }
}

export const apiClient = new ApiClient();
