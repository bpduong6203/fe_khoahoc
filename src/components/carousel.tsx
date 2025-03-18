import React from "react";
import CourseCard from "./course-card";

interface CarouselProps {
  courses: any[];
  currentSlide: number;
}

const Carousel: React.FC<CarouselProps> = ({ courses, currentSlide }) => {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div
        className="flex space-x-4 transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {courses.map((course, index) => (
          <div key={index} className="w-72 flex-shrink-0">
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
