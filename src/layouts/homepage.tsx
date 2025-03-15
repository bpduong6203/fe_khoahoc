'use client';

import React, { useState } from "react";
import Navbar from "@/layouts/homepage/Navbar";
import Categories from "@/layouts/homepage/Categories";
import Banner from "@/layouts/homepage/Banner";
import RecommendedCourses from "@/layouts/homepage/RecommendedCourses";
import TopicsSection from "@/layouts/homepage/TopicsSection";
import FeaturedCourses from "@/layouts/homepage/FeaturedCourses";
import "@/app/globals.css";
import AppLayoutClient from "@/layouts/app-layout-client"; 

// Định nghĩa interface cho một khóa học
interface Course {
  title: string;
  author: string;
  price: string;
  rating: number;
  participants: string;
  image: string;
}

// Dữ liệu giả lập cho danh sách khóa học theo danh mục
const coursesByCategory: { [key: string]: Course[] } = {
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
  const [selectedCategory, setSelectedCategory] = useState("TECHNOLOGY & SOFTWARE");

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <AppLayoutClient> 
      <div className="w-full min-h-screen bg-neutral-100 dark:bg-neutral-800">
        <Categories />
        <Banner />
        <RecommendedCourses
          coursesByCategory={coursesByCategory}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
        <TopicsSection />
        <FeaturedCourses coursesByCategory={coursesByCategory} />
        
      </div>
    </AppLayoutClient>
  );
};

export default Homepage;
