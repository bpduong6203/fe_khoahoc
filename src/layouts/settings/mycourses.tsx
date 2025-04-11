import * as React from "react";
import { apiFetch } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface Teacher {
    id: string;
    name: string;
    email: string;
}

interface Course {
    id: string;
    title: string;
    description: string;
    price: string;
    discount_price: string;
    thumbnail_url: string;
    duration: number;
    status: string;
    rating: string;
    teacher: Teacher;
}

interface Enrollment {
    id: string;
    user_id: string;
    course_id: string;
    expiry_date: string;
    payment_status: string;
    payment_method: string;
    transaction_id: string | null;
    price: string;
    status: string;
    completion_date: string | null;
    created_at: string;
    updated_at: string;
    course: Course;
}

export default function MyCoursesPage() {
    const [enrollments, setEnrollments] = React.useState<Enrollment[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');

    // Wrap fetchEnrollments trong useCallback
    const fetchEnrollments = React.useCallback(async () => {
        try {
            setLoading(true);
            const response: { data: Enrollment[] } = await apiFetch('/enrollments');
            const sortedEnrollments = response.data.sort((a: Enrollment, b: Enrollment) =>
                sortOrder === 'asc'
                    ? a.course.title.localeCompare(b.course.title)
                    : b.course.title.localeCompare(a.course.title)
            );
            setEnrollments(sortedEnrollments);
        } catch (error) {
            console.error('Error fetching enrollments:', error);
        } finally {
            setLoading(false);
        }
    }, [sortOrder]);

    React.useEffect(() => {
        fetchEnrollments();
    }, [fetchEnrollments]);

    const toggleSortOrder = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        setEnrollments([...enrollments].sort((a, b) =>
            newSortOrder === 'asc'
                ? a.course.title.localeCompare(b.course.title)
                : b.course.title.localeCompare(a.course.title)
        ));
    };

    const getBadgeVariant = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'default'; // Màu xanh
            case 'completed':
                return 'secondary'; // Màu xám
            case 'expired':
                return 'destructive'; // Màu đỏ
            default:
                return 'outline';
        }
    };

    return (
        <Card className='m-1'>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    Danh sách khóa học đã đăng ký
                    <Button variant="secondary" disabled>
                        Đăng ký thêm
                    </Button>
                </CardTitle>
            </CardHeader>

            <CardContent>
                {loading ? (
                    <div>
                        <Skeleton className="h-10 w-full mb-2" />
                        <Skeleton className="h-10 w-full mb-2" />
                        <Skeleton className="h-10 w-full mb-2" />
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-sm">
                        <table className="w-full bg-neutral-50 border rounded-2xl shadow">
                            <thead>
                                <tr className="bg-neutral-200 uppercase text-xs tracking-wide">
                                    <th
                                        className="px-4 py-3 text-left cursor-pointer font-medium hover:text-neutral-900 transition-colors"
                                        onClick={toggleSortOrder}
                                    >
                                        Tên khóa học {sortOrder === 'asc' ? '↑' : '↓'}
                                    </th>
                                    <th className="px-4 py-3 text-left font-medium">Giáo viên</th>
                                    <th className="px-4 py-3 text-left font-medium">Giá</th>
                                    <th className="px-4 py-3 text-left font-medium">Trạng thái</th>
                                    <th className="px-4 py-3 text-left font-medium">Ngày đăng ký</th>
                                    <th className="px-4 py-3 text-left font-medium">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {enrollments.map((enrollment) => (
                                    <tr key={enrollment.id} className="border-t border-neutral-200 hover:bg-neutral-100 transition-colors">
                                        <td className="px-4 py-2">{enrollment.course.title}</td>
                                        <td className="px-4 py-2">{enrollment.course.teacher.name}</td>
                                        <td className="px-4 py-2">{Number(enrollment.price).toLocaleString()} VNĐ</td>
                                        <td className="px-4 py-2">
                                            <Badge variant={getBadgeVariant(enrollment.status)}>
                                                {enrollment.status}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-2">
                                            {new Date(enrollment.created_at).toLocaleDateString('vi-VN')}
                                        </td>
                                        <td className="px-4 py-2">
                                            <Link href={`/courses/${enrollment.course.id}`} passHref>
                                                <Button variant="outline" size="sm" >
                                                    Xem chi tiết
                                                </Button>
                                            </Link>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}