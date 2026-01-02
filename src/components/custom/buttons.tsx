import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const DeleteImage = ({ handler }: { handler: () => void }) => {
  const classname = cn(
    "bg-background",
    "hover:bg-[rgb(var(--admonition-destructive-bg))]",
    "border-[rgb(var(--admonition-destructive-border))]",
    "text-[rgb(var(--admonition-destructive-fg))]",
    "hover:text-[rgb(var(--admonition-destructive-fg))]"
  );
  return (
    <Button variant="destructive" className={classname} onClick={handler}>
      <TrashIcon />
      Delete image
    </Button>
  );
};
