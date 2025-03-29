
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const SettingsHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center mb-8">
      <Button variant="ghost" size="sm" onClick={() => navigate("/profile")} className="mr-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Retour au profil
      </Button>
      <h1 className="text-3xl font-bold">Paramètres</h1>
    </div>
  );
};
