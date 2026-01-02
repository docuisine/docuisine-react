import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleUser } from "lucide-react";
import ProfileDropdown from "../shadcn-studio/blocks/dropdown-profile";
import { useAuth } from "@/lib/useAuth";
import { urlJoin } from "@/lib/utils";

const UserCard = () => {
  const { isAuthenticated, user } = useAuth();

  let avatarUrl;
  if (user) {
    if (user.preview_img != null) {
      avatarUrl = urlJoin(import.meta.env.IMAGE_HOST, user.preview_img);
    } else {
      if (user.img != null) {
        avatarUrl = urlJoin(import.meta.env.IMAGE_HOST, user.img);
      }
    }
  }
  const username = user?.username || "Guest";
  return (
    <div className="flex flex-row gap-4 align-middle justify-center items-center">
      <ProfileDropdown
        align="end"
        username={username}
        email={user?.email || ""}
        avatarUrl={avatarUrl}
        trigger={
          <div className="relative">
            <Avatar className="rounded-md border shadow-sm">
              <AvatarImage src={avatarUrl} alt={username} />
              <AvatarFallback className="rounded-md">
                <CircleUser size={"1.2em"} className="text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            {isAuthenticated && (
              <span className="ring-card absolute right-0 bottom-0 block size-2 rounded-full bg-green-600 ring-2" />
            )}
          </div>
        }
      />
    </div>
  );
};

export default UserCard;
