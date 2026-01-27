import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import InputPasswordStrength from "@/components/shadcn-studio/input/input-46";
import PasswordVisibilityToggle from "@/components/shadcn-studio/input/input-26";
import { useSignup, useSignupState } from "@/lib/signup-context";
import { useNavigate } from "react-router-dom";
import { UndoIcon } from "lucide-react";
import React, { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { validatePassword, removeWhitespace } from "@/lib/utils";

export function SignupPasswordForm() {
  const { data, setData } = useSignup();
  const { state } = useSignupState();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const navigate = useNavigate();
  const isValid =
    data.username.length >= 3 &&
    validatePassword(data.password) &&
    data.password === confirmPassword;

  if (submitDisabled != (!isValid || state.isLoading)) {
    setSubmitDisabled(!isValid || state.isLoading);
  }
  return (
    <>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter a strong password to secure your account
        </p>
      </div>

      <Field>
        <Field className="flex flex-col gap-4">
          <Field className="basis-2/3">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <InputPasswordStrength
              id="password"
              name="password"
              value={data.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData({ ...data, password: removeWhitespace(e.target.value) })
              }
            />
          </Field>

          <Field className="basis-1/3">
            <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
            <PasswordVisibilityToggle
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(removeWhitespace(e.target.value))
              }
            />
          </Field>
        </Field>
      </Field>
      <Field orientation="horizontal" className="flex">
        <Button
          variant="outline"
          className="w-full basis-1/3"
          onClick={() => navigate("/signup")}
          type="button"
        >
          <UndoIcon className="mr-2" />
          Back
        </Button>
        <Button type="submit" className="basis-2/3" disabled={submitDisabled}>
          {state.isLoading ? (
            <Spinner className="mr-2" role="status" aria-label="Loading" />
          ) : (
            "Create Account"
          )}
        </Button>
      </Field>
    </>
  );
}
