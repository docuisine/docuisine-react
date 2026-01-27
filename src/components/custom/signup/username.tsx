import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSignup } from "@/lib/signup-context";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { removeWhitespace } from "@/lib/utils";

export function SignupUsernameForm() {
  const { data, setData } = useSignup();
  const [nextDisabled, setNextDisabled] = useState(true);
  const navigate = useNavigate();
  if (data.username && data.username.length >= 3 && nextDisabled) {
    setNextDisabled(false);
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = removeWhitespace(e.target.value);
    setData({ ...data, username });
    setNextDisabled(username === "" || username.length < 3);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your username below to create your account
        </p>
      </div>
      <Field>
        <FieldLabel htmlFor="username">Username</FieldLabel>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="johnFood"
          value={data.username}
          onChange={handleUsernameChange}
          required
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="email">
          Email
          <span className="text-muted-foreground text-xs">(Optional)</span>
        </FieldLabel>
        <Input
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: removeWhitespace(e.target.value) })}
          placeholder="johnFood@docuisine.org"
        />
        <FieldDescription className="text-start">
          For password recovery purposes only.
        </FieldDescription>
      </Field>
      <Field>
        <Button
          variant="outline"
          className="w-full"
          disabled={nextDisabled}
          onClick={() => navigate("/signup/password")}
          type="button"
        >
          Next
          <ArrowRight className="ml-2" />
        </Button>
      </Field>
    </>
  );
}
