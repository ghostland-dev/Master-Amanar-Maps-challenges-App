
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserCircle, Bell, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AuthenticatedControlsProps {
  hasPremiumAccess: boolean;
  logout: () => void;
}

export const AuthenticatedControls = ({ hasPremiumAccess, logout }: AuthenticatedControlsProps) => (
  <div className="flex items-center space-x-1" role="navigation" aria-label="User Navigation">
    <Link to="/notifications" className="relative">
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" aria-hidden="true" />
        <span 
          className="absolute top-1 right-1 bg-primary w-2 h-2 rounded-full"
          aria-label="Nouvelles notifications"
        ></span>
      </Button>
    </Link>
    
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <UserCircle className="h-5 w-5" aria-hidden="true" />
          {hasPremiumAccess && (
            <span 
              className="absolute top-0 right-0 bg-yellow-500 w-2 h-2 rounded-full"
              aria-label="Statut premium actif"
            ></span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild>
          <Link to="/profile" className="cursor-pointer flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>Mon Profil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/dashboard" className="cursor-pointer">
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Déconnexion</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

export const UnauthenticatedControls = () => (
  <div className="flex items-center space-x-2" role="navigation" aria-label="Authentication Controls">
    <Link to="/auth?tab=login" aria-label="Se connecter">
      <Button variant="outline" size="sm">Connexion</Button>
    </Link>
    <Link to="/auth?tab=register" aria-label="Créer un compte">
      <Button size="sm">Inscription</Button>
    </Link>
  </div>
);
