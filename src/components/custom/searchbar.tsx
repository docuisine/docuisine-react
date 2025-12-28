import { useId } from "react";

import { SearchIcon } from "lucide-react";
import { Input } from "../ui/old/input";

const Searchbar = () => {
  const id = useId();

  return (
    <div className="w-full max-w-full space-y-2 p-2">
      <div className="relative">
        <Input
          id={id}
          type="search"
          placeholder="Search recipes, cuisines, ingredients..."
          className="p-4 rounded-md h-12 bg-zinc-100 w-full"
        />
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 peer-disabled:opacity-50">
          <SearchIcon className="size-6" />
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
