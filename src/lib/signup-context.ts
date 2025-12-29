// src/lib/signup-context.tsx
import { createContext, useContext } from "react";
import type { SignupFormData } from "./types";

export const SignupContext = createContext<{
  data: SignupFormData;
  setData: React.Dispatch<React.SetStateAction<SignupFormData>>;
} | null>(null);


export function useSignup() {
  const ctx = useContext(SignupContext);
  if (!ctx) {
    throw new Error("useSignup must be used within SignupProvider");
  }
  return ctx;
}
