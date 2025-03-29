
import { ThemeToggle } from "@/components/ThemeToggle";
import { NavigationMenuWrapper } from "./NavigationMenuWrapper";
import { ChallengesMenu } from "./menus/ChallengesMenu";
import { SimulatorsMenu } from "./menus/SimulatorsMenu";
import { LibraryMenu } from "./menus/LibraryMenu";
import { SubscriptionButton } from "./menus/SubscriptionButton";
import { AuthenticatedControls, UnauthenticatedControls } from "./UserControls";

export type SubscriptionTier = 'free' | 'premium' | 'enterprise';

interface DesktopNavProps {
  isAuthenticated: boolean;
  hasPremiumAccess: boolean;
  user: any;
  logout: () => void;
}

export const DesktopNav = ({ isAuthenticated, hasPremiumAccess, logout }: DesktopNavProps) => {
  return (
    <div className="hidden md:flex items-center space-x-2" role="navigation" aria-label="Desktop Navigation">
      <NavigationMenuWrapper>
        <ChallengesMenu />
        <SimulatorsMenu />
        <LibraryMenu />
        <SubscriptionButton hasPremiumAccess={hasPremiumAccess} />
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
