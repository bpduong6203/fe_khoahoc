import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <Card className="h-full min-h-[400px] flex flex-col shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <CardHeader className="p-0">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-40 object-cover"
        />
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="font-semibold text-gray-800 line-clamp-2">
          {course.title}
        </CardTitle>
        <p className="text-sm text-gray-500 mt-2">{course.author}</p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-400 mr-1">★</span>
          <span className="text-sm font-medium">{course.rating}</span>
          <span className="text-xs text-gray-500 ml-1">
            ({course.participants})
          </span>
        </div>
        <div className="flex items-center mt-2">
          <p className="text-sm font-bold text-gray-800">{course.price}</p>
          <p className="text-sm text-gray-500 line-through ml-2">
            {course.originalPrice}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {course.isBestseller && (
          <Badge variant="secondary" className="text-blue-600 bg-blue-100">
            Bestseller
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
