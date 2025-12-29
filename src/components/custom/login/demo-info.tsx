import { CircleAlertIcon } from "lucide-react";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const DemoInfo = () => {
  return (
    <Alert className="border-sky-600 text-sky-600 dark:border-sky-400 dark:text-sky-400">
      <CircleAlertIcon />
      <AlertTitle className="text-start">Demo Credentials</AlertTitle>
      <AlertDescription className="text-sky-600/80 dark:text-sky-400/80 flex flex-col gap-1 items-start">
        <span>
          Username: <b>dev-admin</b>
        </span>
        <span>
          Password: <b>DevPassword2P!</b>
        </span>
      </AlertDescription>
    </Alert>
  );
};

export default DemoInfo;
