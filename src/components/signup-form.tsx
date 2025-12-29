import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FoodWarsJpg from "@/assets/food-wars.jpg";
import { FieldDescription, FieldGroup } from "@/components/ui/field";
import { useSignup, useSignupState } from "@/lib/signup-context";
import api from "@/lib/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function SignupForm({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const { data } = useSignup();
  const { setState } = useSignupState();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState({ isLoading: true });
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);

    const email = data.email;
    if (email) {
      formData.append("email", email);
    }
    try {
      await api.signup(formData);
    } finally {
      setState({ isLoading: false });
    }
    navigate("/login");
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
              {children}
              <FieldDescription className="text-center">
                Already have an account? <a href="/login">Log in</a>
              </FieldDescription>
              <Button variant="ghost" type="button">
                <Link to="/recipes" className="w-full h-full">
                  Browse as a guest
                </Link>
              </Button>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src={FoodWarsJpg}
              alt="Food collage (Food Wars Anime)"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
