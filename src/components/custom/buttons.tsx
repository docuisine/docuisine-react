import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const DeleteBtn = ({
  handler,
  children,
}: {
  handler: () => void;
  children?: React.ReactNode;
}) => {
  const classname = cn(
    "bg-transparent",
    "hover:bg-[rgb(var(--admonition-destructive-bg))]",
    "border-[rgb(var(--admonition-destructive-border))]",
    "text-[rgb(var(--admonition-destructive-fg))]",
    "hover:text-[rgb(var(--admonition-destructive-fg))]",
    "active:scale-95 transition-all",
  );
  return (
    <Button variant="destructive" className={classname} onClick={handler}>
      <TrashIcon />
      {children}
    </Button>
  );
};
