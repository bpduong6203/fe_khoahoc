import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { LoginError } from '@/types/auth';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const apis = axios.create({
    baseURL: process.env.NEXT_PUBLIC_IMG_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Hàm dùng cho API cần token
export async function apiFetch<T = unknown>(
    endpoint: string,
    options: AxiosRequestConfig = {}
): Promise<T> {
    const token = localStorage.getItem('token');

    try {
        const response = await api.request<T>({
            url: endpoint,
            ...options,
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...(options.headers || {}),
            },
        });

        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<LoginError>;

        if (axiosError.response?.status === 403) {
            if (typeof window !== 'undefined') {
                window.location.href = '/403';
            }
            throw new Error('Bạn không có quyền truy cập');
        }

        throw new Error(
            axiosError.response?.data?.message || 'Lỗi không xác định'
        ) as LoginError;
    }
}

// Hàm dùng cho API không cần token
export async function fetchApiNoToken<T = unknown>(
    endpoint: string,
    options: AxiosRequestConfig = {}
): Promise<T> {
    try {
        const response = await api.request<T>({
            url: endpoint,
            ...options,
            headers: {
                ...(options.headers || {}), 
            },
        });

        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<LoginError>;

        if (axiosError.response?.status === 403) {
            if (typeof window !== 'undefined') {
                window.location.href = '/403';
            }
            throw new Error('Bạn không có quyền truy cập');
        }

        throw new Error(
            axiosError.response?.data?.message || 'Lỗi không xác định'
        ) as LoginError;
    }
}

// Hàm chuyên để upload file (form-data)
export async function uploadFile(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('image', file);
  
    const token = localStorage.getItem('token');
  
    try {
      const response = await apis.post<{ url: string }>('/cdn/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
  
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<LoginError>;
      throw new Error(
        axiosError.response?.data?.message || 'Lỗi khi upload ảnh'
      );
    }
  }