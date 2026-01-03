import { UserField } from "@/components/custom/profile/common";
import { Button } from "@/components/ui/button";
import * as PC from "@/components/custom/profile/common";

export default function AuthenticationPage() {
  return (
    <PC.MiniPage>
      <PC.MiniPageSection title="Authentication Settings">
        <PC.MiniPageSectionContent>
          <form className="max-w-xs gap-4 flex flex-col" id="auth-form">
            <UserField
              label="Current Password"
              name="currentPassword"
              type="password"
            />
            <UserField
              label="New Password"
              name="newPassword"
              type="password"
            />
            <UserField
              label="Confirm New Password"
              name="confirmNewPassword"
              type="password"
            />
            <Button className="w-xs" type="submit">
              Update Password
            </Button>
          </form>
        </PC.MiniPageSectionContent>
      </PC.MiniPageSection>
    </PC.MiniPage>
  );
}
