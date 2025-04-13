import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { apiFetch } from "@/lib/api";
import LoadingSpinner from "@/components/loading-spinner";
import { X } from "lucide-react"; 

interface CartItem {
  id: string;
  name: string;
  price: number;
  enrollmentId?: string;
}

const Cart = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
  const [itemToCancel, setItemToCancel] = useState<CartItem | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [paymentMethod, setPaymentMethod] = useState<"Bank" | "Cash" | null>(null);
  const [isPaymentLoading, setIsPaymentLoading] = useState<boolean>(false);
  const [isCancelling, setIsCancelling] = useState<boolean>(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(storedCart);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isQRModalOpen && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsQRModalOpen(false);
    }
  }, [isQRModalOpen, timeLeft]);

  const handleProceedToCheckout = () => {
    setIsPaymentModalOpen(true);
  };

  const handleBackToHomepage = () => {
    router.push("/homepage");
  };

  const handlePaymentConfirm = async () => {
    if (!paymentMethod || cartItems.length === 0) return;

    const enrollmentId = cartItems[0].enrollmentId;

    try {
      setIsPaymentLoading(true);

      interface Payment {
        id: string; 
        status: string; 
        amount?: number; 
        transaction_id?: string; 
      }

      interface PaymentResponse {
        qr_code?: string;
        payment?: Payment;
      }

      const response: PaymentResponse = await apiFetch("/payments/create", {
        method: "POST",
        data: JSON.stringify({
          enrollment_id: enrollmentId,
          payment_method: paymentMethod,
        }),
      });

      if (paymentMethod === "Bank") {
        setQrCode(response.qr_code || null);
        setIsQRModalOpen(true);
        setTimeLeft(300);
        setCartItems([]);
        localStorage.removeItem("cartItems");
      } else {
        console.log("Thanh toán bằng tiền mặt:", response.payment);
        setCartItems([]);
        localStorage.removeItem("cartItems");
        setIsPaymentModalOpen(false);
        router.push("/payment/success");
      }
    } catch (error) {
      console.error("Error creating payment:", error);
    } finally {
      setIsPaymentLoading(false);
      setIsPaymentModalOpen(false);
    }
  };

  const handleOpenCancelDialog = (item: CartItem) => {
    setItemToCancel(item);
    setIsCancelModalOpen(true);
  };

  const handleCancelEnrollment = async () => {
    if (!itemToCancel || !itemToCancel.enrollmentId) return;
    
    try {
      setIsCancelling(true);
      
      await apiFetch(`/enrollments/${itemToCancel.enrollmentId}/cancel`, {
        method: "POST",
      });
      
      const updatedCart = cartItems.filter(item => item.id !== itemToCancel.id);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      
      setIsCancelModalOpen(false);
      setItemToCancel(null);
    } catch (error) {
      console.error("Error cancelling enrollment:", error);
    } finally {
      setIsCancelling(false);
    }
  };

  const totalPrice = Math.floor(cartItems.reduce((total, item) => total + Number(item.price), 0));

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <Card className="col-span-2 p-6 bg-white shadow-lg rounded-lg">
            <CardHeader className="pb-4 border-b border-gray-200">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent className="mt-6">
              <Skeleton className="h-12 w-full mb-4" />
              <Skeleton className="h-12 w-full" />
            </CardContent>
          </Card>
          <Card className="p-6 bg-white shadow-lg rounded-lg">
            <CardHeader className="pb-4 border-b border-gray-200">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent className="mt-6">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-10 w-full mt-6" />
              <Skeleton className="h-10 w-full mt-4" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Giỏ hàng</title>
      </Head>

      <div className="bg-gray-50 min-h-screen py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Giỏ hàng */}
          <Card className="col-span-2 p-6 bg-white shadow-lg rounded-lg">
            <CardHeader className="pb-4 border-b border-gray-200">
              <CardTitle className="text-2xl font-bold text-gray-800">Giỏ hàng</CardTitle>
              <CardDescription className="text-gray-600">Danh sách khoá học bạn đã chọn</CardDescription>
            </CardHeader>
            <CardContent className="mt-6">
              {cartItems.length > 0 ? (
                <ul className="space-y-4">
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center p-4 border border-gray-300 rounded-lg bg-gray-100 shadow-sm"
                    >
                      <span className="font-medium text-gray-800">{item.name}</span>
                      <div className="flex items-center gap-4">
                        <span className="font-medium text-blue-600">
                          {item.price.toLocaleString("vi-VN", { minimumFractionDigits: 0 })} ₫
                        </span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-500 border-red-500 hover:bg-red-50"
                          onClick={() => handleOpenCancelDialog(item)}
                        >
                          <X className="h-4 w-4 mr-1" /> Hủy
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">Giỏ hàng trống.</p>
              )}
            </CardContent>
          </Card>

          {/* Đơn hàng */}
          <Card className="p-6 bg-white shadow-lg rounded-lg">
            <CardHeader className="pb-4 border-b border-gray-200">
              <CardTitle className="text-2xl font-bold text-gray-800">Đơn hàng</CardTitle>
              <CardDescription className="text-gray-600">Xác nhận trước khi thanh toán</CardDescription>
            </CardHeader>
            <CardContent className="mt-6">
              <div className="flex justify-between items-center text-lg font-semibold text-gray-800">
                <span>Tổng cộng:</span>
                <span className="text-red-500">
                  {totalPrice.toLocaleString("vi-VN", { minimumFractionDigits: 0 })} ₫
                </span>
              </div>
              <div className="mt-6 space-y-4">
                <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
                      onClick={handleProceedToCheckout}
                      disabled={cartItems.length === 0}
                    >
                      Tiến hành thanh toán
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    {isPaymentLoading ? (
                      <div className="flex items-center justify-center py-6">
                        <LoadingSpinner variant={1} />
                      </div>
                    ) : (
                      <>
                        <DialogHeader>
                          <DialogTitle>Chọn phương thức thanh toán</DialogTitle>
                          <DialogDescription>Chọn cách bạn muốn thanh toán cho đơn hàng.</DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-4 mt-4">
                          <Button
                            variant={paymentMethod === "Bank" ? "default" : "outline"}
                            onClick={() => setPaymentMethod("Bank")}
                          >
                            Thanh toán bằng QR (Ngân hàng)
                          </Button>
                          <Button
                            variant={paymentMethod === "Cash" ? "default" : "outline"}
                            onClick={() => setPaymentMethod("Cash")}
                          >
                            Thanh toán bằng tiền mặt
                          </Button>
                        </div>
                        <DialogFooter className="mt-6">
                          <Button variant="outline" onClick={() => setIsPaymentModalOpen(false)}>
                            Hủy
                          </Button>
                          <Button onClick={handlePaymentConfirm} disabled={!paymentMethod}>
                            Xác nhận
                          </Button>
                        </DialogFooter>
                      </>
                    )}
                  </DialogContent>
                </Dialog>

                <Button
                  className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition duration-300 ease-in-out"
                  onClick={handleBackToHomepage}
                >
                  Quay lại trang chủ
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal hiển thị mã QR */}
      <Dialog open={isQRModalOpen} onOpenChange={setIsQRModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quét mã QR để thanh toán</DialogTitle>
            <DialogDescription>
              Vui lòng quét mã QR dưới đây bằng ứng dụng ngân hàng. Mã có hiệu lực trong {formatTime(timeLeft)}.
            </DialogDescription>
          </DialogHeader>
          {qrCode && (
            <img
              src={`data:image/png;base64,${qrCode}`}
              alt="QR Code"
              className="mx-auto w-64 h-64"
            />
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsQRModalOpen(false)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal xác nhận hủy đăng ký */}
      <Dialog open={isCancelModalOpen} onOpenChange={setIsCancelModalOpen}>
        <DialogContent>
          {isCancelling ? (
            <div className="flex items-center justify-center py-6">
              <LoadingSpinner variant={1} />
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Xác nhận hủy đăng ký</DialogTitle>
                <DialogDescription>
                  Bạn có chắc chắn muốn hủy đăng ký khóa học "{itemToCancel?.name}" không?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={() => setIsCancelModalOpen(false)}>
                  Không
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleCancelEnrollment}
                >
                  Xác nhận hủy
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Cart;