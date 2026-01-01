import Usercard from "@/components/custom/usercard";
import HorizontalLogo from "@/components/custom/horizontallogo";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/useAuth";
import { appVersion } from "@/lib/utils";

const TitleBar = () => {
  const { user } = useAuth();
  const version = appVersion();
  return (
    <div className="w-full flex justify-between">
      <Link to="/" className="flex items-center">
        <HorizontalLogo />
      </Link>
      <div className="flex flex-row gap-4 align-middle justify-center items-center">
        {version && (
          <span className="text-xs text-muted-foreground">v{version}</span>
        )}
        <Usercard username={user || "Guest"} />
      </div>
    </div>
  );
};

export default TitleBar;
