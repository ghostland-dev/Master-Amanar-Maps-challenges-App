
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, BarChart3, BookOpen, Home, User, Award, Library } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    // For simulator routes, treat both /simulator and /simulators as active
    if (path === "/simulator" && 
        (location.pathname === "/simulator" || 
         location.pathname.startsWith("/simulator/") || 
         location.pathname === "/simulators")) {
      return true;
    }
    
    return location.pathname === path;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Trophy className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold text-foreground">FinQuest</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/") ? "text-primary" : "text-foreground/80"}`}>
              Accueil
            </Link>
            <Link to="/challenges" className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/challenges") ? "text-primary" : "text-foreground/80"}`}>
              Challenges
            </Link>
            <Link to="/simulator" className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/simulator") ? "text-primary" : "text-foreground/80"}`}>
              Simulateurs
            </Link>
            <Link to="/library" className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/library") ? "text-primary" : "text-foreground/80"}`}>
              Bibliothèque
            </Link>
            <Link to="/leaderboard" className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/leaderboard") ? "text-primary" : "text-foreground/80"}`}>
              Classement
            </Link>
            <Link to="/dashboard" className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/dashboard") ? "text-primary" : "text-foreground/80"}`}>
              Dashboard
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
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
            
            <Link to="/profile" className="hidden md:block">
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            
            {/* Mobile menu button placeholder */}
            <div className="md:hidden">
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border flex justify-around py-2">
        <Link to="/" className={`flex flex-col items-center p-2 ${isActive("/") ? "text-primary" : "text-muted-foreground"}`}>
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Accueil</span>
        </Link>
        <Link to="/challenges" className={`flex flex-col items-center p-2 ${isActive("/challenges") ? "text-primary" : "text-muted-foreground"}`}>
          <Trophy className="h-5 w-5" />
          <span className="text-xs mt-1">Challenges</span>
        </Link>
        <Link to="/simulator" className={`flex flex-col items-center p-2 ${isActive("/simulator") ? "text-primary" : "text-muted-foreground"}`}>
          <BarChart3 className="h-5 w-5" />
          <span className="text-xs mt-1">Simulateurs</span>
        </Link>
        <Link to="/library" className={`flex flex-col items-center p-2 ${isActive("/library") ? "text-primary" : "text-muted-foreground"}`}>
          <Library className="h-5 w-5" />
          <span className="text-xs mt-1">Bibliothèque</span>
        </Link>
        <Link to="/leaderboard" className={`flex flex-col items-center p-2 ${isActive("/leaderboard") ? "text-primary" : "text-muted-foreground"}`}>
          <Award className="h-5 w-5" />
          <span className="text-xs mt-1">Classement</span>
        </Link>
        <Link to="/dashboard" className={`flex flex-col items-center p-2 ${isActive("/dashboard") ? "text-primary" : "text-muted-foreground"}`}>
          <BookOpen className="h-5 w-5" />
          <span className="text-xs mt-1">Dashboard</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
