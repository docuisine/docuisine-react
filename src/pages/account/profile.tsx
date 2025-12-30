import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleUser } from "lucide-react";
import EditProfilePic from "@/components/custom/profile/profile-pic-edit";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UserField = ({
  label,
  defaultValue,
  id,
  type = "text",
}: {
  label: string;
  defaultValue: string;
  id: string;
  type?: string;
}) => {
  return (
    <>
      <div className="mb-4 flex flex-col">
        <Label htmlFor={id} className="mb-2 text-start font-semibold">
          {label}
        </Label>
        <Input
          id={id}
          type={type}
          placeholder={defaultValue}
          className="w-80"
        />
      </div>
    </>
  );
};

export default function ProfilePage() {
  return (
    <div className="w-full">
      <h1 className="font-semibold text-2xl mb-6 text-start border-b">
        Profile Information
      </h1>
      <div className="flex justify-between w-full gap-4">
        <div className="w-full flex flex-col">
          <UserField label="Full Name" id="full-name" defaultValue="John Doe" />
          <UserField
            label="Email Address"
            id="email"
            type="email"
            defaultValue="john.doe@example.com"
          />
        </div>
        <div className="flex flex-col justify-start gap-4">
          <Label
            htmlFor="profile-picture"
            className="mb-2 font-semibold text-start"
          >
            Profile Picture
          </Label>
          <Avatar className="w-60 h-60 rounded-full border shadow-sm">
            <AvatarImage src="/avatars/user1.jpg" alt="User Avatar" />
            <AvatarFallback className="rounded-full">
              <CircleUser size={"4em"} className="text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <EditProfilePic />
        </div>
      </div>
    </div>
  );
}
