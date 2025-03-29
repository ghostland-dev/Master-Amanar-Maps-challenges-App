
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Search, Menu, X, UserCircle, Bell, BookOpen, Gauge, Award, Trophy, Crown } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, logout, user, hasPremiumAccess } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Trophy className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-primary">FinQuest</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Challenges</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                    <div className="grid grid-cols-2 gap-3">
                      <Link to="/challenges?category=Finance" className="p-2 hover:bg-accent rounded-md flex items-center">
                        <Award className="mr-2 h-4 w-4 text-primary" />
                        <div>
                          <div className="text-sm font-medium">Finance</div>
                          <div className="text-xs text-muted-foreground">Gestion d'argent et investissements</div>
                        </div>
                      </Link>
                      <Link to="/challenges?category=E-commerce" className="p-2 hover:bg-accent rounded-md flex items-center">
                        <Award className="mr-2 h-4 w-4 text-primary" />
                        <div>
                          <div className="text-sm font-medium">E-commerce</div>
                          <div className="text-xs text-muted-foreground">Vente et achat en ligne</div>
                        </div>
                      </Link>
                      <Link to="/challenges?category=Marketing" className="p-2 hover:bg-accent rounded-md flex items-center">
                        <Award className="mr-2 h-4 w-4 text-primary" />
                        <div>
                          <div className="text-sm font-medium">Marketing</div>
                          <div className="text-xs text-muted-foreground">Stratégies marketing</div>
                        </div>
                      </Link>
                      <Link to="/challenges?category=Crypto" className="p-2 hover:bg-accent rounded-md flex items-center">
                        <Award className="mr-2 h-4 w-4 text-primary" />
                        <div>
                          <div className="text-sm font-medium">Crypto</div>
                          <div className="text-xs text-muted-foreground">Cryptomonnaies et NFTs</div>
                        </div>
                      </Link>
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
                    <Link to="/margin-calculator" className="p-2 hover:bg-accent rounded-md flex items-center">
                      <Gauge className="mr-2 h-4 w-4 text-primary" />
                      <div>
                        <div className="text-sm font-medium">Calculateur de marges</div>
                        <div className="text-xs text-muted-foreground">Estimez vos marges bénéficiaires</div>
                      </div>
                    </Link>
                    <Link to="/ad-budget-calculator" className="p-2 hover:bg-accent rounded-md flex items-center">
                      <Gauge className="mr-2 h-4 w-4 text-primary" />
                      <div>
                        <div className="text-sm font-medium">Budget publicitaire</div>
                        <div className="text-xs text-muted-foreground">Calculez vos budgets de publicité</div>
                      </div>
                    </Link>
                    <Link to="/simulator/passive-income" className="p-2 hover:bg-accent rounded-md flex items-center">
                      <Gauge className="mr-2 h-4 w-4 text-primary" />
                      <div>
                        <div className="text-sm font-medium">Simulateur ROI</div>
                        <div className="text-xs text-muted-foreground">Calculez votre retour sur investissement</div>
                      </div>
                    </Link>
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
                      <Link to="/library?category=Marketing" className="p-2 hover:bg-accent rounded-md flex items-center">
                        <BookOpen className="mr-2 h-4 w-4 text-primary" />
                        <div>
                          <div className="text-sm font-medium">Marketing</div>
                          <div className="text-xs text-muted-foreground">Articles et guides</div>
                        </div>
                      </Link>
                      <Link to="/library?category=Finance" className="p-2 hover:bg-accent rounded-md flex items-center">
                        <BookOpen className="mr-2 h-4 w-4 text-primary" />
                        <div>
                          <div className="text-sm font-medium">Finance</div>
                          <div className="text-xs text-muted-foreground">Investissements et épargne</div>
                        </div>
                      </Link>
                      <Link to="/library?category=E-commerce" className="p-2 hover:bg-accent rounded-md flex items-center">
                        <BookOpen className="mr-2 h-4 w-4 text-primary" />
                        <div>
                          <div className="text-sm font-medium">E-commerce</div>
                          <div className="text-xs text-muted-foreground">Guides de vente en ligne</div>
                        </div>
                      </Link>
                      <Link to="/library?premium=true" className="p-2 hover:bg-accent rounded-md flex items-center">
                        <BookOpen className="mr-2 h-4 w-4 text-primary" />
                        <div className="flex items-center gap-1">
                          <div className="text-sm font-medium">Contenu Premium</div>
                          <Crown className="h-3 w-3 text-yellow-500" />
                        </div>
                        <div className="text-xs text-muted-foreground">Accès aux ressources exclusives</div>
                      </Link>
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
            <>
              <Button variant="ghost" size="icon" className="relative">
                <Link to="/notifications">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 bg-primary w-2 h-2 rounded-full"></span>
                </Link>
              </Button>

              <div className="flex items-center space-x-1 ml-2">
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
            </>
          ) : (
            <>
              <Link to="/auth?tab=login">
                <Button variant="outline">Connexion</Button>
              </Link>
              <Link to="/auth?tab=register">
                <Button>Inscription</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center space-x-4">
          {/* Theme Toggle for Mobile */}
          <ThemeToggle />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border py-4 shadow-lg animate-fade-in">
          <div className="container px-4 mx-auto flex flex-col space-y-3">
            <div className="border-b border-border pb-2">
              <h3 className="font-medium mb-2">Challenges</h3>
              <div className="flex flex-col space-y-2 pl-2">
                <Link to="/challenges?category=Finance" className="p-1 hover:bg-accent rounded-md text-sm">
                  Finance
                </Link>
                <Link to="/challenges?category=E-commerce" className="p-1 hover:bg-accent rounded-md text-sm">
                  E-commerce
                </Link>
                <Link to="/challenges?category=Marketing" className="p-1 hover:bg-accent rounded-md text-sm">
                  Marketing
                </Link>
                <Link to="/challenges" className="p-1 hover:bg-accent rounded-md text-sm text-primary">
                  Tous les challenges
                </Link>
              </div>
            </div>

            <div className="border-b border-border pb-2">
              <h3 className="font-medium mb-2">Simulateurs</h3>
              <div className="flex flex-col space-y-2 pl-2">
                <Link to="/margin-calculator" className="p-1 hover:bg-accent rounded-md text-sm">
                  Calculateur de marges
                </Link>
                <Link to="/ad-budget-calculator" className="p-1 hover:bg-accent rounded-md text-sm">
                  Budget publicitaire
                </Link>
                <Link to="/simulators" className="p-1 hover:bg-accent rounded-md text-sm text-primary">
                  Tous les simulateurs
                </Link>
              </div>
            </div>

            <div className="border-b border-border pb-2">
              <h3 className="font-medium mb-2">Bibliothèque</h3>
              <div className="flex flex-col space-y-2 pl-2">
                <Link to="/library?category=Marketing" className="p-1 hover:bg-accent rounded-md text-sm">
                  Marketing
                </Link>
                <Link to="/library?category=Finance" className="p-1 hover:bg-accent rounded-md text-sm">
                  Finance
                </Link>
                <Link to="/library?premium=true" className="p-1 hover:bg-accent rounded-md flex items-center text-sm">
                  Contenu Premium
                  <Crown className="ml-1 h-3 w-3 text-yellow-500" />
                </Link>
                <Link to="/library" className="p-1 hover:bg-accent rounded-md text-sm text-primary">
                  Toute la bibliothèque
                </Link>
              </div>
            </div>

            <div className="border-b border-border pb-2">
              <Link to="/subscriptions" className="font-medium mb-2 flex items-center hover:bg-accent p-2 rounded-md">
                Abonnements
                {hasPremiumAccess && <Crown className="ml-1 h-3 w-3 text-yellow-500" />}
              </Link>
            </div>

            <div className="border-t border-border my-2 pt-2">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="p-2 hover:bg-accent rounded-md flex items-center">
                    Dashboard
                  </Link>
                  <Link to="/profile" className="p-2 hover:bg-accent rounded-md flex items-center">
                    Mon Profil
                  </Link>
                  <Link to="/notifications" className="p-2 hover:bg-accent rounded-md flex items-center">
                    Notifications
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start p-2 hover:bg-accent rounded-md"
                    onClick={logout}
                  >
                    Déconnexion
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link to="/auth?tab=login">
                    <Button variant="outline" className="w-full">Connexion</Button>
                  </Link>
                  <Link to="/auth?tab=register">
                    <Button className="w-full">Inscription</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
