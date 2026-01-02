import NavBarBtn from "@/components/custom/navbar/navbarbtn";
import iconmap from "@/components/custom/navbar/iconmap";
import {
  UtensilsCrossedIcon,
  BookTextIcon,
  ListTodo,
  SettingsIcon,
  AppWindowIcon,
} from "lucide-react";
import { useAuth } from "@/lib/useAuth";
import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { normalizeTitle } from "@/lib/utils";
import type { Bar } from "@/lib/types";

const NavBar = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [recentPath, setRecentPath] = useState<string | null>(null);

  const iconSize = "1.2em";

  const mainSections: Bar[] = useMemo(
    () => [
      {
        title: "Recipes",
        slug: "/recipes",
        icon: <UtensilsCrossedIcon size={iconSize} />,
      },
      {
        title: "Cookbooks",
        slug: "/cookbooks",
        icon: <BookTextIcon size={iconSize} />,
      },
      {
        title: "Shopping List",
        slug: "/shopping-list",
        icon: <ListTodo size={iconSize} />,
      },
    ],
    []
  );

  const adminSection: Bar[] = useMemo(
    () =>
      isAuthenticated
        ? [
            {
              title: "Administration",
              slug: "/administration",
              icon: <SettingsIcon size={iconSize} />,
            },
          ]
        : [],
    [isAuthenticated]
  );

  /**
   * All default tabs (used to check if current route is already known)
   */
  const defaultTabs = useMemo(() => {
    return [...mainSections, ...adminSection].map((s) => s.slug);
  }, [mainSections, adminSection]);

  /**
   * Track the most recent non-default route
   */
  useEffect(() => {
    const path = location.pathname;

    if (path === "/") return;

    const isDefault = defaultTabs.includes(path);

    if (!isDefault) {
      setRecentPath(path);
    }
  }, [location.pathname, defaultTabs]);
  const recentSection: Bar[] =
    recentPath && recentPath !== "/"
      ? [
          {
            title: normalizeTitle(recentPath),
            slug: recentPath,
            icon: iconmap[recentPath] || <AppWindowIcon size={iconSize} />,
          },
        ]
      : [];

  return (
    <div className="flex justify-between w-full">
      {/* Main sections */}
      <div className="flex">
        {mainSections.map((section) => (
          <NavBarBtn
            key={section.slug}
            slug={section.slug}
          >
            {section.icon}
          </NavBarBtn>
        ))}
      </div>

      {/* Auth + recent sections */}
      <div className="flex">
        {adminSection.map((section) => (
          <NavBarBtn
            key={section.slug}
            slug={section.slug}
          >
            {section.icon}
          </NavBarBtn>
        ))}

        {recentSection.map((section) => (
          <NavBarBtn
            key={section.slug}
            slug={section.slug}
          >
            {section.icon}
          </NavBarBtn>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
