import { Link } from "react-router-dom";
import type { Category } from "@/lib/types";

const CuisineCard = ({ category }: { category: Category }) => {
  const normalizedPath = category.name.toLowerCase().replace(/\s+/g, "-");
  return (
    <Link
      to={`/cuisine/${normalizedPath}`}
      className="flex flex-col items-center gap-2"
    >
      <div className="h-24 w-24 overflow-hidden rounded-md border shadow-sm">
        <img
          src={`https://pub-d3ef28b83a854575bfa54225e768a452.r2.dev/${category.preview_img}`}
          alt={category.name}
          className="h-full w-full object-cover transition-transform duration-100 hover:scale-105 bg-sidebar-accent text-secondary-foreground"
          id={category.name}
        />
      </div>
      <label
        htmlFor={category.name}
        className="text-sm font-semibold text-secondary-foreground text-center"
      >
        {category.name}
      </label>
    </Link>
  );
};

export default CuisineCard;
