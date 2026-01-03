import { UserField } from "@/components/custom/profile/common";
import { Button } from "@/components/ui/button";

export default function AuthenticationPage() {
  return (
    <div className="w-full">
      <h1 className="font-semibold text-2xl mb-6 text-start border-b">
        Authentication
      </h1>
      <div className="flex justify-between w-full gap-4">
        <form className="max-w-xs gap-4 flex flex-col" id="auth-form">
          <UserField label="Current Password" name="currentPassword" type="password" />
          <UserField label="New Password" name="newPassword" type="password" />
          <UserField label="Confirm New Password" name="confirmNewPassword" type="password" />
          <Button className="w-xs" type="submit">
            Update Password
          </Button>
        </form>
      </div>
    </div>
  );
}
