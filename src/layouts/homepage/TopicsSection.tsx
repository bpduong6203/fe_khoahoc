// TopicsSection.tsx
import React from "react";

// Dữ liệu tĩnh thay vì sử dụng Math.random()
const topicCourseCount = {
  "Web Development": 120,
  "Data Science": 180,
  "Mobile Development": 150,
  "Programming Languages": 200,
  "Game Development": 110, 
  "Databases": 130
};

const TopicsSection = () => {
  return (
    <div className="px-6 py-12 bg-gray-50 dark:bg-neutral-700">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold">Khám phá nhiều chủ đề</h2>
        <p className="mt-2 text-lg">
          Học các kỹ năng mới nhất với các khóa học được cập nhật liên tục
        </p>

        <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(topicCourseCount).map(([topic, count], index) => (
            <div
              key={index}
              className="bg-white dark:bg-neutral-500 p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <h3 className="font-bold text-lg">{topic}</h3>
              <p className=" mt-2 text-sm">
                {count} khóa học
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="px-6 py-3 border border-gray-800 dark:border-neutral-100 font-medium rounded hover:bg-gray-100 dark:hover:bg-neutral-400 transition-colors">
            Xem tất cả chủ đề
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicsSection;