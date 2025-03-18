import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import Heading from "@/components/heading";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"enterEmail" | "resetPassword">("enterEmail");
  const [alert, setAlert] = useState<{
    show: boolean;
    type: "default" | "destructive";
    title: string;
    description: string;
  }>({
    show: false,
    type: "default",
    title: "",
    description: "",
  });

  const handleSendLink = () => {
    // Xử lý gửi liên kết đặt lại mật khẩu
    if (email.includes("@")) {
      setAlert({
        show: true,
        type: "default",
        title: "Liên kết đã được gửi!",
        description: "Vui lòng kiểm tra email của bạn để đặt lại mật khẩu.",
      });
      setTimeout(() => {
        setAlert({ ...alert, show: false });
        setStep("resetPassword"); // Chuyển sang bước nhập mật khẩu mới
      }, 3000);
    } else {
      setAlert({
        show: true,
        type: "destructive",
        title: "Lỗi!",
        description: "Vui lòng nhập email hợp lệ.",
      });
    }
  };

  const handleResetPassword = () => {
    // Xử lý lưu mật khẩu mới
    setAlert({
      show: true,
      type: "default",
      title: "Đặt lại thành công!",
      description: "Mật khẩu của bạn đã được thay đổi thành công.",
    });
    setTimeout(() => setAlert({ ...alert, show: false }), 3000);
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6 rounded-lg shadow-md">
      <Heading title={step === "enterEmail" ? "Đặt lại mật khẩu" : "Tạo mật khẩu mới"} description="Nhập email của bạn để đặt lại mật khẩu." />

      {/* Hiển thị thông báo (Alert) */}
      {alert.show && (
        <Alert variant={alert.type}>
          <AlertTitle>{alert.title}</AlertTitle>
          <AlertDescription>{alert.description}</AlertDescription>
        </Alert>
      )}

      {step === "enterEmail" ? (
        // Bước nhập email
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
            />
          </div>
          <div className="flex justify-end">
            <Button variant="default" size="lg" onClick={handleSendLink}>
              Gửi liên kết
            </Button>
          </div>
        </form>
      ) : (
        // Bước đặt lại mật khẩu
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <Label htmlFor="password">Mật khẩu mới</Label>
            <Input
              id="password"
              type="password"
              placeholder="Nhập mật khẩu mới"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Xác nhận mật khẩu mới"
            />
          </div>
          <div className="flex justify-end">
            <Button variant="default" size="lg" onClick={handleResetPassword}>
              Đặt lại mật khẩu
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
