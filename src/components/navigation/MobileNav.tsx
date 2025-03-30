
import { useAuth } from "@/context/AuthContext";
import { AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileMenuToggle } from "./mobile/MobileMenuToggle";
import { MobileMenuContent } from "./mobile/MobileMenuContent";

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
        
        {/* Mobile Menu Toggle Button */}
        <MobileMenuToggle 
          mobileMenuOpen={mobileMenuOpen} 
          setMobileMenuOpen={setMobileMenuOpen} 
        />
      </div>

      {/* Mobile Menu Dropdown with Animation */}
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
