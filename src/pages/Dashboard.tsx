
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Dashboard from "@/components/Dashboard";

const DashboardPage = () => {
  useEffect(() => {
    document.title = "FinQuest - Tableau de bord";
  }, []);

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      <div className="pt-20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-6">
          <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
