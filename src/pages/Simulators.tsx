
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";

/**
 * This component handles the /simulators route
 * It provides a proper page with links to all available simulators
 */
const Simulators = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "FinQuest - Simulateurs";
    navigate("/simulator", { replace: true });
  }, [navigate]);
  
  return (
    <MainLayout title="Simulateurs" description="Accédez à tous nos simulateurs financiers">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-12">
        <div className="text-center">
          <p>Redirection vers la page des simulateurs...</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Simulators;
