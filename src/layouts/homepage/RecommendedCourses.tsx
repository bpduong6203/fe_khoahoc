import React from "react";
import Slider from "react-slick";
import Tabs from "@/components/tab";
import HeadingSmall from "@/components/heading-small";
import Heading from "@/components/heading";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"; // Import Card
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  // Cấu hình cho Slider (react-slick)
  const settings = {
    dots: true, // Hiển thị chấm (dots) để điều hướng
    infinite: true, // Lặp vô hạn
    speed: 500, // Tốc độ chuyển slide (ms)
    slidesToShow: 4, // Hiển thị 4 khóa học mỗi lần
    slidesToScroll: 4, // Cuộn 4 khóa học khi nhấn next/prev
    arrows: true, // Hiển thị nút trái/phải
    responsive: [
      {
        breakpoint: 1024, // Dưới 1024px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768, // Dưới 768px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480, // Dưới 480px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      {/* Tiêu đề */}
      <Heading title="Học gì tiếp theo ?" />
      <HeadingSmall title="Đề xuất các khóa học hợp theo nhu cầu tìm kiếm của bạn !" />

      {/* Tabs điều hướng danh mục */}
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

      {/* Slider hiển thị các khóa học */}
      <div className="relative mt-8">
        {coursesByCategory[selectedCategory]?.length > 0 ? (
          <Slider {...settings}>
            {coursesByCategory[selectedCategory].map((course, index) => (
              <div key={index} className="px-2">
                {/* Card cho từng khóa học */}
                <Card className="flex flex-col justify-between h-full">
                  <CardHeader className="min-h-[4rem]">
                    <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                    <CardDescription>{course.author}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-40 object-cover rounded-md"
                    />
                  </CardContent>
                  <CardFooter className="justify-between h-[3rem] items-center">
                    <p className="text-sm font-medium text-primary">${course.price}</p>
                    <p className="text-sm">Rating: {course.rating}</p>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </Slider>
        ) : (
          <Label>Chưa có khóa học nào trong danh mục này.</Label>
        )}
      </div>
    </div>
  );
};

export default RecommendedCourses;
