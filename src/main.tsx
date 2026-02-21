import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./components/auth.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import CheckInitRoute from "@/components/init-route.tsx";
import { Toaster } from "@/components/ui/sonner"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CheckInitRoute>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <App />
        </TooltipProvider>
      </AuthProvider>
    </CheckInitRoute>
  </StrictMode>,
);
