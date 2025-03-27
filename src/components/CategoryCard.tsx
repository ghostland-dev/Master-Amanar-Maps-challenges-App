
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Chip } from "@/components/ui/chip";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  count: number;
  difficulty?: "beginner" | "intermediate" | "advanced";
  to: string;
  className?: string;
}

const CategoryCard = ({
  title,
  description,
  icon,
  count,
  difficulty = "beginner",
  to,
  className = "",
}: CategoryCardProps) => {
  const difficultyMap = {
    beginner: {
      label: "Débutant",
      color: "success" as const,
    },
    intermediate: {
      label: "Intermédiaire",
      color: "warning" as const,
    },
    advanced: {
      label: "Avancé",
      color: "danger" as const,
    },
  };

  return (
    <Link to={to}>
      <div
        className={`glass p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${className}`}
      >
        <div className="flex justify-between items-start">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            {icon}
          </div>
          <Chip
            variant={difficultyMap[difficulty].color}
            size="sm"
          >
            {difficultyMap[difficulty].label}
          </Chip>
        </div>

        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>

        <div className="flex justify-between items-center">
          <Chip variant="neutral" size="sm">
            {count} challenges
          </Chip>
          <div className="text-primary flex items-center text-sm font-medium">
            Découvrir
            <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
