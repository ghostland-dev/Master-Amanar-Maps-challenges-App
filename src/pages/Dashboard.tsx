
import { useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import Dashboard from "@/components/Dashboard";
import { useAuth } from "@/context/AuthContext";

const DashboardPage = () => {
  const { user } = useAuth();
  
  return (
    <MainLayout 
      title="Tableau de bord" 
      description="Votre espace personnel Amanar Map"
    >
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-6">
        <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>
        <Dashboard />
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
