import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface UserResponse {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const { token } = router.query; 
      if (!token || typeof token !== 'string') {
        router.push('/auth/social');
        return;
      }

      try {
        localStorage.setItem('token', token);

        const response = await axios.get<UserResponse>(
          'http://127.0.0.1:8000/api/user',
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );

        const user = response.data;

        localStorage.setItem('user', JSON.stringify(user));

        router.push('/');
      } catch (error) {
        console.error('Lỗi khi xử lý callback hoặc lấy thông tin user:', error);
        localStorage.removeItem('token'); 
        router.push('/auth/social');
      }
    };

    if (router.isReady) {
      handleCallback();
    }
  }, [router]);

  return <div>Đang xử lý...</div>;
}