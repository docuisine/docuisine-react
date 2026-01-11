import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FoodWarsJpg from "@/assets/food-wars.jpg";
import { Link } from "react-router-dom";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import PasswordVisibilityToggle from "@/components/shadcn-studio/input/input-26";
import { useAuth } from "@/lib/useAuth";
import { useNavigate } from "react-router-dom";
import DemoInfo from "@/components/custom/login/demo-info";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { APIError } from "@/lib/errors";
import Admonition from "@/components/custom/admonition";
import { validatePassword } from "@/lib/utils";
import STATUS from "@/lib/status";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<APIError | null>(null);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const data = await api.login(formData);
      const access_token = data.access_token;

      await login(access_token);
      navigate("/recipes", { replace: true });
    } catch (error) {
      if (error instanceof APIError) {
        setError(error);
      } else {
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 rounded-0 sm:rounded-xl shadow-md">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 md:p-8 flex h-screen items-center sm:h-fit"
            onSubmit={handleSubmit}
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your account
                </p>
              </div>
              <DemoInfo />
              {error && !(error instanceof APIError) && (
                <Admonition type="destructive" title="Something went wrong">
                  {error}
                </Admonition>
              )}
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  placeholder="johnFood"
                  required
                  {...(error?.statusCode === STATUS.HTTP_404_NOT_FOUND && {
                    "aria-invalid": "true",
                    className: "peer",
                  })}
                />
                {error?.statusCode === STATUS.HTTP_404_NOT_FOUND && (
                  <p className="text-muted-foreground text-start peer-aria-invalid:text-destructive text-xs">
                    {error.message}
                  </p>
                )}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <PasswordVisibilityToggle
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                  {...(error?.statusCode === STATUS.HTTP_401_UNAUTHORIZED && {
                    "aria-invalid": "true",
                  })}
                />
                {error?.statusCode === STATUS.HTTP_401_UNAUTHORIZED && (
                  <p className="text-start text-destructive text-xs">
                    {error.message}
                  </p>
                )}
              </Field>
              <Field>
                <Button
                  type="submit"
                  disabled={
                    form.username.length < 3 ||
                    !validatePassword(form.password) ||
                    loading
                  }
                >
                  {loading && (
                    <Spinner
                      className="mr-2"
                      role="status"
                      aria-label="Loading"
                    />
                  )}
                  {!loading && "Login"}
                </Button>
              </Field>
              <FieldDescription className="text-center flex gap-4 justify-center">
                <Link to="/signup" className="btn-link">
                  <span className="btn-link-label">Sign up</span>
                </Link>
                <Link to="/recipes" className="btn-link">
                  <span className="btn-link-label">Browse as a guest</span>
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src={FoodWarsJpg}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
