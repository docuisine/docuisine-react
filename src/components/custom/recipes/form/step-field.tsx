import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import type { CreateRecipeStep } from "@/lib/types";

export default function StepField({
  recipeStep,
  deleteHandler,
}: {
  recipeStep: CreateRecipeStep;
  deleteHandler: (html_id: string) => void;
}) {
  return (
    <div className="flex flex-row gap-2 items-center">
      <div className="w-full space-y-2">
        <Label className="font-semibold">{`Step ${recipeStep.step_num}`}</Label>
        <Textarea placeholder="Describe the step..." id={`step-${recipeStep.step_num}`} />
      </div>
      <Button
        variant="ghost"
        aria-roledescription="Delete entry"
        className="text-muted-foreground hover:bg-[rgb(var(--admonition-destructive-bg))] hover:text-[rgb(var(--admonition-destructive-fg))]"
        onClick={() => deleteHandler(recipeStep.html_id)}
      >
        <TrashIcon />
      </Button>
    </div>
  );
}
