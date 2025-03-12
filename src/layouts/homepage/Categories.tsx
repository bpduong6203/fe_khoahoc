// Categories.tsx
import React, { useState, useRef, useEffect } from "react";

const Categories = () => {
  const [showSubMenu, setShowSubMenu] = useState(null);
  const subMenuTimeoutRef = useRef(null);

  // Sử dụng useEffect để đảm bảo code chỉ chạy ở client-side
  useEffect(() => {
    return () => {
      if (subMenuTimeoutRef.current) {
        clearTimeout(subMenuTimeoutRef.current);
      }
    };
  }, []);

  const subMenus = {
    "Phát triển": [
      "Web Development",
      "Mobile Development",
      "Programming Languages",
      "Game Development",
    ],
    "CNTT & Phần mềm": ["Database Design & Development", "Software Testing"],
  };

  const handleSubMenuEnter = (category) => {
    if (subMenuTimeoutRef.current) {
      clearTimeout(subMenuTimeoutRef.current);
      subMenuTimeoutRef.current = null;
    }
    setShowSubMenu(category);
  };

  const handleSubMenuLeave = () => {
    // Sử dụng setTimeout ở client side thông qua useEffect
    subMenuTimeoutRef.current = setTimeout(() => {
      setShowSubMenu(null);
    }, 200);
  };

  return (
    <div className="relative px-6 py-4">
      <div className="flex justify-center space-x-6 py-4 border-b">
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
        ].map((category) => (
          <div
            key={category}
            className="relative"
            onMouseEnter={() => handleSubMenuEnter(category)}
            onMouseLeave={handleSubMenuLeave}
          >
            <a href="#" className="text-sm text-gray-600 hover:underline cursor-pointer">
              {category}
            </a>
            {showSubMenu === category && subMenus[category] && (
              <div
                className="absolute left-0 top-full mt-2 w-64 bg-black text-white shadow-lg rounded-lg z-50"
                onMouseEnter={() => {
                  if (subMenuTimeoutRef.current) {
                    clearTimeout(subMenuTimeoutRef.current);
                    subMenuTimeoutRef.current = null;
                  }
                }}
                onMouseLeave={handleSubMenuLeave}
              >
                <ul className="py-2">
                  {subMenus[category].map((subItem, index) => (
                    <li key={index} className="px-4 py-2 text-sm hover:bg-gray-700 cursor-pointer">
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