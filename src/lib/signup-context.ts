import { createContext, useContext } from "react";
import type { SignupFormData, SignupState } from "./types";

export const SignupContext = createContext<{
  data: SignupFormData;
  setData: React.Dispatch<React.SetStateAction<SignupFormData>>;
} | null>(null);

export const SignupStateContext = createContext<{
  state: SignupState;
  setState: React.Dispatch<React.SetStateAction<SignupState>>;
} | null>(null);

export function useSignup() {
  const ctx = useContext(SignupContext);
  if (!ctx) {
    throw new Error("useSignup must be used within SignupProvider");
  }
  return ctx;
}

export function useSignupState() {
  const ctx = useContext(SignupStateContext);
  if (!ctx) {
    throw new Error("useSignupState must be used within SignupStateProvider");
  }
  return ctx;
}
