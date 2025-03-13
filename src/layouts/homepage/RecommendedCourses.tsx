// RecommendedCourses.tsx
import React, { useState } from "react";

const RecommendedCourses = ({ coursesByCategory, selectedCategory, onCategorySelect }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    if (coursesByCategory[selectedCategory]) {
      const cardsPerPage = 4;
      const totalPages = Math.ceil(coursesByCategory[selectedCategory].length / cardsPerPage);
      setCurrentSlide((prev) => (prev + 1) % totalPages);
    }
  };

  const handlePrevSlide = () => {
    if (coursesByCategory[selectedCategory]) {
      const cardsPerPage = 4;
      const totalPages = Math.ceil(coursesByCategory[selectedCategory].length / cardsPerPage);
      setCurrentSlide((prev) => (prev - 1 + totalPages) % totalPages);
    }
  };

  // Thêm kiểm tra để đảm bảo dữ liệu tồn tại
  const shouldShowNavigation = coursesByCategory[selectedCategory] && 
    coursesByCategory[selectedCategory].length > 4;
    
  const totalPages = coursesByCategory[selectedCategory] ? 
    Math.ceil(coursesByCategory[selectedCategory].length / 4) : 0;

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold">Học gì tiếp theo ?</h2>
      <p className="text-gray-600 mt-2 text-lg">Đề xuất các khóa học hợp theo nhu cầu tìm kiếm của bạn !</p>

      <div className="flex space-x-6 py-6 border-b mt-4">
        {[
          "TECHNOLOGY & SOFTWARE",
          "IT & SOFTWARE",
          "DESIGN & CREATIVE ARTS",
          "BUSINESS & MANAGEMENT",
          "HEALTH & WELLNESS",
          "MARKETING",
          "LIFESTYLE",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => onCategorySelect(tab)}
            className={`text-sm font-medium pb-2 transition-colors whitespace-nowrap ${tab === selectedCategory
              ? "text-black border-b-2 border-black"
              : "text-gray-600 hover:text-gray-800"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="relative mt-8">
        {coursesByCategory[selectedCategory] && coursesByCategory[selectedCategory].length > 0 ? (
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from(
                  { length: Math.ceil(coursesByCategory[selectedCategory].length / 4) },
                  (_, pageIndex) => (
                    <div key={pageIndex} className="w-full flex space-x-4 flex-shrink-0">
                      {coursesByCategory[selectedCategory]
                        .slice(pageIndex * 4, (pageIndex + 1) * 4)
                        .map((course, index) => (
                          <div key={index} className="w-[24%] bg-white flex-shrink-0">
                            <div className="border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                              <div className="h-40 bg-gray-200 rounded-t-lg overflow-hidden">
                                <img
                                  src={course.image || "/path-to-default-image.jpg"}
                                  alt={course.title}
                                  className="w-full h-full object-cover rounded-t-lg"
                                />
                              </div>
                              <div className="p-4">
                                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 h-10">
                                  {course.title}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">{course.author}</p>
                                <div className="flex items-center mt-1">
                                  <div className="flex items-center">
                                    <span className="text-yellow-400 mr-1">★</span>
                                    <span className="text-sm font-medium">{course.rating}</span>
                                  </div>
                                  <span className="text-xs text-gray-500 ml-1">
                                    ({course.participants})
                                  </span>
                                </div>
                                <p className="text-sm font-bold text-gray-800 mt-1">
                                  {course.price}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )
                )}
              </div>
            </div>

            {shouldShowNavigation && (
              <>
                <button
                  onClick={handlePrevSlide}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-10"
                  disabled={currentSlide === 0}
                >
                  <svg
                    className={`w-5 h-5 text-gray-600 ${currentSlide === 0 ? "opacity-50" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleNextSlide}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-10"
                  disabled={currentSlide === totalPages - 1}
                >
                  <svg
                    className={`w-5 h-5 text-gray-600 ${currentSlide === totalPages - 1 ? "opacity-50" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>
        ) : (
          <p className="text-gray-600 mt-4">Chưa có khóa học nào trong danh mục này.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full ${currentSlide === i ? "bg-gray-800" : "bg-gray-300"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendedCourses;