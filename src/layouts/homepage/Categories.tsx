import React, { useState, useRef, useEffect } from "react";

const Categories = () => {
  const [showSubMenu, setShowSubMenu] = useState<string | null>(null);
  const subMenuTimeoutRef = useRef<number | null>(null);

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

  return (
    <div className="relative px-4 py-4">
      <div className="flex flex-wrap justify-center space-x-4 py-4 border-b">
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
            <a
              href="#"
              className="text-sm text-black dark:text-white hover:underline cursor-pointer"
            >
              {category}
            </a>
            {showSubMenu === category && subMenus[category] && (
              <div
                className={`absolute top-full mt-2 w-64 max-w-xs bg-neutral-100 text-black dark:bg-neutral-700 dark:text-white shadow-lg rounded-lg z-50 overflow-auto ${
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
                <ul className="py-2">
                  {subMenus[category]?.map((subItem, subIndex) => (
                    <li
                      key={subIndex}
                      className="px-4 py-2 text-sm dark:hover:bg-neutral-100 dark:hover:text-black hover:bg-neutral-700 hover:text-white cursor-pointer"
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
