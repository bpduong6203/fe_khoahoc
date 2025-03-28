export interface User {
  id: number;
  name: string;
  avatar: string | null;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  token: string;
  user: User;
}

export interface SocialLoginResponse {
  url: string;
}

export interface LoginError {
  message: string;
}