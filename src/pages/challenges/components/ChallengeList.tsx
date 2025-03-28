
import { Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChallengeCard from "@/components/ChallengeCard";
import { categoryLabels } from "../utils/challengeUtils";

interface ChallengeListProps {
  challenges: any[];
  resetFilters: () => void;
}

const ChallengeList = ({ challenges, resetFilters }: ChallengeListProps) => {
  if (challenges.length === 0) {
    return (
      <div className="text-center py-16">
        <Award className="h-16 w-16 text-muted mx-auto mb-4" />
        <h3 className="text-xl font-medium mb-2">Aucun challenge trouvé</h3>
        <p className="text-muted-foreground mb-6">
          Aucun challenge ne correspond à vos critères de recherche.
        </p>
        <Button onClick={resetFilters}>
          Réinitialiser les filtres
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {challenges.map((challenge) => (
        <ChallengeCard 
          key={challenge.id}
          {...challenge}
          category={categoryLabels[challenge.category]}
        />
      ))}
    </div>
  );
};

export default ChallengeList;
