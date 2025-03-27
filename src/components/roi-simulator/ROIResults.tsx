
import React, { useEffect, useRef } from "react";
import { ArrowUpRight, ArrowDownRight, CalendarDays, LineChart } from "lucide-react";
import ResultCard from "./ResultCard";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipItem,
  BarChart,
} from "@/components/ui/chart";

interface ROIResultsProps {
  investment: number;
  returns: number;
  period: number;
  roi: number;
  monthlyROI: number;
}

const ROIResults = ({ 
  investment, 
  returns, 
  period, 
  roi, 
  monthlyROI 
}: ROIResultsProps) => {
  const profit = returns - investment;
  const isProfit = profit > 0;
  const chartRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const formatPercent = (value: number) => {
    return value.toFixed(2);
  };
  
  const chartData = Array.from({ length: period }).map((_, i) => {
    const monthlyProfit = profit / period;
    const currentValue = investment + (monthlyProfit * (i + 1));
    return {
      name: `M${i + 1}`,
      Investissement: investment,
      Valeur: Math.round(currentValue),
    };
  });
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ResultCard 
          title="Investissement" 
          value={investment} 
          formatter={v => formatCurrency(v)} 
          colorClass="text-foreground"
          delay={0}
        />
        
        <ResultCard 
          title="Retour Final" 
          value={returns} 
          formatter={v => formatCurrency(v)} 
          colorClass={isProfit ? "text-green-500" : "text-red-500"}
          delay={0.2}
        />
        
        <ResultCard 
          title="ROI" 
          value={roi} 
          suffix="%" 
          formatter={formatPercent} 
          colorClass={isProfit ? "text-green-500" : "text-red-500"}
          delay={0.4}
        />
        
        <ResultCard 
          title="ROI Mensuel" 
          value={monthlyROI} 
          suffix="%" 
          formatter={formatPercent} 
          colorClass={isProfit ? "text-green-500" : "text-red-500"}
          delay={0.6}
        />
      </div>
      
      <Card className="overflow-hidden border-border/50 hover:shadow-sm transition-all duration-300">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-medium">Évolution de l'investissement</CardTitle>
              <CardDescription>Sur {period} mois</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {isProfit ? (
                <div className="flex items-center text-sm font-medium text-green-500">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>+{formatCurrency(profit)}</span>
                </div>
              ) : (
                <div className="flex items-center text-sm font-medium text-red-500">
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                  <span>{formatCurrency(profit)}</span>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <div ref={chartRef} className="h-[200px] w-full">
            <ChartContainer>
              <Chart id="roi-chart" config={{
                grid: { color: "var(--primary)" },
                investment: { color: "var(--muted)" },
                value: { color: "var(--primary)" },
              }}>
                <ChartTooltip>
                  <ChartTooltipItem name="Investissement" color="investment" />
                  <ChartTooltipItem name="Valeur" color="value" />
                </ChartTooltip>
                <BarChart 
                  data={chartData}
                  categories={["Valeur"]}
                  index="name"
                  colors={["var(--primary)"]}
                  stack={false}
                  valueFormatter={(value) => formatCurrency(value)}
                  layout={isDesktop ? "vertical" : "horizontal"}
                />
              </Chart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ROIResults;
