import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId } from "react";
import React from "react";
import { cn } from "@/lib/utils";

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
  return <div className="w-full gap-8 flex flex-col">{children}</div>;
}

export function MiniPageSection({
  title,
  children,
  icon,
}: {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="font-semibold text-2xl mb-4 text-start border-b items-center flex pb-1">
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h1>
      {children}
    </div>
  );
}

export function MiniPageSectionContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("flex justify-between w-full gap-4", className)}>{children}</div>;
}
