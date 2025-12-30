import LogoPng from "@/assets/docuisine-no-base-color.png";
import LogoPngFlatDarkPng from "@/assets/docuisine-no-base-flat-on-dark.png";
import LogoTypographyFlatDarkPng from "@/assets/docuisine-typography-flat-on-dark.png";
import LogoTypographyPng from "@/assets/docuisine-typography-color-on-light.png";
import { useEffect, useState } from "react";

function usePrefersColorScheme() {
  const [isLight, setIsLight] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");

    const update = () => setIsLight(media.matches);
    update();

    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isLight;
}

const HorizontalLogo = () => {
  const isLightMode = usePrefersColorScheme();

  return (
    <div className="flex flex-row gap-4 justify-center items-center px-[min(4vw,10px)] sm:p-0 py-2">
      <img
        src={isLightMode ? LogoPng : LogoPngFlatDarkPng}
        alt="Docuisine Logo"
        className="h-[1.8em] w-auto"
      />
      <img
        src={isLightMode ? LogoTypographyPng : LogoTypographyFlatDarkPng}
        alt="Docuisine Typography"
        className="h-[1.2em] w-auto"
      />
    </div>
  );
};
export default HorizontalLogo;
