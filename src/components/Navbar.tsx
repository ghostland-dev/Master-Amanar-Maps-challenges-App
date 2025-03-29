
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  BarChart3, 
  BookOpen, 
  Home, 
  User, 
  Award, 
  Library, 
  Settings, 
  Bell, 
  LogOut 
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Routes publiques accessibles à tous
  const publicRoutes = [
    { path: "/", label: "Accueil", icon: Home },
    { path: "/library", label: "Bibliothèque", icon: Library },
    { path: "/simulator", label: "Simulateurs", icon: BarChart3 },
  ];

  // Routes privées nécessitant une authentification
  const privateRoutes = [
    { path: "/dashboard", label: "Dashboard", icon: BookOpen },
    { path: "/challenges", label: "Challenges", icon: Trophy },
    { path: "/leaderboard", label: "Classement", icon: Award },
  ];

  const isActive = (path: string) => {
    // Pour simulator routes, traiter à la fois /simulator et /simulators comme actifs
    if (path === "/simulator" && 
        (location.pathname === "/simulator" || 
         location.pathname.startsWith("/simulator/") || 
         location.pathname === "/simulators")) {
      return true;
    }
    
    return location.pathname === path;
  };

  const navRoutes = [...publicRoutes, ...(isAuthenticated ? privateRoutes : [])];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Trophy className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold text-foreground">FinQuest</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navRoutes.map(route => (
              <Link 
                key={route.path}
                to={route.path} 
                className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${isActive(route.path) ? "text-primary" : "text-foreground/80"}`}
              >
                <route.icon className="h-4 w-4" />
                <span>{route.label}</span>
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/notifications">
                  <Button variant="ghost" size="icon" className="relative rounded-full">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
                  </Button>
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span>{user?.name}</span>
                        <span className="text-xs text-muted-foreground">{user?.email}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer w-full flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Mon profil</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="cursor-pointer w-full flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Paramètres</span>
                      </Link>
                    </DropdownMenuItem>
                    {user?.role === 'admin' && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="cursor-pointer w-full flex items-center">
                          <Trophy className="mr-2 h-4 w-4" />
                          <span>Administration</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Se déconnecter</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" size="sm" className="hidden md:flex">
                    Se connecter
                  </Button>
                </Link>
                <Link to="/auth?tab=register">
                  <Button size="sm" className="hidden md:flex">
                    S'inscrire
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Navigation mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border flex justify-around py-2 shadow-lg">
        {navRoutes.map(route => (
          <Link 
            key={route.path} 
            to={route.path} 
            className={`flex flex-col items-center p-2 ${isActive(route.path) ? "text-primary" : "text-muted-foreground"}`}
          >
            <route.icon className="h-5 w-5" />
            <span className="text-xs mt-1">{route.label}</span>
          </Link>
        ))}
        
        {isAuthenticated && (
          <Link 
            to="/profile" 
            className={`flex flex-col items-center p-2 ${isActive("/profile") ? "text-primary" : "text-muted-foreground"}`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profil</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
