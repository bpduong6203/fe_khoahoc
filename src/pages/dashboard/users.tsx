import UsersPage from "@/layouts/dashboard/user";
import AppLayout from "@/layouts/app-layout";
import Head from "next/head";

export default function Users() {
    return (
        <>
            <Head>
                <title>Users</title>
                <meta name="description" content="Users" />
            </Head>
            <AppLayout>
                <UsersPage />
            </AppLayout>
        </>
    );
}