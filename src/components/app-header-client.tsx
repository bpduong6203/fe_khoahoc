import { Breadcrumbs } from '@/components/breadcrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UserMenuContent } from '@/components/user-menu-content';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem, type NavItem, type Auth, type User } from '@/types'; // Import User
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Bell, Menu, ShoppingBag } from 'lucide-react';
import AppLogo from './app-logo';
import AppLogoIcon from './app-logo-icon';
import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import DarkModeToggle from './dark-mode-toggle';

const rightNavItems: NavItem[] = [
  {
    title: 'Giỏ hàng',
    url: '/cart/cartshopping',
    icon: ShoppingBag,
  },
  {
    title: 'Thông báo',
    url: '#',
    icon: Bell,
  },
];

interface AppHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
  const router = useRouter();
  const [auth, setAuth] = useState<Auth>({
    user: { id: 0, name: '', email: '', avatar: null, email_verified_at: null, created_at: '', updated_at: '' },
  });

  // Lấy dữ liệu từ localStorage khi component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData: User = JSON.parse(storedUser); // User đã được import
      setAuth({ user: userData });
    } else {
      // Nếu không có dữ liệu, có thể chuyển hướng về trang đăng nhập
      // router.push('/login');
    }
  }, [router]);

  // Hàm lấy chữ cái đầu của tên
  const getInitials = (name: string) => {
    if (!name) return 'NV'; // Giá trị mặc định nếu không có tên
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <>
      <div className="border-sidebar-border/80 border-b">
        <div className="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2 h-[34px] w-[34px]">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-sidebar flex h-full w-64 flex-col items-stretch justify-between">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetHeader className="flex justify-start text-left">
                  <AppLogoIcon className="h-6 w-6 fill-current text-black dark:text-white" />
                </SheetHeader>
                <div className="flex h-full flex-1 flex-col space-y-4 p-4">
                  <div className="flex h-full flex-col justify-between text-sm">
                    <div className="flex flex-col space-y-4">
                      <Input
                        type="search"
                        placeholder="Tìm kiếm"
                        className="h-10 w-full rounded-md bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 focus-visible:ring-accent focus-visible:ring-offset-background focus-visible:outline-none"
                      />
                    </div>
                    <div className="flex flex-col space-y-4">
                      {rightNavItems.map((item) => (
                        <a
                          key={item.title}
                          href={item.url}
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 font-medium"
                        >
                          {item.icon && <item.icon className="h-5 w-5" />}
                          <span>{item.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <Link href="/homepage" passHref className="flex items-center space-x-2">
            <AppLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className="ml-6 hidden h-full items-center space-x-6 lg:flex">
            <NavigationMenu className="flex h-full items-stretch">
              <NavigationMenuList className="flex h-full items-stretch space-x-2">
                {/* Thêm các mục navigation nếu cần */}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <Input
            type="search"
            placeholder="Tìm kiếm"
            className="hidden lg:block h-10 w-96 rounded-4xl focus-visible:ring-accent focus-visible:ring-offset-background focus-visible:outline-none"
          />

          <div className="ml-auto flex items-center space-x-2">
            <div className="relative flex items-center space-x-1">
              <DarkModeToggle />
              <div className="hidden lg:flex">
                {rightNavItems.map((item) => (
                  <TooltipProvider key={item.title} delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger>
                        <a
                          href={item.url}
                          rel="noopener noreferrer"
                          className="group text-accent-foreground ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent p-0 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                        >
                          <span className="sr-only">{item.title}</span>
                          {item.icon && <item.icon className="size-5 opacity-80 group-hover:opacity-100" />}
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-10 rounded-full p-1">
                  <Avatar className="size-8 overflow-hidden rounded-full">
                    <AvatarImage src={auth.user.avatar || ''} alt={auth.user.name || 'User'} />
                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                      {getInitials(auth.user.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <UserMenuContent user={auth.user} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {breadcrumbs.length > 1 && (
        <div className="border-sidebar-border/70 flex w-full border-b">
          <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </div>
        </div>
      )}
    </>
  );
}