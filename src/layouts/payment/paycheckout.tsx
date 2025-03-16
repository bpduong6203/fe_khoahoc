import React, { useState } from "react";
import Head from "next/head";
import SimpleNavbar from "@/layouts/homepage/SimpleNavbar"; // Đảm bảo import đúng

const PayCheckout = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [discountCode, setDiscountCode] = useState("");

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-100 dark:bg-neutral-800">
      <Head>
        <title>Thanh Toán | WEB LUA GA</title>
      </Head>
      
      <SimpleNavbar />
      
      <div className="flex-1 text-gray-900 dark:text-gray-100">
        <div className="max-w-5xl mx-auto p-4 font-sans">
          <h1 className="text-2xl font-bold mb-1">THANH TOÁN</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">
            Lựa chọn phương thức thanh toán để thanh toán khóa học bạn cần mua!
          </p>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="space-y-3 mb-6">
                <div
                  className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                    paymentMethod === "card" ? "shadow-md" : ""
                  } bg-white dark:bg-neutral-700 border-gray-200 dark:border-gray-600`}
                >
                  <div
                    className="p-3 flex items-center justify-between bg-white dark:bg-neutral-700 cursor-pointer"
                    onClick={() => handlePaymentChange("card")}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="card"
                        name="paymentMethod"
                        checked={paymentMethod === "card"}
                        onChange={() => handlePaymentChange("card")}
                        className="mr-3 h-4 w-4 accent-purple-600"
                      />
                      <div className="flex items-center">
                        <span className="mr-2">Thẻ quốc tế</span>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <img
                        src="https://img.upanh.tv/2025/03/14/af959d5773019400ead6a19fbe33a93c.png"
                        alt="Visa"
                        className="h-5"
                      />
                      <img
                        src="https://img.upanh.tv/2025/03/14/Mastercard-logo.svg.png"
                        alt="Mastercard"
                        className="h-5"
                      />
                      <img
                        src="https://img.upanh.tv/2025/03/14/39d7d0c8923c377e276836db08230277.webp"
                        alt="JCB"
                        className="h-5"
                      />
                    </div>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      paymentMethod === "card" ? "max-h-80 p-3" : "max-h-0"
                    }`}
                  >
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs text-gray-600 dark:text-gray-300 mb-1">
                          Tên chủ thẻ
                        </label>
                        <input
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className="w-full p-2 border rounded-md bg-gray-50 dark:bg-neutral-600 border-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-300"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 dark:text-gray-300 mb-1">
                          Số thẻ
                        </label>
                        <div className="relative">
                          <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                            <img
                              src="https://img.upanh.tv/2025/03/14/Mastercard-logo.svg.png"
                              alt="Mastercard"
                              className="h-5"
                            />
                          </div>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full p-2 pl-10 border rounded-md bg-gray-50 dark:bg-neutral-600 border-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-300"
                          />
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-1/2">
                          <label className="block text-xs text-gray-600 dark:text-gray-300 mb-1">
                            Hạn
                          </label>
                          <input
                            type="text"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            className="w-full p-2 border rounded-md bg-gray-50 dark:bg-neutral-600 border-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-300"
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="block text-xs text-gray-600 dark:text-gray-300 mb-1">
                            CVC
                          </label>
                          <input
                            type="text"
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value)}
                            className="w-full p-2 border rounded-md bg-gray-50 dark:bg-neutral-600 border-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-300"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 dark:text-gray-300 mb-1">
                          Mã giảm giá
                        </label>
                        <div className="flex">
                          <input
                            type="text"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                            className="flex-1 p-2 border rounded-l-md bg-gray-50 dark:bg-neutral-600 border-gray-200 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-300"
                          />
                          <button className="bg-white dark:bg-neutral-700 border border-l-0 rounded-r-md px-4 text-purple-600 dark:text-purple-300 font-medium text-sm">
                            Áp dụng
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                    paymentMethod === "gpay" ? "shadow-md" : ""
                  } bg-white dark:bg-neutral-700 border-gray-200 dark:border-gray-600`}
                >
                  <div
                    className="p-3 flex items-center justify-between bg-white dark:bg-neutral-700 cursor-pointer"
                    onClick={() => handlePaymentChange("gpay")}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="gpay"
                        name="paymentMethod"
                        checked={paymentMethod === "gpay"}
                        onChange={() => handlePaymentChange("gpay")}
                        className="mr-3 h-4 w-4 accent-purple-600"
                      />
                      <div className="flex items-center">
                        <img
                          src="https://img.upanh.tv/2025/03/14/Google__G__logo.svg.png"
                          alt="Google Pay"
                          className="h-5 mr-2"
                        />
                        <span className="text-sm">Thanh toán Google</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      paymentMethod === "gpay" ? "max-h-20 p-3" : "max-h-0"
                    }`}
                  >
                    <button className="w-full bg-black text-white rounded-md p-2 flex items-center justify-center">
                      <img
                        src="https://img.upanh.tv/2025/03/14/Google_Pay_Logo.svg.png"
                        alt="G Pay"
                        className="h-5"
                      />
                    </button>
                  </div>
                </div>

                <div
                  className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                    paymentMethod === "paypal" ? "shadow-md" : ""
                  } bg-white dark:bg-neutral-700 border-gray-200 dark:border-gray-600`}
                >
                  <div
                    className="p-3 flex items-center bg-white dark:bg-neutral-700 cursor-pointer"
                    onClick={() => handlePaymentChange("paypal")}
                  >
                    <input
                      type="radio"
                      id="paypal"
                      name="paymentMethod"
                      checked={paymentMethod === "paypal"}
                      onChange={() => handlePaymentChange("paypal")}
                      className="mr-3 h-4 w-4 accent-purple-600"
                    />
                    <div className="flex items-center">
                      <img
                        src="https://img.upanh.tv/2025/03/14/174861.png"
                        alt="PayPal"
                        className="h-5 mr-2"
                      />
                      <span className="text-sm">PayPal</span>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md mt-4 flex items-center justify-center transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 116 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">Trả đ299.000</span>
              </button>
            </div>

            <div className="w-full lg:w-80">
              <div className="bg-gray-100 dark:bg-neutral-700 p-4 rounded-lg shadow-sm bg-gradient-to-br from-gray-100 to-purple-50 dark:from-neutral-700 dark:to-purple-900">
                <div className="mb-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Số tiền phải thanh toán,
                  </p>
                  <h2 className="text-3xl font-bold">$450.00</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">KHÓA HỌC 1</span>
                    <span>đ200.000</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">KHÓA HỌC 2</span>
                    <span>đ150.000</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">KHÓA HỌC 3</span>
                    <span>đ150.000</span>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Thuế</span>
                      <span>đ 0.00</span>
                    </div>

                    <div className="flex justify-between font-semibold">
                      <span>Tổng thanh toán</span>
                      <span>đ500.000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayCheckout;