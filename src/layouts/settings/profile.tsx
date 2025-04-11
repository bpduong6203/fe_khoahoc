import React, { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import Heading from "@/components/heading";
import { type User } from "@/types";
import Head from "next/head";

interface ProfileData extends User {
  address?: string;
}

export default function EditProfile() {
  const [profileData, setProfileData] = useState<ProfileData>({
    id: 0,
    name: '',
    email: '',
    avatar: null,
    email_verified_at: null,
    created_at: '',
    updated_at: '',
    address: '',
  });
  const [alert, setAlert] = useState<{
    show: boolean;
    type: 'default' | 'destructive';
    title: string;
    description: string;
  }>({
    show: false,
    type: 'default',
    title: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setProfileData(JSON.parse(storedUser));
    }
  }, []);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    setAlert({ show: false, type: 'default', title: '', description: '' });
    try {
      // Logic xử lý API (giả lập hoặc thay bằng API thật)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Giả lập delay
      setAlert({
        show: true,
        type: 'default',
        title: 'Thành công',
        description: 'Thông tin đã được lưu.',
      });
    } catch { // Thay 'error' bằng '_' vì không dùng
      setAlert({
        show: true,
        type: 'destructive',
        title: 'Lỗi',
        description: 'Không thể lưu thông tin. Vui lòng thử lại.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileData((prev) => ({ ...prev, avatar: imageUrl }));
    }
  };

  return (
    <div className="md:max-w-2xl max-w-2xl mx-auto p-6 space-y-6 rounded-lg shadow-md">
      <Head>
        <title>Chỉnh sửa thông tin cá nhân</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading title="Chỉnh sửa thông tin cá nhân" />
      {alert.show && (
        <Alert variant={alert.type} className="mb-4">
          <AlertTitle>{alert.title}</AlertTitle>
          <AlertDescription>{alert.description}</AlertDescription>
        </Alert>
      )}
      <div className="flex items-center space-x-4">
        <Avatar>
          {profileData.avatar ? (
            <AvatarImage src={profileData.avatar} alt="Ảnh đại diện" />
          ) : (
            <AvatarFallback>
              {profileData.name ? profileData.name[0] : "NV"}
            </AvatarFallback>
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
      <form className="space-y-4">
        <div>
          <Label htmlFor="name">Họ và tên</Label>
          <Input
            id="name"
            type="text"
            value={profileData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Nhập tên của bạn"
            disabled={isLoading} // Vô hiệu hóa khi đang tải
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
            disabled={isLoading} // Vô hiệu hóa khi đang tải
          />
        </div>
        <div>
          <Label htmlFor="address">Địa chỉ</Label>
          <Input
            id="address"
            type="text"
            value={profileData.address || ""}
            onChange={(e) => handleInputChange("address", e.target.value)}
            placeholder="Nhập địa chỉ của bạn"
            disabled={isLoading} // Vô hiệu hóa khi đang tải
          />
        </div>
      </form>
      <div className="flex justify-end">
        <Button
          variant="default"
          size="lg"
          onClick={handleSave}
          disabled={isLoading} // Vô hiệu hóa nút khi đang tải
        >
          {isLoading ? "Đang lưu..." : "Lưu thông tin"}
        </Button>
      </div>
    </div>
  );
}