import React, { useState } from "react";
import CourseFeatures from "./CourseFeatures";
import CourseCurriculum from "./CourseCurriculum";
import CoursePricing from "./CoursePricing";
import CouponCode from "./CouponCode";
import CoursePreviewModal from "./CoursePreviewModal";
import CommentReview from "./CommentReview";

const DetailsCourse = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePreviewClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full bg-white dark:bg-neutral-900">
      {/* Dark background banner */}
      <div className="bg-gray-900 text-white p-8 flex justify-between items-center">
        {/* Left content */}
        <div className="max-w-2xl ml-6">
          <h1 className="text-3xl font-bold mb-4">
            100 Ngày Viết Mã: Trại Huấn Luyện Python Pro Hoàn Chỉnh
          </h1>
          <p className="text-gray-300 mb-4">
            Làm chủ Python bằng cách xây dựng 100 dự án trong 100 ngày. Học khoa học dữ liệu, 
            tự động hóa, xây dựng trang web, trò chơi và ứng dụng!
          </p>
          {/* Course stats */}
          <div className="flex items-center text-sm mb-4">
            <span className="bg-yellow-600 text-white px-2 py-1 rounded text-xs mr-2">
              Sách bán chạy nhất
            </span>
            <div className="flex items-center mr-4">
              <span className="text-yellow-400 mr-1">4.7</span>
              <span className="text-yellow-400">★★★★★</span>
              <span className="text-gray-400 ml-1">(357,952 lượt đánh giá)</span>
            </div>
            <span className="text-gray-400">1,580,667 sinh viên</span>
          </div>
          {/* Created by */}
          <p className="text-sm text-gray-400 mb-2">
            Được tạo ra bởi Tiến sĩ Angela Yu, Nhà phát triển và Giảng viên chính
          </p>
          {/* Course info */}
          <div className="flex items-center text-xs text-gray-400 space-x-2">
            <div className="flex items-center">
              <span>Cập nhật lần cuối 2/2025</span>
            </div>
            <div className="flex items-center">
              <span>Tiếng Anh</span>
            </div>
            <div className="flex items-center">
              <span>Tiếng Anh, Tiếng A Rập [Tự động], 24 nữa</span>
            </div>
          </div>
        </div>
        {/* Right content - Static preview button with background image */}
        <div
          className="relative w-100 h-60 -ml-12 rounded-lg overflow-hidden bg-cover flex flex-col items-center justify-center"
          style={{
            backgroundImage:
              "url('https://img.upanh.tv/2025/03/16/DALLE-2025-03-16-03.45.35---A-modern-and-minimalistic-wide-image-featuring-the-words-Course-Preview-in-bold-clean-typography.-The-background-is-sleek-with-a-gradient-or-abstra.webp')",
          }}
        >
          <button
            onClick={handlePreviewClick}
            className="bg-transparent border border-white rounded-full p-4 focus:outline-none backdrop-blur-lg opacity-90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="white"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <p className="text-black text-xl font-bold mt-4 drop-shadow-lg">
            Xem trước khóa học này
          </p>
        </div>
      </div>

      {/* Modal */}
      <CoursePreviewModal isOpen={isModalOpen} onClose={handleCloseModal} />

      {/* Phần nội dung khóa học và thông tin mua hàng */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cột trái - Nội dung khóa học */}
          <div className="lg:w-2/3">
            <CourseFeatures />
            <CourseCurriculum />
          </div>
          {/* Cột phải - Thông tin giá */}
          <div className="lg:w-1/3">
            <CoursePricing />
            <CouponCode />
          </div>
        </div>
      </div>

      {/* Thành phần đánh giá */}
      <CommentReview />
    </div>
  );
};

export default DetailsCourse;