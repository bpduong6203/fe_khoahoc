import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";

const Cart = () => {
  const router = useRouter();

  const handleProceedToCheckout = () => {
    router.push("/payment/paycheckout");
  };

  const handleBackToHomepage = () => {
    router.push("/homepage");
  };

  const cartItems = [
    { id: 1, name: "Khoá học React cơ bản", price: 500000 },
    { id: 2, name: "Khoá học Node.js nâng cao", price: 750000 },
    { id: 3, name: "Khoá học TypeScript toàn diện", price: 650000 },
  ];

  // Tính tổng giá
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <>
      <Head>
        <title>Giỏ hàng</title>
      </Head>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 p-10">
        <Card className="col-span-2 md:col-span-2">
          <CardHeader>
            <CardTitle>Giỏ hàng</CardTitle>
            <CardDescription>Danh sách khoá học bạn đã chọn.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul>
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center py-2 border-b"
                >
                  <span className="text-gray-700">{item.name}</span>
                  <span className="font-medium text-blue-500">
                    {item.price.toLocaleString("vi-VN")} ₫
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>Đơn hàng</CardTitle>
            <CardDescription>
              Xác nhận trước khi thanh toán.
            </CardDescription>
          </CardHeader>
          <CardContent>

              <CardHeader>
                Tổng cộng: {totalPrice.toLocaleString("vi-VN")} ₫
              </CardHeader>

            <div className="flex flex-col space-y-4">
              <Button variant={"default"} onClick={handleProceedToCheckout}>
                Tiến hành thanh toán
              </Button>
              <Button variant={"default"} onClick={handleBackToHomepage}>
                Quay lại trang chủ
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-start">
            <span className="text-lg font-semibold">
              Tổng cộng: {totalPrice.toLocaleString("vi-VN")} ₫
            </span>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Cart;