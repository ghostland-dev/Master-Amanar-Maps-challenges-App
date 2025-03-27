
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const MainLayout = ({ children, title, description }: MainLayoutProps) => {
  // Mise à jour du titre de la page
  if (title) {
    document.title = `FinQuest - ${title}`;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="bg-muted py-8 mt-auto">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} FinQuest. Tous droits réservés.
              </p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Conditions d'utilisation
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
