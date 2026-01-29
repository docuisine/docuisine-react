import {
  CircleUser,
  SquarePenIcon,
  KeyRoundIcon,
  Settings2Icon,
  Users2Icon,
  UtensilsCrossedIcon,
  HamburgerIcon,
  CarrotIcon,
  BookTextIcon,
  BrushCleaningIcon,
  DatabaseBackupIcon,
  ScrollIcon,
} from "lucide-react";
import type { IconMap } from "@/lib/types";

const iconSize = "1.2em";

const iconmap: IconMap = {
  "/recipes/create": <SquarePenIcon size={iconSize} />,
  "/account/profile": <CircleUser size={iconSize} />,
  "/account/authentication": <KeyRoundIcon size={iconSize} />,
  "/administration/site-settings": <Settings2Icon size={iconSize} />,
  "/administration/user-management": <Users2Icon size={iconSize} />,
  "/administration/recipe-management": <UtensilsCrossedIcon size={iconSize} />,
  "/administration/ingredient-management": <CarrotIcon size={iconSize} />,
  "/administration/cuisine-management": <HamburgerIcon size={iconSize} />,
  "/administration/cookbook-management": <BookTextIcon size={iconSize} />,
  "/administration/clean": <BrushCleaningIcon size={iconSize} />,
  "/administration/backups": <DatabaseBackupIcon size={iconSize} />,
  "/administration/logs": <ScrollIcon size={iconSize} />,
};

export default iconmap;
