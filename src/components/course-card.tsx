import React from "react";

interface Course {
  title: string;
  author: string;
  price: string;
  rating: number;
  participants: string;
  image?: string;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="dark:bg-neutral-500 rounded-lg">
      <div className="border rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <div className="h-40 dark:bg-neutral-500 rounded-t-lg overflow-hidden">
          <img
            src={course.image || "file.svg"}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-sm font-semibold line-clamp-2 h-10">{course.title}</h3>
          <p className="text-xs mt-1">{course.author}</p>
          <div className="flex items-center mt-1">
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1">★</span>
              <span className="text-sm font-medium">{course.rating}</span>
            </div>
            <span className="text-xs ml-1">({course.participants})</span>
          </div>
          <p className="text-sm font-bold mt-1">{course.price}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
