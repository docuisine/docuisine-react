import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleUser } from "lucide-react";

const UserCard = ({
  username = "Username",
  avatarUrl,
}: {
  username: string;
  avatarUrl?: string;
}) => {
  return (
    <div className="flex flex-row gap-4 align-middle justify-center items-center">
      {username}
      <Avatar>
        <AvatarImage src={avatarUrl} alt={username} />
        <AvatarFallback className="bg-secondary">
          <CircleUser size={"1.5em"} />
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserCard;
