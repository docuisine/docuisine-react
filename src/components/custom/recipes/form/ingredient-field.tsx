import { useId } from "react";
import { Input } from "@/components/ui/input";
import { GripIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Ingredient } from "@/lib/types";
import { IngredientUnitCombobox } from "./ingredient-unit-combobox";
import { DeleteBtn } from "@/components/custom/buttons";

type InputFloatingLabelProps = React.ComponentProps<typeof Input> & {
  className?: string;
  label: string;
};

const InputFloatingLabel = ({
  className,
  label,
  ...props
}: InputFloatingLabelProps) => {
  const id = useId();

  return (
    <div className={cn("group relative w-full", className)}>
      <label
        htmlFor={id}
        className={cn(
          "origin-start text-muted-foreground group-focus-within:text-foreground",
          "has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2",
          "block -translate-y-1/2 cursor-text px-2 text-sm transition-all",
          "group-focus-within:pointer-events-none group-focus-within:top-0",
          "group-focus-within:cursor-default group-focus-within:text-xs",
          "group-focus-within:font-medium",
          "has-[+input:not(:placeholder-shown)]:pointer-events-none",
          "has-[+input:not(:placeholder-shown)]:top-0",
          "has-[+input:not(:placeholder-shown)]:cursor-default",
          "has-[+input:not(:placeholder-shown)]:text-xs",
          "has-[+input:not(:placeholder-shown)]:font-medium",
        )}
      >
        <span className="bg-background inline-flex px-1">{label}</span>
      </label>
      <Input
        id={id}
        {...props}
        placeholder=" "
        className="dark:bg-background"
      />
    </div>
  );
};

export default function IngredientField({
  ingredient,
  deleteHandler,
}: {
  ingredient: Ingredient;
  deleteHandler: (id: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <GripIcon className="mr-2 size-8 text-muted-foreground" />
      <div className="min-w-fit w-40 text-start">{ingredient.name}</div>
      <InputFloatingLabel
        label="Quantity"
        type="number"
        className="max-w-30"
        min="1"
      />
      <IngredientUnitCombobox />
      <InputFloatingLabel label="Notes" type="text" />
      <DeleteBtn handler={() => deleteHandler(ingredient.id)} />
    </div>
  );
}
