/**
 * API Client
 * Base Axios instance with configuration and interceptors
 */

import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import { API_CONFIG } from '@/constants/museum';

// Create base API instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create NLP API instance
export const nlpClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.nlpURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging and token injection
apiClient.interceptors.request.use(
  (config) => {
    // Add timestamp for debugging
    if (API_CONFIG.baseURL.includes('localhost')) {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    }

    // Add auth token if available (from localStorage or cookie)
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Try to refresh token
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${API_CONFIG.baseURL}/auth/refresh`, {
            refreshToken,
          });

          const { accessToken } = response.data;
          localStorage.setItem('auth_token', accessToken);

          // Retry original request
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, logout user
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    }

    // Log error
    console.error('[API Error]', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data,
    });

    return Promise.reject(error);
  }
);

// NLP client interceptors
nlpClient.interceptors.request.use(
  (config) => {
    if (API_CONFIG.nlpURL.includes('localhost')) {
      console.log(`[NLP] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

nlpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error('[NLP Error]', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

// Retry helper function
export async function retryRequest<T>(
  requestFn: () => Promise<T>,
  retries: number = API_CONFIG.retries,
  delay: number = API_CONFIG.retryDelay
): Promise<T> {
  try {
    return await requestFn();
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return retryRequest(requestFn, retries - 1, delay * 2); // Exponential backoff
    }
    throw error;
  }
}

// Error response type
export interface APIError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  requestId?: string;
}

// Check if error is API error
export function isAPIError(error: unknown): error is AxiosError<APIError> {
  return axios.isAxiosError(error) && error.response?.data?.success === false;
}

// Extract error message
export function getErrorMessage(error: unknown): string {
  if (isAPIError(error)) {
    return error.response?.data.error.message || 'An error occurred';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unknown error occurred';
}
