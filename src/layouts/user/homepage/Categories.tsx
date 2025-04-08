import React, { useState, useRef, useEffect } from "react";
import { fetchApiNoToken } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

interface Category {
  id: string;
  name: string;
  description: string | null;
  parent_id: string | null;
  status: "Active" | "Inactive";
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showSubMenu, setShowSubMenu] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const subMenuTimeoutRef = useRef<number | null>(null);

  // Lấy dữ liệu từ API khi component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchApiNoToken<{ data: Category[]; message: string }>("/categories");
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchCategories();

    // Cleanup timeout khi component unmount
    return () => {
      if (subMenuTimeoutRef.current) {
        clearTimeout(subMenuTimeoutRef.current);
      }
    };
  }, []);

  // Hàm lọc các danh mục con dựa trên parent_id
  const getSubCategories = (parentId: string): Category[] => {
    return categories.filter(
      (category) => category.parent_id === parentId && category.status === "Active"
    );
  };

  const handleSubMenuEnter = (categoryId: string) => {
    if (subMenuTimeoutRef.current) {
      clearTimeout(subMenuTimeoutRef.current);
      subMenuTimeoutRef.current = null;
    }
    setShowSubMenu(categoryId);
  };

  const handleSubMenuLeave = () => {
    subMenuTimeoutRef.current = window.setTimeout(() => {
      setShowSubMenu(null);
    }, 200);
  };

  if (loading) return<div>
    <div className="relative px-4 py-4">
      <div className="flex flex-wrap justify-center space-x-4 py-4 border-b dark:border-neutral-700">
        <Skeleton className="h-6 w-50" />
        <Skeleton className="h-6 w-50" />
        <Skeleton className="h-6 w-50" />
        <Skeleton className="h-6 w-50" />
        <Skeleton className="h-6 w-50" />
      </div>
    </div>

  </div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div className="relative px-4 py-4">
      <div className="flex flex-wrap justify-center space-x-4 py-4 border-b dark:border-neutral-700">
        {categories
          .filter(
            (category) => category.status === "Active" && !category.parent_id // Chỉ hiển thị danh mục cấp cao nhất (không có parent_id)
          )
          .map((category, index) => {
            const subCategories = getSubCategories(category.id); // Lấy danh mục con

            return (
              <div
                key={category.id}
                className="relative"
                onMouseEnter={() => handleSubMenuEnter(category.id)}
                onMouseLeave={handleSubMenuLeave}
              >
                <a href="#" className="text-sm hover:underline cursor-pointer">
                  {category.name}
                </a>
                {showSubMenu === category.id && subCategories.length > 0 && (
                  <div
                    className={`absolute top-full mt-2 w-64 max-w-xs bg-neutral-50 dark:bg-neutral-900 shadow-lg rounded-lg z-50 overflow-auto ${index === 0 ? "left-0" : "left-1/2 -translate-x-1/2"
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
                      {subCategories.map((subCategory) => (
                        <li
                          key={subCategory.id}
                          className="hover:block hover:rounded-sm px-4 py-2 text-sm dark:hover:bg-neutral-800 hover:bg-neutral-200 cursor-pointer"
                        >
                          {subCategory.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Categories;