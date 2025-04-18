import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import Link from 'next/link';
import { BookOpen, ClipboardList, Folder, Layers, LayoutGrid, ReceiptText, Tags, UserCheck } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Users',
        url: '/dashboard/users',
        icon: UserCheck,
    },
    {
        title: 'Category',
        url: '/dashboard/category',
        icon: Tags,
    },
    {
        title: 'Courses',
        url: '/dashboard/courses',
        icon: ClipboardList,
    },
    {
        title: 'Lessons',
        url: '/dashboard/lessons',
        icon: Layers,
    },
    {
        title: 'Billing',
        url: '/dashboard/billing',
        icon: ReceiptText,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        url: '#',
        icon: Folder,
    },
    {
        title: 'Khoá học',
        url: '/',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" passHref>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
