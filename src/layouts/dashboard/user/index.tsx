import * as React from "react";
import { apiFetch } from '@/lib/api';
import { Badge } from '@/components/ui/badge'; 
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; 

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

export default function UsersPage() {
    const [users, setUsers] = React.useState<User[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');

    // Wrap fetchUsers trong useCallback
    const fetchUsers = React.useCallback(async () => {
        try {
            setLoading(true);
            const response: { data: User[] } = await apiFetch('/users');
            const sortedUsers = response.data.sort((a: User, b: User) =>
                sortOrder === 'asc'
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name)
            );
            setUsers(sortedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    }, [sortOrder]); // sortOrder là dependency vì ảnh hưởng đến sắp xếp

    React.useEffect(() => {
        fetchUsers();
    }, [fetchUsers]); // Thêm fetchUsers vào dependency array

    const toggleSortOrder = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        setUsers([...users].sort((a, b) =>
            newSortOrder === 'asc'
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
        ));
    };

    const getBadgeVariant = (roleName: string) => {
        switch (roleName.toLowerCase()) {
            case 'admin':
                return 'default'; 
            case 'instructor':
                return 'secondary'; 
            case 'user':
                return 'outline';
            default:
                return 'outline';
        }
    };

    return (
        <Card className='m-1'>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    Danh sách người dùng
                    <Button variant="secondary">
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
                                        Tên {sortOrder === 'asc' ? '↑' : '↓'}
                                    </th>
                                    <th className="px-4 py-3 text-left font-medium">Email</th>
                                    <th className="px-4 py-3 text-left font-medium">Vai trò</th>
                                    <th className="px-4 py-3 text-left font-medium">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-t border-neutral-200 hover:bg-neutral-100 transition-colors">
                                        <td className="px-4 py-2">{user.name}</td>
                                        <td className="px-4 py-2">{user.email}</td>
                                        <td className="px-4 py-2">
                                            <div className="flex gap-2">
                                                {user.roles.map((role) => (
                                                    <Badge
                                                        key={role.id}
                                                        variant={getBadgeVariant(role.name)}
                                                    >
                                                        {role.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-4 py-2">
                                            {/* Có thể thêm nút hành động ở đây */}
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