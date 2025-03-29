
import { Link } from "react-router-dom";
import { Award } from "lucide-react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const ChallengesMenu = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Challenges</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
          <div className="grid grid-cols-2 gap-3">
            <ChallengeMenuItem 
              to="/challenges?category=Finance" 
              title="Finance" 
              description="Gestion d'argent et investissements" 
            />
            <ChallengeMenuItem 
              to="/challenges?category=E-commerce" 
              title="E-commerce" 
              description="Vente et achat en ligne" 
            />
            <ChallengeMenuItem 
              to="/challenges?category=Marketing" 
              title="Marketing" 
              description="Stratégies marketing" 
            />
            <ChallengeMenuItem 
              to="/challenges?category=Crypto" 
              title="Crypto" 
              description="Cryptomonnaies et NFTs" 
            />
          </div>
          <div className="p-2">
            <Link to="/challenges" className="text-sm text-primary hover:underline">
              Voir tous les challenges →
            </Link>
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

// Helper component for menu items
const ChallengeMenuItem = ({ to, title, description }: { to: string; title: string; description: string }) => (
  <Link to={to} className="p-2 hover:bg-accent rounded-md flex items-center">
    <Award className="mr-2 h-4 w-4 text-primary" />
    <div>
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs text-muted-foreground">{description}</div>
    </div>
  </Link>
);
