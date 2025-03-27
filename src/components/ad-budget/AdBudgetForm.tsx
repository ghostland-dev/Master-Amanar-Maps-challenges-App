
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronsUpDown, Calculator, RefreshCw, Database } from "lucide-react";

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
  onIndustryTypeChange: (value: string) => void;
  onIncludeOrganicChange: (checked: boolean) => void;
  onConversionChange: (value: number[]) => void;
  onAOVChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdvancedOpenChange: (open: boolean) => void;
  onCalculate: () => void;
  onReset: () => void;
  onClearSavedData: () => void;
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
  onReset,
  onClearSavedData
}: AdBudgetFormProps) => {
  return (
    <Card className="shadow-lg">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="monthly-revenue">Revenu mensuel (€)</Label>
            <Input
              id="monthly-revenue"
              type="number"
              value={monthlyRevenue}
              onChange={onMonthlyRevenueChange}
              min={0}
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>ROAS cible (Retour sur dépense publicitaire)</Label>
              <span className="text-sm text-muted-foreground">{targetROAS}x</span>
            </div>
            <Slider
              value={[targetROAS]}
              min={1}
              max={10}
              step={0.1}
              onValueChange={onROASChange}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1x</span>
              <span>5x</span>
              <span>10x</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Secteur d'activité</Label>
            <Select
              value={industryType}
              onValueChange={onIndustryTypeChange}
            >
              <SelectTrigger id="industry">
                <SelectValue placeholder="Sélectionnez un secteur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ecommerce">E-commerce</SelectItem>
                <SelectItem value="saas">SaaS</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="services">Services</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="include-organic" className="cursor-pointer">
              Inclure trafic organique
            </Label>
            <Switch
              id="include-organic"
              checked={includeOrganic}
              onCheckedChange={onIncludeOrganicChange}
            />
          </div>

          <Collapsible
            open={isAdvancedOpen}
            onOpenChange={onAdvancedOpenChange}
            className="space-y-4"
          >
            <CollapsibleTrigger asChild>
              <div className="flex items-center cursor-pointer py-2 hover:text-primary transition-colors">
                <span className="text-sm font-medium flex-1">Paramètres avancés</span>
                <ChevronsUpDown className="h-4 w-4" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Taux de conversion (%)</Label>
                  <span className="text-sm text-muted-foreground">{conversionRate}%</span>
                </div>
                <Slider
                  value={[conversionRate]}
                  min={0.1}
                  max={10}
                  step={0.1}
                  onValueChange={onConversionChange}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0.1%</span>
                  <span>5%</span>
                  <span>10%</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="aov">Valeur de commande moyenne (€)</Label>
                <Input
                  id="aov"
                  type="number"
                  value={averageOrderValue}
                  onChange={onAOVChange}
                  min={0}
                  className="text-lg"
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="flex space-x-2 w-full">
          <Button
            onClick={onCalculate}
            className="flex-1"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculer
          </Button>
          <Button
            variant="outline"
            onClick={onReset}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Réinitialiser
          </Button>
        </div>
        
        <Button
          variant="ghost"
          onClick={onClearSavedData}
          className="w-full text-muted-foreground hover:text-destructive"
        >
          <Database className="mr-2 h-4 w-4" />
          Effacer les données sauvegardées
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdBudgetForm;
