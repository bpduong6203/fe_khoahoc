import React from "react";

const FeaturedCourses = ({ coursesByCategory }) => {
  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold">Khóa học nổi bật</h2>
      <p className="text-gray-600 mt-2 text-lg">Các khóa học được đánh giá cao và phổ biến nhất</p>

      <div className="grid grid-cols-2 gap-6 mt-8">
        {coursesByCategory["TECHNOLOGY & SOFTWARE"] && 
         coursesByCategory["TECHNOLOGY & SOFTWARE"].slice(0, 4).map((course, index) => (
          <div key={index} className="border rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex">
            <div className="w-1/3 bg-gray-200">
              <img
                src={course.image || "/path-to-default-image.jpg"}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-2/3 p-4">
              <h3 className="font-semibold text-gray-800 line-clamp-2">{course.title}</h3>
              <p className="text-sm text-gray-500 mt-2">{course.author}</p>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span className="text-sm font-medium">{course.rating}</span>
                </div>
                <span className="text-xs text-gray-500 ml-1">({course.participants})</span>
              </div>
              <p className="text-sm font-bold text-gray-800 mt-2">{course.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCourses;