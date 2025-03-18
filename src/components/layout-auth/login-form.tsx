import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { apiFetch } from "@/lib/api";

interface User {
  id: number;
  name: string;
  avatar: string | null;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

interface LoginError {
  message: string;
}

const LoginForm = ({ onSubmit }: { onSubmit?: (email: string, password: string) => void }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const data: LoginResponse = await apiFetch<LoginResponse>("/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      console.log("Login successful:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/");

      if (onSubmit) {
        onSubmit(email, password);
      }
    } catch (err) {
      setError((err as LoginError).message || "Đã xảy ra lỗi khi đăng nhập");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && <InputError message={error} />}

      <Input
        id="email"
        name="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Tài khoản"
      />

      <Input
        id="password"
        name="password"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mật khẩu"
      />

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
      </Button>
    </form>
  );
};

export default LoginForm;