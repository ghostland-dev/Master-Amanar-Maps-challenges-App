
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { 
  Github, 
  Twitter, 
  Instagram, 
  Facebook, 
  Youtube, 
  LinkedinIcon,
  ExternalLink,
  MessageCircle,
  MapPin 
} from "lucide-react";

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

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className={`flex-1 pt-16 transition-colors duration-300 ${className}`}>
        {children}
      </main>
      
      <footer className="bg-secondary/40 py-16 mt-auto border-t border-primary/10 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Logo and brand section */}
            <div className="md:col-span-4">
              <Link to="/" className="inline-block">
                <span className="text-2xl font-bold text-foreground dark:text-primary">Amanar Map</span>
              </Link>
              <p className="mt-4 text-muted-foreground">
                Votre parcours vers la liberté financière commence ici. Des challenges simples et accessibles pour générer des revenus en ligne.
              </p>
              <div className="flex space-x-4 mt-6">
                <SocialLink href="https://twitter.com" icon={<Twitter size={18} />} label="Twitter" />
                <SocialLink href="https://facebook.com" icon={<Facebook size={18} />} label="Facebook" />
                <SocialLink href="https://instagram.com" icon={<Instagram size={18} />} label="Instagram" />
                <SocialLink href="https://linkedin.com" icon={<LinkedinIcon size={18} />} label="LinkedIn" />
                <SocialLink href="https://github.com" icon={<Github size={18} />} label="Github" />
                <SocialLink href="https://youtube.com" icon={<Youtube size={18} />} label="Youtube" />
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-2">
              <h3 className="font-medium text-lg mb-4 text-foreground">Navigation</h3>
              <ul className="space-y-2">
                <FooterLink to="/" label="Accueil" />
                <FooterLink to="/challenges" label="Challenges" />
                <FooterLink to="/simulators" label="Simulateurs" />
                <FooterLink to="/library" label="Bibliothèque" />
                <FooterLink to="/subscriptions" label="Abonnements" />
              </ul>
            </div>

            {/* Resources */}
            <div className="md:col-span-2">
              <h3 className="font-medium text-lg mb-4 text-foreground">Ressources</h3>
              <ul className="space-y-2">
                <FooterLink to="/blog" label="Blog" />
                <FooterLink to="/faq" label="FAQ" />
                <FooterLink to="/tutorials" label="Tutoriels" />
                <FooterLink to="/tools" label="Outils" />
                <FooterLink to="/events" label="Événements" />
              </ul>
            </div>

            {/* Company */}
            <div className="md:col-span-2">
              <h3 className="font-medium text-lg mb-4 text-foreground">Entreprise</h3>
              <ul className="space-y-2">
                <FooterLink to="/about" label="À propos" />
                <FooterLink to="/contact" label="Contact" />
                <FooterLink to="/careers" label="Carrières" />
                <FooterLink to="/press" label="Presse" />
                <FooterLink to="/affiliates" label="Programme d'affiliation" />
              </ul>
            </div>

            {/* Legal */}
            <div className="md:col-span-2">
              <h3 className="font-medium text-lg mb-4 text-foreground">Légal</h3>
              <ul className="space-y-2">
                <FooterLink to="/terms-of-service" label="Conditions d'utilisation" />
                <FooterLink to="/privacy-policy" label="Politique de confidentialité" />
                <FooterLink to="/cookies" label="Cookies" />
                <FooterLink to="/gdpr" label="RGPD" />
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className="border-t border-primary/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row gap-4 items-center mb-6 md:mb-0">
              <div className="flex items-center">
                <MapPin size={16} className="mr-2 text-primary" />
                <span className="text-sm text-muted-foreground">Paris, France</span>
              </div>
              <div className="flex items-center">
                <MessageCircle size={16} className="mr-2 text-primary" />
                <span className="text-sm text-muted-foreground">contact@amanarmap.com</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; {currentYear} Amanar Map. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper components for footer links
const FooterLink = ({ to, label }: { to: string; label: string }) => (
  <li>
    <Link to={to} className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm">
      {label}
    </Link>
  </li>
);

const SocialLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="h-8 w-8 rounded-full bg-accent flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-200"
  >
    {icon}
  </a>
);

export default MainLayout;
