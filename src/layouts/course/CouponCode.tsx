import React from "react";

const CouponCode = () => {
  return (
    <div className="bg-gray-50 dark:bg-neutral-700 pt-1 p-4 rounded-lg mb-6 mt-4 flex items-center justify-between min-h-[80px]">
      <div className="flex flex-col justify-center">
        <div className="text-sm text-gray-900 dark:text-gray-100">2021PM25 được áp dụng</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">Mã giảm giá Udemy</div>
      </div>
      <button className="text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-200">
        ×
      </button>
    </div>
  );
};

export default CouponCode;