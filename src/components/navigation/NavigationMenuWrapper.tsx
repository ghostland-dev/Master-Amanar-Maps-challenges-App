
import { ReactNode } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

interface NavigationMenuWrapperProps {
  children: ReactNode;
}

export const NavigationMenuWrapper = ({ children }: NavigationMenuWrapperProps) => {
  return (
    <NavigationMenu>
      <NavigationMenuList aria-label="Main Navigation">
        {children}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
