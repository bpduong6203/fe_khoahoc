import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { apiFetch } from '@/lib/api';
import { User, LoginError } from '@/types/auth'; 

export default function Callback() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const { token } = router.query;

      if (!token || typeof token !== 'string') {
        setError('Token không hợp lệ');
        setLoading(false);
        router.push('/auth/social');
        return;
      }

      try {
        localStorage.setItem('token', token);
        const user = await apiFetch<User>('/user');
        localStorage.setItem('user', JSON.stringify(user));
        router.push('/');
      } catch (err) {
        const errorMessage = (err as LoginError).message || 'Lỗi khi xử lý callback';
        console.error('Lỗi:', err);
        setError(errorMessage);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    if (router.isReady) {
      handleCallback();
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        {loading && <p className="text-gray-600">Đang xử lý...</p>}
        {error && (
          <p className="text-red-500">
            {error}.{' '}
            <button
              onClick={() => router.push('/auth/social')}
              className="text-blue-600 hover:underline"
            >
              Quay lại
            </button>
          </p>
        )}
      </div>
    </div>
  );
}