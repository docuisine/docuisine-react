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
import PasswordVisibilityToggle from "./shadcn-studio/input/input-26";
import { useAuth } from "@/lib/useAuth";
import { useNavigate } from "react-router-dom";
import DemoInfo from "@/components/custom/login/demo-info";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const access_token = await api
      .login(formData)
      .then((data) => data.access_token);
    if (!access_token) {
      throw new Error("Login failed");
    }
    try {
      await login(access_token);
    } finally {
      setLoading(false);
    }
    navigate("/recipes", { replace: true });
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
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="johnFood"
                  required
                />
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
                <PasswordVisibilityToggle id="password" name="password" />
              </Field>
              <Field>
                <Button type="submit">
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
