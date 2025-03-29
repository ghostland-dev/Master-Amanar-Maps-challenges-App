
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";
import { NavigationMenuItem } from "@/components/ui/navigation-menu";

interface SubscriptionButtonProps {
  hasPremiumAccess: boolean;
}

export const SubscriptionButton = ({ hasPremiumAccess }: SubscriptionButtonProps) => {
  return (
    <NavigationMenuItem>
      <Link to="/subscriptions">
        <Button variant="ghost" className="font-normal">
          Abonnements
          {hasPremiumAccess && <Crown className="ml-1 h-3 w-3 text-yellow-500" />}
        </Button>
      </Link>
    </NavigationMenuItem>
  );
};
