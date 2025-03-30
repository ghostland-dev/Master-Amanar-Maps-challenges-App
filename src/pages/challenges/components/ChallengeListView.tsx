
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Challenge } from "@/utils/challenge/types";

interface ChallengeListViewProps {
  challenges: (Challenge & { id: string })[];
  isLoading: boolean;
  resetFilters: () => void;
}

const ChallengeListView = ({ challenges, isLoading, resetFilters }: ChallengeListViewProps) => {
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
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse flex bg-card rounded-lg overflow-hidden">
            <div className="w-1/4 bg-muted"></div>
            <div className="w-3/4 p-4 space-y-3">
              <div className="h-5 bg-muted rounded w-1/2"></div>
              <div className="h-3 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-full"></div>
              <div className="flex justify-between items-center mt-4">
                <div className="h-8 bg-muted rounded w-1/4"></div>
                <div className="h-4 bg-muted rounded w-1/6"></div>
              </div>
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
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {challenges.map((challenge) => (
        <motion.div 
          key={challenge.id}
          variants={itemVariants}
          className="bg-card border rounded-lg overflow-hidden flex flex-col md:flex-row"
        >
          <div className="w-full md:w-1/4 aspect-video md:aspect-auto">
            <img 
              src={challenge.image || "/placeholder.svg"} 
              alt={challenge.title}
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="p-4 md:p-6 flex-1">
            <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
            <p className="text-muted-foreground line-clamp-2 mb-4">{challenge.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{challenge.category}</Badge>
              <Badge variant="outline">{challenge.difficulty}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <Button asChild>
                <a href={`/challenge/${challenge.id}`}>Voir le challenge</a>
              </Button>
              <span className="text-sm text-muted-foreground">
                {challenge.duration}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ChallengeListView;
