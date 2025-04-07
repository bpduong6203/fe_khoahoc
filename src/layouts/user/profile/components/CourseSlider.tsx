import React from "react";
import Slider from "react-slick";
import CourseCard from "./CourseCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Course {
  title: string;
  author: string;
  price: string;
  originalPrice: string;
  rating: number;
  participants: string;
  image: string;
  isBestseller?: boolean;
}

interface CourseSliderProps {
  courses: Course[];
}

const CourseSlider: React.FC<CourseSliderProps> = ({ courses }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="relative mt-6">
      <Slider {...settings}>
        {courses.map((course, index) => (
          <div key={index} className="px-2 h-full">
            <div className="h-full">
              <CourseCard course={course} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CourseSlider;
