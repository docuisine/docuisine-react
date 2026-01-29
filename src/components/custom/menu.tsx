import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function Menu({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col w-fit gap-4">{children}</div>;
}

export function MenuGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-w-50 mr-4 mb-2">
      <h3 className={`font-semibold text-sm text-start mb-2 ml-2 text-nowrap text-muted-foreground select-none ${title ? "" : "hidden"}`}>
        {title}
      </h3>
      {children}
    </div>
  );
}

export function MenuItem({
  page,
  children,
}: {
  page: string;
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(`${page}`)}
      variant="ghost"
      className="justify-start"
    >
      {children}
    </Button>
  );
}

const PageMenu = {
    Menu,
    MenuGroup,
    MenuItem,
}

export default PageMenu;
