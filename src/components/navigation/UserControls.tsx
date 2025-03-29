
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserCircle, Bell } from "lucide-react";

interface AuthenticatedControlsProps {
  hasPremiumAccess: boolean;
  logout: () => void;
}

export const AuthenticatedControls = ({ hasPremiumAccess, logout }: AuthenticatedControlsProps) => (
  <div className="flex items-center space-x-1 ml-2" role="navigation" aria-label="User Navigation">
    <Button 
      variant="ghost" 
      size="icon" 
      className="relative"
      aria-label="Notifications"
    >
      <Link to="/notifications">
        <Bell className="h-5 w-5" aria-hidden="true" />
        <span 
          className="absolute top-1 right-1 bg-primary w-2 h-2 rounded-full"
          aria-label="Nouvelles notifications"
        ></span>
      </Link>
    </Button>
    <Link to="/dashboard" aria-label="Accéder à votre tableau de bord">
      <Button variant="ghost">Dashboard</Button>
    </Link>
    <Link to="/profile" aria-label="Accéder à votre profil">
      <Button variant="ghost" size="icon" className="relative">
        <UserCircle className="h-5 w-5" aria-hidden="true" />
        {hasPremiumAccess && (
          <span 
            className="absolute top-0 right-0 bg-yellow-500 w-2 h-2 rounded-full"
            aria-label="Statut premium actif"
          ></span>
        )}
      </Button>
    </Link>
    <Button 
      variant="ghost" 
      onClick={logout} 
      aria-label="Se déconnecter"
    >
      Déconnexion
    </Button>
  </div>
);

export const UnauthenticatedControls = () => (
  <div role="navigation" aria-label="Authentication Controls">
    <Link to="/auth?tab=login" aria-label="Se connecter">
      <Button variant="outline">Connexion</Button>
    </Link>
    <Link to="/auth?tab=register" aria-label="Créer un compte">
      <Button>Inscription</Button>
    </Link>
  </div>
);
