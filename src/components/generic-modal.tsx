import * as React from "react";
import { apiFetch } from "@/lib/api";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "./ui/select";
import Heading from "./heading";
import { Card, CardContent, CardFooter, CardHeader, CardTitle,} from "./ui/card";
import InputError from "./input-error";

interface Field {
  name: string;
  label: string;
  type?: "text" | "textarea" | "select" | "number";
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  inline?: boolean;
}

interface GenericModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initialData?: Record<string, any>;
  fields: Field[];
  apiEndpoint: string;
  method?: "POST" | "PUT" | "PATCH";
  onSave: () => void;
}

const GenericModal: React.FC<GenericModalProps> = ({
  isOpen,
  onClose,
  title,
  initialData = {},
  fields,
  apiEndpoint,
  method = "POST",
  onSave,
}) => {
  const [formData, setFormData] = React.useState<Record<string, any>>(initialData);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await apiFetch(apiEndpoint, {
        method,
        data: formData,
      });
      onSave();
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(94,94,94,0.5)] flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            {title}
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4  justify-between">
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
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      className="mt-1 block w-full border rounded-md p-2"
                      placeholder={field.placeholder}
                    />
                  ) : field.type === "select" ? (
                    <Select
                      onValueChange={handleSelectChange(field.name)}
                      defaultValue={formData[field.name] || ""}
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
                  ) : (
                    <Input
                      id={field.name}
                      type={field.type || "text"}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                  )}
                </div>
              ))}
            </div>
            <InputError message={error ?? undefined} />
          </CardContent>
          <CardFooter className="justify-end space-x-2">
            <Button type="button" variant="destructive" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" variant="secondary">
              Lưu
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default GenericModal;