
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, X, Crown, Info, PhoneCall, FileText, Shield, Home,
  Building, Link as LinkIcon, BarChart3, Trophy, Book,
  Calculator, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface MobileNavProps {
  isAuthenticated: boolean;
  hasPremiumAccess: boolean;
  logout: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const MobileNav = ({
  isAuthenticated,
  hasPremiumAccess,
  logout,
  mobileMenuOpen,
  setMobileMenuOpen
}: MobileNavProps) => {
  const { accessRights, user } = useAuth();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  // Check if the current path matches the given path
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };
  
  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };
  
  return (
    <>
      <div className="flex md:hidden items-center space-x-4">
        {/* Theme Toggle for Mobile */}
        <ThemeToggle />
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="relative"
          aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden fixed inset-x-0 top-14 bg-background/95 backdrop-blur-md border-t border-border py-4 shadow-lg z-40"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container px-4 mx-auto flex flex-col space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto pb-20">
              {/* Dashboard Link for authenticated users */}
              {isAuthenticated && (
                <Link 
                  to="/dashboard" 
                  className={`flex items-center justify-between p-3 rounded-lg ${isActive('/dashboard') ? 'bg-primary/10 text-primary' : 'hover:bg-accent'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <Home className="h-5 w-5" />
                    <span className="font-medium">Dashboard</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              )}
              
              {/* Challenges Section */}
              <div className="border-b border-border">
                <button 
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-accent"
                  onClick={() => toggleSection('challenges')}
                >
                  <div className="flex items-center space-x-3">
                    <Trophy className="h-5 w-5 text-primary" />
                    <span className="font-medium">Challenges</span>
                  </div>
                  {activeSection === 'challenges' ? (
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                
                <AnimatePresence>
                  {activeSection === 'challenges' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 py-1 space-y-1">
                        <MobileLink to="/challenges?category=Finance" label="Finance" onClick={() => setMobileMenuOpen(false)} />
                        <MobileLink to="/challenges?category=E-commerce" label="E-commerce" onClick={() => setMobileMenuOpen(false)} />
                        <MobileLink to="/challenges?category=Marketing" label="Marketing" onClick={() => setMobileMenuOpen(false)} />
                        <MobileLink 
                          to="/challenges" 
                          label="Tous les challenges" 
                          primary 
                          onClick={() => setMobileMenuOpen(false)} 
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Simulators Section */}
              <div className="border-b border-border">
                <button 
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-accent"
                  onClick={() => toggleSection('simulators')}
                >
                  <div className="flex items-center space-x-3">
                    <Calculator className="h-5 w-5 text-primary" />
                    <span className="font-medium">Simulateurs</span>
                  </div>
                  {activeSection === 'simulators' ? (
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                
                <AnimatePresence>
                  {activeSection === 'simulators' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 py-1 space-y-1">
                        <MobileLink to="/margin-calculator" label="Calculateur de marges" onClick={() => setMobileMenuOpen(false)} />
                        <MobileLink to="/ad-budget-calculator" label="Budget publicitaire" onClick={() => setMobileMenuOpen(false)} />
                        <MobileLink 
                          to="/simulators" 
                          label="Tous les simulateurs" 
                          primary 
                          onClick={() => setMobileMenuOpen(false)} 
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Library Section */}
              <div className="border-b border-border">
                <button 
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-accent"
                  onClick={() => toggleSection('library')}
                >
                  <div className="flex items-center space-x-3">
                    <Book className="h-5 w-5 text-primary" />
                    <span className="font-medium">Bibliothèque</span>
                  </div>
                  {activeSection === 'library' ? (
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                
                <AnimatePresence>
                  {activeSection === 'library' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 py-1 space-y-1">
                        <MobileLink to="/library?category=Marketing" label="Marketing" onClick={() => setMobileMenuOpen(false)} />
                        <MobileLink to="/library?category=Finance" label="Finance" onClick={() => setMobileMenuOpen(false)} />
                        {hasPremiumAccess && (
                          <MobileLink 
                            to="/library?premium=true" 
                            label="Contenu Premium" 
                            icon={<Crown className="ml-1 h-3 w-3 text-yellow-500" />}
                            onClick={() => setMobileMenuOpen(false)} 
                          />
                        )}
                        <MobileLink 
                          to="/library" 
                          label="Toute la bibliothèque" 
                          primary 
                          onClick={() => setMobileMenuOpen(false)} 
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Subscription Link */}
              <Link 
                to="/subscriptions" 
                className={`flex items-center justify-between p-3 rounded-lg ${isActive('/subscriptions') ? 'bg-primary/10 text-primary' : 'hover:bg-accent'} border-b border-border`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center space-x-3">
                  {hasPremiumAccess ? <Crown className="h-5 w-5 text-yellow-500" /> : <Crown className="h-5 w-5" />}
                  <span className="font-medium">Abonnements</span>
                  {hasPremiumAccess && (
                    <Badge variant="outline" className="bg-yellow-500/20 text-yellow-700 border-yellow-500 text-xs">
                      Premium
                    </Badge>
                  )}
                </div>
                <ChevronRight className="h-4 w-4" />
              </Link>
              
              {/* About Section */}
              <div className="border-b border-border">
                <button 
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-accent"
                  onClick={() => toggleSection('about')}
                >
                  <div className="flex items-center space-x-3">
                    <Info className="h-5 w-5 text-primary" />
                    <span className="font-medium">À propos</span>
                  </div>
                  {activeSection === 'about' ? (
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                
                <AnimatePresence>
                  {activeSection === 'about' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 py-1 space-y-1">
                        <MobileLink to="/about" label="À propos" icon={<Info className="ml-1 h-3 w-3" />} onClick={() => setMobileMenuOpen(false)} />
                        <MobileLink to="/contact" label="Contact" icon={<PhoneCall className="ml-1 h-3 w-3" />} onClick={() => setMobileMenuOpen(false)} />
                        <MobileLink to="/terms-of-service" label="Conditions d'utilisation" icon={<FileText className="ml-1 h-3 w-3" />} onClick={() => setMobileMenuOpen(false)} />
                        <MobileLink to="/privacy-policy" label="Politique de confidentialité" icon={<Shield className="ml-1 h-3 w-3" />} onClick={() => setMobileMenuOpen(false)} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Role-specific Links */}
              {isAuthenticated && (
                <div className="border-b border-border pt-2">
                  {accessRights.canAccessPartnerPortal && (
                    <Link 
                      to="/partner-portal" 
                      className={`flex items-center justify-between p-3 rounded-lg ${isActive('/partner-portal') ? 'bg-primary/10 text-primary' : 'hover:bg-accent'}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex items-center space-x-3">
                        <Building className="h-5 w-5" />
                        <span className="font-medium">Partenaires</span>
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  )}
                  
                  {accessRights.canAccessAffiliateTools && (
                    <Link 
                      to="/affiliate-dashboard" 
                      className={`flex items-center justify-between p-3 rounded-lg ${isActive('/affiliate-dashboard') ? 'bg-primary/10 text-primary' : 'hover:bg-accent'}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex items-center space-x-3">
                        <LinkIcon className="h-5 w-5" />
                        <span className="font-medium">Affiliation</span>
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  )}
                  
                  {accessRights.canAccessCommercialDashboard && (
                    <Link 
                      to="/commercial-dashboard" 
                      className={`flex items-center justify-between p-3 rounded-lg ${isActive('/commercial-dashboard') ? 'bg-primary/10 text-primary' : 'hover:bg-accent'}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex items-center space-x-3">
                        <BarChart3 className="h-5 w-5" />
                        <span className="font-medium">Commercial</span>
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  )}
                  
                  {(user?.role === 'admin' || user?.role === 'super_admin') && (
                    <Link 
                      to="/admin" 
                      className={`flex items-center justify-between p-3 rounded-lg ${isActive('/admin') ? 'bg-primary/10 text-primary' : 'hover:bg-accent'}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex items-center space-x-3">
                        <Shield className="h-5 w-5 text-red-500" />
                        <span className="font-medium">Admin</span>
                        <Badge variant="outline" className="bg-red-500/10 text-red-700 border-red-500 text-xs">
                          {user?.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                        </Badge>
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              )}

              {/* User Controls */}
              <div className="border-t border-border mt-4 pt-4">
                {isAuthenticated ? (
                  <div className="space-y-1">
                    <Link 
                      to="/profile" 
                      className={`flex items-center justify-between p-3 rounded-lg ${isActive('/profile') ? 'bg-primary/10 text-primary' : 'hover:bg-accent'}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="font-medium">Mon Profil</span>
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                    
                    <Link 
                      to="/notifications" 
                      className={`flex items-center justify-between p-3 rounded-lg ${isActive('/notifications') ? 'bg-primary/10 text-primary' : 'hover:bg-accent'}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="font-medium">Notifications</span>
                        <div className="h-2 w-2 bg-primary rounded-full"></div>
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                    
                    <Button 
                      variant="ghost"
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full justify-start p-3 hover:bg-destructive/10 hover:text-destructive text-left rounded-lg"
                    >
                      <span className="font-medium">Déconnexion</span>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2 p-2">
                    <Link 
                      to="/auth?tab=login"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button variant="outline" className="w-full">Connexion</Button>
                    </Link>
                    <Link 
                      to="/auth?tab=register"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button className="w-full">Inscription</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Helper component for mobile links
const MobileLink = ({ 
  to, 
  label, 
  primary = false,
  icon,
  onClick
}: { 
  to: string; 
  label: string; 
  primary?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}) => (
  <Link 
    to={to} 
    className={`flex items-center justify-between p-2 rounded-md ${primary ? 'text-primary font-medium' : 'text-foreground'} hover:bg-accent/50`}
    onClick={onClick}
  >
    <div className="flex items-center">
      {label}
      {icon}
    </div>
    <ChevronRight className="h-3 w-3" />
  </Link>
);
