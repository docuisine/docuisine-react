import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function FiltersPrice() {
  const [minPrice, setMinPrice] = useState<number>(1);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  return (
    <>
      <Input
        type="number"
        placeholder="Min Price"
        className="w-full"
        min={1}
        defaultValue={1}
        max={maxPrice}
        onChange={(e) => setMinPrice(Number(e.target.value))}
      />
      <Input
        type="number"
        placeholder="Max Price"
        className="w-full"
        defaultValue={1}
        min={minPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
      />
    </>
  );
}
