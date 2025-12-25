import { Link } from "react-router-dom";

const CuisineCard = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <Link
      to={`/cuisine/${alt.toLowerCase()}`}
      className="flex flex-col items-center gap-2"
    >
      <div className="h-24 w-24 overflow-hidden rounded-md border shadow-sm">
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-100 hover:scale-105 bg-zinc-100"
          id={alt}
        />
      </div>
      <label
        htmlFor={alt}
        className="text-sm font-semibold text-amber-950 text-center"
      >
        {alt}
      </label>
    </Link>
  );
};

export default CuisineCard;
