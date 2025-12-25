import NavBarBtn from "@/components/custom/navbarbtn";
import { UtensilsCrossedIcon, BookTextIcon, ListTodo } from "lucide-react";

const NavBar = () => {
  const iconSize = "1.2em";

  const sections = [
    { title: "Recipes", icon: <UtensilsCrossedIcon size={iconSize} /> },
    { title: "Cookbooks", icon: <BookTextIcon size={iconSize} /> },
    { title: "Shopping List", icon: <ListTodo size={iconSize} /> },
  ];

  return (
    <div className="w-full flex bg-amber-50">
      {sections.map((section) => (
        <NavBarBtn key={section.title} title={section.title}>
          {section.icon}
        </NavBarBtn>
      ))}
    </div>
  );
};

export default NavBar;
