import React from "react";
import { FaSearch, FaBell, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const router = useRouter();

  const navigateToCart = () => {
    router.push("/cart/cartshopping");
  };

  const navigateToEditProfile = () => {
    router.push("/profile/editprofile");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-6 shadow-md bg-white">
      <div className="flex items-center space-x-4">
        <h1
          className="text-2xl font-bold text-purple-700 cursor-pointer"
          onClick={() => router.push("/")}
        >
          WEB LUA GA
        </h1>
        <div className="relative">
          <Input
            type="text"
            placeholder="Tìm kiếm bất cứ thứ gì"
            className="px-4 py-2 border rounded-full w-full focus:outline-none"
          />
        </div>
      </div>
      <div className="relative flex items-center space-x-6">
        <a href="#" className="text-sm text-gray-700">
          Khóa học của bạn
        </a>
        <a href="#" className="text-sm text-gray-700">
          Khóa học chia sẻ
        </a>
        <FaShoppingCart
          className="text-gray-700 cursor-pointer"
          onClick={navigateToCart}
        />
        <FaBell className="text-gray-700 cursor-pointer" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <FaUserCircle className="text-gray-700 cursor-pointer text-2xl" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64">
            <DropdownMenuLabel>
              <div className="flex items-center p-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                  <span className="text-xl">T</span>
                </div>
                <div>
                  <p
                    className="font-semibold cursor-pointer hover:text-purple-700"
                    onClick={navigateToEditProfile}
                  >
                    Lê Thanh Trúc
                  </p>
                  <p className="text-sm text-gray-500">Truclek2@gmail.com</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={navigateToCart}>
                Giỏ hàng của tôi
              </DropdownMenuItem>
              <DropdownMenuItem onClick={navigateToEditProfile}>
                Cài đặt tài khoản
              </DropdownMenuItem>
              <DropdownMenuItem>
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
