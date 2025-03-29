
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserCircle, Bell, Crown } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface DesktopNavProps {
  isAuthenticated: boolean;
  hasPremiumAccess: boolean;
  user: any;
  logout: () => void;
}

export const DesktopNav = ({ isAuthenticated, hasPremiumAccess, logout }: DesktopNavProps) => {
  return (
    <div className="hidden md:flex items-center space-x-2">
      <NavigationMenu>
        <NavigationMenuList>
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

          <NavigationMenuItem>
            <NavigationMenuTrigger>Bibliothèque</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                <div className="grid grid-cols-2 gap-3">
                  <LibraryMenuItem 
                    to="/library?category=Marketing" 
                    title="Marketing" 
                    description="Articles et guides" 
                  />
                  <LibraryMenuItem 
                    to="/library?category=Finance" 
                    title="Finance" 
                    description="Investissements et épargne" 
                  />
                  <LibraryMenuItem 
                    to="/library?category=E-commerce" 
                    title="E-commerce" 
                    description="Guides de vente en ligne" 
                  />
                  <PremiumLibraryMenuItem 
                    to="/library?premium=true" 
                    title="Contenu Premium" 
                    description="Accès aux ressources exclusives" 
                  />
                </div>
                <div className="p-2">
                  <Link to="/library" className="text-sm text-primary hover:underline">
                    Explorer toute la bibliothèque →
                  </Link>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to="/subscriptions">
              <Button variant="ghost" className="font-normal">
                Abonnements
                {hasPremiumAccess && <Crown className="ml-1 h-3 w-3 text-yellow-500" />}
              </Button>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      
      {/* Theme Toggle */}
      <ThemeToggle />

      {isAuthenticated ? (
        <AuthenticatedControls hasPremiumAccess={hasPremiumAccess} logout={logout} />
      ) : (
        <UnauthenticatedControls />
      )}
    </div>
  );
};

// Helper components for menu items
const ChallengeMenuItem = ({ to, title, description }: { to: string; title: string; description: string }) => (
  <Link to={to} className="p-2 hover:bg-accent rounded-md flex items-center">
    <Award className="mr-2 h-4 w-4 text-primary" />
    <div>
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs text-muted-foreground">{description}</div>
    </div>
  </Link>
);

const SimulatorMenuItem = ({ to, title, description }: { to: string; title: string; description: string }) => (
  <Link to={to} className="p-2 hover:bg-accent rounded-md flex items-center">
    <Gauge className="mr-2 h-4 w-4 text-primary" />
    <div>
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs text-muted-foreground">{description}</div>
    </div>
  </Link>
);

const LibraryMenuItem = ({ to, title, description }: { to: string; title: string; description: string }) => (
  <Link to={to} className="p-2 hover:bg-accent rounded-md flex items-center">
    <BookOpen className="mr-2 h-4 w-4 text-primary" />
    <div>
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs text-muted-foreground">{description}</div>
    </div>
  </Link>
);

const PremiumLibraryMenuItem = ({ to, title, description }: { to: string; title: string; description: string }) => (
  <Link to={to} className="p-2 hover:bg-accent rounded-md flex items-center">
    <BookOpen className="mr-2 h-4 w-4 text-primary" />
    <div className="flex items-center gap-1">
      <div className="text-sm font-medium">{title}</div>
      <Crown className="h-3 w-3 text-yellow-500" />
    </div>
    <div className="text-xs text-muted-foreground">{description}</div>
  </Link>
);

// Authenticated user controls
const AuthenticatedControls = ({ hasPremiumAccess, logout }: { hasPremiumAccess: boolean; logout: () => void }) => (
  <div className="flex items-center space-x-1 ml-2">
    <Button variant="ghost" size="icon" className="relative">
      <Link to="/notifications">
        <Bell className="h-5 w-5" />
        <span className="absolute top-1 right-1 bg-primary w-2 h-2 rounded-full"></span>
      </Link>
    </Button>
    <Link to="/dashboard">
      <Button variant="ghost">Dashboard</Button>
    </Link>
    <Link to="/profile">
      <Button variant="ghost" size="icon">
        <UserCircle className="h-5 w-5" />
        {hasPremiumAccess && <span className="absolute top-0 right-0 bg-yellow-500 w-2 h-2 rounded-full"></span>}
      </Button>
    </Link>
    <Button variant="ghost" onClick={logout}>
      Déconnexion
    </Button>
  </div>
);

// Unauthenticated controls
const UnauthenticatedControls = () => (
  <>
    <Link to="/auth?tab=login">
      <Button variant="outline">Connexion</Button>
    </Link>
    <Link to="/auth?tab=register">
      <Button>Inscription</Button>
    </Link>
  </>
);

// Import the required icons
import { Award, Gauge, BookOpen } from "lucide-react";

