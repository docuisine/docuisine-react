import NavBarBtn from "@/components/custom/navbarbtn";
import {
  UtensilsCrossedIcon,
  BookTextIcon,
  ListTodo,
  SettingsIcon,
  SquareArrowOutUpRightIcon,
} from "lucide-react";

const NavBar = () => {
  const iconSize = "1.2em";

  const mainSections = [
    { title: "Recipes", icon: <UtensilsCrossedIcon size={iconSize} /> },
    { title: "Cookbooks", icon: <BookTextIcon size={iconSize} /> },
    { title: "Shopping List", icon: <ListTodo size={iconSize} /> },
  ];

  const otherSections = [
    { title: "Administration", icon: <SettingsIcon size={iconSize} /> },
  ];

  return (
    <div className="flex space-between">
      <div className="w-full flex">
        {mainSections.map((section) => (
          <NavBarBtn key={section.title} title={section.title}>
            {section.icon}
          </NavBarBtn>
        ))}
      </div>
      <div className="w-fit flex">
        {otherSections.map((section) => (
          <NavBarBtn key={section.title} title={section.title}>
            {section.icon}
          </NavBarBtn>
        ))}
        <NavBarBtn
          title="Documentation"
          href="https://iragca.github.io/docuisine/"
          target="_blank" rel="noopener noreferrer"
        >
          <SquareArrowOutUpRightIcon size={iconSize} />
        </NavBarBtn>
      </div>
    </div>
  );
};

export default NavBar;
