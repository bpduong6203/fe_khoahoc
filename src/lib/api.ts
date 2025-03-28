import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { LoginResponse, LoginError } from '@/types/auth';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function apiFetch<T = any>(
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
    throw new Error(
      axiosError.response?.data?.message || 'Lỗi không xác định'
    ) as LoginError;
  }
}