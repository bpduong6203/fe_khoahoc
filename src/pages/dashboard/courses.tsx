import React from "react";
import AppLayout from "@/layouts/app-layout";
import CoursesPage from "@/layouts/dashboard/courses";
import Head from "next/head";

export default function CoursesPages() {
    return (
        <>
            <Head>
                <title>Courses</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AppLayout>
                <CoursesPage />
            </AppLayout>
        </>

    );
}