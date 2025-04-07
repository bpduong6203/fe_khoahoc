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

                if (user.roles.includes('admin')) {
                    router.push('/dashboard');
                } else if (user.roles.includes('user')) {
                    router.push('/');
                } else {
                    setError('Không có vai trò hợp lệ');
                    localStorage.removeItem('token');
                    router.push('/auth/social');
                }
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
            <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-md">
                {loading ? (
                    <div className="space-y-4">
                        <p className="text-gray-700 text-lg font-semibold">Đang đăng nhập...</p>
                        <div className="w-3/4 mx-auto h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 animate-slide"></div>
                        </div>
                    </div>
                ) : error ? (
                    <p className="text-red-500">
                        {error}.{' '}
                        <button
                            onClick={() => router.push('/auth/social')}
                            className="text-blue-600 hover:underline font-medium"
                        >
                            Quay lại
                        </button>
                    </p>
                ) : null}
            </div>

            {/* CSS Animation */}
            <style jsx>{`
                .animate-slide {
                    width: 50%;
                    animation: slide 1.5s infinite ease-in-out;
                }

                @keyframes slide {
                    0% {
                        transform: translateX(0%);
                    }
                    50% {
                        transform: translateX(100%);
                    }
                    100% {
                        transform: translateX(0%);
                    }
                }
            `}</style>
        </div>
    );
}