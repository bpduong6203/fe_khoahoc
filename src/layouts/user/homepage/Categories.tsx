import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router"; // Thêm useRouter từ next/router

const Categories = () => {
  const [showSubMenu, setShowSubMenu] = useState<string | null>(null);
  const subMenuTimeoutRef = useRef<number | null>(null);
  const router = useRouter(); // Khởi tạo router

  useEffect(() => {
    return () => {
      if (subMenuTimeoutRef.current) {
        clearTimeout(subMenuTimeoutRef.current);
      }
    };
  }, []);

  const subMenus: Record<string, string[]> = {
    "Phát triển": [
      "Web Development",
      "Mobile Development",
      "Programming Languages",
      "Game Development",
    ],
    "CNTT & Phần mềm": ["Database Design & Development", "Software Testing"],
  };

  const handleSubMenuEnter = (category: string) => {
    if (subMenuTimeoutRef.current) {
      clearTimeout(subMenuTimeoutRef.current);
      subMenuTimeoutRef.current = null;
    }
    setShowSubMenu(category);
  };

  const handleSubMenuLeave = () => {
    subMenuTimeoutRef.current = window.setTimeout(() => {
      setShowSubMenu(null);
    }, 200);
  };

  // Hàm xử lý khi nhấp vào mục con
  const handleSubMenuClick = (subItem: string) => {
    // Điều hướng đến trang editprofile và truyền subItem qua query
    router.push({
      pathname: "/profile/editprofile",
      query: { category: subItem }, // Truyền subItem (ví dụ: "Web Development") qua query
    });
  };

  return (
    <div className="relative px-4 py-4">
      <div className="flex flex-wrap justify-center space-x-4 py-4 border-b dark:border-neutral-700">
        {[
          "Phát triển",
          "Việc kinh doanh",
          "Tài chính & Kế toán",
          "CNTT & Phần mềm",
          "Năng suất văn phòng",
          "Phát triển cá nhân",
          "Thiết kế",
          "Marketing",
          "Sức khỏe & Thể thao",
          "Âm nhạc",
        ].map((category, index) => (
          <div
            key={category}
            className="relative"
            onMouseEnter={() => handleSubMenuEnter(category)}
            onMouseLeave={handleSubMenuLeave}
          >
            <a href="#" className="text-sm hover:underline cursor-pointer">
              {category}
            </a>
            {showSubMenu === category && subMenus[category] && (
              <div
                className={`absolute top-full mt-2 w-64 max-w-xs bg-neutral-10 bg-neutral-50 dark:bg-neutral-900 shadow-lg rounded-lg z-50 overflow-auto ${
                  index === 0 ? "left-0" : "left-1/2 -translate-x-1/2"
                }`}
                onMouseEnter={() => {
                  if (subMenuTimeoutRef.current) {
                    clearTimeout(subMenuTimeoutRef.current);
                    subMenuTimeoutRef.current = null;
                  }
                }}
                onMouseLeave={handleSubMenuLeave}
              >
                <ul className="py-1 px-1">
                  {subMenus[category]?.map((subItem, subIndex) => (
                    <li
                      key={subIndex}
                      className="hover:block hover:rounded-sm px-4 py-2 text-sm dark:hover:bg-neutral-800 hover:bg-neutral-200 cursor-pointer"
                      onClick={() => handleSubMenuClick(subItem)} // Thêm sự kiện onClick
                    >
                      {subItem}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;