import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

// Helper function to format price consistently
const formatPrice = (price) => {
  return price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

const Cart = () => {
  const router = useRouter();

  const cartItems = [
    {
      id: 1,
      name: "Khóa học 1",
      instructor: "Dr. Angela Yu, Developer and Lead Instructor",
      price: 200000,
      originalPrice: 1050000,
      rating: 4.7,
      ratings: 429557,
      image: "/images/course1.jpg",
      bestseller: true,
    },
    {
      id: 2,
      name: "Khóa học 3",
      instructor: "Dr. Angela Yu, Developer and Lead Instructor",
      price: 150000,
      originalPrice: 755000,
      rating: 4.7,
      ratings: 428831,
      image: "/images/course3.jpg",
      bestseller: true,
    },
    {
      id: 3,
      name: "Khóa học 3",
      instructor: "Dr. Angela Yu, Developer and Lead Instructor",
      price: 150000,
      originalPrice: 755000,
      rating: 4.7,
      ratings: 428831,
      image: "/images/course3.jpg",
      bestseller: true,
    },
  ];

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
  const originalTotalPrice = 1599000;
  const discount = Math.round(
    ((originalTotalPrice - totalPrice) / originalTotalPrice) * 100
  );
  const appliedCoupon = "ST17M13125503";

  const handleProceedToCheckout = () => {
    router.push("/payment/paycheckout");
  };

  const handleBackToHomepage = () => {
    router.push("/homepage");
  };

  return (
    <>
      <Head>
        <title>Giỏ hàng | WEB LUA GA</title>
      </Head>
      <div className="w-full min-h-screen bg-neutral-100 dark:bg-neutral-800 text-gray-900 dark:text-gray-100">
        <div
          className="max-w-6xl mx-auto px-4 py-6"
          style={{ padding: "1rem", minHeight: "calc(100vh - 64px)" }}
        >
          {/* Back Button */}
          <div className="flex items-center mb-2">
            <button
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              onClick={handleBackToHomepage}
              style={{ padding: "0.5rem" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Quay về
            </button>
          </div>

          {/* Divider with Fixed Width */}
          <div
            className="mb-4 border-gray-300 dark:border-gray-600"
            style={{
              width: "930px",
              borderTop: "1px solid",
            }}
          ></div>

          {/* Main Content with Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Section: Cart Items */}
            <div className="lg:col-span-2">
              <h1 className="text-2xl font-bold mb-2">Giỏ hàng của bạn</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Bạn có {cartItems.length} tựa chọn trong giỏ hàng
              </p>

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center border rounded-lg overflow-hidden mb-4 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-neutral-700 border-gray-200 dark:border-gray-600"
                  style={{
                    padding: "0.75rem",
                  }}
                >
                  <div className="w-20 h-20 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow px-4">
                    <h3 className="font-semibold text-base" style={{ margin: 0 }}>
                      {item.name}
                    </h3>
                    <p
                      className="text-sm text-gray-600 dark:text-gray-300"
                      style={{ margin: "0.25rem 0" }}
                    >
                      By {item.instructor}
                    </p>
                    <div className="flex items-center">
                      {item.bestseller && (
                        <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs px-2 py-1 rounded mr-2">
                          Bestseller
                        </span>
                      )}
                      <span className="text-yellow-500 dark:text-yellow-400 text-sm">
                        {item.rating}
                      </span>
                      <div className="flex ml-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-4 h-4 ${
                              star <= Math.floor(item.rating)
                                ? "text-yellow-500 dark:text-yellow-400 fill-current"
                                : "text-gray-300 dark:text-gray-500 fill-current"
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                        ({item.ratings})
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between p-2">
                    <button className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                    <div className="font-bold text-lg">{formatPrice(item.price)}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Section: Total Card */}
            <div className="lg:col-span-1">
              <div
                className="border rounded-lg p-4 shadow-sm bg-white dark:bg-neutral-700 border-gray-200 dark:border-gray-600"
                style={{
                  marginTop: "-1rem",
                }}
              >
                <h2 className="text-lg font-bold mb-3">Total:</h2>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xl font-bold">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500 dark:text-gray-400 line-through text-sm">
                    {formatPrice(originalTotalPrice)}
                  </span>
                  <span className="text-green-600 dark:text-green-400 text-sm">
                    {discount}% off
                  </span>
                </div>

                <button
                  className="w-full bg-purple-600 dark:bg-purple-500 text-white py-2 rounded-lg mb-4 hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors"
                  style={{ padding: "0.75rem" }}
                  onClick={handleProceedToCheckout}
                >
                  Proceed to Checkout
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2 inline-block"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  You won't be charged yet
                </p>

                <div className="border-t pt-3 border-gray-200 dark:border-gray-600">
                  <h3 className="font-bold mb-2 text-base">Promotions</h3>
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-neutral-600 p-2 rounded mb-2">
                    <div>
                      <p className="text-sm font-medium">{appliedCoupon}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Udemy coupon
                      </p>
                    </div>
                    <button className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Enter Coupon"
                      className="flex-grow border rounded-l p-2 text-sm bg-white dark:bg-neutral-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                      style={{ padding: "0.5rem" }}
                    />
                    <button
                      className="bg-purple-600 dark:bg-purple-500 text-white px-4 py-2 rounded-r hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors"
                      style={{ padding: "0.5rem 1rem" }}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;