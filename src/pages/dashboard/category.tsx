import React from "react";
import CategoriesPage from "@/layouts/dashboard/category";
import AppLayout from "@/layouts/app-layout";
import Head from "next/head";

export default function Categories() {
    return (
        <>
            <Head>
                <title>Categories</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AppLayout>
                <CategoriesPage />
            </AppLayout>
        </>

    );
}