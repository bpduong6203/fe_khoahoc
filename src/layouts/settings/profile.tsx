import React, { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import Heading from '@/components/heading';
import { type User } from '@/types';
import Head from 'next/head';
import { apiFetch, uploadFile } from '@/lib/api';

const baseUrl = process.env.IMG_URL;

interface ProfileData extends User {
  address?: string;
  file?: File;
}

export default function EditProfile() {
  const [profileData, setProfileData] = useState<ProfileData>({
    id: '',
    name: '',
    email: '',
    avatar: null,
    email_verified_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    address: '',
    file: undefined,
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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setProfileData((prev) => ({
        ...prev,
        ...JSON.parse(storedUser),
        file: undefined,
      }));
    }
  }, []);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setAlert({
          show: true,
          type: 'destructive',
          title: 'Lỗi',
          description: 'Ảnh phải nhỏ hơn 5MB.',
        });
        return;
      }
      if (!['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(file.type)) {
        setAlert({
          show: true,
          type: 'destructive',
          title: 'Lỗi',
          description: 'Chỉ hỗ trợ ảnh JPEG, JPG, PNG, GIF.',
        });
        return;
      }

      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);
      setProfileData((prev) => ({ ...prev, file }));
      setAlert({
        show: true,
        type: 'default',
        title: 'Thông báo',
        description: 'Ảnh đã được chọn. Nhấn "Lưu thông tin" để upload.',
      });
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setAlert({ show: false, type: 'default', title: '', description: '' });

    try {
      let avatarUrl = profileData.avatar;

      if (profileData.file) {
        const { url } = await uploadFile(profileData.file);
        avatarUrl = url;
      }

      const response = await apiFetch<{ user: User; message: string }>('/user', {
        method: 'PUT',
        data: {
          name: profileData.name,
          email: profileData.email,
          avatar: avatarUrl,
          address: profileData.address,
        },
      });

      localStorage.setItem('user', JSON.stringify(response.user));

      setProfileData((prev) => ({
        ...prev,
        ...response.user,
        file: undefined,
      }));
      setPreviewUrl(null);

      setAlert({
        show: true,
        type: 'default',
        title: 'Thành công',
        description: response.message || 'Thông tin đã được lưu.',
      });
    } catch (error: any) {
      setAlert({
        show: true,
        type: 'destructive',
        title: 'Lỗi',
        description: error.message || 'Không thể lưu thông tin. Vui lòng thử lại.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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
          {previewUrl || profileData.avatar ? (
            <>
              {console.log(`${baseUrl}${profileData.avatar}`)} {/* In ra giá trị */}
              <AvatarImage
                src={
                  previewUrl ||
                  (profileData.avatar ? `${baseUrl}${profileData.avatar}` : '')
                }
                alt="Ảnh đại diện"
              />
            </>
          ) : (
            <AvatarFallback>
              {profileData.name ? profileData.name[0] : 'NV'}
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
            disabled={isLoading}
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
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Nhập tên của bạn"
            disabled={isLoading}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={profileData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Nhập email của bạn"
            disabled={isLoading}
          />
        </div>
        <div>
          <Label htmlFor="address">Địa chỉ</Label>
          <Input
            id="address"
            type="text"
            value={profileData.address || ''}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="Nhập địa chỉ của bạn"
            disabled={isLoading}
          />
        </div>
      </form>
      <div className="flex justify-end">
        <Button
          variant="default"
          size="lg"
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? 'Đang lưu...' : 'Lưu thông tin'}
        </Button>
      </div>
    </div>
  );
}