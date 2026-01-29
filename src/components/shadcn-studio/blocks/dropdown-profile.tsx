import type { ReactNode } from "react";
import {
  UserIcon,
  SettingsIcon,
  BookOpenIcon,
  LogOutIcon,
  CircleUser,
  LogInIcon,
  UserRoundPlusIcon,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/useAuth";
import { useNavigate } from "react-router-dom";

type Props = {
  trigger: ReactNode;
  defaultOpen?: boolean;
  align?: "start" | "center" | "end";
  username: string;
  email?: string;
  avatarUrl?: string;
};

const ProfileDropdown = ({
  trigger,
  defaultOpen,
  align = "end",
  username,
  email,
  avatarUrl,
}: Props) => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const displayAccount = isAuthenticated;
  const displayAdministration = isAuthenticated && user && user.role === "admin";
  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align={align || "end"}>
        <DropdownMenuLabel className="flex items-center gap-4 px-4 py-2.5 font-normal">
          <div className="relative">
            <Avatar className="size-10">
              <AvatarImage src={avatarUrl} alt="Profile picture" />
              <AvatarFallback>
                <AvatarFallback className="rounded-md">
                  <CircleUser
                    size={"1.5em"}
                    className="text-muted-foreground"
                  />
                </AvatarFallback>
              </AvatarFallback>
            </Avatar>
            {isAuthenticated && (
              <span className="ring-card absolute right-0 bottom-0 block size-2 rounded-full bg-green-600 ring-2" />
            )}
          </div>
          <div className="flex flex-1 flex-col items-start">
            <span className="text-foreground text-lg font-semibold">
              {username || "Guest"}
            </span>
            <span className="text-muted-foreground text-base">{email}</span>
          </div>
        </DropdownMenuLabel>

        {(displayAccount || displayAdministration) && <DropdownMenuSeparator />}

        <DropdownMenuGroup>
          {displayAccount && (
            <DropdownMenuItem
              className="px-4 py-2.5 text-base"
              onClick={() => navigate("/account/profile")}
            >
              <UserIcon className="text-foreground size-5" />
              <span>My account</span>
            </DropdownMenuItem>
          )}
          {displayAdministration && (
            <DropdownMenuItem
              className="px-4 py-2.5 text-base"
              onClick={() => navigate("/administration/site-settings")}
            >
              <SettingsIcon className="text-foreground size-5" />
              <span>Administration</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            className="px-4 py-2.5 text-base"
            onClick={() =>
              window.open(
                "https://docuisine.github.io/documentation/",
                "_blank",
                "noopener,noreferrer",
              )
            }
          >
            <BookOpenIcon className="text-foreground size-5" />
            <span>Documentation</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        {isAuthenticated && (
          <>
            <DropdownMenuItem
              variant="destructive"
              className="px-4 py-2.5 text-base"
              onClick={logout}
            >
              <LogOutIcon className="size-5 " />
              <span>Logout</span>
            </DropdownMenuItem>
          </>
        )}
        {!isAuthenticated && (
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="px-4 py-2.5 text-base"
              onClick={() => navigate("/login")}
            >
              <LogInIcon className="size-5 text-foreground" />
              Login
            </DropdownMenuItem>
            <DropdownMenuItem
              className="px-4 py-2.5 text-base"
              onClick={() => navigate("/signup")}
            >
              <UserRoundPlusIcon className="size-5 text-foreground" />
              Signup
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
