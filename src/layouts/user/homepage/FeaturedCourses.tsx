import React from "react";
import Link from "next/link";
import HeadingSmall from "@/components/heading-small";
import Heading from "@/components/heading";

interface Course {
  title: string;
  author: string;
  price: string;
  rating: number;
  participants: string;
  image: string;
}

interface FeaturedCoursesProps {
  coursesByCategory: {
    [key: string]: Course[];
  };
}

const FeaturedCourses: React.FC<FeaturedCoursesProps> = ({ coursesByCategory }) => {
  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <Heading title="Khóa học nổi bật" />
      <HeadingSmall title="Các khóa học được đánh giá cao và phổ biến nhất" />

      <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-2">
        {coursesByCategory["TECHNOLOGY & SOFTWARE"] &&
          coursesByCategory["TECHNOLOGY & SOFTWARE"].slice(0, 4).map((course, index) => (
            <Link
              key={index}
              href="/course/DetailsCousre"
              className="border rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex"
            >
              <div className="w-1/3 bg-neutral-100 dark:bg-neutral-500">
                <img
                  src={course.image || "file.svg"}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-2/3 p-4 bg-neutral-200 dark:bg-neutral-400">
                <h3 className="font-semibold text-gray-800 dark:text-neutral-50 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-neutral-100 mt-2">
                  {course.author}
                </p>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-neutral-200 ml-1">
                    ({course.participants})
                  </span>
                </div>
                <p className="text-sm font-bold text-gray-800 dark:text-neutral-100 mt-2">
                  {course.price}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default FeaturedCourses;