import { Input } from "@/components/ui/input";
import RecipeFieldLabel from "./common";
import { useId } from "react";
import { Textarea } from "@/components/ui/textarea";

type InputStartIconProps = React.ComponentProps<typeof Input> & {
  label: string;
  optional?: boolean;
  children?: React.ReactNode;
};

export const InputStartIcon = ({
  label,
  optional,
  children,
  ...props
}: InputStartIconProps) => {
  const id = useId();

  return (
    <div className="w-full space-y-2">
      <RecipeFieldLabel htmlFor={id} label={label} optional={optional} />
      <div className="relative">
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
          {children}
          <span className="sr-only">{label}</span>
        </div>
        <Input
          id={id}
          {...props}
          className={`peer ${children ? "pl-9" : "pl-3"}`}
        />
      </div>
    </div>
  );
};

export const TextareaWithHintText = ({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) => {
  const id = useId();

  return (
    <div className="w-full space-y-2">
      <RecipeFieldLabel htmlFor={id} label={label} optional />
      <Textarea placeholder={placeholder} id={id} />
    </div>
  );
};
