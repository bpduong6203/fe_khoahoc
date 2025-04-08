import React, { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';
import GenericModal from '@/components/generic-modal';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Category, Field } from '@/types/interfaces';


export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await apiFetch('/categories');
            const sortedCategories = response.data.sort((a: Category, b: Category) =>
                sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
            );
            setCategories(sortedCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleSortOrder = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        setCategories([...categories].sort((a, b) =>
            newSortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        ));
    };

    const openCreateModal = () => {
        setSelectedCategory(null);
        setModalOpen(true);
    };

    const openEditModal = (category: Category) => {
        setSelectedCategory(category);
        setModalOpen(true);
    };

    const handleSave = () => {
        fetchCategories();
        setModalOpen(false);
    };


    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    const categoryFields: Field[] = [
        { name: 'name', label: 'Tên', type: 'text', required: true },
        { name: 'description', label: 'Mô tả', type: 'textarea' },
        {
            name: "parent_id",
            label: "Danh mục cha",
            type: "select",
            options: categoryOptions,
            placeholder: "Chọn danh mục",
        },
        {
            name: 'status',
            label: 'Trạng thái',
            type: 'select',
            options: [
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' },
            ],
        },
    ];

    return (
        <Card className='m-1'>
            <CardHeader>
               <CardTitle className="flex items-center justify-between">
                    List Category
                    <Button onClick={openCreateModal} variant={"secondary"}>
                        Tạo mới
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
                        <table className="min-w-full bg-neutral-50 border rounded-2xl shadow">
                            <thead>
                                <tr className="bg-neutral-200 uppercase text-xs tracking-wide">
                                    <th
                                        className="px-4 py-3 text-left cursor-pointer font-medium hover:text-neutral-900 transition-colors"
                                        onClick={toggleSortOrder}
                                    >
                                        Name {sortOrder === 'asc' ? '↑' : '↓'}
                                    </th>
                                    <th className="px-4 py-3 text-left font-medium">
                                        Description
                                    </th>
                                    <th className="px-4 py-3 text-left font-medium">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-left font-medium">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category.id} className="border-t border-neutral-200 hover:bg-neutral-100 transition-colors">
                                        <td className="px-4 py-2">{category.name}</td>
                                        <td className="px-4 py-2">{category.description || 'N/A'}</td>
                                        <td className="px-4 py-2">{category.status}</td>
                                        <td className="px-4 py-2">
                                            <Button
                                                onClick={() => openEditModal(category)}
                                                variant={"outline"}
                                            >
                                                Edit
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
                    title={selectedCategory ? 'Edit Category' : 'New Category'}
                    initialData={selectedCategory || {}}
                    fields={categoryFields}
                    apiEndpoint={selectedCategory ? `/categories/${selectedCategory.id}` : '/categories'}
                    method={selectedCategory ? 'PUT' : 'POST'}
                    onSave={handleSave}
                />
            </CardContent>

        </Card>

    );
}