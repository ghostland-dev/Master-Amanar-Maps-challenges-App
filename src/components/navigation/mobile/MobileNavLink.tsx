
import { Link } from "react-router-dom";
import { ChevronRight, LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MobileNavLinkProps {
  to: string;
  label: string;
  icon?: LucideIcon;
  badge?: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  iconClassName?: string;
}

export const MobileNavLink = ({
  to,
  label,
  icon: Icon,
  badge,
  isActive = false,
  onClick,
  iconClassName,
}: MobileNavLinkProps) => (
  <Link
    to={to}
    className={`flex items-center justify-between p-3 rounded-lg ${
      isActive ? "bg-primary/10 text-primary" : "hover:bg-accent"
    }`}
    onClick={onClick}
  >
    <div className="flex items-center space-x-3">
      {Icon && <Icon className={cn("h-5 w-5", iconClassName)} />}
      <span className="font-medium">{label}</span>
      {badge}
    </div>
    <ChevronRight className="h-4 w-4" />
  </Link>
);
