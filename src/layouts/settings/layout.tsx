import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import Link from 'next/link';
import { type PropsWithChildren } from 'react';
import { useRouter } from "next/router";
import '../../app/globals.css';
import AppLayoutClient from '../app-layout-client';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        url: '/settings/profile',
        icon: null,
    },
    {
        title: 'Password',
        url: '/settings/reset-password',
        icon: null,
    },
    {
        title: 'My courese',
        url: '/settings/mycourses',
        icon: null,
    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    const router = useRouter(); 
    const currentPath = router.pathname;

    return (
        <AppLayoutClient>
            <div className="px-4 py-6">
                <Heading title="Cài đặt" description="Quản lý hồ sơ và cài đặt tài khoản của bạn." />

                <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <aside className="w-full max-w-xl lg:w-48">
                        <nav className="flex flex-col space-y-1 space-x-0">
                            {sidebarNavItems.map((item) => (
                                <Button
                                    key={item.url}
                                    size="sm"
                                    variant="ghost"
                                    asChild
                                    className={cn('w-full justify-start', {
                                        'bg-muted': currentPath === item.url,
                                    })}
                                >
                                    <Link href={item.url} prefetch>
                                        {item.title}
                                    </Link>
                                </Button>
                            ))}
                        </nav>
                    </aside>

                    <Separator className="my-6 md:hidden" />

                    <div className="flex-1">
                        <section className="space-y-12">{children}</section>
                    </div>
                </div>
            </div>
        </AppLayoutClient>
    );
}

