import React, { useState } from "react";
import Tabs from "@/components/tab";
import Carousel from "@/components/carousel";
import CarouselNavigation from "@/components/carousel-navigation";
import HeadingSmall from "@/components/heading-small";
import Heading from "@/components/heading";
import { Label } from "@/components/ui/label";

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
      <Heading title="Học gì tiếp theo ?" />
      <HeadingSmall title="Đề xuất các khóa học hợp theo nhu cầu tìm kiếm của bạn !" />

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
          <Label>Chưa có khóa học nào trong danh mục này.</Label>
        )}
      </div>
    </div>
  );
};

export default RecommendedCourses;
