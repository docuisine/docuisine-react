import Usercard from "@/components/custom/usercard";
import HorizontalLogo from "@/components/custom/horizontallogo";
import { Link } from "react-router-dom";
import { APP_VERSION } from "@/lib/settings";

const TitleBar = () => {
  return (
    <div className="w-full flex justify-between">
      <Link to="/" className="flex items-center">
        <HorizontalLogo />
      </Link>
      <div className="flex flex-row gap-4 align-middle justify-center items-center">
        {APP_VERSION && (
          <span className="text-xs text-muted-foreground">
            v{APP_VERSION.slice(0, 7)}
          </span>
        )}
        <Usercard />
      </div>
    </div>
  );
};

export default TitleBar;
