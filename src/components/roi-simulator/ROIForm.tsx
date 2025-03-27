
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, RefreshCw } from "lucide-react";
import { slideIn } from "@/lib/animations";

interface ROIFormProps {
  onCalculate: (investmentAmount: number, returnsAmount: number, timePeriod: number) => void;
}

const ROIForm = ({ onCalculate }: ROIFormProps) => {
  const [investment, setInvestment] = useState(1000);
  const [revenue, setRevenue] = useState(1500);
  const [costs, setCosts] = useState(200);
  const [period, setPeriod] = useState("month");
  
  const handleInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvestment(parseFloat(e.target.value) || 0);
  };
  
  const handleRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRevenue(parseFloat(e.target.value) || 0);
  };
  
  const handleCostsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCosts(parseFloat(e.target.value) || 0);
  };
  
  const calculateResults = () => {
    const returns = revenue - costs;
    const timePeriod = period === "month" ? 12 : 
                      period === "quarter" ? 4 : 
                      period === "week" ? 52 : 
                      period === "day" ? 365 : 
                      period === "year" ? 1 : 12;
    
    onCalculate(investment, returns, timePeriod);
  };
  
  const reset = () => {
    setInvestment(1000);
    setRevenue(1500);
    setCosts(200);
    setPeriod("month");
  };

  return (
    <Card className="glass transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calculator className="mr-2 h-5 w-5 text-primary" />
          Simulateur de ROI
        </CardTitle>
        <CardDescription>
          Calculez le retour sur investissement de votre projet
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="investment">Investissement initial</Label>
          <div className="relative">
            <Input
              id="investment"
              type="number"
              min="0"
              step="100"
              value={investment}
              onChange={handleInvestmentChange}
              className="pl-8 transition-all hover:border-primary focus:border-primary"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="revenue">Revenus générés</Label>
          <div className="relative">
            <Input
              id="revenue"
              type="number"
              min="0"
              step="100"
              value={revenue}
              onChange={handleRevenueChange}
              className="pl-8 transition-all hover:border-primary focus:border-primary"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="costs">Coûts opérationnels</Label>
          <div className="relative">
            <Input
              id="costs"
              type="number"
              min="0"
              step="50"
              value={costs}
              onChange={handleCostsChange}
              className="pl-8 transition-all hover:border-primary focus:border-primary"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="period">Période</Label>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger id="period" className="transition-all hover:border-primary focus:border-primary">
              <SelectValue placeholder="Sélectionnez une période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Journalier</SelectItem>
              <SelectItem value="week">Hebdomadaire</SelectItem>
              <SelectItem value="month">Mensuel</SelectItem>
              <SelectItem value="quarter">Trimestriel</SelectItem>
              <SelectItem value="year">Annuel</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button onClick={calculateResults} className="flex-1 transition-all hover:shadow-md">
            Calculer
          </Button>
          <Button variant="outline" onClick={reset} className="flex-1">
            <RefreshCw className="mr-2 h-4 w-4" /> Réinitialiser
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ROIForm;
