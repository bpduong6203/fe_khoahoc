import React from "react";

const Banner = () => {
  return (
    <div className="flex justify-center py-16 px-6 bg-gradient-to-r from-blue-50 to-purple-100">
      <div className="relative w-full max-w-6xl h-96 bg-white rounded-2xl shadow-xl flex items-center px-12 overflow-hidden">
        {/* Nội dung chữ */}
        <div className="max-w-lg z-10">
          <h2 className="text-4xl font-extrabold text-gray-900">Mã hóa tương lai của bạn</h2>
          <p className="text-gray-700 mt-4 text-lg leading-relaxed">
            Kiểm soát sự nghiệp của bạn. Học những kỹ năng mới nhất trong
            <a href="#" className="text-purple-600 font-semibold underline ml-1">phát triển web</a>.
          </p>
          <button className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-all">
            Bắt đầu ngay
          </button>
        </div>

        {/* Hình ảnh minh họa */}
        <div className="absolute right-0 bottom-0 w-2/5 max-w-sm">
          <img
            src="/path-to-your-illustration.png"
            alt="Illustration"
            className="w-full h-auto drop-shadow-lg"
          />
        </div>

        
      </div>
    </div>
  );
};

export default Banner;