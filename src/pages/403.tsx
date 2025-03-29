import Link from 'next/link';
import AppLayoutClient from '@/layouts/app-layout-client';
import "@/app/globals.css"

export default function ForbiddenPage() {
    return (
        <AppLayoutClient>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-500 to-orange-500">
                <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center transform transition-all hover:scale-105">
                    {/* Icon cấm */}
                    <div className="mb-6">
                        <svg
                            className="w-24 h-24 mx-auto text-red-600 animate-pulse"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
                            />
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                        </svg>
                    </div>

                    {/* Tiêu đề */}
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">403 - Forbidden</h1>

                    {/* Thông báo */}
                    <p className="text-gray-600 mb-6">
                        Rất tiếc! Bạn không có quyền truy cập vào trang này. Hãy kiểm tra lại hoặc liên hệ quản trị viên.
                    </p>

                    {/* Nút hành động */}
                    <div className="space-y-4">
                        <Link
                            href="/"
                            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
                        >
                            Quay về trang chủ
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="inline-block bg-gray-300 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-400 transition duration-300"
                        >
                            Quay lại trang trước
                        </button>
                    </div>

                    {/* Hiệu ứng thêm */}
                    <div className="mt-8">
                        <p className="text-sm text-gray-500">
                            © 2025 - Hệ thống học trực tuyến
                        </p>
                    </div>
                </div>
            </div>
        </AppLayoutClient>
    );
}