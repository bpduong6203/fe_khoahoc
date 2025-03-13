// Navbar.tsx
import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaBell, FaShoppingCart, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuTimeoutRef = useRef(null);
  const userMenuRef = useRef(null);

  // Chuyển logic điều chỉnh vị trí menu sang useEffect để chỉ chạy ở client-side
  useEffect(() => {
    const adjustMenuPosition = () => {
      if (userMenuRef.current && typeof window !== 'undefined') {
        const menu = userMenuRef.current;
        const rect = menu.getBoundingClientRect();
        const windowWidth = window.innerWidth;

        if (rect.left < 0) {
          menu.style.left = "0";
          menu.style.right = "auto";
        } else if (rect.right > windowWidth) {
          menu.style.right = "0";
          menu.style.left = "auto";
        } else {
          menu.style.right = "0";
          menu.style.left = "auto";
        }
      }
    };

    if (showUserMenu) {
      adjustMenuPosition();
    }

    return () => {
      if (userMenuTimeoutRef.current) {
        clearTimeout(userMenuTimeoutRef.current);
      }
    };
  }, [showUserMenu]);

  const handleUserMenuEnter = () => {
    if (userMenuTimeoutRef.current) {
      clearTimeout(userMenuTimeoutRef.current);
      userMenuTimeoutRef.current = null;
    }
    setShowUserMenu(true);
  };

  const handleUserMenuLeave = () => {
    // Sử dụng setTimeout ở client side thông qua useEffect
    userMenuTimeoutRef.current = setTimeout(() => {
      setShowUserMenu(false);
    }, 200);
  };

  return (
    <nav className="flex items-center justify-between px-6 py-6 shadow-md bg-white">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-purple-700">WEB LUA GA</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm bất cứ thứ gì"
            className="px-4 py-2 border rounded-full w-[800px] focus:outline-none"
          />
          <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      <div className="relative flex items-center space-x-6">
        <a href="#" className="text-sm text-gray-700">Khóa học của bạn</a>
        <a href="#" className="text-sm text-gray-700">Khóa học chia sẻ</a>
        <FaShoppingCart className="text-gray-700 cursor-pointer" />
        <FaBell className="text-gray-700 cursor-pointer" />
        <div
          className="relative inline-block"
          onMouseEnter={handleUserMenuEnter}
          onMouseLeave={handleUserMenuLeave}
        >
          <FaUserCircle className="text-gray-700 cursor-pointer text-2xl" />
          {showUserMenu && (
            <div
              ref={userMenuRef}
              className="absolute right-0 top-full mt-2 w-64 bg-white shadow-lg rounded-lg border border-gray-200 z-50 transition-opacity duration-300 opacity-100"
              onMouseEnter={handleUserMenuEnter}
              onMouseLeave={handleUserMenuLeave}
            >
              <style jsx>{`
                @keyframes fadeIn {
                  from { opacity: 0; }
                  to { opacity: 1; }
                }
              `}</style>
              <div className="flex items-center p-4 border-b">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                  <span className="text-xl">T</span>
                </div>
                <div>
                  <p className="font-semibold">Lê Thanh Trúc</p>
                  <p className="text-sm text-gray-500">Truclek2@gmail.com</p>
                </div>
              </div>
              <ul className="py-2">
                {[
                  "Giỏ hàng của tôi",
                  "Danh sách mong muốn",
                  "Đăng nhập Udemy",
                  "Cài đặt tài khoản",
                  "Phương thức thanh toán",
                  "Đăng ký",
                  "Lịch sử mua hàng",
                  "Ngôn ngữ",
                  "Trợ giúp",
                  "Chính sách bảo mật",
                  "Đăng xuất",
                ].map((item, index) => (
                  <li key={index} className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;