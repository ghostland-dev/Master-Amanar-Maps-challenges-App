
import { useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, LineChart, TrendingUp, BarChart3 } from "lucide-react";

/**
 * Cette composante gère la route /simulators
 * Elle fournit une page avec des liens vers tous les simulateurs disponibles
 */
const Simulators = () => {
  useEffect(() => {
    document.title = "FinQuest - Simulateurs";
  }, []);
  
  const simulators = [
    {
      id: "roi",
      title: "Simulateur de ROI",
      description: "Calculez le retour sur investissement de vos projets",
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      path: "/simulator"
    },
    {
      id: "margin",
      title: "Calculateur de Marge",
      description: "Déterminez vos marges et optimisez votre rentabilité",
      icon: <Calculator className="h-6 w-6 text-primary" />,
      path: "/margin-calculator"
    },
    {
      id: "adbudget",
      title: "Budget Publicitaire",
      description: "Planifiez votre budget marketing et suivez vos performances",
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      path: "/ad-budget-calculator"
    },
    {
      id: "passive",
      title: "Revenus Passifs",
      description: "Estimez vos revenus passifs sur le long terme",
      icon: <LineChart className="h-6 w-6 text-primary" />,
      path: "/passive-income-calculator"
    }
  ];
  
  return (
    <MainLayout title="Simulateurs" description="Accédez à tous nos simulateurs financiers">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Simulateurs Financiers</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Utilisez nos outils de simulation pour planifier vos projets, estimer vos rendements et prendre des décisions éclairées.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {simulators.map((simulator) => (
            <Card key={simulator.id} className="transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {simulator.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{simulator.title}</h3>
                <p className="text-muted-foreground mb-4">{simulator.description}</p>
                <Link to={simulator.path}>
                  <Button className="w-full group">
                    Accéder
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Simulators;
