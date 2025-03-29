
import { Link } from "react-router-dom";
import { BookOpen, Crown } from "lucide-react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const LibraryMenu = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger aria-label="Ouvrir le menu de la bibliothèque">Bibliothèque</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]" role="menu">
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
            <Link 
              to="/library" 
              className="text-sm text-primary hover:underline"
              role="menuitem"
              aria-label="Explorer toute la bibliothèque"
            >
              Explorer toute la bibliothèque →
            </Link>
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

// Helper components for library menu items
const LibraryMenuItem = ({ to, title, description }: { to: string; title: string; description: string }) => (
  <Link to={to} className="p-2 hover:bg-accent rounded-md flex items-center" role="menuitem">
    <BookOpen className="mr-2 h-4 w-4 text-primary" aria-hidden="true" />
    <div>
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs text-muted-foreground">{description}</div>
    </div>
  </Link>
);

const PremiumLibraryMenuItem = ({ to, title, description }: { to: string; title: string; description: string }) => (
  <Link 
    to={to} 
    className="p-2 hover:bg-accent rounded-md flex items-center" 
    role="menuitem"
    aria-label={`${title} - Contenu exclusif premium`}
  >
    <BookOpen className="mr-2 h-4 w-4 text-primary" aria-hidden="true" />
    <div>
      <div className="flex items-center gap-1">
        <div className="text-sm font-medium">{title}</div>
        <Crown className="h-3 w-3 text-yellow-500" aria-hidden="true" title="Accès Premium requis" />
      </div>
      <div className="text-xs text-muted-foreground">{description}</div>
    </div>
  </Link>
);
