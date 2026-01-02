import { Outlet } from "react-router-dom";
import Header from "@/components/custom/header";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const titles: Record<string, string> = {
  "/recipes": "Recipes - Docuisine",
  "/cookbooks": "Cookbooks - Docuisine",
  "/shopping-list": "Shopping List - Docuisine",
  "/account/profile": "Profile - Docuisine",
  "/administration": "Administration - Docuisine",
  "/recipes/create": "Create Recipe - Docuisine",
};

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = titles[pathname] ?? "Docuisine";
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col w-screen overflow-x-hidden">
      <Header />
      <main className="flex-1 px-[10vw] my-8">
        <Outlet /> {/* renders the nested route content */}
      </main>
    </div>
  );
};

export default Layout;
