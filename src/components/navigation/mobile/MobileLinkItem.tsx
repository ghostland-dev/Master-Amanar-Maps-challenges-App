
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MobileLinkItemProps {
  to: string;
  label: string;
  primary?: boolean;
  icon?: ReactNode;
  iconClassName?: string;
  onClick?: () => void;
}

export const MobileLinkItem = ({
  to,
  label,
  primary = false,
  icon,
  iconClassName,
  onClick,
}: MobileLinkItemProps) => (
  <Link
    to={to}
    className={`flex items-center justify-between p-2 rounded-md ${
      primary ? "text-primary font-medium" : "text-foreground"
    } hover:bg-accent/50`}
    onClick={onClick}
  >
    <div className="flex items-center">
      {label}
      {icon && <div className={cn(iconClassName)}>{icon}</div>}
    </div>
    <ChevronRight className="h-3 w-3" />
  </Link>
);
