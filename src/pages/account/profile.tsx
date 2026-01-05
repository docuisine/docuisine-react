import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleUser } from "lucide-react";
import EditProfilePic from "@/components/custom/profile/profile-pic-edit";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/useAuth";
import { urlJoin } from "@/lib/utils";
import Admonition from "@/components/custom/admonition";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import api from "@/lib/api";
import { Spinner } from "@/components/ui/spinner";
import * as PC from "@/components/custom/profile/common";
import { IMAGE_HOST } from "@/lib/settings";

const noEmailAdmonition = (
  <Admonition type="warning" title="No recovery email found">
    Make sure to add a recovery email as a backup solution when you forget your
    password.
  </Admonition>
);

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, setUserSync } = useAuth();
  const [updating, setUpdating] = useState(false);
  if (!user) {
    navigate("/");
    return null;
  }
  const avatarUrl = urlJoin(IMAGE_HOST, user.img || "");

  const handleUpdateEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const form = e.currentTarget;
      const formData = new FormData(form);
      const data = await api.updateUserEmail(formData);
      setUserSync(data);
    } finally {
      setUpdating(false);
    }
  };
  return (
    <PC.MiniPage>
      <PC.MiniPageSection title="Profile Information">
        <PC.MiniPageSectionContent>
          <form
            className="max-w-xs gap-4 flex flex-col"
            id="email-form"
            onSubmit={handleUpdateEmail}
          >
            {!user.email && noEmailAdmonition}
            <PC.UserField
              label="Email Address"
              name="email"
              type="email"
              defaultValue={user.email || ""}
            />
            <PC.UserField label="Password" name="password" type="password" />
            <Button className="w-xs" disabled={updating} type="submit">
              {updating ? <Spinner /> : "Update Email"}
            </Button>
          </form>
          <div className="flex flex-col justify-start gap-4">
            <Label
              htmlFor="profile-picture"
              className="mb-2 font-semibold text-start"
            >
              Profile Picture
            </Label>
            <Avatar className="w-60 h-60 rounded-full border shadow-sm">
              <AvatarImage src={avatarUrl} alt="User Avatar" />
              <AvatarFallback className="rounded-full">
                <CircleUser size={"4em"} className="text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            <EditProfilePic />
          </div>
        </PC.MiniPageSectionContent>
      </PC.MiniPageSection>
    </PC.MiniPage>
  );
}
