import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { UserIcon } from "lucide-react";
import { Outlet } from "react-router-dom";

function Menu({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col w-fit gap-4">{children}</div>;
}

function MenuGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-w-50 mr-4">
      <h3 className="font-semibold text-sm text-start mb-2 ml-2 text-nowrap text-muted-foreground select-none">
        {title}
      </h3>
      {children}
    </div>
  );
}

function MenuItem({
  page,
  children,
}: {
  page: string;
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(`/account/${page}`)}
      variant="ghost"
      className="justify-start"
    >
      {children}
    </Button>
  );
}

export default function AccountPage() {
  return (
    <div className="flex gap-8 h-full">
      <Menu>
        <MenuGroup title="Account">
          <MenuItem page="profile">
            <UserIcon />
            Profile
          </MenuItem>
        </MenuGroup>
      </Menu>
      <Outlet />
    </div>
  );
}
