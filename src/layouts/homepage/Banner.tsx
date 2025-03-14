import React, { useState, useEffect } from "react";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Dữ liệu cho 4 trang với màu nền khác nhau
  const slides = [
    {
      title: "Mã hóa tương lai của bạn",
      description: "Kiểm soát sự nghiệp của bạn. Học những kỹ năng mới nhất trong phát triển web.",
      imageUrl: "https://img.upanh.tv/2025/03/14/development-4536630_640.webp",
      linkText: "phát triển web",
      linkUrl: "#",
      bgColor: "bg-yellow-200"
    },
    {
      title: "Làm chủ JavaScript",
      description: "Xây dựng ứng dụng web hiện đại với JavaScript, React và NodeJS.",
      imageUrl: "https://img.upanh.tv/2025/03/14/3d-javascript-logo-design-free-png.webp",
      linkText: "khóa học JavaScript",
      linkUrl: "#",
      bgColor: "bg-blue-200"
    },
    {
      title: "Thiết kế UI/UX",
      description: "Tạo ra giao diện người dùng đẹp mắt và trải nghiệm tuyệt vời.",
      imageUrl: "https://img.upanh.tv/2025/03/14/Pngtree3d-rendering-of-application-development_6015618-1.png",
      linkText: "khóa học UI/UX",
      linkUrl: "#",
      bgColor: "bg-green-200"
    },
    {
      title: "Trở thành Full-stack",
      description: "Làm chủ cả frontend và backend để tạo ứng dụng web toàn diện.",
      imageUrl: "https://img.upanh.tv/2025/03/14/2895977.webp",
      linkText: "khóa học full-stack",
      linkUrl: "#",
      bgColor: "bg-purple-200"
    }
  ];

  // Tự động chuyển slide sau mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  // Xử lý khi nhấp vào nút điều hướng
  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <div className="flex justify-center py-12 px-6">
      <div className="relative w-full max-w-6xl overflow-hidden rounded-lg shadow-md">
        {/* Container cho tất cả các slides */}
        <div 
          className="flex transition-transform duration-500 ease-in-out" 
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`min-w-full h-80 ${slide.bgColor} flex items-center justify-between px-12`}
              style={{
                backgroundImage: 'url("/path-to-your-banner-image.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="max-w-md">
                <h2 className="text-3xl font-bold text-gray-800">{slide.title}</h2>
                <p className="text-gray-600 mt-4 text-lg">
                  {slide.description.split(slide.linkText)[0]}
                  <a href={slide.linkUrl} className="text-purple-700 underline">
                    {slide.linkText}
                  </a>
                  {slide.description.split(slide.linkText)[1] || ""}
                </p>
              </div>
              <div className="w-1/3">
                <img
                  src={slide.imageUrl}
                  alt="Illustration"
                  className="w-full h-auto"
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Nút điều hướng tròn */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? "bg-purple-700" : "bg-gray-300"
              }`}
              aria-label={`Đi đến trang ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;