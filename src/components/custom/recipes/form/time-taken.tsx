import { Input } from "@/components/ui/input";
import { useId } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const InputTime = ({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder?: string;
}) => {
  const id = useId();

  return (
    <div className="w-full space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex rounded-md shadow-xs">
        <Input
          id={id}
          type="number"
          placeholder={placeholder}
          name={name}
          className="-me-px rounded-r-none shadow-none focus-visible:z-1"
        />
        <Select defaultValue="minutes">
          <SelectTrigger id={id} className="rounded-l-none shadow-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="seconds" className="pr-2 [&_svg]:hidden">
              seconds
            </SelectItem>
            <SelectItem value="minutes" className="pr-2 [&_svg]:hidden">
              minutes
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
