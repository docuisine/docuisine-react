import { useAuth } from "@/lib/useAuth";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Menu, MenuGroup, MenuItem } from "@/components/custom/menu";
import {
  Settings2Icon,
  UsersIcon,
  HamburgerIcon,
  UtensilsCrossedIcon,
  BookTextIcon,
  CarrotIcon,
  DatabaseBackupIcon,
  BrushCleaningIcon,
  ScrollIcon,
} from "lucide-react";

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
      <Menu>
        <MenuGroup title="">
          <MenuItem page="/administration/site-settings">
            <Settings2Icon />
            Site Settings
          </MenuItem>
          <MenuItem page="/administration/user-management">
            <UsersIcon />
            Users
          </MenuItem>
        </MenuGroup>
        <MenuGroup title="Content">
          <MenuItem page="/administration/recipe-management">
            <UtensilsCrossedIcon />
            Recipes
          </MenuItem>
          <MenuItem page="/administration/cuisine-management">
            <HamburgerIcon />
            Cuisines
          </MenuItem>
          <MenuItem page="/administration/ingredient-management">
            <CarrotIcon />
            Ingredients
          </MenuItem>
          <MenuItem page="/administration/cookbook-management">
            <BookTextIcon />
            Cookbooks
          </MenuItem>
        </MenuGroup>
        <MenuGroup title="Maintenance">
          <MenuItem page="/administration/clean">
            <BrushCleaningIcon />
            Clean
          </MenuItem>
          <MenuItem page="/administration/backup">
            <DatabaseBackupIcon />
            Backup
          </MenuItem>
          <MenuItem page="/administration/logs">
            <ScrollIcon />
            Logs
          </MenuItem>
        </MenuGroup>
      </Menu>
      <Outlet />
    </div>
  );
};

export default AdministrationPage;
