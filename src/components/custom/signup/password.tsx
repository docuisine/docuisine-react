import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import InputPasswordStrength from "@/components/shadcn-studio/input/input-46";
import PasswordVisibilityToggle from "@/components/shadcn-studio/input/input-26";
import { useSignup } from "@/lib/signup-context";
import { useNavigate } from "react-router-dom";
import { UndoIcon } from "lucide-react";
import React, { useState, useEffect } from "react";

const validatePassword = (password: string) => {
  return (
    password.length >= 8 &&
    password.length <= 128 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password)
  );
};

export function SignupPasswordForm() {
  const { data, setData } = useSignup();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const isValid =
      data.username.length >= 3 &&
      validatePassword(data.password) &&
      data.password === confirmPassword;

    setSubmitDisabled(!isValid);
  }, [data.username, data.password, confirmPassword]);
  return (
    <>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter a strong password to secure your account
        </p>
      </div>

      <Field>
        <Field className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <InputPasswordStrength
              id="password"
              name="password"
              value={data.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData({ ...data, password: e.target.value })
              }
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
            <PasswordVisibilityToggle
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
            />
          </Field>
        </Field>
        <FieldDescription className="text-start">
          Must be 8-128 characters long.
        </FieldDescription>
      </Field>
      <Field orientation="horizontal" className="flex">
        <Button
          variant="outline"
          className="w-full basis-1/3"
          onClick={() => navigate("/signup")}
        >
          <UndoIcon className="mr-2" />
          Back
        </Button>
        <Button type="submit" className="basis-2/3" disabled={submitDisabled}>
          Create Account
        </Button>
      </Field>
    </>
  );
}
