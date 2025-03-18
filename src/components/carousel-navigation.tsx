import React from "react";

interface CarouselNavigationProps {
    handlePrevSlide: () => void; 
    handleNextSlide: () => void; 
    currentSlide: number; 
    totalPages: number; 
  }
  
  const CarouselNavigation: React.FC<CarouselNavigationProps> = ({
    handlePrevSlide,
    handleNextSlide,
    currentSlide,
    totalPages,
  }) => {
    return (
      <>
        <button
          onClick={handlePrevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-10"
          disabled={currentSlide === 0}
        >
          <svg
            className={`w-5 h-5 text-gray-600 ${currentSlide === 0 ? "opacity-50" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="file.svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-10"
          disabled={currentSlide === totalPages - 1}
        >
          <svg
            className={`w-5 h-5 text-gray-600 ${
              currentSlide === totalPages - 1 ? "opacity-50" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="file.svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </>
    );
  };
  
  export default CarouselNavigation;
  