"use client";

import { useState } from "react";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PasswordVisibilityToggle = ({ ...props }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="w-full space-y-2">
      <div className="relative">
        <Input
          type={isVisible ? "text" : "password"}
          className="pr-9"
          required
          {...props}
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsVisible((prevState) => !prevState)}
          className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
          type="button"
        >
          {isVisible ? <EyeOffIcon /> : <EyeIcon />}
        </Button>
      </div>
    </div>
  );
};

export default PasswordVisibilityToggle;
