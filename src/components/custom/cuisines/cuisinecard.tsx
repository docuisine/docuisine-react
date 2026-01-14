import { Link } from "react-router-dom";
import type { Cuisine } from "@/lib/types";
import { urlJoin } from "@/lib/utils";
import { IMAGE_HOST } from "@/lib/settings";
import { normalizeTitle } from "@/lib/utils";
import React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FaviconFlat } from "@/components/custom/svgs";

interface ImageWithFallbackProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export function ImageWithFallback({ src, alt, ...props }: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const okClass = "h-full w-full bg-sidebar-accent";
  const errorClass = "h-12 w-12 object-contain bg-none text-muted";
  const baseClass =
    "object-cover transition-transform duration-400 hover:scale-104";
  if (!hasError) {
    return (
      <img
        src={src}
        aria-description={alt}
        onError={() => setHasError(true)}
        className={cn(baseClass, okClass)}
        {...props}
      />
    );
  }

  return <FaviconFlat className={cn(baseClass, errorClass)} />;
}

const CuisineCard = ({ cuisine }: { cuisine: Cuisine }) => {
  return (
    <Link
      to={`/cuisine/${normalizeTitle(cuisine.name)}`}
      className="flex flex-col items-center gap-2"
    >
      <div className="h-24 w-24 overflow-hidden rounded-md border shadow-sm flex items-center justify-center">
        <ImageWithFallback
          src={urlJoin(IMAGE_HOST, cuisine.preview_img)}
          alt={cuisine.name}
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
