import { SignupForm } from "@/components/signup-form";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import type { SignupFormData } from "@/lib/types";
import { SignupContext } from "@/lib/signup-context";

export default function SignupPage() {
  const [formData, setFormData] = useState<SignupFormData>({
    username: "",
    email: "",
    password: "",
  });
  return (
    <div className="h-screen w-screen bg-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-sm md:max-w-4xl">
        <SignupContext.Provider
          value={{ data: formData, setData: setFormData }}
        >
          <SignupForm>
            <Outlet />
          </SignupForm>
        </SignupContext.Provider>
      </div>
    </div>
  );
}
