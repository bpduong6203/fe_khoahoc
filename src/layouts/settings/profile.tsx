import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import Heading from "@/components/heading";

export default function EditProfile() {
  const [profileData, setProfileData] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    avatar: "",
    address: "123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh",
  });

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

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Giả lập xử lý logic lưu dữ liệu (ví dụ: gọi API)
    setAlert({
      show: true,
      type: "default", // Hoặc "destructive" nếu có lỗi
      title: "Cập nhật thành công!",
      description: "Thông tin cá nhân của bạn đã được lưu lại.",
    });

    // Ẩn thông báo sau 3 giây
    setTimeout(() => setAlert({ ...alert, show: false }), 3000);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Hiển thị ảnh đã chọn
      const imageUrl = URL.createObjectURL(file);
      setProfileData((prev) => ({ ...prev, avatar: imageUrl }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 rounded-lg shadow-md">
      <Heading title="Chỉnh sửa thông tin cá nhân" />

      {/* Phần Alert */}
      {alert.show && (
        <Alert variant={alert.type} className="mb-4">
          <AlertTitle>{alert.title}</AlertTitle>
          <AlertDescription>{alert.description}</AlertDescription>
        </Alert>
      )}

      {/* Phần Avatar */}
      <div className="flex items-center space-x-4">
        <Avatar>
          {profileData.avatar ? (
            <AvatarImage src={profileData.avatar} alt="Ảnh đại diện" />
          ) : (
            <AvatarFallback>NV</AvatarFallback>
          )}
        </Avatar>
        <div>
          <Button variant="outline" size="sm" asChild>
            <Label htmlFor="avatar">Chọn ảnh đại diện</Label>
          </Button>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
      </div>

      {/* Biểu mẫu chỉnh sửa thông tin */}
      <form className="space-y-4">
        <div>
          <Label htmlFor="name">Họ và tên</Label>
          <Input
            id="name"
            type="text"
            value={profileData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Nhập tên của bạn"
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={profileData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Nhập email của bạn"
          />
        </div>

        <div>
          <Label htmlFor="address">Địa chỉ</Label>
          <Input
            id="address"
            type="address"
            value={profileData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            placeholder="Nhập địa chỉ của bạn"
          />
        </div>
      </form>

      {/* Nút lưu */}
      <div className="flex justify-end">
        <Button variant="default" size="lg" onClick={handleSave}>
          Lưu thông tin
        </Button>
      </div>
    </div>
  );
}
