import { Link } from "react-router-dom";
import { Award, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import ProgressBar from "@/components/ProgressBar";
import { Challenge } from "@/utils/challenge/types";

interface ChallengeInfoProps {
  challenge: Challenge;
}

const ChallengeInfo = ({ challenge }: ChallengeInfoProps) => {
  return (
    <Card className="glass">
      <CardContent className="p-6">
        <Chip variant="primary" size="sm" className="mb-4">
          {challenge.category}
        </Chip>
        
        <h1 className="text-2xl font-bold mb-4">{challenge.title}</h1>
        <p className="text-muted-foreground mb-6">{challenge.description}</p>
        
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center text-sm">
            <Award className="mr-1 h-4 w-4 text-primary" />
            <span>{challenge.xp} XP</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="mr-1 h-4 w-4 text-primary" />
            <span>{challenge.duration}</span>
          </div>
          <Chip variant="neutral" size="sm">
            {challenge.difficulty}
          </Chip>
        </div>
        
        <div className="mb-6">
          <ProgressBar 
            label="Progression du challenge" 
            value={challenge.progress} 
            max={100}
            size="lg"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-6">
          <div>{challenge.currentStep}/{challenge.totalSteps} étapes complétées</div>
        </div>
        
        <Button className="w-full">Continuer le challenge</Button>
      </CardContent>
    </Card>
  );
};

export default ChallengeInfo;
