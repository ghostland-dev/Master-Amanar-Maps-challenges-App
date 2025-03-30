
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Chip } from "@/components/ui/chip";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  count: number;
  difficulty?: "beginner" | "intermediate" | "advanced";
  to: string;
  className?: string;
  image?: string;
}

const CategoryCard = ({
  title,
  description,
  icon,
  count,
  difficulty = "beginner",
  to,
  className = "",
  image,
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
        className={`relative overflow-hidden rounded-xl transition-all duration-300 group h-full flex flex-col ${className}`}
      >
        {/* Card background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-card to-background border border-border group-hover:border-primary/20 rounded-xl transition-all duration-300"></div>
        
        {/* Glow effect on hover */}
        <div className="absolute -inset-1 bg-gradient-to-br from-primary/0 to-primary/0 opacity-0 group-hover:opacity-20 blur-xl rounded-xl transition-all duration-500"></div>
        
        {/* Image section */}
        {image && (
          <div className="relative overflow-hidden rounded-t-xl">
            <AspectRatio ratio={16/9} className="bg-muted">
              <img 
                src={image} 
                alt={title}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60"></div>
            </AspectRatio>
          </div>
        )}
        
        {/* Content */}
        <div className="relative p-6 z-10 flex-1 flex flex-col">
          <div className="flex justify-between items-start">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all">
              {icon}
            </div>
            <Chip
              variant={difficultyMap[difficulty].color}
              size="sm"
              className="shadow-sm"
            >
              {difficultyMap[difficulty].label}
            </Chip>
          </div>

          <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>

          <div className="flex justify-between items-center mt-auto">
            <Chip variant="neutral" size="sm" className="shadow-sm">
              {count} challenges
            </Chip>
            <div className="text-primary flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform">
              Découvrir
              <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
