import { UserIcon, KeyRoundIcon } from "lucide-react";
import { Outlet } from "react-router-dom";
import PageMenu from "@/components/custom/menu";

export default function AccountPage() {
  return (
    <div className="flex gap-8 h-full">
      <PageMenu.Menu>
        <PageMenu.MenuGroup title="Account">
          <PageMenu.MenuItem page="/account/profile">
            <UserIcon />
            Profile
          </PageMenu.MenuItem>
          <PageMenu.MenuItem page="/account/authentication">
            <KeyRoundIcon />
            Authentication
          </PageMenu.MenuItem>
        </PageMenu.MenuGroup>
      </PageMenu.Menu>
      <Outlet />
    </div>
  );
}
