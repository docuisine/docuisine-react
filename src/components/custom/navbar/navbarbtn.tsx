import { useLocation, Link } from "react-router-dom";
import { titleCase } from "@/lib/utils";
import { normalizeTitle } from "@/lib/utils";

interface NavBarBtnProps {
  title: string;
  href?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
}

const NavBarBtn: React.FC<NavBarBtnProps> = ({
  title,
  href,
  children,
  target,
  rel,
}) => {
  const path = useLocation().pathname;
  const normalizedPath = normalizeTitle(title);
  const isActive = path.includes(normalizedPath);

  const baseClasses =
    "custom flex items-center justify-center gap-2 border-b-4 transition-colors rounded-t-md text-nowrap h-full";
  const activeClasses = "border-accent-foreground text-secondary-foreground";
  const inactiveClasses =
    "border-transparent text-muted-foreground hover:border-accent-foreground/50 hover:text-secondary-foreground/60 hover:bg-secondary/60";

  const textActiveClasses = "inline-block flex items-center";
  const textInactiveClasses = "hidden lg:inline-block";

  return (
    <Link to={href ?? `/${normalizedPath}`} target={target} rel={rel}>
      <button
        className={`${baseClasses} ${
          isActive ? activeClasses : inactiveClasses
        }`}
      >
        {children}
        <span className={isActive ? textActiveClasses : textInactiveClasses}>
          {titleCase(title.split("/").slice(-1)[0])}
        </span>
      </button>
    </Link>
  );
};

export default NavBarBtn;
