interface User {
  id: number;
  name: string;
  avatar: string | null;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

interface LoginError {
  message: string;
}

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("token");
  const url = `${baseUrl}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Lỗi không xác định") as LoginError;
  }

  return response.json() as Promise<T>;
}