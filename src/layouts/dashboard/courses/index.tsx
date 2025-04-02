import React, { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';
import GenericModal from '@/components/generic-modal';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Course {
    id: string;
    title: string;
    description?: string;
    category_id?: string;
    price: number;
    discount_price?: number;
    duration?: number;
    level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
    status: 'Draft' | 'Published' | 'Archived';
}

interface Category {
    id: string;
    name: string;
    description?: string | null;
    parent_id?: string | null;
    status: 'Active' | 'Inactive';
}

interface Field {
    name: string;
    label: string;
    type?: 'text' | 'textarea' | 'select' | 'number';
    placeholder?: string;
    required?: boolean;
    inline?: boolean;
    options?: { value: string; label: string }[];
}

export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    useEffect(() => {
        fetchCourses();
        fetchCategories();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const response = await apiFetch('/courses');
            const sortedCourses = response.data.sort((a: Course, b: Course) =>
                sortOrder === 'asc'
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title)
            );
            setCourses(sortedCourses);
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await apiFetch('/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const toggleSortOrder = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        setCourses([...courses].sort((a, b) =>
            newSortOrder === 'asc'
                ? a.title.localeCompare(b.title)
                : b.title.localeCompare(a.title)
        ));
    };

    const openCreateModal = () => {
        setSelectedCourse(null);
        setModalOpen(true);
    };

    const openEditModal = (course: Course) => {
        setSelectedCourse(course);
        setModalOpen(true);
    };

    const handleSave = () => {
        fetchCourses();
        setModalOpen(false);
    };

    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    const courseFields: Field[] = [
        { name: "title", label: "Tiêu đề", type: "text", required: true },
        { name: "description", label: "Mô tả", type: "textarea" },
        {
            name: "category_id",
            label: "Danh mục",
            type: "select",
            options: categoryOptions,
            placeholder: "Chọn danh mục",
        },
        { name: "price", label: "Giá", type: "number", required: true, inline: true },
        { name: "discount_price", label: "Giá giảm", type: "number", inline: true },
        { name: "duration", label: "Thời lượng (phút)", type: "number" },
        {
            name: "level",
            label: "Cấp độ",
            type: "select",
            options: [
                { value: "Beginner", label: "Người mới" },
                { value: "Intermediate", label: "Trung cấp" },
                { value: "Advanced", label: "Nâng cao" },
                { value: "All Levels", label: "Tất cả cấp độ" },
            ],
            inline: true,
        },
        {
            name: "status",
            label: "Trạng thái",
            type: "select",
            options: [
                { value: "Draft", label: "Bản nháp" },
                { value: "Published", label: "Đã xuất bản" },
                { value: "Archived", label: "Đã lưu trữ" },
            ],
            inline: true,
        },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    Danh sách khóa học
                    <Button onClick={openCreateModal} variant="secondary" className="px-4 py-2">
                        Tạo mới
                    </Button>
                </CardTitle>
            </CardHeader>

            <CardContent>
                {loading ? (
                    <p className="text-center">Đang tải...</p>
                ) : (
                    <div className="overflow-x-auto rounded-sm">
                        <table className="min-w-full bg-neutral-50 border rounded-2xl shadow">
                            <thead>
                                <tr className="bg-neutral-200 uppercase text-xs tracking-wide">
                                    <th
                                        className="px-4 py-3 text-left cursor-pointer font-medium hover:text-neutral-900 transition-colors"
                                        onClick={toggleSortOrder}
                                    >
                                        Tiêu đề {sortOrder === 'asc' ? '↑' : '↓'}
                                    </th>
                                    <th className="px-4 py-3 text-left font-medium">Mô tả</th>
                                    <th className="px-4 py-3 text-left font-medium">Giá</th>
                                    <th className="px-4 py-3 text-left font-medium">Trạng thái</th>
                                    <th className="px-4 py-3 text-left font-medium">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course) => (
                                    <tr key={course.id} className="border-t border-neutral-200 hover:bg-neutral-100 transition-colors">
                                        <td className="px-4 py-2">{course.title}</td>
                                        <td className="px-4 py-2">{course.description || 'N/A'}</td>
                                        <td className="px-4 py-2">{course.price}</td>
                                        <td className="px-4 py-2">{course.status}</td>
                                        <td className="px-4 py-2">
                                            <Button
                                                onClick={() => openEditModal(course)}
                                                variant="outline"
                                            >
                                                Sửa
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <GenericModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title={selectedCourse ? 'Sửa khóa học' : 'Tạo khóa học mới'}
                    initialData={selectedCourse || {}}
                    fields={courseFields}
                    apiEndpoint={selectedCourse ? `/courses/${selectedCourse.id}` : '/courses'}
                    method={selectedCourse ? 'PUT' : 'POST'}
                    onSave={handleSave}
                />
            </CardContent>

        </Card>
    );
}