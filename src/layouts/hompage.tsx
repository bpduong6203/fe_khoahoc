import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaBell, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import "@/app/globals.css";

// Dữ liệu giả lập cho danh sách khóa học theo danh mục
const coursesByCategory: { [key: string]: any[] } = {
  "TECHNOLOGY & SOFTWARE": [
    {
      title: "The Advanced Web Developer Bootcamp",
      author: "Sarah Lee",
      price: "$105.99",
      rating: 4.8,
      participants: "2,500+",
      image: "/path-to-course-image-1.jpg",
    },
    {
      title: "The Complete 2023 PHP Full Stack Web Developer Bootcamp",
      author: "Sarah Lee",
      price: "$79.99",
      rating: 4.9,
      participants: "4,235+",
      image: "/path-to-course-image-2.jpg",
    },
    {
      title: "Internet and Web Development Fundamentals",
      author: "Sarah Lee",
      price: "$79.99",
      rating: 4.8,
      participants: "20,455+",
      image: "/path-to-course-image-3.jpg",
    },
    {
      title: "CSS, Bootstrap, JavaScript, Web Development Course",
      author: "Sarah Lee",
      price: "$49.99",
      rating: 4.9,
      participants: "2,500+",
      image: "/path-to-course-image-4.jpg",
    },
    {
      title: "Advanced JavaScript Concepts",
      author: "John Doe",
      price: "$89.99",
      rating: 4.7,
      participants: "3,000+",
      image: "/path-to-course-image-5.jpg",
    },
    {
      title: "React for Beginners",
      author: "Jane Smith",
      price: "$69.99",
      rating: 4.8,
      participants: "5,000+",
      image: "/path-to-course-image-6.jpg",
    },
    {
      title: "Node.js and Express Masterclass",
      author: "John Doe",
      price: "$99.99",
      rating: 4.9,
      participants: "2,800+",
      image: "/path-to-course-image-7.jpg",
    },
    {
      title: "Full Stack Development with MERN",
      author: "Jane Smith",
      price: "$109.99",
      rating: 4.8,
      participants: "4,500+",
      image: "/path-to-course-image-8.jpg",
    },
  ],
  "IT & SOFTWARE": [
    {
      title: "Cybersecurity Essentials",
      author: "John Doe",
      price: "$89.99",
      rating: 4.7,
      participants: "3,000+",
      image: "/path-to-course-image-5.jpg",
    },
    {
      title: "AWS Certified Solutions Architect",
      author: "Jane Smith",
      price: "$99.99",
      rating: 4.8,
      participants: "5,000+",
      image: "/path-to-course-image-6.jpg",
    },
    {
      title: "Docker for Beginners",
      author: "John Doe",
      price: "$59.99",
      rating: 4.6,
      participants: "2,000+",
      image: "/path-to-course-image-7.jpg",
    },
    {
      title: "Linux Administration Bootcamp",
      author: "Jane Smith",
      price: "$69.99",
      rating: 4.9,
      participants: "1,500+",
      image: "/path-to-course-image-8.jpg",
    },
  ],
  "DESIGN & CREATIVE ARTS": [
    {
      title: "Graphic Design Masterclass",
      author: "Emily Brown",
      price: "$79.99",
      rating: 4.8,
      participants: "3,500+",
      image: "/path-to-course-image-9.jpg",
    },
    {
      title: "UI/UX Design Fundamentals",
      author: "Emily Brown",
      price: "$69.99",
      rating: 4.7,
      participants: "2,800+",
      image: "/path-to-course-image-10.jpg",
    },
    {
      title: "Adobe Photoshop for Beginners",
      author: "Michael Green",
      price: "$49.99",
      rating: 4.6,
      participants: "4,000+",
      image: "/path-to-course-image-11.jpg",
    },
    {
      title: "3D Modeling with Blender",
      author: "Michael Green",
      price: "$59.99",
      rating: 4.9,
      participants: "1,200+",
      image: "/path-to-course-image-12.jpg",
    },
  ],
  "BUSINESS & MANAGEMENT": [],
  "HEALTH & WELLNESS": [],
  "MARKETING": [],
  "LIFESTYLE": [],
};

const Homepage = () => {
  const [showSubMenu, setShowSubMenu] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("TECHNOLOGY & SOFTWARE");

  const userMenuTimeoutRef = useRef<number | null>(null);
  const subMenuTimeoutRef = useRef<number | null>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const subMenus: { [key: string]: string[] } = {
    "Phát triển": [
      "Web Development",
      "Mobile Development",
      "Programming Languages",
      "Game Development",
    ],
    "CNTT & Phần mềm": ["Database Design & Development", "Software Testing"],
  };

  const adjustMenuPosition = () => {
    if (userMenuRef.current) {
      const menu = userMenuRef.current;
      const rect = menu.getBoundingClientRect();
      const windowWidth = window.innerWidth;

      if (rect.left < 0) {
        menu.style.left = "0";
        menu.style.right = "auto";
      } else if (rect.right > windowWidth) {
        menu.style.right = "0";
        menu.style.left = "auto";
      } else {
        menu.style.right = "0";
        menu.style.left = "auto";
      }
    }
  };

  useEffect(() => {
    if (showUserMenu) {
      adjustMenuPosition();
    }
  }, [showUserMenu]);

  const handleUserMenuEnter = () => {
    if (userMenuTimeoutRef.current) {
      clearTimeout(userMenuTimeoutRef.current);
      userMenuTimeoutRef.current = null;
    }
    setShowUserMenu(true);
  };

  const handleUserMenuLeave = () => {
    userMenuTimeoutRef.current = window.setTimeout(() => {
      setShowUserMenu(false);
    }, 200);
  };

  const handleSubMenuEnter = (category: string) => {
    if (subMenuTimeoutRef.current) {
      clearTimeout(subMenuTimeoutRef.current);
      subMenuTimeoutRef.current = null;
    }
    setShowSubMenu(category);
  };

  const handleSubMenuLeave = () => {
    subMenuTimeoutRef.current = window.setTimeout(() => {
      setShowSubMenu(null);
    }, 200);
  };

  const handleNextSlide = () => {
    const courses = coursesByCategory[selectedCategory];
    const cardsPerPage = 4;
    const totalPages = Math.ceil(courses.length / cardsPerPage);
    setCurrentSlide((prev) => (prev + 1) % totalPages);
  };

  const handlePrevSlide = () => {
    const courses = coursesByCategory[selectedCategory];
    const cardsPerPage = 4;
    const totalPages = Math.ceil(courses.length / cardsPerPage);
    setCurrentSlide((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentSlide(0); // Reset slide về đầu khi chuyển danh mục
  };

  const shouldShowNavigation = coursesByCategory[selectedCategory].length > 4;
  const totalPages = Math.ceil(coursesByCategory[selectedCategory].length / 4);

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-6 shadow-md bg-white">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-purple-700">WEB LUA GA</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm bất cứ thứ gì"
              className="px-4 py-2 border rounded-full w-[800px] focus:outline-none"
            />
            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        <div className="relative flex items-center space-x-6">
          <a href="#" className="text-sm text-gray-700">
            Khóa học của bạn
          </a>
          <a href="#" className="text-sm text-gray-700">
            Khóa học chia sẻ
          </a>
          <FaShoppingCart className="text-gray-700 cursor-pointer" />
          <FaBell className="text-gray-700 cursor-pointer" />
          <div
            className="relative inline-block"
            onMouseEnter={handleUserMenuEnter}
            onMouseLeave={handleUserMenuLeave}
          >
            <FaUserCircle className="text-gray-700 cursor-pointer text-2xl" />
            {showUserMenu && (
              <div
                ref={userMenuRef}
                className="absolute right-0 top-full mt-2 w-64 bg-white shadow-lg rounded-lg border border-gray-200 z-50 transition-opacity duration-300 opacity-100"
                style={{ animation: "fadeIn 0.2s ease-in-out" }}
                onMouseEnter={handleUserMenuEnter}
                onMouseLeave={handleUserMenuLeave}
              >
                <style>
                  {`
                    @keyframes fadeIn {
                      from { opacity: 0; }
                      to { opacity: 1; }
                    }
                  `}
                </style>
                <div className="flex items-center p-4 border-b">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                    <span className="text-xl">T</span>
                  </div>
                  <div>
                    <p className="font-semibold">Lê Thanh Trúc</p>
                    <p className="text-sm text-gray-500">Truclek2@gmail.com</p>
                  </div>
                </div>
                <ul className="py-2">
                  {[
                    "Giỏ hàng của tôi",
                    "Danh sách mong muốn",
                    "Đăng nhập Udemy",
                    "Cài đặt tài khoản",
                    "Phương thức thanh toán",
                    "Đăng ký",
                    "Lịch sử mua hàng",
                    "Ngôn ngữ",
                    "Trợ giúp",
                    "Chính sách bảo mật",
                    "Đăng xuất",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Categories */}
      <div className="relative px-6 py-4">
        <div className="flex justify-center space-x-6 py-4 border-b">
          {[
            "Phát triển",
            "Việc kinh doanh",
            "Tài chính & Kế toán",
            "CNTT & Phần mềm",
            "Năng suất văn phòng",
            "Phát triển cá nhân",
            "Thiết kế",
            "Marketing",
            "Sức khỏe & Thể thao",
            "Âm nhạc",
          ].map((category) => (
            <div
              key={category}
              className="relative"
              onMouseEnter={() => handleSubMenuEnter(category)}
              onMouseLeave={handleSubMenuLeave}
            >
              <a
                href="#"
                className="text-sm text-gray-600 hover:underline cursor-pointer"
              >
                {category}
              </a>
              {showSubMenu === category && subMenus[category] && (
                <div
                  className="absolute left-0 top-full mt-2 w-64 bg-black text-white shadow-lg rounded-lg z-50"
                  onMouseEnter={() => {
                    if (subMenuTimeoutRef.current) {
                      clearTimeout(subMenuTimeoutRef.current);
                      subMenuTimeoutRef.current = null;
                    }
                  }}
                  onMouseLeave={handleSubMenuLeave}
                >
                  <ul className="py-2">
                    {subMenus[category].map((subItem, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 text-sm hover:bg-gray-700 cursor-pointer"
                      >
                        {subItem}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Banner */}
      <div className="flex justify-center py-12 px-6">
        <div
          className="relative w-full max-w-6xl h-80 bg-yellow-200 rounded-lg shadow-md flex items-center justify-between px-12"
          style={{
            backgroundImage: 'url("/path-to-your-banner-image.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-md">
            <h2 className="text-3xl font-bold text-gray-800">
              Mã hóa tương lai của bạn
            </h2>
            <p className="text-gray-600 mt-4 text-lg">
              Kiểm soát sự nghiệp của bạn. Học những kỹ năng mới nhất trong{" "}
              <a href="#" className="text-purple-700 underline">
                phát triển web
              </a>
              .
            </p>
          </div>
          <div className="w-1/3">
            <img
              src="/path-to-your-illustration.png"
              alt="Illustration"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      <div className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold">Học gì tiếp theo ?</h2>
        <p className="text-gray-600 mt-2 text-lg">
          Đề xuất các khóa học hợp theo nhu cầu tìm kiếm của bạn !
        </p>

        {/* Tabs danh mục */}
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
              onClick={() => handleCategorySelect(tab)}
              className={`text-sm font-medium pb-2 transition-colors whitespace-nowrap ${tab === selectedCategory
                ? "text-black border-b-2 border-black"
                : "text-gray-600 hover:text-gray-800"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Danh sách khóa học với slider */}
        <div className="relative mt-8">
          {coursesByCategory[selectedCategory].length > 0 ? (
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                  }}
                >
                  {Array.from(
                    { length: Math.ceil(coursesByCategory[selectedCategory].length / 4) },
                    (_, pageIndex) => (
                      <div
                        key={pageIndex}
                        className="w-full flex space-x-4 flex-shrink-0"
                      >
                        {coursesByCategory[selectedCategory]
                          .slice(pageIndex * 4, (pageIndex + 1) * 4)
                          .map((course: any, index: number) => (
                            <div
                              key={index}
                              className="w-[24%] bg-white flex-shrink-0"
                            >
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
                                  <p className="text-xs text-gray-500 mt-1">
                                    {course.author}
                                  </p>
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

              {/* Nút điều hướng */}
              {shouldShowNavigation && (
                <>
                  <button
                    onClick={handlePrevSlide}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-10"
                    disabled={currentSlide === 0}
                  >
                    <svg
                      className={`w-5 h-5 text-gray-600 ${currentSlide === 0 ? "opacity-50" : ""
                        }`}
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
                      className={`w-5 h-5 text-gray-600 ${currentSlide === totalPages - 1 ? "opacity-50" : ""
                        }`}
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
            <p className="text-gray-600 mt-4">
              Chưa có khóa học nào trong danh mục này.
            </p>
          )}
        </div>

        {/* Pagination dots */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2 h-2 rounded-full ${currentSlide === i ? "bg-gray-800" : "bg-gray-300"
                  }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Topics Section */}
      <div className="px-6 py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold">Khám phá nhiều chủ đề</h2>
          <p className="text-gray-600 mt-2 text-lg">
            Học các kỹ năng mới nhất với các khóa học được cập nhật liên tục
          </p>

          <div className="grid grid-cols-3 gap-6 mt-8">
            {[
              "Web Development",
              "Data Science",
              "Mobile Development",
              "Programming Languages",
              "Game Development",
              "Databases",

            ].map((topic, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-lg">{topic}</h3>
                <p className="text-gray-600 mt-2 text-sm">
                  {Math.floor(Math.random() * 200) + 100} khóa học
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button className="px-6 py-3 border border-gray-800 text-gray-800 font-medium rounded hover:bg-gray-100 transition-colors">
              Xem tất cả chủ đề
            </button>
          </div>
        </div>
      </div>

      {/* Featured Courses with larger cards */}
      <div className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold">Khóa học nổi bật</h2>
        <p className="text-gray-600 mt-2 text-lg">
          Các khóa học được đánh giá cao và phổ biến nhất
        </p>

        <div className="grid grid-cols-2 gap-6 mt-8">
          {coursesByCategory["TECHNOLOGY & SOFTWARE"].slice(0, 4).map((course, index) => (
            <div key={index} className="border rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex">
              <div className="w-1/3 bg-gray-200">
                <img
                  src={course.image || "/path-to-default-image.jpg"}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-2/3 p-4">
                <h3 className="font-semibold text-gray-800 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  {course.author}
                </p>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500 ml-1">
                    ({course.participants})
                  </span>
                </div>
                <p className="text-sm font-bold text-gray-800 mt-2">
                  {course.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white px-6 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Học tập</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Danh mục
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Tải ứng dụng
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Khóa học miễn phí
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Đăng ký doanh nghiệp
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Trợ giúp</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Hỗ trợ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Liên hệ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Điều khoản sử dụng
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Về chúng tôi</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Nghề nghiệp
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Đối tác
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Tải ứng dụng</h3>
            <div className="space-y-3">
              <a href="#" className="block">
                <img src="/path-to-app-store.png" alt="App Store" className="h-10" />
              </a>
              <a href="#" className="block">
                <img src="/path-to-google-play.png" alt="Google Play" className="h-10" />
              </a>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default Homepage;