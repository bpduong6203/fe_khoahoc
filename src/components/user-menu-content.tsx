import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { type User } from '@/types';
import Link from 'next/link';
import { LogOut, Settings, User2 } from 'lucide-react';
import { Button } from './ui/button';

interface UserMenuContentProps {
    user: User;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
    const cleanup = useMobileNavigation();

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link className="block w-full" href="/profile/editprofile" prefetch onClick={cleanup}>
                        <User2 className="mr-2" />
                        Cá nhân
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                     <Link className="block w-full" href="/settings/profile" prefetch onClick={cleanup}>
                        <Settings className="mr-2" />
                        Settings
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <button className="block w-full" >
                    <LogOut className="mr-2" />
                    Đăng xuất
                </button>
            </DropdownMenuItem>
        </>
    );
}
