'use client';

import React from "react";
import Categories from "@/layouts/user/homepage/Categories";
import Banner from "@/layouts/user/homepage/Banner";
import RecommendedCourses from "@/layouts/user/homepage/RecommendedCourses";
import TopicsSection from "@/layouts/user/homepage/TopicsSection";
import "@/app/globals.css";
import AppLayoutClient from "@/layouts/app-layout-client"; 

const Homepage = () => {

  return (
    <AppLayoutClient> 
      <div className="w-full min-h-screen bg-neutral-100 dark:bg-neutral-800">
        <Categories />
        <Banner />
        <RecommendedCourses/>
        <TopicsSection />
        {/* <FeaturedCourses coursesByCategory={coursesByCategory} /> */}
        
      </div>
    </AppLayoutClient>
  );
};

export default Homepage;
