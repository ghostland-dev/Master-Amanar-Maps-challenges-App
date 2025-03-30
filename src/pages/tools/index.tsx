
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  LineChart, 
  BarChart3, 
  TrendingUp, 
  Search, 
  FileSpreadsheet,
  Calendar,
  Mail,
  Image,
  Type,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Tools = () => {
  return (
    <MainLayout title="Outils" description="Des outils pratiques pour optimiser votre business en ligne">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Outils</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre collection d'outils pratiques pour vous aider à optimiser votre business en ligne, 
            calculer votre rentabilité et planifier vos stratégies.
          </p>
        </div>
        
        <Tabs defaultValue="calculators" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="calculators">Calculateurs</TabsTrigger>
            <TabsTrigger value="generators">Générateurs</TabsTrigger>
            <TabsTrigger value="analyzers">Analyseurs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculators">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ToolCard
                icon={<Calculator className="h-6 w-6 text-primary" />}
                title="Calculateur de Marge"
                description="Calculez rapidement vos marges et optimisez vos prix de vente pour maximiser vos profits."
                to="/margin-calculator"
              />
              <ToolCard
                icon={<TrendingUp className="h-6 w-6 text-primary" />}
                title="Simulateur de ROI"
                description="Estimez le retour sur investissement de vos campagnes marketing et projets."
                to="/simulator"
              />
              <ToolCard
                icon={<BarChart3 className="h-6 w-6 text-primary" />}
                title="Budget Publicitaire"
                description="Planifiez et optimisez vos budgets publicitaires pour maximiser les résultats."
                to="/ad-budget-calculator"
              />
              <ToolCard
                icon={<LineChart className="h-6 w-6 text-primary" />}
                title="Revenus Passifs"
                description="Simulez vos revenus passifs sur le long terme et planifiez votre stratégie d'investissement."
                to="/passive-income-calculator"
              />
              <ToolCard
                icon={<FileSpreadsheet className="h-6 w-6 text-primary" />}
                title="Calculateur de Dropshipping"
                description="Évaluez la rentabilité de vos produits en dropshipping incluant tous les frais."
                to="/tools/dropshipping-calculator"
                soon
              />
              <ToolCard
                icon={<Calendar className="h-6 w-6 text-primary" />}
                title="Planificateur de Contenu"
                description="Organisez votre calendrier de contenu pour vos réseaux sociaux et blog."
                to="/tools/content-planner"
                soon
                premium
              />
            </div>
          </TabsContent>
          
          <TabsContent value="generators">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ToolCard
                icon={<Type className="h-6 w-6 text-primary" />}
                title="Générateur de Titres"
                description="Créez des titres accrocheurs pour vos articles de blog et publicités."
                to="/tools/headline-generator"
                soon
              />
              <ToolCard
                icon={<Mail className="h-6 w-6 text-primary" />}
                title="Templates d'Emails"
                description="Accédez à une bibliothèque de templates d'emails marketing prêts à l'emploi."
                to="/tools/email-templates"
                soon
                premium
              />
              <ToolCard
                icon={<Image className="h-6 w-6 text-primary" />}
                title="Créateur de Visuels"
                description="Concevez des visuels professionnels pour vos réseaux sociaux et publicités."
                to="/tools/visual-creator"
                soon
                premium
              />
            </div>
          </TabsContent>
          
          <TabsContent value="analyzers">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ToolCard
                icon={<Search className="h-6 w-6 text-primary" />}
                title="Analyseur de Niches"
                description="Identifiez les niches rentables et analysez la concurrence et la demande."
                to="/tools/niche-analyzer"
                soon
                premium
              />
              <ToolCard
                icon={<TrendingUp className="h-6 w-6 text-primary" />}
                title="Tendances du Marché"
                description="Découvrez les tendances émergentes pour anticiper les opportunités."
                to="/simulator/trend-analysis"
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-16 text-center">
          <Link to="/simulators">
            <Button size="lg" className="rounded-full px-8">
              Voir tous nos simulateurs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

// Tool Card Component
const ToolCard = ({ 
  icon, 
  title, 
  description, 
  to,
  soon = false,
  premium = false
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  to: string;
  soon?: boolean;
  premium?: boolean;
}) => (
  <Card className="transition-all duration-300 hover:shadow-md hover:-translate-y-1 h-full">
    <CardContent className="p-6 flex flex-col h-full">
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 flex items-center">
        {title}
        {premium && (
          <span className="ml-2 text-xs bg-yellow-500/20 text-yellow-700 border border-yellow-500 px-2 py-0.5 rounded-full">
            Premium
          </span>
        )}
      </h3>
      <p className="text-muted-foreground mb-4 flex-grow">{description}</p>
      {soon ? (
        <Button variant="outline" disabled className="w-full">
          Bientôt disponible
        </Button>
      ) : (
        <Link to={to} className="w-full">
          <Button className="w-full group">
            Accéder
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      )}
    </CardContent>
  </Card>
);

export default Tools;
