import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import Usercard from "@/components/custom/usercard";
import HorizontalLogo from "@/components/custom/horizontallogo";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/useAuth";
import { Separator } from "@/components/ui/separator";

const TitleBar = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <div className="w-full flex justify-between">
      <Link to="/" className="flex items-center">
        <HorizontalLogo />
      </Link>
      <div className="flex flex-row gap-4 align-middle justify-center items-center">
        {isAuthenticated && (
          <>
            <Usercard
              username="Username"
              avatarUrl="https://github.com/shadcn.png"
            />
            <Link to="/login">
              <Button
                variant="ghost"
                onClick={() => {
                  logout();
                }}
              >
                <LogOutIcon size={"1.2em"} />
                Logout
              </Button>
            </Link>
          </>
        )}

        {!isAuthenticated && (
          <>
            <Link to="/login">
              <Button variant="ghost">
                <LogOutIcon size={"1.2em"} />
                Login
              </Button>
            </Link>
            <Separator orientation="vertical" />
            <Link to="/signup">
              <Button variant="ghost">
                <LogOutIcon size={"1.2em"} />
                Signup
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default TitleBar;
