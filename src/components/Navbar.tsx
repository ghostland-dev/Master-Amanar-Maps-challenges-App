
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Search, Menu, X, UserCircle, Bell } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
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
          <span className="text-xl font-bold text-primary">Amanar Map</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <Link to="/challenges">
            <Button variant="ghost">Challenges</Button>
          </Link>
          <Link to="/simulators">
            <Button variant="ghost">Simulateurs</Button>
          </Link>
          <Link to="/library">
            <Button variant="ghost">Bibliothèque</Button>
          </Link>
          
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
                  </Button>
                </Link>
                <Button variant="ghost" onClick={logout}>
                  Déconnexion
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="outline">Connexion</Button>
              </Link>
              <Link to="/auth?register=true">
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
            <Link to="/challenges" className="p-2 hover:bg-accent rounded-md">
              Challenges
            </Link>
            <Link to="/simulators" className="p-2 hover:bg-accent rounded-md">
              Simulateurs
            </Link>
            <Link to="/library" className="p-2 hover:bg-accent rounded-md">
              Bibliothèque
            </Link>

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
                  <Link to="/auth">
                    <Button variant="outline" className="w-full">Connexion</Button>
                  </Link>
                  <Link to="/auth?register=true">
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
