import React, { useState, useEffect } from 'react';
import Heading from './heading';
import { Button } from './ui/button';
import { apiFetch } from '@/lib/api';

interface Field {
    name: string;
    label: string;
    type?: 'text' | 'textarea' | 'select' | 'number'; 
    placeholder?: string;
    required?: boolean;
    options?: { value: string; label: string }[]; 
}

interface GenericModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    initialData?: Record<string, any>; 
    fields: Field[];
    apiEndpoint: string;
    method?: 'POST' | 'PUT' | 'PATCH'; 
    onSave: () => void;
}

const GenericModal: React.FC<GenericModalProps> = ({
    isOpen,
    onClose,
    title,
    initialData = {},
    fields,
    apiEndpoint,
    method = 'POST',
    onSave,
}) => {
    const [formData, setFormData] = useState<Record<string, any>>(initialData);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            await apiFetch(apiEndpoint, {
                method,
                data: formData,
            });
            onSave();
        } catch (err: any) {
            setError(err.message || 'Có lỗi xảy ra');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <form onSubmit={handleSubmit}>
                    {fields.map((field) => (
                        <div key={field.name} className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                {field.label}
                            </label>
                            {field.type === 'textarea' ? (
                                <textarea
                                    name={field.name}
                                    value={formData[field.name] || ''}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border rounded-md p-2"
                                    placeholder={field.placeholder}
                                />
                            ) : field.type === 'select' ? (
                                <select
                                    name={field.name}
                                    value={formData[field.name] || (field.options && field.options[0]?.value) || ''}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border rounded-md p-2"
                                >
                                    {field.options?.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={field.type || 'text'}
                                    name={field.name}
                                    value={formData[field.name] || ''}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border rounded-md p-2"
                                    placeholder={field.placeholder}
                                    required={field.required}
                                />
                            )}
                        </div>
                    ))}
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div className="flex justify-end space-x-2">
                        <Button
                            type="button"
                            variant={"destructive"}
                            onClick={onClose}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            variant={"secondary"}
                        >
                            Lưu
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GenericModal;