import { useAuth } from "@/lib/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdministrationPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  return <div>Administration Page</div>;
};

export default AdministrationPage;
