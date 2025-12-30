import { Input } from "@/components/ui/input";

export default function FiltersRating() {
  return (
    <Input
      type="number"
      placeholder="1 to 5"
      className="w-full"
      defaultValue={1}
      min={1}
      max={5}
    />
  );
}
