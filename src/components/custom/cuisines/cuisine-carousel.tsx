import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CuisineCard from "@/components/custom/cuisines/cuisinecard";
import { useState } from "react";
import type { Cuisine } from "@/lib/types";
import api from "@/lib/api";

const CuisineCarousel = () => {
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const getCategories = async () => {
    const data = await api.getAllCategories();
    setCuisines(data);
  };

  if (cuisines.length === 0) {
    getCategories();
  }
  if (cuisines) {
    return (
      <ScrollArea className="w-full h-fit pb-4 rounded-md whitespace-nowrap">
        <div className="flex w-max space-x-4">
          {cuisines.map((cuisine) => (
            <CuisineCard cuisine={cuisine} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default CuisineCarousel;
