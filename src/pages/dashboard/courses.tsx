import React from "react";
import AppLayout from "@/layouts/app-layout";
import CoursesPage from "@/layouts/dashboard/courses";

export default function CoursesPages (){
    return(
        <AppLayout>
            <CoursesPage/>
        </AppLayout>
    );
}