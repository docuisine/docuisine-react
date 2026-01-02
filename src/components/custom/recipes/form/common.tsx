import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function RecipeFieldLabel({
  htmlFor,
  label,
  optional,
}: {
  htmlFor: string;
  label: string;
  optional?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-1">
      <Label htmlFor={htmlFor}>{label}</Label>
      {optional && (
        <span className="text-muted-foreground text-xs">Optional field</span>
      )}
    </div>
  );
}

export const InputGroupHeader = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h3
      className={cn(
        "text-lg font-medium text-start border-b mt-2 flex items-center pb-1",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const InputGroup = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn("flex flex-col gap-4 w-full", className)}>
      {children}
    </div>
  );
};
