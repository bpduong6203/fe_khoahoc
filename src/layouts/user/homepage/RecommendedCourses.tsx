import * as React from "react";
import Slider from "react-slick";
import Tabs from "@/components/tab";
import HeadingSmall from "@/components/heading-small";
import Heading from "@/components/heading";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { apiFetch } from "@/lib/api";
import { Course } from "@/types/interfaces";
import { Skeleton } from "@/components/ui/skeleton";

interface Category {
  id: string;
  name: string;
  status: string;
  courses: Course[];
}

interface RecommendedCoursesProps {
  coursesByCategory: { [key: string]: Course[] };
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const RecommendedCourses: React.FC = () => {
  const [coursesByCategory, setCoursesByCategory] = React.useState<{ [key: string]: Course[] }>({});
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchCategoriesWithCourses = async () => {
      try {
        setLoading(true);
        const response = await apiFetch('/categories-course');
        const categories: Category[] = response.data;

        const categoryMap: { [key: string]: Course[] } = {};
        categories.forEach((category) => {
          categoryMap[category.name] = category.courses;
        });

        setCoursesByCategory(categoryMap);

        if (categories.length > 0) {
          setSelectedCategory(categories[0].name);
        }
      } catch (error) {
        console.error('Error fetching categories with courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesWithCourses();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return (
      <div className="px-6 py-12 max-w-6xl mx-auto">
        <Heading title="Học gì tiếp theo ?" />
        <HeadingSmall title="Đề xuất các khóa học hợp theo nhu cầu tìm kiếm của bạn !" />
  
        {/* Hiển thị Skeleton trong Tabs */}
        <div className="flex gap-4">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="w-40 h-8 rounded-lg" />
          ))}
        </div>
  
        {/* Hiển thị Skeleton cho Slider */}
        <div className="relative mt-8">
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <Card key={index} className="flex flex-col h-full">
                <CardHeader className="mt-4">
                  <Skeleton className="w-3/4 h-8 mb-2" />
                </CardHeader>
                <CardContent className="flex-grow">
                  <Skeleton className="w-full h-40 mb-4" />
                </CardContent>
                <CardFooter className="flex mt-4 justify-between">
                  <Skeleton className="w-1/3 h-6" />
                  <Skeleton className="w-1/3 h-6" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }
  

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <Heading title="Học gì tiếp theo ?" />
      <HeadingSmall title="Đề xuất các khóa học hợp theo nhu cầu tìm kiếm của bạn !" />

      <Tabs
        categories={Object.keys(coursesByCategory)}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      <div className="relative mt-8">
        {coursesByCategory[selectedCategory]?.length > 0 ? (
          <Slider {...settings}>
            {coursesByCategory[selectedCategory].map((course) => (
              <div key={course.id} className="px-2">
                <Card className="flex flex-col justify-between h-full">
                  <CardHeader className="min-h-[4rem]">
                    <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                    <CardDescription>{course.user_name}</CardDescription> 
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <img
                      src={course.thumbnail_url || "https://via.placeholder.com/150"}
                      alt={course.title}
                      className="w-full h-40 object-cover rounded-md"
                    />
                  </CardContent>
                  <CardFooter className="justify-between h-[3rem] items-center">
                    <p className="text-sm font-medium text-primary">
                      {course.discount_price || course.price} VNĐ
                    </p>
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