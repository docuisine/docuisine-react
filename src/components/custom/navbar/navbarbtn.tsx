import { useLocation, Link } from "react-router-dom";

interface NavBarBtnProps {
  title: string;
  href?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
}

const NavBarBtn: React.FC<NavBarBtnProps> = ({ title, href, children, target, rel }) => {
  const path = useLocation().pathname;
  const normalizedTitle = title.toLowerCase().replace(/\s+/g, "-");
  const isActive = path.includes(normalizedTitle);

  const baseClasses =
    "custom flex items-center justify-center gap-2 border-b-4 transition-colors rounded-t-md";
  const activeClasses = "border-accent-foreground text-secondary-foreground";
  const inactiveClasses =
    "border-transparent text-muted-foreground hover:border-accent-foreground/50 hover:text-secondary-foreground/60 hover:bg-secondary/60";

  return (
    <Link to={href ?? `/${normalizedTitle}`} target={target} rel={rel}>
      <button
        className={`${baseClasses} ${
          isActive ? activeClasses : inactiveClasses
        }`}
      >
        {children}
        {title}
      </button>
    </Link>
  );
};

export default NavBarBtn;
