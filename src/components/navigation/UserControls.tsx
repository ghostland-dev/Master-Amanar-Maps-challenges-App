
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserCircle, Bell } from "lucide-react";

interface AuthenticatedControlsProps {
  hasPremiumAccess: boolean;
  logout: () => void;
}

export const AuthenticatedControls = ({ hasPremiumAccess, logout }: AuthenticatedControlsProps) => (
  <div className="flex items-center space-x-1 ml-2">
    <Button variant="ghost" size="icon" className="relative">
      <Link to="/notifications">
        <Bell className="h-5 w-5" />
        <span className="absolute top-1 right-1 bg-primary w-2 h-2 rounded-full"></span>
      </Link>
    </Button>
    <Link to="/dashboard">
      <Button variant="ghost">Dashboard</Button>
    </Link>
    <Link to="/profile">
      <Button variant="ghost" size="icon">
        <UserCircle className="h-5 w-5" />
        {hasPremiumAccess && <span className="absolute top-0 right-0 bg-yellow-500 w-2 h-2 rounded-full"></span>}
      </Button>
    </Link>
    <Button variant="ghost" onClick={logout}>
      Déconnexion
    </Button>
  </div>
);

export const UnauthenticatedControls = () => (
  <>
    <Link to="/auth?tab=login">
      <Button variant="outline">Connexion</Button>
    </Link>
    <Link to="/auth?tab=register">
      <Button>Inscription</Button>
    </Link>
  </>
);
