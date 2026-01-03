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

export function MiniPage({ children }: { children: React.ReactNode }) {
  return <div className="w-full">{children}</div>;
}

export function MiniPageSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="font-semibold text-2xl mb-6 text-start border-b">
        {title}
      </h1>
      {children}
    </div>
  );
}

export function MiniPageSectionContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex justify-between w-full gap-4">{children}</div>;
}
