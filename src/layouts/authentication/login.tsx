import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import "../../app/globals.css";
import ForgotPasswordModal from "@/components/ForgotPasswordModal"; 
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DarkModeToggle from '@/components/dark-mode-toggle';
import { Card, CardTitle } from '@/components/ui/card';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false); // State để mở/đóng modal

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/dashboard");
    } catch (err) {
      setError("Email hoặc mật khẩu không hợp lệ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Đăng nhập | My App</title>
      </Head>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://img.upanh.tv/2025/03/12/cubic-pixel-game-level-background-frame-vector.jpg')" }}
      >
        <div
          className="w-full max-w-5xl flex backdrop-filter backdrop-blur-lg bg-white/5 rounded-xl shadow-2xl overflow-hidden"
          style={{ transform: "scale(0.85)" }}
        >
          <div className="w-1/2 py-6 px-12 flex flex-col justify-center backdrop-filter backdrop-blur-sm bg-white/60">
            <h1 className="text-2xl font-semibold mb-1">
              Chào mừng đăng nhập! <span role="img" aria-label="wave">👋</span>
            </h1>
            <p className="text-sm text-gray-700 mb-6">
              Nhập tài khoản và mật khẩu để đăng nhập
            </p>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <input

                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 bg-white/70 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 peer"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                />
                <label
                  htmlFor="email"
                  className={`absolute left-3 text-sm text-gray-700 bg-white/5 px-1 transition-all duration-200
                    ${(isEmailFocused || email) ? "-top-4 text-xs" : "top-2 text-sm"}`}
                >
                  Tài khoản
                </label>
              </div>

              <div className="relative">
                <input

                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-3 py-2 bg-white/70 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 peer"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                />
                <label
                  htmlFor="password"
                  className={`absolute left-3 text-sm text-gray-700 bg-white/5 px-1 transition-all duration-200
                    ${(isPasswordFocused || password) ? "-top-4 text-xs" : "top-2 text-sm"}`}
                >
                  Mật khẩu
                </label>
                <div className="flex justify-between mt-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember-me"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor="remember-me" className="text-xs text-gray-700">
                      Ghi nhớ tôi
                    </label>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)} // Mở modal khi nhấn
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Quên mật khẩu?
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 text-white rounded-md focus:outline-none ${isLoading ? "bg-gray-600" : "bg-gray-800 hover:bg-gray-900"}`}
              >
                {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
            </form>

            <div className="my-4 flex items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="px-4 text-xs text-gray-500">Hoặc</span>
              <div className="flex-grow border-t border-gray-200"></div>

            </div>

            <div className="space-y-2">
              <button
                type="button"
                className="w-full flex items-center justify-center py-2 px-4 bg-white/70 border border-gray-200 rounded-md hover:bg-white/90"
              >
                <FaGoogle className="text-red-500 mr-2" size={16} />
                <span className="text-sm">Đăng nhập với Google</span>
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center py-2 px-4 bg-white/70 border border-gray-200 rounded-md hover:bg-white/90"
              >
                <FaFacebook className="text-blue-600 mr-2" size={16} />
                <span className="text-sm">Đăng nhập với Facebook</span>
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-700">
                Bạn chưa có tài khoản?{" "}
                <Link href="/register" className="text-blue-600 hover:underline">
                  Đăng ký
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

        {/* Thêm modal vào đây */}
        <ForgotPasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </>
  );
};

export default Login;