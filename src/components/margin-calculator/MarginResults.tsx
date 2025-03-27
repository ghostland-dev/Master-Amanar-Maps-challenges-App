
import React, { useRef } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, FileText } from "lucide-react";
import MarginResultSummary from "./MarginResultSummary";
import MarginInterpretation from "./MarginInterpretation";

interface MarginResultsProps {
  results: {
    marginAmount: number;
    marginPercent: number;
    markup: number;
    breakEvenPoint: number;
  };
  costPrice: number;
  onExportPdf: () => void;
}

const MarginResults = ({ results, costPrice, onExportPdf }: MarginResultsProps) => {
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  
  return (
    <Card className="glass border border-primary/10 hover:border-primary/20 shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <ArrowRightLeft className="mr-2 h-5 w-5 text-primary" />
            Résultats de l'analyse
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onExportPdf} 
            className="flex items-center gap-1 hover:bg-primary/10"
          >
            <FileText className="h-4 w-4" />
            <span>Exporter</span>
          </Button>
        </div>
        <CardDescription>
          Analyse détaillée de votre marge et rentabilité
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6" ref={resultsContainerRef}>
        <MarginResultSummary {...results} />
        <MarginInterpretation 
          marginPercent={results.marginPercent} 
          markup={results.markup} 
          marginAmount={results.marginAmount} 
          costPrice={costPrice} 
        />
      </CardContent>
    </Card>
  );
};

export default MarginResults;
