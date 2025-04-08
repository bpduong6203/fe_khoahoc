import PaymentsPage from "@/layouts/dashboard/payments";
import AppLayout from "@/layouts/app-layout";
import Head from "next/head";

export default function BillingPage() {
    return (
        <>
            <Head>
                <title>Billing</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AppLayout>
                <PaymentsPage />
            </AppLayout>
        </>
    );
}