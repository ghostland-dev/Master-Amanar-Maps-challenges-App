
import { Trophy, Target, Award } from "lucide-react";

export interface Challenge {
  id: string;
  title: string;
  participants: number;
  completionRate: number;
  starts?: number;
  completions?: number;
  abandonRate?: number;
  rating?: number;
}

interface ChallengeTableProps {
  challenges: Challenge[];
  showRating?: boolean;
  showAbandonRate?: boolean;
}

export const ChallengeTable = ({ challenges, showRating = false, showAbandonRate = false }: ChallengeTableProps) => {
  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="bg-muted/50">
            <th className="text-left p-3 text-muted-foreground font-medium">Challenge</th>
            {showAbandonRate && <th className="text-center p-3 text-muted-foreground font-medium">Démarrages</th>}
            <th className="text-center p-3 text-muted-foreground font-medium">
              {showAbandonRate ? "Complétions" : "Participants"}
            </th>
            <th className="text-center p-3 text-muted-foreground font-medium">
              {showAbandonRate ? "Taux d'abandon" : "Taux de complétion"}
            </th>
            {showRating && <th className="text-center p-3 text-muted-foreground font-medium">Feedback moyen</th>}
          </tr>
        </thead>
        <tbody>
          {challenges.map((challenge, index) => (
            <tr key={challenge.id} className="border-t border-border hover:bg-secondary/20 transition-colors">
              <td className="p-3 flex items-center gap-2">
                <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center">
                  {index === 0 && <Trophy className="h-4 w-4 text-primary" />}
                  {index !== 0 && <Target className="h-4 w-4 text-primary" />}
                </div>
                <span className="text-sm md:text-base font-medium">{challenge.title}</span>
              </td>
              {showAbandonRate && <td className="p-3 text-center">{challenge.starts}</td>}
              <td className="p-3 text-center font-medium">{showAbandonRate ? challenge.completions : challenge.participants}</td>
              <td className="p-3 text-center">
                {showAbandonRate ? (
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    challenge.abandonRate && challenge.abandonRate > 40 ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" : 
                    challenge.abandonRate && challenge.abandonRate > 30 ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" : 
                    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  }`}>
                    {challenge.abandonRate}%
                  </span>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <div className="bg-secondary w-24 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          challenge.completionRate > 70 ? "bg-green-500" : 
                          challenge.completionRate > 50 ? "bg-blue-500" : "bg-amber-500"
                        }`} 
                        style={{ width: `${challenge.completionRate}%` }}
                      />
                    </div>
                    <span className="text-sm">{challenge.completionRate}%</span>
                  </div>
                )}
              </td>
              {showRating && challenge.rating && (
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Award 
                          key={star}
                          className={`h-4 w-4 ${
                            star <= Math.floor(challenge.rating) 
                              ? "text-amber-500" 
                              : star <= challenge.rating
                              ? "text-amber-500/50"
                              : "text-muted-foreground/20"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm">{challenge.rating}</span>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
