import React, { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import Heading from "@/components/heading";
import { type User } from "@/types";


interface ProfileData extends User {
  address?: string; // Thêm address nếu cần
}

interface UpdateProfileResponse {
  message: string;
  user: ProfileData;
}

interface ApiError {
  message: string;
}

export default function EditProfile() {
  const getInitialProfileData = (): ProfileData => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return {
      id: 0,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      avatar: null,
      email_verified_at: null,
      created_at: '',
      updated_at: '',
      address: '123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh',
    };
  };

  const [profileData, setProfileData] = useState<ProfileData>(getInitialProfileData());
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

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    setAlert({ show: false, type: 'default', title: '', description: '' });

    // try {
    //   const response = await apiFetch<UpdateProfileResponse>('/update-profile', {
    //     method: 'POST',
    //     body: JSON.stringify(profileData),
    //   });
    //   localStorage.setItem('user', JSON.stringify(response.user));
    //   setProfileData(response.user);
    //   setAlert({
    //     show: true,
    //     type: 'default',
    //     title: 'Cập nhật thành công!',
    //     description: response.message,
    //   });
    // } catch (error) {
    //   setAlert({
    //     show: true,
    //     type: 'destructive',
    //     title: 'Lỗi',
    //     description: (error as ApiError).message || 'Không thể cập nhật thông tin.',
    //   });
    // } finally {
    //   setIsLoading(false);
    //   setTimeout(() => setAlert((prev) => ({ ...prev, show: false })), 3000);
    // }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
            type="text" // Sửa từ "address" thành "text" vì không có type="address"
            value={profileData.address || ""}
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

