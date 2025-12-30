import { useEffect } from "react";

const AdministrationPage = () => {
  useEffect(() => {
    document.title = "Administration - Docuisine";
  }, []);
  return <div>Administration Page</div>;
};
export default AdministrationPage;
