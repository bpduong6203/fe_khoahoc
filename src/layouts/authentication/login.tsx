import VideoBackground from "@/components/layout-auth/video-background";
import AuthImageSection from "@/components/layout-auth/authImage-section";
import LoginForm from "@/components/layout-auth/login-form";
import SocialLoginButtons from "@/components/layout-auth/social-login-buttons";
import Heading from "@/components/heading";
import { useState } from "react";
import "@/app/globals.css";

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleLogin = (email: string, password: string) => {
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <VideoBackground />
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      <div className="w-full max-w-5xl flex backdrop-filter backdrop-blur-lg bg-white/5 rounded-xl shadow-2xl overflow-hidden z-20">
        <AuthImageSection />
        <div className="w-1/2 py-6 px-12 flex flex-col justify-center backdrop-filter backdrop-blur-sm bg-white/60">
          <Heading title="Đăng nhập" description="Nhập tài khoản và mật khẩu để đăng nhập" />
          <LoginForm onSubmit={handleLogin} /> 
          <div className="my-4 flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="px-4 text-xs text-gray-500">Hoặc</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          <SocialLoginButtons />
        </div>
      </div>
    </div>
  );
};

export default Login;