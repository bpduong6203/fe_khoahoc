import React, { useState } from "react";
import Tabs from "@/components/tab";
import Carousel from "@/components/carousel";
import CarouselNavigation from "@/components/carousel-navigation";

interface RecommendedCoursesProps {
  coursesByCategory: { [key: string]: any[] };
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const RecommendedCourses: React.FC<RecommendedCoursesProps> = ({
  coursesByCategory,
  selectedCategory,
  onCategorySelect,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    if (coursesByCategory[selectedCategory]) {
      const totalPages = Math.ceil(coursesByCategory[selectedCategory].length / 4);
      setCurrentSlide((prev) => (prev + 1) % totalPages);
    }
  };

  const handlePrevSlide = () => {
    if (coursesByCategory[selectedCategory]) {
      const totalPages = Math.ceil(coursesByCategory[selectedCategory].length / 4);
      setCurrentSlide((prev) => (prev - 1 + totalPages) % totalPages);
    }
  };

  const shouldShowNavigation =
    coursesByCategory[selectedCategory] && coursesByCategory[selectedCategory].length > 4;

  const totalPages = coursesByCategory[selectedCategory]
    ? Math.ceil(coursesByCategory[selectedCategory].length / 4)
    : 0;

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold">Học gì tiếp theo ?</h2>
      <p className="mt-2 text-lg">Đề xuất các khóa học hợp theo nhu cầu tìm kiếm của bạn !</p>

      <Tabs
        categories={[
          "TECHNOLOGY & SOFTWARE",
          "IT & SOFTWARE",
          "DESIGN & CREATIVE ARTS",
          "BUSINESS & MANAGEMENT",
          "HEALTH & WELLNESS",
          "MARKETING",
          "LIFESTYLE",
        ]}
        selectedCategory={selectedCategory}
        onCategorySelect={onCategorySelect}
      />

      <div className="relative mt-8">
        {coursesByCategory[selectedCategory]?.length > 0 ? (
          <>
            <Carousel
              courses={coursesByCategory[selectedCategory]}
              currentSlide={currentSlide}
            />
            {shouldShowNavigation && (
              <CarouselNavigation
                handlePrevSlide={handlePrevSlide}
                handleNextSlide={handleNextSlide}
                currentSlide={currentSlide}
                totalPages={totalPages}
              />
            )}
          </>
        ) : (
          <p className="mt-4">Chưa có khóa học nào trong danh mục này.</p>
        )}
      </div>
    </div>
  );
};

export default RecommendedCourses;
