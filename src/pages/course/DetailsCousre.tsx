'use client';
import React from 'react';
import DetailsCourse from '@/layouts/course/DetailsCourse';
import AppLayoutClient from '@/layouts/app-layout-client';
import "../../app/globals.css";

const DetailsCousrePage = () => {
  return (
    <AppLayoutClient>
      <DetailsCourse />
    </AppLayoutClient>
  );
};

export default DetailsCousrePage;