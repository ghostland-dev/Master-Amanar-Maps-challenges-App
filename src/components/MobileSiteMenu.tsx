
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const MobileSiteMenu = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout, user, accessRights } = useAuth();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const menuItems = [
    { 
      label: "Challenges", 
      items: [
        { label: "Finance", href: "/challenges?category=Finance" },
        { label: "E-commerce", href: "/challenges?category=E-commerce" },
        { label: "Marketing", href: "/challenges?category=Marketing" },
        { label: "Tous les challenges", href: "/challenges" }
      ]
    },
    {
      label: "Simulateurs",
      items: [
        { label: "Calculateur de marges", href: "/margin-calculator" },
        { label: "Budget publicitaire", href: "/ad-budget-calculator" },
        { label: "Tous les simulateurs", href: "/simulators" }
      ]
    },
    {
      label: "Bibliothèque",
      items: [
        { label: "Marketing", href: "/library?category=Marketing" },
        { label: "Finance", href: "/library?category=Finance" },
        { label: "Toute la bibliothèque", href: "/library" }
      ]
    },
    {
      label: "À propos",
      items: [
        { label: "À propos", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Conditions d'utilisation", href: "/terms-of-service" },
        { label: "Politique de confidentialité", href: "/privacy-policy" }
      ]
    },
  ];

  const handleNavigation = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:max-w-sm">
        <nav className="flex flex-col space-y-4 mt-6">
          {menuItems.map((section, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="font-medium text-primary px-2">{section.label}</h3>
              <div className="ml-2 space-y-1">
                {section.items.map((item, itemIdx) => (
                  <Link
                    key={itemIdx}
                    to={item.href}
                    onClick={handleNavigation}
                    className={cn(
                      "block px-3 py-2 rounded-md text-sm",
                      isActive(item.href)
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-accent"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          
          {/* Abonnements */}
          <div>
            <Link
              to="/subscriptions"
              onClick={handleNavigation}
              className={cn(
                "block px-2 py-2 rounded-md font-medium",
                isActive("/subscriptions")
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
              )}
            >
              Abonnements
            </Link>
          </div>

          {/* User specific links */}
          {isAuthenticated && (
            <div className="pt-2 border-t">
              {accessRights.canAccessPartnerPortal && (
                <Link
                  to="/partner-portal"
                  onClick={handleNavigation}
                  className={cn(
                    "block px-2 py-2 rounded-md",
                    isActive("/partner-portal") && "text-primary font-medium"
                  )}
                >
                  Partenaires
                </Link>
              )}
              
              {accessRights.canAccessAffiliateTools && (
                <Link
                  to="/affiliate-dashboard"
                  onClick={handleNavigation}
                  className={cn(
                    "block px-2 py-2 rounded-md",
                    isActive("/affiliate-dashboard") && "text-primary font-medium"
                  )}
                >
                  Affiliation
                </Link>
              )}
              
              {accessRights.canAccessCommercialDashboard && (
                <Link
                  to="/commercial-dashboard"
                  onClick={handleNavigation}
                  className={cn(
                    "block px-2 py-2 rounded-md",
                    isActive("/commercial-dashboard") && "text-primary font-medium"
                  )}
                >
                  Commercial
                </Link>
              )}
              
              {(user?.role === 'admin' || user?.role === 'super_admin') && (
                <Link
                  to="/admin"
                  onClick={handleNavigation}
                  className={cn(
                    "block px-2 py-2 rounded-md",
                    isActive("/admin") && "text-primary font-medium"
                  )}
                >
                  Admin
                </Link>
              )}
            </div>
          )}
          
          {/* Auth links */}
          <div className="pt-4 border-t mt-auto">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  onClick={handleNavigation}
                  className="block px-2 py-2 rounded-md hover:bg-accent"
                >
                  Profil
                </Link>
                <button
                  onClick={() => {
                    logout();
                    handleNavigation();
                  }}
                  className="block w-full text-left px-2 py-2 rounded-md hover:bg-accent text-destructive"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth?mode=login"
                  onClick={handleNavigation}
                  className="block px-2 py-2 rounded-md hover:bg-accent"
                >
                  Connexion
                </Link>
                <Link
                  to="/auth?mode=register"
                  onClick={handleNavigation}
                  className="block px-2 py-2 rounded-md hover:bg-accent"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSiteMenu;
