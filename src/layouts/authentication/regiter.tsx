import VideoBackground from "@/components/layout-auth/video-background";
import RegisterForm from "@/components/layout-auth/regiter-form";
import SocialLoginButtons from "@/components/layout-auth/social-login-buttons";
import Heading from "@/components/heading";
import { useState } from "react";
import "@/app/globals.css";
import Link from "next/link";

const Register = () => {
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
              title="Đăng Ký"
              description="Vui lòng nhập các thông tin bên dưới"
            />
          </div>

          <RegisterForm onSubmit={handleLogin} />
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-xs text-gray-500">Hoặc</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <SocialLoginButtons />
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-700">
              Bạn chưa có tài khoản?{' '}
              <Link href="/auth/login" className="text-blue-600 hover:underline">
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
