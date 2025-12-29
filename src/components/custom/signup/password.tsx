import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import InputPasswordStrength from "@/components/shadcn-studio/input/input-46";
import PasswordVisibilityToggle from "@/components/shadcn-studio/input/input-26";
import { useSignup } from "@/lib/signup-context";

export function SignupPasswordForm() {
  const { data, setData } = useSignup();
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
            <InputPasswordStrength id="password" name="password" />
          </Field>

          <Field>
            <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
            <PasswordVisibilityToggle
              id="confirm-password"
              name="confirm-password"
              value={data.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData({ ...data, password: e.target.value.trim() })
              }
            />
          </Field>
        </Field>
        <FieldDescription className="text-start">
          Must be 8-128 characters long.
        </FieldDescription>
      </Field>
      <Field>
        <Button type="submit">Create Account</Button>
      </Field>
    </>
  );
}
