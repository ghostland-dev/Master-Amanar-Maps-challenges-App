
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuToggleProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const MobileMenuToggle = ({
  mobileMenuOpen,
  setMobileMenuOpen,
}: MobileMenuToggleProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      className="relative"
      aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
    >
      {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </Button>
  );
};
