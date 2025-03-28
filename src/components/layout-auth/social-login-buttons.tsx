import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import Callback from '@/pages/callback';
import { apiFetch } from '@/lib/api';
import { SocialLoginResponse, LoginError } from '@/types/auth';

type SocialProvider = 'google' | 'facebook' | 'github';

export default function SocialLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<{ [key in SocialProvider]?: boolean }>({});
  const [error, setError] = useState<string>('');

  const handleSocialLogin = async (provider: SocialProvider): Promise<void> => {
    setIsLoading((prev) => ({ ...prev, [provider]: true }));
    setError('');

    try {
      const response = await apiFetch<SocialLoginResponse>(`/auth/${provider}`, {
      });
      window.location.href = response.url;
    } catch (err) {
      setError((err as LoginError).message || `Lỗi khi đăng nhập với ${provider}`);
      console.error(`Lỗi khi đăng nhập với ${provider}:`, err);
    } finally {
      setIsLoading((prev) => ({ ...prev, [provider]: false }));
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
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <button
        type="button"
        className="w-full flex items-center justify-center py-2 px-4 bg-white/70 border border-gray-200 rounded-md hover:bg-white/90 disabled:opacity-50"
        onClick={() => handleSocialLogin('google')}
        disabled={isLoading.google}
      >
        <FaGoogle className="text-red-500 mr-2" size={16} />
        <span className="text-sm">
          {isLoading.google ? 'Đang xử lý...' : 'Google'}
        </span>
      </button>

      <button
        type="button"
        className="w-full flex items-center justify-center py-2 px-4 bg-white/70 border border-gray-200 rounded-md hover:bg-white/90 disabled:opacity-50"
        onClick={() => handleSocialLogin('facebook')}
        disabled={isLoading.facebook}
      >
        <FaFacebook className="text-blue-600 mr-2" size={16} />
        <span className="text-sm">
          {isLoading.facebook ? 'Đang xử lý...' : 'Facebook'}
        </span>
      </button>
    </div>
  );
}