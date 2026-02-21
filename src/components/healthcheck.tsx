import api from "@/lib/api";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { destructiveSonnerStyle } from "@/lib/constants";
import Admonition from "./custom/admonition";
import { Spinner } from "@/components/ui/spinner";

export default function HealthCheck({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [errMsg, setErrMsg] = useState<string>("");

  useEffect(() => {
    async function check() {
      const result = await api.healthCheck();
      setIsHealthy(result);
    }

    check().catch((err) => {
      toast.error(err.message, {
        style: destructiveSonnerStyle,
        position: "top-center",
      });
      setIsHealthy(false);
      setErrMsg(err.message);
    });
  }, []);

  if (isHealthy === null) {
    return (
      <div className="flex h-screen w-full items-center justify-center gap-4">
        <Spinner /> Connecting to the server...
      </div>
    );
  }

  return isHealthy ? (
    <>{children}</>
  ) : (
    <Admonition type="destructive" title="Docuisine is unhealthy">
      <p>{errMsg || "Unable to connect to the server."}</p>
    </Admonition>
  );
}
