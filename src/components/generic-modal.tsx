import * as React from "react";
import { apiFetch } from "@/lib/api";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import InputError from "./input-error";
import LoadingSpinner from "./loading-spinner";

interface Field {
  name: string;
  label: string;
  type?: "text" | "textarea" | "select" | "number" | "file";
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  inline?: boolean;
  accept?: string;
}

interface GenericModalProps<T extends Record<string, string | number | File | undefined>> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initialData?: Partial<T>;
  fields: Field[];
  apiEndpoint: string;
  method?: "POST" | "PUT" | "PATCH";
  onSave: () => void;
}

const GenericModal = <T extends Record<string, string | number | File | undefined>>({
  isOpen,
  onClose,
  title,
  initialData = {} as Partial<T>,
  fields,
  apiEndpoint,
  method = "POST",
  onSave,
}: GenericModalProps<T>) => {
  const [formData, setFormData] = React.useState<Partial<T>>(initialData);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, [e.target.name]: file });
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
      const formDataToSend = new FormData();
      // Thêm các trường vào FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          formDataToSend.append(key, value);
        } else if (value !== undefined && value !== null) {
          formDataToSend.append(key, String(value));
        }
      });

      await apiFetch(apiEndpoint, {
        method,
        data: formDataToSend,
        headers: {},
      });
      onSave();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Có lỗi xảy ra";
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
                    className={`space-y-1 ${field.inline ? "w-45" : "w-full"}`}
                  >
                    <Label htmlFor={field.name}>{field.label}</Label>
                    {field.type === "textarea" ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        value={(formData[field.name] as string) || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded-md p-2"
                        placeholder={field.placeholder}
                        disabled={isLoading}
                      />
                    ) : field.type === "select" ? (
                      <Select
                        onValueChange={handleSelectChange(field.name)}
                        defaultValue={String(formData[field.name] || "")}
                        disabled={isLoading}
                      >
                        <SelectTrigger id={field.name}>
                          <SelectValue placeholder={field.placeholder || "Chọn..."} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : field.type === "file" ? (
                      <>
                        {/* Hiển thị ảnh hiện tại nếu có */}
                        {formData[field.name] && typeof formData[field.name] === "string" && (
                          <div className="mt-2">
                            <img
                              src={formData[field.name] as string}
                              alt="Current thumbnail"
                              className="max-w-full h-32 object-cover"
                            />
                          </div>
                        )}
                        <Input
                          id={field.name}
                          type="file"
                          name={field.name}
                          onChange={handleFileChange}
                          accept={field.accept || "image/*"}
                          required={field.required}
                          disabled={isLoading}
                        />
                      </>
                    ) : (
                      <Input
                        id={field.name}
                        type={field.type || "text"}
                        name={field.name}
                        value={(formData[field.name] as string | number) || ""}
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
            <Button
              type="button"
              variant="destructive"
              onClick={onClose}
              disabled={isLoading}
            >
              Hủy
            </Button>
            <Button type="submit" variant="secondary" disabled={isLoading}>
              {isLoading ? "Đang lưu..." : "Lưu"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default GenericModal;



// import * as React from "react";
// import { apiFetch } from "@/lib/api";
// import { Button } from "./ui/button";
// import { Label } from "./ui/label";
// import { Input } from "./ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
// import InputError from "./input-error";
// import LoadingSpinner from "./loading-spinner";

// interface Field {
//   name: string;
//   label: string;
//   type?: "text" | "textarea" | "select" | "number";
//   placeholder?: string;
//   required?: boolean;
//   options?: { value: string; label: string }[];
//   inline?: boolean;
// }

// // Dùng generic type T để linh hoạt với formData
// interface GenericModalProps<T extends Record<string, string | number>> {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   initialData?: T;
//   fields: Field[];
//   apiEndpoint: string;
//   method?: "POST" | "PUT" | "PATCH";
//   onSave: () => void;
// }

// const GenericModal = <T extends Record<string, string | number>>({
//   isOpen,
//   onClose,
//   title,
//   initialData = {} as T,
//   fields,
//   apiEndpoint,
//   method = "POST",
//   onSave,
// }: GenericModalProps<T>) => {
//   const [formData, setFormData] = React.useState<T>(initialData);
//   const [error, setError] = React.useState<string | null>(null);
//   const [isLoading, setIsLoading] = React.useState<boolean>(false);

//   React.useEffect(() => {
//     setFormData(initialData);
//   }, [initialData]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSelectChange = (name: string) => (value: string) => {
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (isLoading) return;

//     setIsLoading(true);
//     setError(null);

//     try {
//       await apiFetch(apiEndpoint, {
//         method,
//         data: formData,
//       });
//       onSave();
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : "Có lỗi xảy ra";
//       setError(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-[rgba(94,94,94,0.5)] flex items-center justify-center z-50">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle>{title}</CardTitle>
//         </CardHeader>
//         <form onSubmit={handleSubmit}>
//           <CardContent className="space-y-4">
//             {isLoading ? (
//               <div className="flex justify-center">
//                 <LoadingSpinner variant={3} />
//               </div>
//             ) : (
//               <div className="flex flex-wrap gap-4 justify-between">
//                 {fields.map((field) => (
//                   <div
//                     key={field.name}
//                     className={`space-y-1 ${field.inline ? "w-45" : "w-full"}`}
//                   >
//                     <Label htmlFor={field.name}>{field.label}</Label>
//                     {field.type === "textarea" ? (
//                       <textarea
//                         id={field.name}
//                         name={field.name}
//                         value={formData[field.name] || ""}
//                         onChange={handleChange}
//                         className="mt-1 block w-full border rounded-md p-2"
//                         placeholder={field.placeholder}
//                         disabled={isLoading}
//                       />
//                     ) : field.type === "select" ? (
//                       <Select
//                         onValueChange={handleSelectChange(field.name)}
//                         defaultValue={String(formData[field.name] || "")}

//                         disabled={isLoading}
//                       >
//                         <SelectTrigger id={field.name}>
//                           <SelectValue placeholder={field.placeholder || "Chọn..."} />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {field.options?.map((option) => (
//                             <SelectItem key={option.value} value={option.value}>
//                               {option.label}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     ) : (
//                       <Input
//                         id={field.name}
//                         type={field.type || "text"}
//                         name={field.name}
//                         value={formData[field.name] || ""}
//                         onChange={handleChange}
//                         placeholder={field.placeholder}
//                         required={field.required}
//                         disabled={isLoading}
//                       />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//             <InputError message={error ?? undefined} />
//           </CardContent>
//           <CardFooter className="justify-end space-x-2">
//             <Button type="button" variant="destructive" onClick={onClose} disabled={isLoading}>
//               Hủy
//             </Button>
//             <Button type="submit" variant="secondary" disabled={isLoading}>
//               {isLoading ? "Đang lưu..." : "Lưu"}
//             </Button>
//           </CardFooter>
//         </form>
//       </Card>
//     </div>
//   );
// };

// export default GenericModal;