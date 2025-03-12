import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu không khớp');
      setIsLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/login');
    } catch (err) {
      setError('Đăng ký thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Đăng ký | My App</title>
      </Head>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://img.upanh.tv/2025/03/12/cubic-pixel-game-level-background-frame-vector.jpg')" }}
      >
        <div 
          className="w-full max-w-5xl flex backdrop-filter backdrop-blur-md bg-white/5 rounded-xl shadow-2xl overflow-hidden"
          style={{ transform: 'scale(0.85)' }}
        >
          <div className="w-1/2 py-6 px-12 flex flex-col justify-center backdrop-filter backdrop-blur-sm bg-white/60">
            <h1 className="text-2xl font-semibold mb-1">
              Chào mừng đăng ký! <span role="img" aria-label="wave">👋</span>
            </h1>
            <p className="text-sm text-gray-700 mb-6">
              Điền thông tin để tạo tài khoản mới
            </p>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Username Field */}
              <div className="relative">
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="w-full px-3 py-2 bg-white/70 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 peer"
                  value={formData.username}
                  onChange={handleChange}
                  onFocus={() => setIsUsernameFocused(true)}
                  onBlur={() => setIsUsernameFocused(false)}
                />
                <label 
                  htmlFor="username"
                  className={`absolute left-3 text-sm text-gray-700 bg-white/5 px-1 transition-all duration-200
                    ${(isUsernameFocused || formData.username) ? '-top-4 text-xs' : 'top-2 text-sm'}`}
                >
                  Tên người dùng
                </label>
              </div>

              {/* Email Field */}
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 bg-white/70 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 peer"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                />
                <label 
                  htmlFor="email"
                  className={`absolute left-3 text-sm text-gray-700 bg-white/5 px-1 transition-all duration-200
                    ${(isEmailFocused || formData.email) ? '-top-4 text-xs' : 'top-2 text-sm'}`}
                >
                  Email
                </label>
              </div>

              {/* Password Field */}
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-3 py-2 bg-white/70 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 peer"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                />
                <label 
                  htmlFor="password"
                  className={`absolute left-3 text-sm text-gray-700 bg-white/5 px-1 transition-all duration-200
                    ${(isPasswordFocused || formData.password) ? '-top-4 text-xs' : 'top-2 text-sm'}`}
                >
                  Mật khẩu
                </label>
              </div>

              {/* Confirm Password Field */}
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="w-full px-3 py-2 bg-white/70 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 peer"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => setIsConfirmPasswordFocused(true)}
                  onBlur={() => setIsConfirmPasswordFocused(false)}
                />
                <label 
                  htmlFor="confirmPassword"
                  className={`absolute left-3 text-sm text-gray-700 bg-white/5 px-1 transition-all duration-200
                    ${(isConfirmPasswordFocused || formData.confirmPassword) ? '-top-4 text-xs' : 'top-2 text-sm'}`}
                >
                  Nhập lại mật khẩu
                </label>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 text-white rounded-md focus:outline-none ${
                  isLoading ? 'bg-gray-600' : 'bg-gray-800 hover:bg-gray-900'
                }`}
              >
                {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
              </Button>
            </form>

            <div className="my-4 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-xs text-gray-500">Hoặc</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="space-y-2">
              <Button
                type="button"
                className="w-full flex items-center justify-center py-2 px-4 bg-white/70 border border-gray-200 rounded-md hover:bg-white/90 text-gray-800"
              >
                <FaGoogle className="text-red-500 mr-2" size={16} />
                <span className="text-sm">Đăng nhập với Google</span>
              </Button>
              <Button
                type="button"
                className="w-full flex items-center justify-center py-2 px-4 bg-white/70 border border-gray-200 rounded-md hover:bg-white/90 text-gray-800"
              >
                <FaFacebook className="text-blue-600 mr-2" size={16} />
                <span className="text-sm">Đăng nhập với Facebook</span>
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-700">
                Bạn đã có tài khoản?{' '}
                <Link href="http://localhost:3000/auth/login" className="text-blue-600 hover:underline">
                  Đăng nhập
                </Link>
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">© 2025 BIBON DESIGNER</p>
            </div>
          </div>

          <div className="w-1/2">
            <div className="w-full h-full relative">
              <Image
                src="https://img.upanh.tv/2025/03/12/1353838.png"
                alt="Floral still life"
                layout="fill"
                objectFit="cover"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;