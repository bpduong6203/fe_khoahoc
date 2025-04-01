'use client';
import React from 'react';
import DetailsCourse from '@/layouts/user/course/DetailsCourse';
import AppLayoutClient from '@/layouts/app-layout-client';
import "../../app/globals.css";

export default function DetailsCousrePage () {
  return (
    <AppLayoutClient>
      <DetailsCourse />
    </AppLayoutClient>
  );
}