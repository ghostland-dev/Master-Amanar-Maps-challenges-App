
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface NavItemProps {
  label: string;
  to?: string;
  icon?: LucideIcon;
  children?: ReactNode;
  active?: boolean;
  className?: string;
  iconClassName?: string;
}

export const NavItem = ({
  label,
  to,
  icon: Icon,
  children,
  active = false,
  className = "",
  iconClassName = "",
}: NavItemProps) => {
  // Si il y a des enfants, c'est un menu déroulant
  if (children) {
    return (
      <NavigationMenuItem className={className}>
        <NavigationMenuTrigger
          className={cn(
            "group",
            active && "bg-primary/10 text-primary"
          )}
        >
          <div className="flex items-center space-x-1">
            {Icon && <Icon className={cn("h-4 w-4", iconClassName)} />}
            <span>{label}</span>
          </div>
        </NavigationMenuTrigger>
        <NavigationMenuContent className="origin-top">
          <div className="w-[220px] p-2">{children}</div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  // Si il n'y a pas d'enfants, c'est un lien simple
  return (
    <NavigationMenuItem className={className}>
      <Link
        to={to || "#"}
        className={cn(
          navigationMenuTriggerStyle(),
          "flex items-center space-x-1 px-3 transition-all",
          active && "bg-primary/10 text-primary",
        )}
      >
        {Icon && <Icon className={cn("h-4 w-4", iconClassName)} />}
        <span>{label}</span>
      </Link>
    </NavigationMenuItem>
  );
};

// Pour les éléments du menu déroulant
export const NavDropdownItem = ({
  to,
  label,
  description,
  icon: Icon,
  onClick,
}: {
  to: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
  onClick?: () => void;
}) => (
  <Link
    to={to}
    onClick={onClick}
    className="block select-none rounded-md p-2 hover:bg-accent transition-colors"
  >
    <div className="flex items-center gap-2">
      {Icon && <Icon className="h-4 w-4 text-primary flex-shrink-0" />}
      <div>
        <div className="text-sm font-medium leading-none">{label}</div>
        {description && (
          <p className="line-clamp-1 text-sm leading-snug text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </div>
    </div>
  </Link>
);
