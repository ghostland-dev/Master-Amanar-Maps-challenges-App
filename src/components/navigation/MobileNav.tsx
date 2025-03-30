
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { MobileMenuToggle } from "./mobile/MobileMenuToggle";
import { MobileMenuContent } from "./mobile/MobileMenuContent";
import MobileSiteMenu from "@/components/MobileSiteMenu";

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
  const { accessRights, user } = useAuth();

  const handleCloseMenu = () => {
    setMobileMenuOpen(false);
  };
  
  return (
    <>
      <div className="flex md:hidden items-center space-x-4">
        {/* Theme Toggle for Mobile */}
        <ThemeToggle />
        
        {/* Use our new responsive mobile menu */}
        <MobileSiteMenu />
      </div>

      {/* Legacy Mobile Menu Dropdown with Animation - used for user account stuff */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenuContent 
            isAuthenticated={isAuthenticated}
            hasPremiumAccess={hasPremiumAccess}
            user={user}
            accessRights={accessRights}
            logout={logout}
            onCloseMenu={handleCloseMenu}
          />
        )}
      </AnimatePresence>
    </>
  );
};
