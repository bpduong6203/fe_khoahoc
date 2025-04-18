import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { apiFetch } from '@/lib/api';
import { LoginResponse, LoginError } from '@/types/auth';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import Link from 'next/link';

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
      <div className="mt-6 text-center p-2">
        <div className="flex justify-between items-center text-sm text-gray-700">
          <div className="flex items-center">
            <Checkbox
              id="remember-me"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(!!checked)}
              className="mr-2"
            />
            <Label htmlFor="remember-me">Ghi nhớ tôi</Label>
          </div>

          <Link href="/auth/forgotpassword" className="text-blue-600 hover:underline">
            Quên mật khẩu?
          </Link>
        </div>
      </div>


      {/* Nút Đăng nhập */}
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </Button>
    </form>
  );
};

export default LoginForm;