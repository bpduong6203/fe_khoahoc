import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import Callback from '@/pages/callback'; // Đường dẫn theo Next.js convention

export default function SocialLogin() {
  const router = useRouter();

  interface SocialLoginResponse {
    url: string;
  }

  type SocialProvider = 'google' | 'facebook' | 'github';

  const handleSocialLogin = async (provider: SocialProvider): Promise<void> => {
    try {
      const response = await axios.get<SocialLoginResponse>(`http://127.0.0.1:8000/api/auth/${provider}`);
      window.location.href = response.data.url; 
    } catch (error) {
      console.error(`Lỗi khi đăng nhập với ${provider}:`, error);
    }
  };

  const { pathname } = router;

  if (pathname === '/callback') {
    return <Callback />;
  } else if (pathname === '/') {
    return <div>Chào mừng bạn!</div>;
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        className="w-full flex items-center justify-center py-2 px-4 bg-white/70 border border-gray-200 rounded-md hover:bg-white/90"
        onClick={() => handleSocialLogin('google')}
      >
        <FaGoogle className="text-red-500 mr-2" size={16} />
        <span className="text-sm">Google</span>
      </button>
      <button
        type="button"
        className="w-full flex items-center justify-center py-2 px-4 bg-white/70 border border-gray-200 rounded-md hover:bg-white/90"
        onClick={() => handleSocialLogin('facebook')}
      >
        <FaFacebook className="text-blue-600 mr-2" size={16} />
        <span className="text-sm">Facebook</span>
      </button>
    </div>
  );
}