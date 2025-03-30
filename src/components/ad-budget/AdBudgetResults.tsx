
import { ArrowDownToLine, BarChart3, Search, Share2, BrainCircuit } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface AdBudgetResultsProps {
  recommendedBudget: number;
  percentageOfRevenue: number;
  estimatedROI: number;
  projectedRevenue: number;
  conversionRate: number;
  targetROAS: number;
  averageOrderValue: number;
  breakdown: {
    search: number;
    social: number;
    display: number;
  };
  formatCurrency: (value: number) => string;
  onExportPdf: () => void;
}

const AdBudgetResults = ({
  recommendedBudget,
  percentageOfRevenue,
  estimatedROI,
  projectedRevenue,
  conversionRate,
  targetROAS,
  averageOrderValue,
  breakdown,
  formatCurrency,
  onExportPdf,
}: AdBudgetResultsProps) => {
  const chartData = [
    { name: "Moteurs de recherche", value: breakdown.search, color: "#0EA5E9" },
    { name: "Réseaux sociaux", value: breakdown.social, color: "#8B5CF6" },
    { name: "Display & autres", value: breakdown.display, color: "#10B981" },
  ];

  return (
    <div className="space-y-6">
      <Alert className="bg-blue-50 border-blue-200 mb-4">
        <div className="flex items-center">
          <BrainCircuit className="h-4 w-4 text-blue-600 mr-2" />
          <AlertDescription className="text-blue-700">
            Vos calculs sont automatiquement sauvegardés et seront disponibles lors de votre prochaine visite.
          </AlertDescription>
        </div>
      </Alert>
      
      <Card className="shadow-lg">
        <CardHeader className="bg-primary-50 dark:bg-primary-950/20">
          <CardTitle className="text-2xl">Budget publicitaire recommandé</CardTitle>
          <CardDescription>Basé sur vos paramètres d'entrée</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-center my-4">
            <p className="text-4xl font-bold text-primary mb-2">{formatCurrency(recommendedBudget)}</p>
            <p className="text-muted-foreground">par mois ({percentageOfRevenue.toFixed(1)}% du revenu)</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-muted/30 p-4 rounded-lg text-center">
              <h4 className="text-sm font-medium text-muted-foreground mb-1">ROI Estimé</h4>
              <p className="text-2xl font-bold">{estimatedROI.toFixed(1)}x</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg text-center">
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Revenu Projeté</h4>
              <p className="text-2xl font-bold">{formatCurrency(projectedRevenue)}</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-medium text-lg mb-4">Répartition du budget</h3>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-full sm:w-1/2 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="w-full sm:w-1/2 space-y-3">
                {chartData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="font-medium">{formatCurrency(item.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
            <h3 className="font-medium">Facteurs d'influence</h3>
            <div className="text-sm grid grid-cols-2 gap-2">
              <div>
                <p className="text-muted-foreground">Taux de conversion</p>
                <p className="font-medium">{conversionRate}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">ROAS cible</p>
                <p className="font-medium">{targetROAS}x</p>
              </div>
              <div>
                <p className="text-muted-foreground">Valeur moyenne</p>
                <p className="font-medium">{formatCurrency(averageOrderValue)}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-2 border-t p-4">
          <Button
            variant="outline"
            onClick={onExportPdf}
            className="gap-2"
          >
            <ArrowDownToLine className="h-4 w-4" />
            Exporter en PDF
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdBudgetResults;
