import { LoginForm } from "@/components/custom/login/login-form";

export default function LoginPage() {
  return (
    <div className="h-screen w-screen bg-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  );
}
