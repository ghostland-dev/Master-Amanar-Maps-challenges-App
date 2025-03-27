
import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import ROISimulator from "@/components/ROISimulator";
import SimulatorCard from "@/components/SimulatorCard";
import { BarChart, TrendingUp, Calculator, DollarSign, Percent, LineChart, Download, FileText } from "lucide-react";
import { fadeIn, slideIn } from "@/lib/animations";

const Simulator = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const simulatorRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "FinQuest - Simulateurs";
    
    if (headerRef.current) fadeIn(headerRef.current);
    if (simulatorRef.current) slideIn(simulatorRef.current, 'right');
    if (cardsRef.current) slideIn(cardsRef.current, 'up');
  }, []);

  const simulators = [
    {
      title: "Simulateur de ROI",
      description: "Calculez le retour sur investissement de vos projets",
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      to: "/simulator",
      comingSoon: false,
    },
    {
      title: "Calculateur de marge",
      description: "Déterminez vos marges et prix optimaux",
      icon: <Calculator className="h-6 w-6 text-primary" />,
      to: "/simulator/margin",
      comingSoon: false,
    },
    {
      title: "Budget publicitaire",
      description: "Optimisez votre budget marketing et publicitaire",
      icon: <DollarSign className="h-6 w-6 text-primary" />,
      to: "/simulator/ad-budget",
      comingSoon: false,
    },
    {
      title: "Revenus passifs",
      description: "Projetez vos revenus passifs sur le long terme",
      icon: <Percent className="h-6 w-6 text-primary" />,
      to: "/simulator/passive-income",
      comingSoon: false,
    },
    {
      title: "Analyse de tendance",
      description: "Analysez les tendances du marché et leur impact",
      icon: <LineChart className="h-6 w-6 text-primary" />,
      to: "/simulator/trend-analysis",
      comingSoon: false,
    },
  ];

  return (
    <div className="min-h-screen pb-16 md:pb-0 bg-gradient-to-br from-background to-background/80">
      <Navbar />
      <div className="pt-20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-6">
          <div ref={headerRef} className="mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Simulateurs financiers</h1>
            <p className="text-muted-foreground">
              Testez vos stratégies et analysez leur potentiel avec nos outils de simulation
            </p>
          </div>
          
          <div ref={headerRef} className="glass p-6 rounded-xl text-center mb-10 border border-primary/10 hover:border-primary/20 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="inline-block rounded-full bg-primary/10 p-3 mb-4">
              <BarChart className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Simulateur de ROI (Retour sur Investissement)</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
              Calculez rapidement la rentabilité de vos investissements et projets.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Export PDF
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Calcul en temps réel
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Analyses personnalisées
              </span>
            </div>
          </div>
          
          <div ref={simulatorRef}>
            <ROISimulator />
          </div>
          
          <div ref={cardsRef} className="mt-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="bg-primary/10 p-1.5 rounded-md mr-2">
                <BarChart className="h-5 w-5 text-primary" />
              </span>
              Autres simulateurs disponibles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {simulators.slice(1).map((simulator, index) => (
                <SimulatorCard key={index} {...simulator} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
