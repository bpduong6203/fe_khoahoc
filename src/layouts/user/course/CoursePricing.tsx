import React from "react";
import { MdOndemandVideo, MdSmartphone } from "react-icons/md";
import { FiFileText, FiEdit, FiDownload } from "react-icons/fi";
import { FaInfinity, FaCertificate } from "react-icons/fa";

const CoursePricing = () => {
  return (
    <div className="bg-white dark:bg-neutral-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
      <div className="flex items-center mb-2">
        <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">299.000 đ</span>
        <span className="text-gray-500 dark:text-gray-400 line-through ml-2">1.599.000</span>
      </div>
      <div className="text-gray-600 dark:text-gray-300 mb-2">Giảm giá 81%</div>
      <div className="flex items-center text-red-500 text-sm mb-4">
        <span className="mr-1">🕒</span>
        Còn 5 giờ nữa để được hưởng mức giá này!
      </div>
      
      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded mb-2">
        Thêm vào giỏ hàng
      </button>
      
      <button className="w-full border border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-200 py-3 rounded mb-4 hover:bg-gray-50 dark:hover:bg-neutral-800">
        Mua ngay
      </button>
      
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
        Đảm bảo hoàn tiền trong 30 ngày
      </div>
      
      <div className="mb-6">
        <h4 className="font-bold mb-4 text-gray-900 dark:text-gray-100">Khóa học này bao gồm:</h4>
        <ul className="space-y-2">
          <li className="flex items-center">
            <MdOndemandVideo className="mr-2 text-black dark:text-white" />
            <span className="text-gray-900 dark:text-gray-100">52 giờ video theo yêu cầu</span>
          </li>
          <li className="flex items-center">
            <FiFileText className="mr-2 text-black dark:text-white" />
            <span className="text-gray-900 dark:text-gray-100">23 bài tập mã hóa</span>
          </li>
          <li className="flex items-center">
            <FiEdit className="mr-2 text-black dark:text-white" />
            <span className="text-gray-900 dark:text-gray-100">Bài tập</span>
          </li>
          <li className="flex items-center">
            <FiFileText className="mr-2 text-black dark:text-white" />
            <span className="text-gray-900 dark:text-gray-100">225 bài viết</span>
          </li>
          <li className="flex items-center">
            <FiDownload className="mr-2 text-black dark:text-white" />
            <span className="text-gray-900 dark:text-gray-100">162 tài nguyên có thể tải xuống</span>
          </li>
          <li className="flex items-center">
            <MdSmartphone className="mr-2 text-black dark:text-white" />
            <span className="text-gray-900 dark:text-gray-100">Truy cập trên điện thoại di động và TV</span>
          </li>
          <li className="flex items-center">
            <FaInfinity className="mr-2 text-black dark:text-white" />
            <span className="text-gray-900 dark:text-gray-100">Truy cập trọn đời</span>
          </li>
          <li className="flex items-center">
            <FaCertificate className="mr-2 text-black dark:text-white" />
            <span className="text-gray-900 dark:text-gray-100">Giấy chứng nhận hoàn thành</span>
          </li>
        </ul>
      </div>
      
      <div className="flex justify-between mb-6">
        <button className="text-purple-600 hover:underline">Chia sẻ</button>
        <button className="text-purple-600 hover:underline">Tặng khóa học này</button>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
        <h4 className="font-bold mb-4 text-gray-900 dark:text-gray-100">Áp dụng phiếu giảm giá</h4>
        <div className="flex">
          <input 
            type="text" 
            placeholder="Nhập phiếu giảm giá" 
            className="flex-grow border border-gray-300 dark:border-gray-500 rounded-l p-2 text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-neutral-800"
          />
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 rounded-r">
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursePricing;