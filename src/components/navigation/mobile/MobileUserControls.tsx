
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface AuthenticatedControlsProps {
  isActive: (path: string) => boolean;
  logout: () => void;
  onCloseMenu: () => void;
}

export const MobileAuthenticatedControls = ({
  isActive,
  logout,
  onCloseMenu,
}: AuthenticatedControlsProps) => {
  return (
    <div className="space-y-1">
      <Link
        to="/profile"
        className={`flex items-center justify-between p-3 rounded-lg ${
          isActive("/profile") ? "bg-primary/10 text-primary" : "hover:bg-accent"
        }`}
        onClick={onCloseMenu}
      >
        <div className="flex items-center space-x-3">
          <span className="font-medium">Mon Profil</span>
        </div>
        <ChevronRight className="h-4 w-4" />
      </Link>

      <Link
        to="/notifications"
        className={`flex items-center justify-between p-3 rounded-lg ${
          isActive("/notifications")
            ? "bg-primary/10 text-primary"
            : "hover:bg-accent"
        }`}
        onClick={onCloseMenu}
      >
        <div className="flex items-center space-x-3">
          <span className="font-medium">Notifications</span>
          <div className="h-2 w-2 bg-primary rounded-full"></div>
        </div>
        <ChevronRight className="h-4 w-4" />
      </Link>

      <Button
        variant="ghost"
        onClick={() => {
          logout();
          onCloseMenu();
        }}
        className="w-full justify-start p-3 hover:bg-destructive/10 hover:text-destructive text-left rounded-lg"
      >
        <span className="font-medium">Déconnexion</span>
      </Button>
    </div>
  );
};

export const MobileUnauthenticatedControls = ({ onCloseMenu }: { onCloseMenu: () => void }) => {
  return (
    <div className="flex flex-col space-y-2 p-2">
      <Link to="/auth?tab=login" onClick={onCloseMenu}>
        <Button variant="outline" className="w-full">
          Connexion
        </Button>
      </Link>
      <Link to="/auth?tab=register" onClick={onCloseMenu}>
        <Button className="w-full">Inscription</Button>
      </Link>
    </div>
  );
};
