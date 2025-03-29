import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { apiFetch } from '@/lib/api';
import { LoginResponse, LoginError } from '@/types/auth';

const LoginForm = ({ onSubmit }: { onSubmit?: (email: string, password: string) => void }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false); // State cho checkbox
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const data = await apiFetch<LoginResponse>('/login', {
        method: 'POST',
        data: { email, password },
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      if (data.user.roles.includes('admin')) {
        router.push('/dashboard'); 
      } else if (data.user.roles.includes('user')) {
        router.push('/');
      } else {
        setError('Không có vai trò hợp lệ');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/auth/login');
      }

      if (onSubmit) {
        onSubmit(email, password);
      }
    } catch (err) {
      setError((err as LoginError).message || 'Đã xảy ra lỗi khi đăng nhập');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterClick = () => {
    router.push("/auth/register"); // Chuyển hướng đến trang đăng ký
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && <InputError message={error} />}

      <Input
        id="email"
        name="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Tài khoản"
      />

      <Input
        id="password"
        name="password"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mật khẩu"
      />

      {/* Checkbox "Ghi nhớ tôi" và nút "Quên mật khẩu?" */}
      <div className="flex justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="remember-me" className="text-xs">
            Ghi nhớ tôi
          </label>
        </div>
        <button
          type="button" // Không submit form
          className="text-xs text-blue-600 hover:underline"
          onClick={() => alert("Chức năng quên mật khẩu đang được phát triển!")} // Placeholder
        >
          Quên mật khẩu?
        </button>
      </div>

      {/* Nút Đăng nhập */}
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </Button>

      {/* Nút Đăng ký tài khoản */}
      <div className="text-center">
        <button
          type="button" // Không submit form
          className="text-xs text-blue-600 hover:underline"
          onClick={handleRegisterClick}
        >
          Đăng ký tài khoản
        </button>
      </div>
    </form>
  );
};

export default LoginForm;