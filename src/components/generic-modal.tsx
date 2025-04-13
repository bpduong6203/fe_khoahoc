import * as React from 'react';
import { apiFetch } from '@/lib/api';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import InputError from './input-error';
import LoadingSpinner from './loading-spinner';
import { Field } from '@/types/interfaces';

interface GenericModalProps<T extends Record<string, any>> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initialData?: T;
  fields: Field[];
  apiEndpoint: string;
  method?: 'POST' | 'PUT' | 'PATCH';
  onSave: (data: T & { file?: File | null }) => Promise<void>; // Sửa chữ ký
}

const GenericModal = <T extends Record<string, any>>({
  isOpen,
  onClose,
  title,
  initialData = {} as T,
  fields,
  apiEndpoint,
  method = 'POST',
  onSave,
}: GenericModalProps<T>) => {
  const [formData, setFormData] = React.useState<T>(initialData);
  const [fileData, setFileData] = React.useState<File | null>(null);
  const [previewURL, setPreviewURL] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setFormData(initialData);
    setFileData(null);
    setPreviewURL(null);
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        setError('Chỉ hỗ trợ JPEG, PNG, hoặc GIF');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Ảnh phải nhỏ hơn 5MB');
        return;
      }
      setFileData(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      await onSave({ ...formData, file: fileData }); // Truyền formData và file
      setFormData(initialData);
      setFileData(null);
      if (previewURL) {
        URL.revokeObjectURL(previewURL);
        setPreviewURL(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(94,94,94,0.5)] flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center">
                <LoadingSpinner variant={3} />
              </div>
            ) : (
              <div className="flex flex-wrap gap-4 justify-between">
                {fields.map((field) => (
                  <div
                    key={field.name}
                    className={`space-y-1 ${field.inline ? 'w-45' : 'w-full'}`}
                  >
                    <Label htmlFor={field.name}>{field.label}</Label>
                    {field.type === 'textarea' ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded-md p-2"
                        placeholder={field.placeholder}
                        disabled={isLoading}
                      />
                    ) : field.type === 'select' ? (
                      <Select
                        onValueChange={handleSelectChange(field.name)}
                        defaultValue={String(formData[field.name] || '')}
                        disabled={isLoading}
                      >
                        <SelectTrigger id={field.name}>
                          <SelectValue placeholder={field.placeholder || 'Chọn...'} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : field.type === 'file' ? (
                      <>
                        <Input
                          id={field.name}
                          type="file"
                          name={field.name}
                          accept="image/jpeg,image/png,image/gif" // Hỗ trợ GIF
                          onChange={handleFileChange}
                          placeholder={field.placeholder}
                          disabled={isLoading}
                        />
                        {(previewURL || (field.name === 'image' && formData[field.name])) && (
                          <img
                            src={
                              previewURL ||
                              (formData[field.name]
                                ? `${process.env.NEXT_PUBLIC_IMG_URL}${formData[field.name]}`
                                : '/images/default-course.png')
                            }
                            alt="Preview"
                            className="mt-2 rounded border"
                            style={{ width: '100%', maxHeight: '150px', objectFit: 'cover' }}
                          />
                        )}
                      </>
                    ) : (
                      <Input
                        id={field.name}
                        type={field.type || 'text'}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required={field.required}
                        disabled={isLoading}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
            <InputError message={error ?? undefined} />
          </CardContent>
          <CardFooter className="justify-end space-x-2">
            <Button type="button" variant="destructive" onClick={onClose} disabled={isLoading}>
              Hủy
            </Button>
            <Button type="submit" variant="secondary" disabled={isLoading}>
              {isLoading ? 'Đang lưu...' : 'Lưu'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default GenericModal;