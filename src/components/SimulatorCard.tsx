
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { scaleIn } from "@/lib/animations";

interface SimulatorCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  comingSoon?: boolean;
}

const SimulatorCard = ({ title, description, icon, to, comingSoon = false }: SimulatorCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (cardRef.current) {
      scaleIn(cardRef.current);
    }
  }, []);
  
  return (
    <Card 
      ref={cardRef}
      className="group relative overflow-hidden h-full hover:shadow-md transition-all duration-300 border-border/50 bg-card/50 hover:bg-card/80"
    >
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl transform group-hover:scale-150 transition-transform duration-500" />
      
      <Link to={to} className="block p-6">
        <div className="flex items-start space-x-4">
          <div className="bg-primary/10 rounded-full p-3 group-hover:bg-primary/20 transition-colors duration-300">
            {icon}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">{title}</h3>
              {comingSoon ? (
                <Badge variant="outline" className="text-xs bg-primary/10 hover:bg-primary/20">Bientôt disponible</Badge>
              ) : (
                <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default SimulatorCard;
