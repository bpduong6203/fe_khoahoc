import React from "react";
import { useRouter } from "next/router";

const SimpleNavbar: React.FC = () => {
  const router = useRouter();

  const handleCancel = () => {
    router.push("/cart/cartshopping"); // Điều chỉnh đường dẫn về Cart
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-neutral-100 dark:bg-neutral-900">
      {/* Logo */}
      <div className="flex items-center">
        <h1
          className="text-2xl font-bold text-black dark:text-white cursor-pointer"
          onClick={() => router.push("/")}
        >
        </h1>
      </div>

      {/* Nút Cancel */}
      <button
        onClick={handleCancel}
        className="text-purple-600 dark:text-purple-300 font-medium hover:text-purple-800 dark:hover:text-purple-400"
      >
        Cancel
      </button>
    </nav>
  );
};

export default SimpleNavbar;