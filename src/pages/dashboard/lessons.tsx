import LessonsPage from "@/layouts/dashboard/lessons";
import AppLayout from "@/layouts/app-layout";
import Head from "next/head";

export default function Lessons() {
    return (
        <>
            <Head>
                <title>Lessons</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AppLayout>
                <LessonsPage />
            </AppLayout>
        </>
    );
}