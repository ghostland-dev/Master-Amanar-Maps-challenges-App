
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Clock, Award, ArrowRight, Users, Target, BookOpen, Star, Trophy, TrendingUp } from "lucide-react";
import { Chip } from "@/components/ui/chip";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

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
  participants?: number;
  steps?: number;
  isPopular?: boolean;
  isNew?: boolean;
  rewards?: string[];
  completedBy?: number;
  rating?: number;
  className?: string;
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
  participants = 0,
  steps = 0,
  isPopular = false,
  isNew = false,
  rewards = [],
  completedBy = 0,
  rating = 0,
  className,
}: ChallengeCardProps) => {
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
    <Link to={`/challenge/${id}`} className="block h-full">
      <div 
        className={cn(
          "glass h-full rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden border border-white/20",
          className
        )}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              {icon}
            </div>
            <div className="flex gap-2">
              {isPopular && (
                <Chip variant="danger" size="sm" className="animate-pulse">
                  <Star className="h-3 w-3 mr-1" />
                  Populaire
                </Chip>
              )}
              {isNew && (
                <Chip variant="primary" size="sm" className="animate-pulse">
                  Nouveau
                </Chip>
              )}
              <Chip variant="neutral" size="sm">
                {category}
              </Chip>
            </div>
          </div>
          
          <h3 className="text-xl font-medium mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              {duration}
            </div>
            <div className="flex items-center text-sm text-muted-foreground bg-primary/5 px-2 py-0.5 rounded-full">
              <Award className="mr-1.5 h-4 w-4 text-primary" />
              {xp} XP
            </div>
            {steps > 0 && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Target className="mr-1 h-4 w-4" />
                {steps} étapes
              </div>
            )}
            {participants > 0 && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="mr-1 h-4 w-4" />
                {participants} participants
              </div>
            )}
            {completedBy > 0 && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Trophy className="mr-1 h-4 w-4 text-amber-500" />
                {completedBy} complétions
              </div>
            )}
            <Chip variant={difficultyMap[difficulty].color} size="sm">
              {difficultyMap[difficulty].label}
            </Chip>
          </div>
          
          {/* Rewards section */}
          {rewards.length > 0 && (
            <div className="mb-4 bg-secondary/30 p-2 rounded-lg">
              <div className="text-xs font-medium mb-1 flex items-center text-primary">
                <Trophy className="h-3 w-3 mr-1" /> 
                Récompenses:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {rewards.map((reward, index) => (
                  <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full inline-flex items-center">
                    <Star className="h-2.5 w-2.5 mr-1" />
                    {reward}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Rating display */}
          {rating > 0 && (
            <div className="flex items-center mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    className={`h-3.5 w-3.5 ${
                      star <= Math.floor(rating) 
                        ? "text-amber-500" 
                        : star <= rating
                        ? "text-amber-500/50"
                        : "text-muted-foreground/20"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs ml-1.5 text-muted-foreground">
                {rating.toFixed(1)} ({participants} avis)
              </span>
            </div>
          )}
          
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
          {progress === 0 ? (
            <>
              <span className="text-sm font-medium text-foreground">Commencer</span>
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary">
                <ArrowRight className="h-3.5 w-3.5 text-white" />
              </div>
            </>
          ) : progress === 100 ? (
            <>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">Terminé</span>
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-500">
                <Trophy className="h-3.5 w-3.5 text-white" />
              </div>
            </>
          ) : (
            <>
              <span className="text-sm font-medium text-foreground">Continuer</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-primary font-medium">+{Math.round(xp * (progress/100))} XP gagnés</span>
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary">
                  <TrendingUp className="h-3.5 w-3.5 text-white" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ChallengeCard;
