
import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import ROISimulator from "@/components/ROISimulator";
import SimulatorCard from "@/components/SimulatorCard";
import { BarChart, TrendingUp, Calculator, DollarSign, Percent, LineChart } from "lucide-react";
import { fadeIn, slideIn } from "@/lib/animations";

const Simulator = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const simulatorRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "FinQuest - Simulateurs";
    
    if (headerRef.current) fadeIn(headerRef.current);
    if (simulatorRef.current) slideIn(simulatorRef.current, 'right', 0.3);
    if (cardsRef.current) slideIn(cardsRef.current, 'up', 0.6);
  }, []);

  const simulators = [
    {
      title: "Simulateur de ROI",
      description: "Calculez le retour sur investissement de vos projets",
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      to: "/simulators",
      comingSoon: false,
    },
    {
      title: "Calculateur de marge",
      description: "Déterminez vos marges et prix optimaux",
      icon: <Calculator className="h-6 w-6 text-primary" />,
      to: "/simulators/margin",
      comingSoon: false,
    },
    {
      title: "Budget publicitaire",
      description: "Optimisez votre budget marketing et publicitaire",
      icon: <DollarSign className="h-6 w-6 text-primary" />,
      to: "/simulators/ad-budget",
      comingSoon: false,
    },
    {
      title: "Revenus passifs",
      description: "Projetez vos revenus passifs sur le long terme",
      icon: <Percent className="h-6 w-6 text-primary" />,
      to: "/simulators/passive-income",
      comingSoon: false,
    },
    {
      title: "Analyse de tendance",
      description: "Analysez les tendances du marché et leur impact",
      icon: <LineChart className="h-6 w-6 text-primary" />,
      to: "/simulators/trend-analysis",
      comingSoon: false,
    },
  ];

  return (
    <div className="min-h-screen pb-16 md:pb-0 bg-background/50">
      <Navbar />
      <div className="pt-20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-6">
          <div ref={headerRef} className="mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Simulateurs financiers</h1>
            <p className="text-muted-foreground">
              Testez vos stratégies et analysez leur potentiel avec nos outils de simulation
            </p>
          </div>
          
          <div ref={headerRef} className="glass p-6 rounded-xl text-center mb-10 border-border/30 hover:border-border/50 transition-colors duration-300">
            <div className="inline-block rounded-full bg-primary/10 p-3 mb-4">
              <BarChart className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Simulateur de ROI (Retour sur Investissement)</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-2">
              Calculez rapidement la rentabilité de vos investissements et projets.
            </p>
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
