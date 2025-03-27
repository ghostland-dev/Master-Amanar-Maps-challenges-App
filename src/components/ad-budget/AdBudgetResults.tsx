
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, Download } from "lucide-react";

interface BudgetBreakdown {
  search: number;
  social: number;
  display: number;
}

interface AdBudgetResultsProps {
  recommendedBudget: number;
  percentageOfRevenue: number;
  estimatedROI: number;
  projectedRevenue: number;
  breakdown: BudgetBreakdown;
  conversionRate: number;
  targetROAS: number;
  averageOrderValue: number;
  formatCurrency: (value: number) => string;
  onExportPdf: () => void;
}

const AdBudgetResults = ({
  recommendedBudget,
  percentageOfRevenue,
  estimatedROI,
  projectedRevenue,
  breakdown,
  conversionRate,
  targetROAS,
  averageOrderValue,
  formatCurrency,
  onExportPdf
}: AdBudgetResultsProps) => {
  return (
    <Card className="glass">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <ArrowRightLeft className="mr-2 h-5 w-5 text-primary" />
            Budget recommandé
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            className="hover:bg-primary/10"
            onClick={onExportPdf}
          >
            <Download className="h-4 w-4 mr-2" />
            Exporter PDF
          </Button>
        </div>
        <CardDescription>
          Basé sur votre industrie et vos objectifs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-secondary/50 p-4 rounded-lg text-center">
            <h3 className="text-sm text-muted-foreground font-medium mb-1">Budget mensuel</h3>
            <p className="text-3xl font-bold text-primary">
              {formatCurrency(recommendedBudget)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {percentageOfRevenue.toFixed(1)}% du chiffre d'affaires
            </p>
          </div>
          
          <div className="bg-secondary/50 p-4 rounded-lg text-center">
            <h3 className="text-sm text-muted-foreground font-medium mb-1">ROAS estimé</h3>
            <p className="text-3xl font-bold text-green-600">
              {estimatedROI.toFixed(1)}x
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Retour sur dépense publicitaire
            </p>
          </div>
          
          <div className="bg-secondary/50 p-4 rounded-lg text-center">
            <h3 className="text-sm text-muted-foreground font-medium mb-1">CA projeté</h3>
            <p className="text-3xl font-bold text-green-600">
              {formatCurrency(projectedRevenue)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Généré par les campagnes
            </p>
          </div>
          
          <div className="bg-secondary/50 p-4 rounded-lg text-center">
            <h3 className="text-sm text-muted-foreground font-medium mb-1">CPA estimé</h3>
            <p className="text-3xl font-bold">
              {formatCurrency(averageOrderValue / targetROAS)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Coût par acquisition
            </p>
          </div>
        </div>
        
        <BudgetBreakdownSection 
          breakdown={breakdown} 
          recommendedBudget={recommendedBudget} 
          formatCurrency={formatCurrency} 
        />
        
        <RecommendationsSection 
          percentageOfRevenue={percentageOfRevenue} 
          targetROAS={targetROAS} 
          conversionRate={conversionRate} 
        />
      </CardContent>
    </Card>
  );
};

interface BudgetBreakdownSectionProps {
  breakdown: BudgetBreakdown;
  recommendedBudget: number;
  formatCurrency: (value: number) => string;
}

const BudgetBreakdownSection = ({ 
  breakdown, 
  recommendedBudget, 
  formatCurrency 
}: BudgetBreakdownSectionProps) => {
  return (
    <div className="bg-primary/5 p-4 rounded-lg">
      <h3 className="text-sm font-medium mb-2">Répartition du budget</h3>
      <div className="space-y-3">
        <ChannelBreakdown 
          label="Search (SEA, Google Ads)" 
          amount={breakdown.search} 
          total={recommendedBudget} 
          formatCurrency={formatCurrency} 
          color="bg-blue-500" 
        />
        
        <ChannelBreakdown 
          label="Social (Facebook, Instagram)" 
          amount={breakdown.social} 
          total={recommendedBudget} 
          formatCurrency={formatCurrency} 
          color="bg-purple-500" 
        />
        
        <ChannelBreakdown 
          label="Display et autres canaux" 
          amount={breakdown.display} 
          total={recommendedBudget} 
          formatCurrency={formatCurrency} 
          color="bg-green-500" 
        />
      </div>
    </div>
  );
};

interface ChannelBreakdownProps {
  label: string;
  amount: number;
  total: number;
  formatCurrency: (value: number) => string;
  color: string;
}

const ChannelBreakdown = ({ 
  label, 
  amount, 
  total, 
  formatCurrency, 
  color 
}: ChannelBreakdownProps) => {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span className="font-medium">{formatCurrency(amount)}</span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full`} 
          style={{ width: `${(amount / total) * 100}%` }} 
        />
      </div>
    </div>
  );
};

interface RecommendationsSectionProps {
  percentageOfRevenue: number;
  targetROAS: number;
  conversionRate: number;
}

const RecommendationsSection = ({ 
  percentageOfRevenue, 
  targetROAS, 
  conversionRate 
}: RecommendationsSectionProps) => {
  return (
    <div className="bg-primary/5 p-4 rounded-lg">
      <h3 className="text-sm font-medium mb-2">Conseils personnalisés</h3>
      <ul className="text-sm text-muted-foreground space-y-2">
        {percentageOfRevenue > 20 && (
          <li>• Votre budget est assez élevé. Assurez-vous d'avoir une stratégie d'attribution solide pour optimiser chaque canal.</li>
        )}
        {percentageOfRevenue < 5 && (
          <li>• Votre budget est conservateur. Vous pourriez manquer des opportunités de croissance. Envisagez des tests d'augmentation progressive.</li>
        )}
        {targetROAS > 5 && (
          <li>• Votre objectif de ROAS est ambitieux. Concentrez-vous sur des mots-clés à forte intention d'achat et un remarketing efficace.</li>
        )}
        {conversionRate < 2 && (
          <li>• Votre taux de conversion est faible. Travaillez sur l'optimisation de votre site avant d'investir davantage en publicité.</li>
        )}
      </ul>
    </div>
  );
};

export default AdBudgetResults;
