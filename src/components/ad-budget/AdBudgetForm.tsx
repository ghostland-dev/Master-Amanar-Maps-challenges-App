
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { BarChart, DollarSign, RefreshCw } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface AdBudgetFormProps {
  monthlyRevenue: number;
  targetROAS: number;
  industryType: string;
  includeOrganic: boolean;
  conversionRate: number;
  averageOrderValue: number;
  isAdvancedOpen: boolean;
  onMonthlyRevenueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onROASChange: (value: number[]) => void;
  onIndustryTypeChange: (type: string) => void;
  onIncludeOrganicChange: (checked: boolean) => void;
  onConversionChange: (value: number[]) => void;
  onAOVChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdvancedOpenChange: (open: boolean) => void;
  onCalculate: () => void;
  onReset: () => void;
}

const AdBudgetForm = ({
  monthlyRevenue,
  targetROAS,
  industryType,
  includeOrganic,
  conversionRate,
  averageOrderValue,
  isAdvancedOpen,
  onMonthlyRevenueChange,
  onROASChange,
  onIndustryTypeChange,
  onIncludeOrganicChange,
  onConversionChange,
  onAOVChange,
  onAdvancedOpenChange,
  onCalculate,
  onReset
}: AdBudgetFormProps) => {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart className="mr-2 h-5 w-5 text-primary" />
          Simulateur de budget publicitaire
        </CardTitle>
        <CardDescription>
          Calculez le budget marketing optimal pour atteindre vos objectifs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="monthlyRevenue">Chiffre d'affaires mensuel</Label>
          <div className="relative">
            <Input
              id="monthlyRevenue"
              type="number"
              min="0"
              step="1000"
              value={monthlyRevenue}
              onChange={onMonthlyRevenueChange}
              className="pl-8"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="targetROAS">Objectif de ROAS (Retour sur dépense publicitaire)</Label>
            <span className="text-sm font-medium">{targetROAS}x</span>
          </div>
          <Slider
            id="targetROAS"
            min={1}
            max={10}
            step={0.5}
            value={[targetROAS]}
            onValueChange={onROASChange}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1x (Équilibre)</span>
            <span>5x (Objectif)</span>
            <span>10x (Ambitieux)</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="industryType">Type d'industrie</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant={industryType === "ecommerce" ? "default" : "outline"}
              className="justify-start"
              onClick={() => onIndustryTypeChange("ecommerce")}
            >
              E-commerce
            </Button>
            <Button
              type="button"
              variant={industryType === "saas" ? "default" : "outline"}
              className="justify-start"
              onClick={() => onIndustryTypeChange("saas")}
            >
              SaaS / Tech
            </Button>
            <Button
              type="button"
              variant={industryType === "retail" ? "default" : "outline"}
              className="justify-start"
              onClick={() => onIndustryTypeChange("retail")}
            >
              Retail / Commerce
            </Button>
            <Button
              type="button"
              variant={industryType === "services" ? "default" : "outline"}
              className="justify-start"
              onClick={() => onIndustryTypeChange("services")}
            >
              Services
            </Button>
          </div>
        </div>
        
        <Collapsible
          open={isAdvancedOpen}
          onOpenChange={onAdvancedOpenChange}
          className="border rounded-md p-1"
        >
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between">
              Paramètres avancés
              <span className="text-xs">{isAdvancedOpen ? "▲" : "▼"}</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 pt-2 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="conversionRate">Taux de conversion (%)</Label>
                <span className="text-sm font-medium">{conversionRate}%</span>
              </div>
              <Slider
                id="conversionRate"
                min={0.5}
                max={10}
                step={0.5}
                value={[conversionRate]}
                onValueChange={onConversionChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="averageOrderValue">Valeur moyenne de commande</Label>
              <div className="relative">
                <Input
                  id="averageOrderValue"
                  type="number"
                  min="0"
                  step="5"
                  value={averageOrderValue}
                  onChange={onAOVChange}
                  className="pl-8"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeOrganic"
                checked={includeOrganic}
                onCheckedChange={(checked) => onIncludeOrganicChange(checked as boolean)}
              />
              <Label htmlFor="includeOrganic" className="text-sm">
                Inclure trafic organique dans les projections
              </Label>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button onClick={onCalculate} className="flex-1">
            Calculer
          </Button>
          <Button variant="outline" onClick={onReset} className="flex-1">
            <RefreshCw className="mr-2 h-4 w-4" /> Réinitialiser
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdBudgetForm;
