import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CourseSlider from "./components/CourseSlider";
import FeaturedCourse from "./components/FeaturedCourse";
import AllCoursesSection from "./components/AllCoursesSection";

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

interface DetailedCourse {
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
  isBestseller?: boolean;
  isHot?: boolean;
}

interface FeaturedCourseData {
  title: string;
  author: string;
  description: string;
  image: string;
  price: string;
  originalPrice: string;
  rating: number;
  reviews: number;
  updated: string;
  duration: string;
  lectures: number;
  level: string;
  isHot?: boolean;
}

// Dữ liệu giả lập cho các khóa học
const coursesData: Record<string, Course[]> = {
  "Web Development": [
    {
      title: "HTML and CSS for Beginners – Build a Website & Launch ONLINE",
      author: "Edwin Diaz | 9,000+ Students, Coding Faculty...",
      price: "đ309,000",
      originalPrice: "đ419,000",
      rating: 4.5,
      participants: "37,074",
      image: "https://img.upanh.tv/2025/03/14/html-css-course.jpg",
      isBestseller: true,
    },
    {
      title: "Build Responsive Real-World Websites with HTML and CSS",
      author: "Jonas Schmedtmann",
      price: "đ379,000",
      originalPrice: "đ449,000",
      rating: 4.7,
      participants: "112,873",
      image: "https://img.upanh.tv/2025/03/14/responsive-html-css.jpg",
    },
    {
      title: "HTML, JavaScript, & Bootstrap - Certification Course",
      author: "YouAccel Training",
      price: "đ299,000",
      originalPrice: "đ399,000",
      rating: 4.4,
      participants: "5,600",
      image: "https://img.upanh.tv/2025/03/14/html-js-bootstrap.jpg",
    },
    {
      title: "Practical Web Design & Development: 7 Courses in 1",
      author: "Creative Online School",
      price: "đ299,000",
      originalPrice: "đ399,000",
      rating: 4.3,
      participants: "2,632",
      image: "https://img.upanh.tv/2025/03/14/practical-web-design.jpg",
    },
  ],
  "Mobile Development": [
    // Thêm dữ liệu cho các danh mục khác nếu cần
  ],
};

// Dữ liệu giả lập cho khóa học nổi bật
const featuredCourseData: Record<string, FeaturedCourseData> = {
  "Web Development": {
    title: "ASP.NET Core đi sâu vào .NET 9",
    author: "Bùi Đức Lưu",
    description:
      "Khóa học ASP.NET Core từ uỷ viên các bài tập và dự án thực tế.",
    image: "https://img.upanh.tv/2025/03/14/aspnet-core.jpg",
    price: "đ279,000",
    originalPrice: "đ449,000",
    rating: 4.9,
    reviews: 17,
    updated: "3 năm 2025",
    duration: "32.5 giờ",
    lectures: 228,
    level: "Tất cả cấp độ",
    isHot: true,
  },
};

// Dữ liệu chi tiết cho trang All Courses
const allCoursesData: Record<string, DetailedCourse[]> = {
  "Web Development": [
    {
      id: "js-course-1",
      title: "Khóa học nhập môn toàn diện JavaScript, React",
      subtitle: "Trở thành nhà phát triển web Full-Stack với một khóa học: HTML, CSS, Javascript, Node, React, MongoDB, Web3 và DApps",
      author: "Dr. Angela Yu",
      price: "đ309,000",
      originalPrice: "đ1,799,000",
      rating: 4.7,
      reviews: 155059,
      duration: "65 giờ",
      level: "Tất cả các cấp độ",
      image: "/api/placeholder/240/135",
      isBestseller: true
    },
    {
      id: "web-course-1",
      title: "Trại huấn luyện phát triển web 2025",
      subtitle: "Trở thành nhà phát triển Full-Stack với một khóa học - HTML, CSS, Javascript, React, Node, MongoDB và nhiều hơn nữa",
      author: "Colt Steele",
      price: "đ429,000",
      originalPrice: "đ1,999,000",
      rating: 4.8,
      reviews: 239201,
      duration: "74 giờ",
      level: "Tất cả các cấp độ",
      image: "/api/placeholder/240/135"
    },
    {
      id: "js-course-2",
      title: "Khóa học JavaScript từ đầu đến 2025: Từ con số 0 đến chuyên gia",
      subtitle: "Khóa học JavaScript đặt cơ sở cho mọi thứ bạn làm với JavaScript: dự án, framework, thư viện",
      author: "Jonas Schmedtmann",
      price: "đ319,000",
      originalPrice: "đ1,699,000",
      rating: 4.7,
      reviews: 165298,
      duration: "40.5 giờ",
      level: "Tất cả các cấp độ",
      image: "/api/placeholder/240/135"
    },
    {
      id: "angular-course",
      title: "Angular - Hướng dẫn đầy đủ (Phiên bản 2025)",
      subtitle: "Làm chủ Angular từ cơ bản đến chuyên sâu và xây dựng một ứng dụng Angular từ A-Z",
      author: "Maximilian Schwarzmüller",
      price: "đ409,000",
      originalPrice: "đ1,499,000",
      rating: 4.6,
      reviews: 179757,
      duration: "36.5 giờ",
      level: "Tất cả các cấp độ",
      image: "/api/placeholder/240/135",
      isHot: true
    },
    {
      id: "html-css-course",
      title: "Xây dựng các trang web thực tiễn đẹp với HTML và CSS",
      subtitle: "Học HTML, CSS và thiết kế web từ đầu bằng cách xây dựng nhiều trang web tuyệt đẹp, responsive từ đâu dùng HTML5 và CSS3",
      author: "Jonas Schmedtmann",
      price: "đ379,000",
      originalPrice: "đ1,499,000",
      rating: 4.7,
      reviews: 185177,
      duration: "38 giờ",
      level: "Tất cả các cấp độ",
      image: "/api/placeholder/240/135"
    }
  ]
};

const EditProfile = () => {
  const router = useRouter();
  const { category } = router.query;
  const [courses, setCourses] = useState<Course[]>([]);
  const [featuredCourse, setFeaturedCourse] =
    useState<FeaturedCourseData | null>(null);
  const [detailedCourses, setDetailedCourses] = useState<DetailedCourse[]>([]);
  const [activeTab, setActiveTab] = useState("Phổ biến nhất");

  useEffect(() => {
    if (category && typeof category === "string") {
      const relatedCourses = coursesData[category] || [];
      const featured = featuredCourseData[category] || null;
      const allCourses = allCoursesData[category] || [];
      setCourses(relatedCourses);
      setFeaturedCourse(featured);
      setDetailedCourses(allCourses);
    }
  }, [category]);

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      {/* Các khóa học phổ biến */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-800">
          Các khóa học phát triển web
        </h1>
        <p className="text-gray-600 mt-2">
          Khám phá các khóa học từ các chuyên gia giàu kinh nghiệm thực tế.
        </p>
        <div className="flex space-x-4 mt-4">
          {["Phổ biến nhất", "Mới", "Xu hướng"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-medium ${
                activeTab === tab
                  ? "text-gray-800 border-b-2 border-gray-800"
                  : "text-gray-500"
              } pb-2`}
            >
              {tab}
            </button>
          ))}
        </div>
        {courses.length > 0 ? (
          <CourseSlider courses={courses} />
        ) : (
          <p>Không có khóa học nào cho danh mục này.</p>
        )}
      </div>

      {/* Khóa học nổi bật */}
      <div className="mb-16">
        <h1 className="text-3xl font-bold text-gray-800">Khóa học nổi bật</h1>
        <p className="text-gray-600 mt-2">
          Nhiều học viên thích khóa học được đánh giá cao này vì độ ứng dụng của nó.
        </p>
        {featuredCourse ? (
          <div className="mt-6">
            <FeaturedCourse {...featuredCourse} />
          </div>
        ) : (
          <p>Không có khóa học nổi bật cho danh mục này.</p>
        )}
      </div>

      {/* Phần All Courses Section */}
      <div className="mt-16 border-t pt-12">
        <AllCoursesSection 
          courses={detailedCourses}
          categoryName="Phát triển Web"
        />
      </div>
    </div>
  );
};

export default EditProfile;