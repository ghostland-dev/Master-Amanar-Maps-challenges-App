
import { useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NavigationMenuWrapper } from "./NavigationMenuWrapper";
import { NavItem, NavDropdownItem } from "./NavItem";
import { AuthenticatedControls, UnauthenticatedControls } from "./UserControls";
import { 
  Building, Link as LinkIcon, BarChart3, Shield, Info, 
  PhoneCall, FileText, Trophy, Book, Calculator, Crown 
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface DesktopNavProps {
  isAuthenticated: boolean;
  hasPremiumAccess: boolean;
  user: any;
  logout: () => void;
}

export const DesktopNav = ({ isAuthenticated, hasPremiumAccess, user, logout }: DesktopNavProps) => {
  const { accessRights } = useAuth();
  const location = useLocation();
  
  // Check if the current path matches the given path
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="hidden md:flex items-center space-x-1" role="navigation" aria-label="Desktop Navigation">
      <NavigationMenuWrapper className="mr-4">
        {/* Challenges Menu */}
        <NavItem 
          label="Challenges" 
          active={isActive('/challenges')}
        >
          <div className="grid gap-2 p-2">
            <NavDropdownItem 
              to="/challenges?category=Finance" 
              label="Finance" 
              description="Explorez les challenges financiers" 
            />
            <NavDropdownItem 
              to="/challenges?category=E-commerce" 
              label="E-commerce" 
              description="Challengez-vous dans l'e-commerce" 
            />
            <NavDropdownItem 
              to="/challenges?category=Marketing" 
              label="Marketing" 
              description="Relevez des défis marketing" 
            />
            <NavDropdownItem 
              to="/challenges" 
              label="Tous les challenges" 
              icon={Trophy}
            />
          </div>
        </NavItem>

        {/* Simulators Menu */}
        <NavItem 
          label="Simulateurs" 
          active={isActive('/simulators') || isActive('/margin-calculator') || isActive('/ad-budget-calculator')}
        >
          <div className="grid gap-2 p-2">
            <NavDropdownItem 
              to="/margin-calculator" 
              label="Calculateur de marges" 
              description="Optimisez votre prix de vente" 
            />
            <NavDropdownItem 
              to="/ad-budget-calculator" 
              label="Budget publicitaire" 
              description="Planifiez vos campagnes" 
            />
            <NavDropdownItem 
              to="/simulators" 
              label="Tous les simulateurs" 
              icon={Calculator} 
            />
          </div>
        </NavItem>

        {/* Library Menu */}
        <NavItem 
          label="Bibliothèque" 
          active={isActive('/library')}
        >
          <div className="grid gap-2 p-2">
            <NavDropdownItem 
              to="/library?category=Marketing" 
              label="Marketing" 
              description="Ressources marketing" 
            />
            <NavDropdownItem 
              to="/library?category=Finance" 
              label="Finance" 
              description="Ressources financières" 
            />
            {hasPremiumAccess && (
              <NavDropdownItem 
                to="/library?premium=true" 
                label="Contenu Premium" 
                icon={Crown}
                description="Ressources exclusives" 
              />
            )}
            <NavDropdownItem 
              to="/library" 
              label="Toute la bibliothèque" 
              icon={Book} 
            />
          </div>
        </NavItem>
        
        {/* Subscription Button */}
        <NavItem 
          label="Abonnements" 
          to="/subscriptions" 
          icon={hasPremiumAccess ? Crown : undefined}
          iconClassName="text-yellow-500"
          active={isActive('/subscriptions')}
        />
        
        {/* About Menu */}
        <NavItem 
          label="À propos" 
          active={isActive('/about') || isActive('/contact') || isActive('/terms-of-service') || isActive('/privacy-policy')}
        >
          <div className="grid gap-2 p-2">
            <NavDropdownItem 
              to="/about" 
              label="À propos" 
              icon={Info} 
            />
            <NavDropdownItem 
              to="/contact" 
              label="Contact" 
              icon={PhoneCall} 
            />
            <NavDropdownItem 
              to="/terms-of-service" 
              label="Conditions d'utilisation" 
              icon={FileText} 
            />
            <NavDropdownItem 
              to="/privacy-policy" 
              label="Politique de confidentialité" 
              icon={Shield} 
            />
          </div>
        </NavItem>
        
        {/* Role-specific Links */}
        {isAuthenticated && accessRights.canAccessPartnerPortal && (
          <NavItem 
            label="Partenaires" 
            to="/partner-portal" 
            icon={Building}
            active={isActive('/partner-portal')}
          />
        )}
        
        {isAuthenticated && accessRights.canAccessAffiliateTools && (
          <NavItem 
            label="Affiliation" 
            to="/affiliate-dashboard" 
            icon={LinkIcon}
            active={isActive('/affiliate-dashboard')}
          />
        )}
        
        {isAuthenticated && accessRights.canAccessCommercialDashboard && (
          <NavItem 
            label="Commercial" 
            to="/commercial-dashboard" 
            icon={BarChart3}
            active={isActive('/commercial-dashboard')}
          />
        )}
        
        {isAuthenticated && (user?.role === 'admin' || user?.role === 'super_admin') && (
          <NavItem 
            label="Admin" 
            to="/admin" 
            icon={Shield}
            active={isActive('/admin')}
          />
        )}
      </NavigationMenuWrapper>
      
      {/* Theme Toggle */}
      <div className="flex items-center mr-2">
        <ThemeToggle />
      </div>

      {/* User Controls */}
      {isAuthenticated ? (
        <AuthenticatedControls hasPremiumAccess={hasPremiumAccess} logout={logout} />
      ) : (
        <UnauthenticatedControls />
      )}
    </div>
  );
};
