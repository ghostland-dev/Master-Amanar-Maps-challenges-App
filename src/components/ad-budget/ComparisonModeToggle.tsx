
import { Button } from "@/components/ui/button";
import { Columns, Save } from "lucide-react";

interface ComparisonModeToggleProps {
  savedScenario: any | null;
  onSaveScenario: () => void;
  onToggleComparison: () => void;
}

const ComparisonModeToggle = ({
  savedScenario,
  onSaveScenario,
  onToggleComparison
}: ComparisonModeToggleProps) => {
  return (
    <div className="flex justify-end mb-4 gap-2">
      <Button 
        variant="outline" 
        className="gap-2"
        onClick={onSaveScenario}
      >
        <Save className="h-4 w-4" />
        Sauvegarder ce scénario
      </Button>
      <Button 
        variant={savedScenario ? "default" : "outline"} 
        className="gap-2"
        onClick={onToggleComparison}
        disabled={!savedScenario}
      >
        <Columns className="h-4 w-4" />
        Comparer
      </Button>
    </div>
  );
};

export default ComparisonModeToggle;
