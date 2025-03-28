
import { Award, TrendingUp, AwardIcon } from "lucide-react";

interface ChallengeStatsProps {
  challenges: any[];
}

const ChallengeStats = ({ challenges }: ChallengeStatsProps) => {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <div className="glass p-4 rounded-xl flex items-center gap-3 flex-1 min-w-[200px]">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Award className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Challenges terminés</p>
          <p className="text-xl font-bold">2 / {challenges.length}</p>
        </div>
      </div>
      
      <div className="glass p-4 rounded-xl flex items-center gap-3 flex-1 min-w-[200px]">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">XP accumulés</p>
          <p className="text-xl font-bold">750 XP</p>
        </div>
      </div>
      
      <div className="glass p-4 rounded-xl flex items-center gap-3 flex-1 min-w-[200px]">
        <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
          <AwardIcon className="h-5 w-5 text-amber-500" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Badges gagnés</p>
          <p className="text-xl font-bold">3 badges</p>
        </div>
      </div>
    </div>
  );
};

export default ChallengeStats;
