import React, { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';
import GenericModal from '@/components/generic-modal';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';


interface Category {
    id: string;
    name: string;
    description?: string;
    parent_id?: string;
    status: 'Active' | 'Inactive';
}

interface Field {
    name: string;
    label: string;
    type?: 'text' | 'textarea' | 'select' | 'number';
    placeholder?: string;
    required?: boolean;
    options?: { value: string; label: string }[];
}

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

    const categoryFields: Field[] = [
        { name: 'name', label: 'Tên', type: 'text', required: true },
        { name: 'description', label: 'Mô tả', type: 'textarea' },
        { name: 'parent_id', label: 'Parent ID', type: 'text' },
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
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <Heading title="List Category" />
                <Button onClick={openCreateModal} variant={"secondary"}>
                    New
                </Button>
            </div>

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
        </div>
    );
}