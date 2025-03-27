
interface InterpretationPanelProps {
  interpretation: string;
  tips: string[];
}

const InterpretationPanel = ({ interpretation, tips }: InterpretationPanelProps) => {
  return (
    <div className="pt-6 space-y-4">
      <div className="bg-primary/5 p-4 rounded-lg hover:shadow-sm transition-all">
        <h3 className="text-sm font-medium mb-2">Interprétation des résultats</h3>
        <p className="text-sm text-muted-foreground">
          {interpretation}
        </p>
      </div>
      
      {tips.length > 0 && (
        <div className="bg-primary/5 p-4 rounded-lg hover:shadow-sm transition-all">
          <h3 className="text-sm font-medium mb-2">Conseils personnalisés</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            {tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InterpretationPanel;
