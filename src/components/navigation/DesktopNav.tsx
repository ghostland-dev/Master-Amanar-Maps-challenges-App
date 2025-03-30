
import { ThemeToggle } from "@/components/ThemeToggle";
import { NavigationMenuWrapper } from "./NavigationMenuWrapper";
import { ChallengesMenu } from "./menus/ChallengesMenu";
import { SimulatorsMenu } from "./menus/SimulatorsMenu";
import { LibraryMenu } from "./menus/LibraryMenu";
import { SubscriptionButton } from "./menus/SubscriptionButton";
import { AuthenticatedControls, UnauthenticatedControls } from "./UserControls";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building, Link as LinkIcon, BarChart3, Shield, Info } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

interface DesktopNavProps {
  isAuthenticated: boolean;
  hasPremiumAccess: boolean;
  user: any;
  logout: () => void;
}

export const DesktopNav = ({ isAuthenticated, hasPremiumAccess, user, logout }: DesktopNavProps) => {
  const { accessRights } = useAuth();

  return (
    <div className="hidden md:flex items-center space-x-2" role="navigation" aria-label="Desktop Navigation">
      <NavigationMenuWrapper>
        <ChallengesMenu />
        <SimulatorsMenu />
        <LibraryMenu />
        <SubscriptionButton hasPremiumAccess={hasPremiumAccess} />
        
        {/* Menu À propos */}
        <NavigationMenuItem>
          <NavigationMenuTrigger aria-label="À propos">À propos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 w-[200px]" role="menu">
              <AboutMenuItem to="/about" title="À propos" />
              <AboutMenuItem to="/contact" title="Contact" />
              <AboutMenuItem to="/terms-of-service" title="Conditions d'utilisation" />
              <AboutMenuItem to="/privacy-policy" title="Politique de confidentialité" />
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        {/* Liens spécifiques basés sur le rôle */}
        {isAuthenticated && accessRights.canAccessPartnerPortal && (
          <Link to="/partner-portal">
            <Button variant="ghost" className="flex items-center gap-1">
              <Building className="h-4 w-4 mr-1" />
              Partenaires
            </Button>
          </Link>
        )}
        
        {isAuthenticated && accessRights.canAccessAffiliateTools && (
          <Link to="/affiliate-dashboard">
            <Button variant="ghost" className="flex items-center gap-1">
              <LinkIcon className="h-4 w-4 mr-1" />
              Affiliation
            </Button>
          </Link>
        )}
        
        {isAuthenticated && accessRights.canAccessCommercialDashboard && (
          <Link to="/commercial-dashboard">
            <Button variant="ghost" className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4 mr-1" />
              Commercial
            </Button>
          </Link>
        )}
        
        {isAuthenticated && (user?.role === 'admin' || user?.role === 'super_admin') && (
          <Link to="/admin">
            <Button variant="ghost" className="flex items-center gap-1">
              <Shield className="h-4 w-4 mr-1" />
              Admin
            </Button>
          </Link>
        )}
      </NavigationMenuWrapper>
      
      {/* Theme Toggle */}
      <div className="flex items-center">
        <ThemeToggle />
      </div>

      {isAuthenticated ? (
        <AuthenticatedControls hasPremiumAccess={hasPremiumAccess} logout={logout} />
      ) : (
        <UnauthenticatedControls />
      )}
    </div>
  );
};

// Helper component for about menu items
const AboutMenuItem = ({ to, title }: { to: string; title: string }) => (
  <Link to={to} className="p-2 hover:bg-accent rounded-md flex items-center" role="menuitem">
    <Info className="mr-2 h-4 w-4 text-primary" aria-hidden="true" />
    <div className="text-sm font-medium">{title}</div>
  </Link>
);
