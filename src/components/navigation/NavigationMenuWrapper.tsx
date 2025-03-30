
import { ReactNode } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

interface NavigationMenuWrapperProps {
  children: ReactNode;
  className?: string;
}

export const NavigationMenuWrapper = ({ children, className = "" }: NavigationMenuWrapperProps) => {
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList aria-label="Main Navigation" className="space-x-2">
        {children}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
