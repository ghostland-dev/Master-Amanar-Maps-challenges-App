
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Crown, Info, Phone, FileText, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";

interface MobileNavProps {
  isAuthenticated: boolean;
  hasPremiumAccess: boolean;
  logout: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const MobileNav = ({
  isAuthenticated,
  hasPremiumAccess,
  logout,
  mobileMenuOpen,
  setMobileMenuOpen
}: MobileNavProps) => {
  const { accessRights } = useAuth();
  
  return (
    <>
      <div className="flex md:hidden items-center space-x-4">
        {/* Theme Toggle for Mobile */}
        <ThemeToggle />
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="relative"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-14 bg-background/95 backdrop-blur-md border-t border-border py-4 shadow-lg animate-fade-in z-40">
          <div className="container px-4 mx-auto flex flex-col space-y-3 max-h-[80vh] overflow-y-auto">
            <MobileMenuSection title="Challenges">
              <MobileMenuItem to="/challenges?category=Finance" label="Finance" />
              <MobileMenuItem to="/challenges?category=E-commerce" label="E-commerce" />
              <MobileMenuItem to="/challenges?category=Marketing" label="Marketing" />
              <MobileMenuItem to="/challenges" label="Tous les challenges" isPrimary />
            </MobileMenuSection>

            <MobileMenuSection title="Simulateurs">
              <MobileMenuItem to="/margin-calculator" label="Calculateur de marges" />
              <MobileMenuItem to="/ad-budget-calculator" label="Budget publicitaire" />
              <MobileMenuItem to="/simulators" label="Tous les simulateurs" isPrimary />
            </MobileMenuSection>

            <MobileMenuSection title="Bibliothèque">
              <MobileMenuItem to="/library?category=Marketing" label="Marketing" />
              <MobileMenuItem to="/library?category=Finance" label="Finance" />
              <MobileMenuItem 
                to="/library?premium=true" 
                label="Contenu Premium" 
                icon={<Crown className="ml-1 h-3 w-3 text-yellow-500" />} 
              />
              <MobileMenuItem to="/library" label="Toute la bibliothèque" isPrimary />
            </MobileMenuSection>
            
            <MobileMenuSection title="À propos">
              <MobileMenuItem to="/about" label="À propos" icon={<Info className="ml-1 h-3 w-3" />} />
              <MobileMenuItem to="/contact" label="Contact" icon={<Phone className="ml-1 h-3 w-3" />} />
              <MobileMenuItem to="/terms-of-service" label="Conditions d'utilisation" icon={<FileText className="ml-1 h-3 w-3" />} />
              <MobileMenuItem to="/privacy-policy" label="Politique de confidentialité" icon={<Shield className="ml-1 h-3 w-3" />} />
            </MobileMenuSection>

            <div className="border-b border-border pb-2">
              <Link to="/subscriptions" className="font-medium mb-2 flex items-center hover:bg-accent p-2 rounded-md">
                Abonnements
                {hasPremiumAccess && <Crown className="ml-1 h-3 w-3 text-yellow-500" />}
              </Link>
            </div>

            <div className="border-t border-border my-2 pt-2">
              {isAuthenticated ? (
                <>
                  <MobileMenuItem to="/dashboard" label="Dashboard" />
                  <MobileMenuItem to="/profile" label="Mon Profil" />
                  <MobileMenuItem to="/notifications" label="Notifications" />
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start p-2 hover:bg-accent rounded-md"
                    onClick={logout}
                  >
                    Déconnexion
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link to="/auth?tab=login">
                    <Button variant="outline" className="w-full">Connexion</Button>
                  </Link>
                  <Link to="/auth?tab=register">
                    <Button className="w-full">Inscription</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

interface MobileMenuSectionProps {
  title: string;
  children: React.ReactNode;
}

const MobileMenuSection = ({ title, children }: MobileMenuSectionProps) => (
  <div className="border-b border-border pb-2">
    <h3 className="font-medium mb-2">{title}</h3>
    <div className="flex flex-col space-y-2 pl-2">
      {children}
    </div>
  </div>
);

interface MobileMenuItemProps {
  to: string;
  label: string;
  isPrimary?: boolean;
  icon?: React.ReactNode;
}

const MobileMenuItem = ({ to, label, isPrimary = false, icon }: MobileMenuItemProps) => (
  <Link 
    to={to} 
    className={`p-1 hover:bg-accent rounded-md text-sm ${isPrimary ? 'text-primary' : ''}`}
  >
    <div className="flex items-center">
      {label}
      {icon}
    </div>
  </Link>
);
