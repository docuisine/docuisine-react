import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/old/label";

export function FiltersCheckbox() {
  const cuisines = [
    "English",
    "Italian",
    "Mexican",
    "Chinese",
    "Indian",
    "Burgers",
    "Salads",
    "Desserts",
    "Beverages",
    "Seafood",
    "Vegetarian",
    "Vegan",
  ];
  return (
    <div className="flex flex-col gap-2">
      {cuisines.map((cuisine) => (
        <div key={cuisine} className="flex items-center gap-4">
          <Checkbox id={cuisine.toLowerCase()} />
          <Label htmlFor={cuisine.toLowerCase()}>{cuisine}</Label>
        </div>
      ))}
    </div>
  );
}
export default FiltersCheckbox;
