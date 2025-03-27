
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface SimulatorCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  to: string;
  comingSoon?: boolean;
}

const SimulatorCard = ({
  title,
  description,
  icon,
  to,
  comingSoon = false,
}: SimulatorCardProps) => {
  const card = (
    <div className={`glass p-6 rounded-xl transition-all duration-300 h-full flex flex-col ${comingSoon ? "opacity-75" : "hover:shadow-lg hover:-translate-y-1"}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
        {comingSoon && (
          <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
            Bientôt disponible
          </span>
        )}
      </div>
      
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 flex-grow">{description}</p>
      
      <div className={`text-sm flex items-center justify-end ${comingSoon ? "text-muted-foreground" : "text-primary font-medium"}`}>
        {comingSoon ? "En développement" : "Ouvrir le simulateur"}
        <ArrowRight className="ml-1 h-4 w-4" />
      </div>
    </div>
  );

  if (comingSoon) {
    return card;
  }

  return <Link to={to} className="h-full">{card}</Link>;
};

export default SimulatorCard;
