
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calculator, RefreshCw, Heart } from "lucide-react";

interface MarginCalculatorFormProps {
  sellingPrice: number;
  costPrice: number;
  marginType: string;
  onSellingPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCostPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMarginTypeChange: (value: string) => void;
  onCalculate: () => void;
  onReset: () => void;
}

const MarginCalculatorForm = ({
  sellingPrice,
  costPrice,
  marginType,
  onSellingPriceChange,
  onCostPriceChange,
  onMarginTypeChange,
  onCalculate,
  onReset
}: MarginCalculatorFormProps) => {
  return (
    <div>
      <Card className="glass border border-primary/10 hover:border-primary/20 shadow-sm hover:shadow-md transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="mr-2 h-5 w-5 text-primary" />
            Calculateur de marge
          </CardTitle>
          <CardDescription>
            Calculez votre marge bénéficiaire et votre taux de marge
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="sellingPrice">Prix de vente</Label>
            <div className="relative">
              <Input
                id="sellingPrice"
                type="number"
                min="0"
                step="1"
                value={sellingPrice}
                onChange={onSellingPriceChange}
                className="pl-8 transition-all hover:border-primary focus:border-primary"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="costPrice">Coût de revient</Label>
            <div className="relative">
              <Input
                id="costPrice"
                type="number"
                min="0"
                step="1"
                value={costPrice}
                onChange={onCostPriceChange}
                className="pl-8 transition-all hover:border-primary focus:border-primary"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="marginType">Type de marge</Label>
            <Select value={marginType} onValueChange={onMarginTypeChange}>
              <SelectTrigger id="marginType" className="transition-all hover:border-primary focus:border-primary">
                <SelectValue placeholder="Sélectionnez un type de marge" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percent">Marge en pourcentage</SelectItem>
                <SelectItem value="amount">Marge en montant</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button onClick={onCalculate} className="flex-1 transition-all hover:shadow-md">
              Calculer
            </Button>
            <Button variant="outline" onClick={onReset} className="flex-1">
              <RefreshCw className="mr-2 h-4 w-4" /> Réinitialiser
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p className="flex items-center justify-center">
          <Heart className="mr-1 h-4 w-4 text-red-500" />
          Développé pour vous aider à optimiser votre stratégie de prix
        </p>
      </div>
    </div>
  );
};

export default MarginCalculatorForm;
