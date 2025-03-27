
import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ROIForm from "./roi-simulator/ROIForm";
import ROIResults from "./roi-simulator/ROIResults";
import InterpretationPanel from "./roi-simulator/InterpretationPanel";
import { scaleIn, slideIn } from "@/lib/animations";

const ROISimulator = () => {
  const [investment, setInvestment] = useState(1000);
  const [returns, setReturns] = useState(1500);
  const [period, setPeriod] = useState(12);
  const [activeTab, setActiveTab] = useState("form"); 
  const resultsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleCalculate = (investmentAmount: number, returnsAmount: number, timePeriod: number) => {
    setInvestment(investmentAmount);
    setReturns(returnsAmount);
    setPeriod(timePeriod);
    setActiveTab("results");
  };
  
  useEffect(() => {
    if (cardRef.current) {
      scaleIn(cardRef.current);
    }
  }, []);
  
  useEffect(() => {
    if (resultsRef.current && activeTab === "results") {
      slideIn(resultsRef.current, 'right');
    }
  }, [activeTab]);
  
  // Calcul du ROI
  const roi = ((returns - investment) / investment) * 100;
  const monthlyROI = roi / period;
  
  // Interprétation des résultats
  const interpretation = roi > 100 
    ? `Excellente performance ! Votre retour sur investissement de ${roi.toFixed(2)}% est très élevé.` 
    : roi > 50 
    ? `Bonne performance ! Votre retour sur investissement de ${roi.toFixed(2)}% est solide.` 
    : roi > 20 
    ? `Performance correcte. Votre retour sur investissement de ${roi.toFixed(2)}% est positif.` 
    : roi > 0 
    ? `Performance modeste. Votre retour sur investissement de ${roi.toFixed(2)}% est positif mais limité.` 
    : `Attention, votre investissement n'est pas rentable avec un ROI de ${roi.toFixed(2)}%.`;
  
  // Conseils personnalisés
  const tips = [
    roi < 20 ? "Essayez d'optimiser vos coûts pour améliorer votre rentabilité." : "Continuez sur cette voie pour maintenir votre rentabilité.",
    period > 6 ? "Envisagez de raccourcir la période d'investissement pour augmenter le ROI mensuel." : "Votre période d'investissement est courte, ce qui est favorable au ROI mensuel.",
    investment > 5000 ? "Pour un investissement important, diversifiez pour réduire les risques." : "Votre investissement modéré vous permet de tester avant de vous engager davantage."
  ];
  
  return (
    <Card ref={cardRef} className="border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold">Calculateur de ROI (Retour sur Investissement)</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="form" className="text-sm">
              Paramètres
            </TabsTrigger>
            <TabsTrigger value="results" className="text-sm" disabled={activeTab === "form"}>
              Résultats
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="form" className="mt-0 p-1">
            <ROIForm onCalculate={handleCalculate} />
          </TabsContent>
          
          <TabsContent value="results" className="mt-0 space-y-4 p-1">
            <div ref={resultsRef}>
              <ROIResults 
                investment={investment} 
                returns={returns} 
                period={period} 
                roi={roi} 
                monthlyROI={monthlyROI} 
              />
              
              <InterpretationPanel 
                interpretation={interpretation}
                tips={tips}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ROISimulator;
