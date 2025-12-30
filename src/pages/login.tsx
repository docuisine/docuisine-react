import { LoginForm } from "@/components/custom/login/login-form";
import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    document.title = "Login - Docuisine";
  }, []);
  return (
    <div className="h-screen w-screen bg-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  );
}
