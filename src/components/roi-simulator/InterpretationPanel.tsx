
import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { LightbulbIcon, TrendingUp, Info } from "lucide-react";

interface InterpretationPanelProps {
  interpretation: string;
  tips: string[];
}

const InterpretationPanel = ({ interpretation, tips }: InterpretationPanelProps) => {
  return (
    <div className="pt-6 space-y-4">
      <Card className="border-border/50 overflow-hidden bg-primary/5 hover:bg-primary/10 transition-colors duration-300">
        <CardContent className="p-4 pt-4">
          <div className="flex items-start gap-3">
            <div className="bg-primary/20 rounded-full p-2 mt-0.5">
              <Info className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-sm font-medium mb-2">Interprétation des résultats</CardTitle>
              <p className="text-sm text-muted-foreground">
                {interpretation}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {tips.length > 0 && (
        <Card className="border-border/50 overflow-hidden bg-secondary/40 hover:bg-secondary/60 transition-colors duration-300">
          <CardContent className="p-4 pt-4">
            <div className="flex items-start gap-3">
              <div className="bg-primary/20 rounded-full p-2 mt-0.5">
                <LightbulbIcon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium mb-2">Conseils personnalisés</CardTitle>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InterpretationPanel;
