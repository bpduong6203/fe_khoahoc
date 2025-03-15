import React, { useState } from "react";

const CourseFeatures = () => {
  const [expanded, setExpanded] = useState(false);

  const features = [
    "Bạn sẽ học các hàm và tính năng mạnh của Python để giải quyết nhiệm vụ",
    "Bạn sẽ có thể sử dụng Python cho các vấn đề công việc hoặc dự án cá nhân của mình",
    "Học cách sử dụng Python một cách chuyên nghiệp, bao gồm Python 2 và Python 3!",
    "Tìm hiểu các tính năng nâng cao của Python, như mã-ảo, bộ lưu trữ và cách làm việc với dữ liệu phức tạp!",
    "Bạn sẽ sử dụng các thư viện và chương trình sử dụng thư viện Python",
    "Bạn sẽ tạo một danh mục các dự án dựa trên Python để trình bày",
    "Tạo trò chơi bằng Python, như Tic Tac Toe và Blackjack!",
    "Học cách sử dụng lập trình hướng đối tượng với các lớp"
  ];

  return (
    <div className="bg-white dark:bg-neutral-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600 mb-6">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Những gì bạn sẽ học được</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.slice(0, expanded ? features.length : 4).map((feature, index) => (
          <div key={index} className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <p className="text-sm text-gray-900 dark:text-gray-100">{feature}</p>
          </div>
        ))}
      </div>
      
      {!expanded && features.length > 4 && (
        <button 
          onClick={() => setExpanded(true)}
          className="text-purple-600 text-sm mt-4 flex items-center hover:underline"
        >
          Hiển thị thêm <span className="ml-1">▼</span>
        </button>
      )}
    </div>
  );
};

export default CourseFeatures;