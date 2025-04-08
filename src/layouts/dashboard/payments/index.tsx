import React, { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Payment } from '@/types/interfaces';

export default function PaymentsPage() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            setLoading(true);
            const response = await apiFetch<{
                data: Payment[];
                current_page: number;
                total_pages: number;
                total_items: number;
                per_page: number;
                message: string;
            }>('/payments');
            const sortedPayments = response.data.sort((a: Payment, b: Payment) =>
                sortOrder === 'asc'
                    ? (a.invoice_code || '').localeCompare(b.invoice_code || '')
                    : (b.invoice_code || '').localeCompare(a.invoice_code || '')
            );
            setPayments(sortedPayments);
        } catch (error) {
            console.error('Error fetching payments:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleSortOrder = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        setPayments([...payments].sort((a, b) =>
            newSortOrder === 'asc'
                ? (a.invoice_code || '').localeCompare(b.invoice_code || '')
                : (b.invoice_code || '').localeCompare(a.invoice_code || '')
        ));
    };

    const handleStatusChange = async (paymentId: string | number, newStatus: string) => {
        try {
            const response = await apiFetch<{ payment: Payment; message: string }>(
                `/payments/${paymentId}/status`,
                {
                    method: 'PUT',
                    data: {
                        status: newStatus,
                        transaction_id: null, // Có thể thêm logic để nhập transaction_id nếu cần
                    },
                }
            );
            // Cập nhật payment trong state
            setPayments((prevPayments) =>
                prevPayments.map((payment) =>
                    payment.id === paymentId ? { ...payment, status: response.payment.status, updated_at: response.payment.updated_at } : payment
                )
            );
        } catch (error) {
            console.error('Error updating payment status:', error);
            alert('Failed to update payment status');
        }
    };

    const statusOptions = [
        { value: 'Pending', label: 'Chờ xử lý' },
        { value: 'Completed', label: 'Hoàn tất' },
        { value: 'Failed', label: 'Thất bại' },
        { value: 'Refunded', label: 'Đã hoàn tiền' },
    ];

    return (
        <Card className='m-1'>
            <CardHeader>
                <CardTitle>Danh sách thanh toán</CardTitle>
            </CardHeader>

            <CardContent>
                {loading ? (
                    <div>
                        <Skeleton className="h-10 w-full mb-2" />
                        <Skeleton className="h-10 w-full mb-2" />
                        <Skeleton className="h-10 w-full mb-2" />
                    </div>
                ) : payments.length === 0 ? (
                    <p className="text-center">Không có thanh toán nào</p>
                ) : (
                    <div className="overflow-x-auto rounded-sm">
                        <table className="min-w-full bg-neutral-50 border rounded-2xl shadow">
                            <thead>
                                <tr className="bg-neutral-200 uppercase text-xs tracking-wide">
                                    <th
                                        className="px-4 py-3 text-left cursor-pointer font-medium hover:text-neutral-900 transition-colors"
                                        onClick={toggleSortOrder}
                                    >
                                        Mã hóa đơn {sortOrder === 'asc' ? '↑' : '↓'}
                                    </th>
                                    <th className="px-4 py-3 text-left font-medium">Người dùng</th>
                                    <th className="px-4 py-3 text-left font-medium">Số tiền</th>
                                    <th className="px-4 py-3 text-left font-medium">Phương thức</th>
                                    <th className="px-4 py-3 text-left font-medium">Trạng thái</th>
                                    <th className="px-4 py-3 text-left font-medium">Ngày cập nhật</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((payment) => (
                                    <tr key={payment.id} className="border-t border-neutral-200 hover:bg-neutral-100 transition-colors">
                                        <td className="px-4 py-2">{payment.invoice_code || 'N/A'}</td>
                                        <td className="px-4 py-2">{payment.user?.name || 'N/A'}</td>
                                        <td className="px-4 py-2">{payment.amount}</td>
                                        <td className="px-4 py-2">{payment.payment_method}</td>
                                        <td className="px-4 py-2">
                                            <Select
                                                value={payment.status}
                                                onValueChange={(value) => handleStatusChange(payment.id, value)}
                                            >
                                                <SelectTrigger className="w-[150px]">
                                                    <SelectValue placeholder="Chọn trạng thái" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Pending">Chờ xử lý</SelectItem>
                                                    <SelectItem value="Completed">Hoàn tất</SelectItem>
                                                    <SelectItem value="Failed">Thất bại</SelectItem>
                                                    <SelectItem value="Refunded">Đã hoàn tiền</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </td>
                                        <td className="px-4 py-2">
                                            {new Date(payment.updated_at).toLocaleString()}
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