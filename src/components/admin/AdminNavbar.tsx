
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Shield, Menu, X, Home, LogOut, Users, Award, CreditCard, BarChart3, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

const AdminNavbar = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Tableau de bord", href: "/admin", icon: Home },
    { label: "Challenges", href: "/admin/challenges", icon: Award },
    { label: "Utilisateurs", href: "/admin/users", icon: Users },
    { label: "Abonnements", href: "/admin/subscriptions", icon: CreditCard },
    { label: "Analytique", href: "/admin/analytics", icon: BarChart3 },
    { label: "Simulateurs", href: "/simulator", icon: Calculator },
  ];

  const isActive = (path: string) => location.pathname === path;

  const renderNavItems = () => (
    <div className="flex flex-col space-y-1">
      {navItems.map((item) => (
        <Button
          key={item.href}
          variant={isActive(item.href) ? "default" : "ghost"}
          className={`justify-start ${isActive(item.href) ? "bg-primary text-primary-foreground" : ""} transition-colors`}
          onClick={() => {
            navigate(item.href);
            if (isMobile) setOpen(false);
          }}
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.label}
        </Button>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center mr-4">
          <Shield className="h-6 w-6 text-primary mr-2" />
          <span className="font-bold text-lg hidden md:inline-block">Admin</span>
        </div>

        {isMobile ? (
          <>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <div className="flex items-center mb-6">
                  <Shield className="h-6 w-6 text-primary mr-2" />
                  <span className="font-bold text-lg">Admin Panel</span>
                </div>
                <Separator className="mb-4" />
                {renderNavItems()}
                <div className="absolute bottom-4 left-4 right-4">
                  <Separator className="mb-4" />
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => navigate("/")}
                      className="w-full"
                    >
                      <Home className="mr-2 h-4 w-4" />
                      Retour au site
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <div className="flex-1 flex justify-center">
              <div className="font-semibold">Admin Panel</div>
            </div>
          </>
        ) : (
          <nav className="flex-1 flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {renderNavItems()}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/")}
                className="transition-all hover:bg-secondary/20"
              >
                <Home className="mr-2 h-4 w-4" />
                Retour au site
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default AdminNavbar;
