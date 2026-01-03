import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId } from "react";
import React from "react";

type UserField = React.ComponentProps<typeof Input> & {
  label: string;
};

export const UserField = ({ label, ...props }: UserField) => {
  const id = useId();
  return (
    <div className="flex flex-col w-xs">
      <Label htmlFor={id} className="mb-2 text-start font-semibold">
        {label}
      </Label>
      <Input id={id} {...props} className="w-xs" />
    </div>
  );
};
