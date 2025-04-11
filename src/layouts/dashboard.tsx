import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { apiFetch } from '@/lib/api';
import "@/app/globals.css";
import * as React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Course, Payment } from '@/types/interfaces';
import { Skeleton } from '@/components/ui/skeleton';

interface Role {
    id: string;
    name: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    roles: Role[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const [users, setUsers] = React.useState<User[]>([]);
    const [payments, setPayments] = React.useState<Payment[]>([]);
    const [courses, setCourses] = React.useState<Course[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    const fetchData = React.useCallback(async () => {
        try {
            setLoading(true);
            const [usersResponse, paymentsResponse, coursesResponse] = await Promise.all([
                apiFetch<{ data: User[] }>('/users'),
                apiFetch<{ data: Payment[] }>('/payments'),
                apiFetch<{ data: Course[] }>('/courses'),
            ]);
            setUsers(usersResponse.data);
            setPayments(paymentsResponse.data);
            setCourses(coursesResponse.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

    const roleData = [
        { name: 'Admin', count: users.filter(u => u.roles.some(r => r.name === 'admin')).length },
        { name: 'User', count: users.filter(u => u.roles.some(r => r.name === 'user')).length },
    ];

    const paymentData = payments.map(p => ({
        date: new Date(p.created_at).toLocaleDateString('vi-VN'),
        amount: Number(p.amount),
    })).reduce((acc, curr) => {
        const existing = acc.find(item => item.date === curr.date);
        if (existing) {
            existing.amount += curr.amount;
        } else {
            acc.push(curr);
        }
        return acc;
    }, [] as { date: string; amount: number }[]);

    // 3. Dữ liệu cho biểu đồ phân bố giá khóa học
    const coursePriceData = courses.map(c => ({
        name: c.title,
        value: Number(c.discount_price),
    }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {loading ? (
                    <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                            <Skeleton className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        </div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                            <Skeleton className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        </div>
                    </div>
                ) : (
                    <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                        {/* Biểu đồ 1: Số lượng người dùng theo vai trò */}
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border p-4">
                            <h3 className="text-lg font-semibold mb-2">Người dùng theo vai trò</h3>
                            <BarChart width={400} height={200} data={roleData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#8884d8" />
                            </BarChart>
                        </div>

                        {/* Biểu đồ 2: Tổng thanh toán theo thời gian */}
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border p-4">
                            <h3 className="text-lg font-semibold mb-2">Thanh toán theo thời gian</h3>
                            <LineChart width={400} height={200} data={paymentData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip formatter={(value: number) => `${value.toLocaleString()} VNĐ`} />
                                <Line type="monotone" dataKey="amount" stroke="#82ca9d" />
                            </LineChart>
                        </div>
                    </div>
                )}
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min p-4">
                    <h3 className="text-lg font-semibold mb-2">Phân bố giá khóa học</h3>
                    <PieChart width={800} height={300}>
                        <Pie
                            data={coursePriceData}
                            cx="50%"
                            cy="45%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value.toLocaleString()} VNĐ`}
                        >
                            {coursePriceData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `${value.toLocaleString()} VNĐ`} />
                    </PieChart>
                </div>
            </div>
        </AppLayout>
    );
}