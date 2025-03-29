import VideoBackground from "@/components/layout-auth/video-background";
import LoginForm from "@/components/layout-auth/login-form";
import SocialLoginButtons from "@/components/layout-auth/social-login-buttons";
import Heading from "@/components/heading";
import { useState } from "react";
import "@/app/globals.css";
import Link from "next/link";

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleLogin = (email: string, password: string) => {
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gray-100">
      <VideoBackground />
      <div className="w-full p-5 h-full flex items-center justify-center">
        <div className="w-full max-w-md py-8 px-10 flex flex-col justify-center backdrop-filter backdrop-blur-md bg-white/80 rounded-lg shadow-lg">

          <div className="text-center">
            <Heading
              title="Đăng nhập"
              description="Nhập tài khoản và mật khẩu để đăng nhập"
            />
          </div>

          <LoginForm onSubmit={handleLogin} />
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-xs text-gray-500">Hoặc</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <SocialLoginButtons />
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-700">
              Bạn chưa có tài khoản?{' '}
              <Link href="/auth/register" className="text-blue-600 hover:underline">
                Đăng ký
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
