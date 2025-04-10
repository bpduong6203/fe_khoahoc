import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface FeaturedCourseProps {
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

const FeaturedCourse: React.FC<FeaturedCourseProps> = ({
  title,
  author,
  description,
  image,
  price,
  originalPrice,
  rating,
  reviews,
  updated,
  duration,
  lectures,
  level,
  isHot,
}) => {
  return (
    <Card className="flex flex-col md:flex-row shadow-sm hover:shadow-md transition-shadow">
      <div className="md:w-1/3 w-full h-48 md:h-auto">
        <Image
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-t-md md:rounded-l-lg md:rounded-t-none"
        />
      </div>
      <div className="md:w-2/3 w-full p-4 flex flex-col justify-between">
        <CardHeader className="p-0 mb-2">
          <CardTitle className="font-semibold text-gray-800">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <p className="text-sm text-gray-500">{author}</p>
          <p className="text-sm text-gray-600 mt-2 line-clamp-3">
            {description}
          </p>
          <div className="flex items-center mt-2">
            <span className="text-yellow-400 mr-1">★</span>
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-xs text-gray-500 ml-1">({reviews})</span>
            {isHot && (
              <Badge variant="secondary" className="ml-2 text-red-600 bg-red-100">
                Mới & Nóng
              </Badge>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Cập nhật tháng {updated} • Thời lượng {duration} • {lectures} bài giảng • {level}
          </p>
        </CardContent>
        <CardFooter className="p-0 mt-3">
          <div className="flex items-center">
            <p className="text-sm font-bold text-gray-800">{price}</p>
            <p className="text-sm text-gray-500 line-through ml-2">
              {originalPrice}
            </p>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default FeaturedCourse;
