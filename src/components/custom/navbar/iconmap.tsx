import { CircleUser, SquarePenIcon, KeyRoundIcon, SettingsIcon } from "lucide-react";
import type { IconMap } from "@/lib/types";

const iconSize = "1.2em";

const iconmap: IconMap = {
  "/recipes/create": <SquarePenIcon size={iconSize} />,
  "/account/profile": <CircleUser size={iconSize} />,
  "/account/authentication": <KeyRoundIcon size={iconSize} />,
  "/administration/configuration": <SettingsIcon size={iconSize} />,  
};

export default iconmap;
