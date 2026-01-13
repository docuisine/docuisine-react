import { Link } from "react-router-dom";
import type { Cuisine } from "@/lib/types";
import { urlJoin } from "@/lib/utils";
import { IMAGE_HOST } from "@/lib/settings";
import { normalizeTitle } from "@/lib/utils";

const CuisineCard = ({ cuisine }: { cuisine: Cuisine }) => {
  return (
    <Link
      to={`/cuisine/${normalizeTitle(cuisine.name)}`}
      className="flex flex-col items-center gap-2"
    >
      <div className="h-24 w-24 overflow-hidden rounded-md border shadow-sm">
        <img
          src={urlJoin(IMAGE_HOST, cuisine.preview_img)}
          alt={cuisine.name}
          className="h-full w-full object-cover transition-transform duration-400 hover:scale-104 bg-sidebar-accent text-secondary-foreground"
          id={cuisine.name}
        />
      </div>
      <label
        htmlFor={cuisine.name}
        className="text-sm font-semibold text-secondary-foreground text-center"
      >
        {cuisine.name}
      </label>
    </Link>
  );
};

export default CuisineCard;
