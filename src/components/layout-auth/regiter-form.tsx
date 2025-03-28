import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { apiFetch } from '@/lib/api';

interface RegisterResponse {
  message: string;
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
}

interface LoginError {
  message: string;
}

const RegisterForm = ({ onSubmit }: { onSubmit?: (email: string, password: string) => void }) => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const data: RegisterResponse = await apiFetch<RegisterResponse>('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name, // Thêm name vào payload
          email,
          password,
        }),
      });

      console.log('Register successful:', data);

      // Lưu token và user vào localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Chuyển hướng về trang chủ
      router.push('/');

      // Gọi callback nếu có
      if (onSubmit) {
        onSubmit(email, password);
      }
    } catch (err) {
      // Xử lý lỗi từ API Laravel
      const errorMessage = (err as any).response?.data?.message || 'Đã xảy ra lỗi khi đăng ký';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && <InputError message={error} />}

      <div>
        <Input
          id="name"
          name="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên của bạn"
          className="w-full"
        />
      </div>

      <div>
        <Input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full"
        />
      </div>

      <div>
        <Input
          id="password"
          name="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mật khẩu"
          className="w-full"
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
      </Button>
    </form>
  );
};

export default RegisterForm;