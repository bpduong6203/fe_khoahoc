import React from "react";
import { useRouter } from "next/router";

const SimpleNavbar: React.FC = () => {
  const router = useRouter();

  const handleCancel = () => {
    router.push("/cart/cartshopping"); // Điều chỉnh đường dẫn về Cart
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <h1
          className="text-2xl font-bold text-black cursor-pointer"
          onClick={() => router.push("/")}
        >
          KO CO TIEN
        </h1>
      </div>

      {/* Nút Cancel */}
      <button
        onClick={handleCancel}
        className="text-purple-600 font-medium hover:text-purple-800"
      >
        Cancel
      </button>
    </nav>
  );
};

export default SimpleNavbar;