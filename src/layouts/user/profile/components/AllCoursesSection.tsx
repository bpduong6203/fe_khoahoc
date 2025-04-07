import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Course {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  price: string;
  originalPrice: string;
  rating: number;
  reviews: number;
  duration: string;
  level: string;
  image: string;
  tags?: string[];
  isBestseller?: boolean;
  isHot?: boolean;
}

interface AllCoursesSectionProps {
  courses: Course[];
  categoryName: string;
}

const AllCoursesSection: React.FC<AllCoursesSectionProps> = ({
    courses,
    categoryName,
  }) => {
    const [isRatingOpen, setIsRatingOpen] = useState(true);
    const [isTopicOpen, setIsTopicOpen] = useState(true);
    const [showMoreRatings, setShowMoreRatings] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
  
    const coursesPerPage = 5;
    const totalPages = Math.ceil(courses.length / coursesPerPage);
    const startIndex = (currentPage - 1) * coursesPerPage;
    const currentCourses = courses.slice(startIndex, startIndex + coursesPerPage);
  
    const goToPage = (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };
  
    const ratingOptions = [
      { value: 4.5, label: "4.5 trở lên", count: 4507 },
      { value: 4.0, label: "4.0 trở lên", count: 5840 },
      { value: 3.5, label: "3.5 trở lên", count: 10000 },
      { value: 3.0, label: "3.0 trở lên", count: 10000 },
    ];
  
    const additionalRatingOptions = [
      { value: 2.5, label: "2.5 trở lên", count: 12000 },
      { value: 2.0, label: "2.0 trở lên", count: 15000 },
    ];
  
    const topicOptions = [
      { value: "web", label: "Phát triển Web", count: 255 },
      { value: "js", label: "JavaScript", count: 209 },
      { value: "php", label: "PHP (ứng dụng)", count: 198 },
      { value: "html", label: "HTML", count: 192 },
    ];
  
    return (
      <div className="max-w-6xl mx-auto mt-8 px-4">
        <h1 className="text-2xl font-bold mb-6">
          Tất cả các khóa học {categoryName}
        </h1>
  
        {/* Search + Result Count */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div className="relative w-full md:w-1/2 mb-4 md:mb-0">
            <Input
              type="text"
              placeholder="Tìm kiếm..."
              className="pl-10 pr-4 py-2 rounded-full text-sm border-gray-300"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          </div>
          <div className="text-right">
            <Label className="text-gray-600 text-sm">
              {courses.length.toLocaleString()} kết quả
            </Label>
          </div>
        </div>
  
        {/* Check if there are no courses */}
        {courses.length === 0 ? (
          <div className="text-center text-lg text-gray-600 mb-6">
            Không có khóa học nào cho danh mục này.
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Sidebar */}
            <div className="w-full md:w-1/4 bg-gray-50 rounded-xl p-4 border border-gray-200">
              {/* Xếp hạng */}
              <div className="mb-6">
                <Button
                  variant="ghost"
                  className="w-full flex justify-between items-center mb-2"
                  onClick={() => setIsRatingOpen(!isRatingOpen)}
                >
                  <h3 className="font-medium text-sm">Xếp hạng</h3>
                  <svg
                    className={`w-4 h-4 transition-transform ${isRatingOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>
                {isRatingOpen && (
                  <div className="space-y-2 text-sm">
                    {(showMoreRatings ? [...ratingOptions, ...additionalRatingOptions] : ratingOptions).map(
                      (option, index) => (
                        <label key={index} className="flex items-center">
                          <input type="radio" name="rating" className="mr-2" />
                          <div className="flex items-center text-yellow-500">
                            {"★".repeat(Math.floor(option.value))}
                            {option.value % 1 !== 0 && "½"}
                            <span className="ml-1 text-gray-600">
                              {option.label} ({option.count.toLocaleString()})
                            </span>
                          </div>
                        </label>
                      )
                    )}
                    <Button
                      variant="link"
                      className="text-purple-600 text-xs mt-1 p-0"
                      onClick={() => setShowMoreRatings(!showMoreRatings)}
                    >
                      {showMoreRatings ? "Thu gọn" : "Hiển thị thêm"}
                    </Button>
                  </div>
                )}
              </div>
  
              {/* Chủ đề */}
              <div>
                <Button
                  variant="ghost"
                  className="w-full flex justify-between items-center mb-2"
                  onClick={() => setIsTopicOpen(!isTopicOpen)}
                >
                  <h3 className="font-medium text-sm">Đề tài</h3>
                  <svg
                    className={`w-4 h-4 transition-transform ${isTopicOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>
                {isTopicOpen && (
                  <div className="space-y-2 text-sm">
                    {topicOptions.map((option, index) => (
                      <label key={index} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-gray-600">
                          {option.label} ({option.count})
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
  
            {/* Main Content */}
            <div className="w-full md:w-3/4">
              {currentCourses.map((course, index) => (
                <Card key={index} className="flex flex-col md:flex-row mb-3 rounded-xl border border-gray-200 shadow-none hover:shadow transition">
                  <div className="w-full md:w-1/4">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-24 object-cover rounded-l-xl"
                    />
                  </div>
                  <div className="w-full md:w-3/4 md:pl-4 flex flex-col justify-between">
                    <CardHeader className="p-3 pb-1">
                      <CardTitle className="text-base font-semibold line-clamp-1">{course.title}</CardTitle>
                      <p className="text-xs text-gray-600 line-clamp-2">{course.subtitle}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{course.author}</p>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <div className="flex items-center text-sm text-amber-400">
                        <span className="font-semibold mr-1">{course.rating}</span>
                        {"★".repeat(Math.floor(course.rating))}
                        {course.rating % 1 >= 0.5 && "★"}
                        <span className="text-xs text-gray-500 ml-1">({course.reviews.toLocaleString()})</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {course.duration} • {course.level}
                      </p>
                    </CardContent>
                    <CardFooter className="p-3 pt-0 flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-base">{course.price}</span>
                        <span className="text-gray-400 line-through text-sm">{course.originalPrice}</span>
                      </div>
                      {(course.isBestseller || course.isHot) && (
                        <Badge variant="secondary" className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-600">
                          {course.isBestseller ? "Bán chạy nhất" : "Hot"}
                        </Badge>
                      )}
                    </CardFooter>
                  </div>
                </Card>
              ))}
  
              {/* Pagination */}
              <div className="flex justify-center items-center mt-8 space-x-2">
                <Button
                  variant="outline"
                  className="px-3 py-1 rounded-full"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  {"<"}
                </Button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    className={`px-3 py-1 rounded-full ${
                      currentPage === page ? "bg-purple-600 text-white" : ""
                    }`}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  className="px-3 py-1 rounded-full"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  {">"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default AllCoursesSection;
  
