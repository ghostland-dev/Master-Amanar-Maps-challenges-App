
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Clock, Award, ArrowRight } from "lucide-react";
import { Chip } from "@/components/ui/chip";
import { Progress } from "@/components/ui/progress";

interface ChallengeCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: ReactNode;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  xp: number;
  progress?: number;
}

const ChallengeCard = ({
  id,
  title,
  description,
  category,
  icon,
  difficulty,
  duration,
  xp,
  progress = 0,
}: ChallengeCardProps) => {
  const difficultyMap = {
    beginner: {
      label: "Débutant",
      color: "success",
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
    <Link to={`/challenge/${id}`}>
      <div className="glass h-full rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              {icon}
            </div>
            <Chip variant="neutral" size="sm">
              {category}
            </Chip>
          </div>
          
          <h3 className="text-xl font-medium mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              {duration}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Award className="mr-1 h-4 w-4" />
              {xp} XP
            </div>
            <Chip variant={difficultyMap[difficulty].color} size="sm">
              {difficultyMap[difficulty].label}
            </Chip>
          </div>
          
          {progress > 0 && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Progression</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>
          )}
        </div>
        
        <div className="border-t border-border p-4 flex justify-between items-center bg-secondary/50">
          <span className="text-sm font-medium text-foreground">
            {progress === 0 ? "Commencer" : progress === 100 ? "Terminé" : "Continuer"}
          </span>
          <ArrowRight className="h-4 w-4 text-primary" />
        </div>
      </div>
    </Link>
  );
};

export default ChallengeCard;
