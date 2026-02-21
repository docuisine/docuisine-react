import { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";
import api from "@/lib/api";
import { Spinner } from "@/components/ui/spinner";

export default function CheckInitRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    async function check() {
      const result = await api.checkAppInitialized();
      setIsInitialized(result);
    }

    check();
  }, []);

  if (!isInitialized) {
    return (
      <div className="flex h-screen w-full items-center justify-center gap-4">
        <Spinner /> Checking initialization...
      </div>
    );
  }

  return isInitialized ? children : <Navigate to="/wizard" replace />;
}
