
import { motion } from "framer-motion";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Home } from "lucide-react";
import { MobileNavLink } from "./MobileNavLink";
import { ChallengesSection } from "./sections/ChallengesSection";
import { SimulatorsSection } from "./sections/SimulatorsSection";
import { LibrarySection } from "./sections/LibrarySection";
import { SubscriptionLink } from "./sections/SubscriptionLink";
import { AboutSection } from "./sections/AboutSection";
import { RoleSpecificLinks } from "./sections/RoleSpecificLinks";
import { MobileAuthenticatedControls, MobileUnauthenticatedControls } from "./MobileUserControls";

interface MobileMenuContentProps {
  isAuthenticated: boolean;
  hasPremiumAccess: boolean;
  user: any;
  accessRights: {
    canAccessPartnerPortal?: boolean;
    canAccessAffiliateTools?: boolean;
    canAccessCommercialDashboard?: boolean;
  };
  logout: () => void;
  onCloseMenu: () => void;
}

export const MobileMenuContent = ({
  isAuthenticated,
  hasPremiumAccess,
  user,
  accessRights,
  logout,
  onCloseMenu,
}: MobileMenuContentProps) => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Check if the current path matches the given path
  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };

  return (
    <motion.div
      className="md:hidden fixed inset-x-0 top-14 bg-background/95 backdrop-blur-md border-t border-border py-4 shadow-lg z-40"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="container px-4 mx-auto flex flex-col space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto pb-20">
        {/* Dashboard Link for authenticated users */}
        {isAuthenticated && (
          <MobileNavLink
            to="/dashboard"
            label="Dashboard"
            icon={Home}
            isActive={isActive("/dashboard")}
            onClick={onCloseMenu}
          />
        )}

        {/* Challenges Section */}
        <ChallengesSection
          activeSection={activeSection}
          toggleSection={toggleSection}
          onCloseMenu={onCloseMenu}
        />

        {/* Simulators Section */}
        <SimulatorsSection
          activeSection={activeSection}
          toggleSection={toggleSection}
          onCloseMenu={onCloseMenu}
        />

        {/* Library Section */}
        <LibrarySection
          activeSection={activeSection}
          toggleSection={toggleSection}
          hasPremiumAccess={hasPremiumAccess}
          onCloseMenu={onCloseMenu}
        />

        {/* Subscription Link */}
        <div className="border-b border-border">
          <SubscriptionLink
            hasPremiumAccess={hasPremiumAccess}
            isActive={isActive}
            onCloseMenu={onCloseMenu}
          />
        </div>

        {/* About Section */}
        <AboutSection
          activeSection={activeSection}
          toggleSection={toggleSection}
          onCloseMenu={onCloseMenu}
        />

        {/* Role-specific Links */}
        {isAuthenticated && (
          <RoleSpecificLinks
            accessRights={accessRights}
            user={user}
            isActive={isActive}
            onCloseMenu={onCloseMenu}
          />
        )}

        {/* User Controls */}
        <div className="border-t border-border mt-4 pt-4">
          {isAuthenticated ? (
            <MobileAuthenticatedControls
              isActive={isActive}
              logout={logout}
              onCloseMenu={onCloseMenu}
            />
          ) : (
            <MobileUnauthenticatedControls onCloseMenu={onCloseMenu} />
          )}
        </div>
      </div>
    </motion.div>
  );
};
