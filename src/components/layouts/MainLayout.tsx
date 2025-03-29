
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

const MainLayout = ({ children, title, description, className = "" }: MainLayoutProps) => {
  // Mise à jour du titre de la page
  if (title) {
    document.title = `Amanar Map - ${title}`;
  }

  // Ajout d'une méta description
  if (description) {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.getElementsByTagName("head")[0].appendChild(meta);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className={`flex-1 pt-16 transition-colors duration-300 ${className}`}>
        {children}
      </main>
      
      <footer className="bg-muted py-8 mt-auto pb-24 md:pb-8 border-t border-amanar-border transition-colors duration-300">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center justify-center md:justify-start mb-2">
                <span className="text-xl font-bold text-amanar-dark dark:text-amber-500 mr-2">Amanar Map</span>
                <span className="text-sm text-muted-foreground">©{new Date().getFullYear()}</span>
              </div>
              <p className="text-sm text-muted-foreground text-center md:text-left">
                Tous droits réservés.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex space-x-6">
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Conditions d'utilisation
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Politique de confidentialité
                </a>
              </div>
              <div className="flex space-x-6 justify-center md:justify-start">
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  À propos
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
