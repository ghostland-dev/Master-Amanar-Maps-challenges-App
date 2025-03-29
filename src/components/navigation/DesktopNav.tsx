
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
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
    <div className="hidden md:flex items-center space-x-2">
      <NavigationMenu>
        <NavigationMenuList>
          <ChallengesMenu />
          <SimulatorsMenu />
          <LibraryMenu />
          <SubscriptionButton hasPremiumAccess={hasPremiumAccess} />
        </NavigationMenuList>
      </NavigationMenu>
      
      {/* Theme Toggle */}
      <ThemeToggle />

      {isAuthenticated ? (
        <AuthenticatedControls hasPremiumAccess={hasPremiumAccess} logout={logout} />
      ) : (
        <UnauthenticatedControls />
      )}
    </div>
  );
};
