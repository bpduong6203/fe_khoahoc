// Banner.tsx
import React from "react";

const Banner = () => {
  return (
    <div className="flex justify-center py-12 px-6">
      <div
        className="relative w-full max-w-6xl h-80 bg-yellow-200 rounded-lg shadow-md flex items-center justify-between px-12"
        style={{
          backgroundImage: 'url("/path-to-your-banner-image.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-md">
          <h2 className="text-3xl font-bold text-gray-800">Mã hóa tương lai của bạn</h2>
          <p className="text-gray-600 mt-4 text-lg">
            Kiểm soát sự nghiệp của bạn. Học những kỹ năng mới nhất trong{" "}
            <a href="#" className="text-purple-700 underline">phát triển web</a>.
          </p>
        </div>
        <div className="w-1/3">
          <img
            src="/path-to-your-illustration.png"
            alt="Illustration"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;