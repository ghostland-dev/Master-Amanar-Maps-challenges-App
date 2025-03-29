
import { Link } from "react-router-dom";
import { Gauge } from "lucide-react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const SimulatorsMenu = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Simulateurs</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
          <SimulatorMenuItem 
            to="/margin-calculator" 
            title="Calculateur de marges" 
            description="Estimez vos marges bénéficiaires" 
          />
          <SimulatorMenuItem 
            to="/ad-budget-calculator" 
            title="Budget publicitaire" 
            description="Calculez vos budgets de publicité" 
          />
          <SimulatorMenuItem 
            to="/simulator/passive-income" 
            title="Simulateur ROI" 
            description="Calculez votre retour sur investissement" 
          />
          <div className="p-2">
            <Link to="/simulators" className="text-sm text-primary hover:underline">
              Voir tous les simulateurs →
            </Link>
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

// Helper component for simulator menu items
const SimulatorMenuItem = ({ to, title, description }: { to: string; title: string; description: string }) => (
  <Link to={to} className="p-2 hover:bg-accent rounded-md flex items-center">
    <Gauge className="mr-2 h-4 w-4 text-primary" />
    <div>
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs text-muted-foreground">{description}</div>
    </div>
  </Link>
);
