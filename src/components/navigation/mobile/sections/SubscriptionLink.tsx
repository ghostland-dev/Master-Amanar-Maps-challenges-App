
import { Crown } from "lucide-react";
import { MobileNavLink } from "../MobileNavLink";
import { Badge } from "@/components/ui/badge";

interface SubscriptionLinkProps {
  hasPremiumAccess: boolean;
  isActive: (path: string) => boolean;
  onCloseMenu: () => void;
}

export const SubscriptionLink = ({
  hasPremiumAccess,
  isActive,
  onCloseMenu,
}: SubscriptionLinkProps) => {
  return (
    <MobileNavLink
      to="/subscriptions"
      label="Abonnements"
      icon={hasPremiumAccess ? (props) => <Crown {...props} className="h-5 w-5 text-yellow-500" /> : Crown}
      isActive={isActive("/subscriptions")}
      badge={
        hasPremiumAccess ? (
          <Badge
            variant="outline"
            className="bg-yellow-500/20 text-yellow-700 border-yellow-500 text-xs"
          >
            Premium
          </Badge>
        ) : undefined
      }
      onClick={onCloseMenu}
    />
  );
};
