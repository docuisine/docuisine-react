import { useAuth } from "@/lib/useAuth";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PageMenu from "@/components/custom/menu";
import { SettingsIcon } from "lucide-react";

const AdministrationPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex gap-8 h-full">
      <PageMenu.Menu>
        <PageMenu.MenuGroup title="">
          <PageMenu.MenuItem page="/administration/configuration">
            <SettingsIcon />
            Configuration
          </PageMenu.MenuItem>
        </PageMenu.MenuGroup>
      </PageMenu.Menu>
      <Outlet />
    </div>
  );
};

export default AdministrationPage;
