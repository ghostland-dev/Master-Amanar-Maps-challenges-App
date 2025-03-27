
import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import { slideIn } from "@/lib/animations";
import { useToast } from "@/hooks/use-toast";
import { generatePdfFromData } from "@/utils/pdf";
import MarginCalculatorHeader from "@/components/margin-calculator/MarginCalculatorHeader";
import MarginCalculatorForm from "@/components/margin-calculator/MarginCalculatorForm";
import MarginResults from "@/components/margin-calculator/MarginResults";
import { prepareDataForPdfExport } from "@/components/margin-calculator/utils";

const MarginCalculator = () => {
  const { toast } = useToast();
  const simulatorRef = useState<HTMLDivElement | null>(null)[0];
  const resultsRef = useState<HTMLDivElement | null>(null)[0];
  
  const [sellingPrice, setSellingPrice] = useState<number>(100);
  const [costPrice, setCostPrice] = useState<number>(60);
  const [marginType, setMarginType] = useState<string>("percent");
  const [results, setResults] = useState<{
    marginAmount: number;
    marginPercent: number;
    markup: number;
    breakEvenPoint: number;
  } | null>(null);
  
  useEffect(() => {
    document.title = "FinQuest - Calculateur de marge";
  }, []);
  
  const handleSellingPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSellingPrice(parseFloat(e.target.value) || 0);
  };
  
  const handleCostPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCostPrice(parseFloat(e.target.value) || 0);
  };
  
  const handleMarginTypeChange = (value: string) => {
    setMarginType(value);
  };
  
  const calculate = () => {
    if (costPrice <= 0) {
      toast({
        title: "Erreur",
        description: "Le coût de revient doit être supérieur à zéro",
        variant: "destructive"
      });
      return;
    }
    
    if (sellingPrice <= 0) {
      toast({
        title: "Erreur",
        description: "Le prix de vente doit être supérieur à zéro",
        variant: "destructive"
      });
      return;
    }
    
    // Calculate margin
    const marginAmount = sellingPrice - costPrice;
    const marginPercent = (marginAmount / sellingPrice) * 100;
    const markup = (marginAmount / costPrice) * 100;
    const breakEvenPoint = costPrice > 0 ? costPrice / sellingPrice : 0;
    
    setResults({
      marginAmount,
      marginPercent,
      markup,
      breakEvenPoint
    });
    
    if (resultsRef) {
      slideIn(resultsRef, 'up');
    }
  };
  
  const reset = () => {
    setSellingPrice(100);
    setCostPrice(60);
    setMarginType("percent");
    setResults(null);
  };
  
  const handleExportPdf = () => {
    if (!results) return;
    
    try {
      const data = prepareDataForPdfExport(sellingPrice, costPrice, marginType, results);
      
      generatePdfFromData(data, {
        title: "Analyse de Marge - FinQuest",
        filename: "margin-analysis.pdf",
      });
      
      toast({
        title: "PDF généré avec succès",
        description: "Votre analyse de marge a été téléchargée",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer le PDF",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen pb-16 md:pb-0 bg-gradient-to-br from-background to-background/80">
      <Navbar />
      <div className="pt-20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-6">
          <MarginCalculatorHeader />
        
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div ref={(el) => { if (el && !simulatorRef) slideIn(el, 'right') }}>
                <MarginCalculatorForm 
                  sellingPrice={sellingPrice}
                  costPrice={costPrice}
                  marginType={marginType}
                  onSellingPriceChange={handleSellingPriceChange}
                  onCostPriceChange={handleCostPriceChange}
                  onMarginTypeChange={handleMarginTypeChange}
                  onCalculate={calculate}
                  onReset={reset}
                />
              </div>
              
              {results && (
                <div ref={(el) => { if (el && !resultsRef) slideIn(el, 'up') }}>
                  <MarginResults 
                    results={results} 
                    costPrice={costPrice}
                    onExportPdf={handleExportPdf} 
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarginCalculator;
