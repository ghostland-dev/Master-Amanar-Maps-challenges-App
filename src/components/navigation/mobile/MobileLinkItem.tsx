
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";

interface MobileLinkItemProps {
  to: string;
  label: string;
  primary?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
}

export const MobileLinkItem = ({
  to,
  label,
  primary = false,
  icon,
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
      {icon}
    </div>
    <ChevronRight className="h-3 w-3" />
  </Link>
);
