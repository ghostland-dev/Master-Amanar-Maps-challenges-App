
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ChallengeCard from "@/components/ChallengeCard";
import { Challenge } from "@/utils/challenge/types";
import { AnimatePresence } from "framer-motion";

interface ChallengeGridViewProps {
  challenges: (Challenge & { id: string })[];
  isLoading: boolean;
  resetFilters: () => void;
  normalizeDifficulty: (difficulty: string) => "beginner" | "intermediate" | "advanced";
}

const ChallengeGridView = ({ 
  challenges, 
  isLoading, 
  resetFilters, 
  normalizeDifficulty 
}: ChallengeGridViewProps) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-video bg-muted rounded-t-lg"></div>
            <div className="h-48 bg-card rounded-b-lg p-4 space-y-3">
              <div className="h-5 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
              <div className="h-3 bg-muted rounded w-full"></div>
              <div className="h-3 bg-muted rounded w-5/6"></div>
              <div className="h-8 bg-muted rounded w-full mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (challenges.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Aucun challenge ne correspond à votre recherche.</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={resetFilters}
        >
          Réinitialiser la recherche
        </Button>
      </div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <AnimatePresence>
        {challenges.map((challenge) => (
          <motion.div key={challenge.id} variants={itemVariants}>
            <ChallengeCard
              id={challenge.id}
              title={challenge.title}
              description={challenge.description}
              category={challenge.category || ""}
              difficulty={normalizeDifficulty(challenge.difficulty)}
              duration={challenge.duration || ""}
              xp={challenge.xp || 0}
              icon={<span>🏆</span>}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default ChallengeGridView;
