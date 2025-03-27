
import { ArrowUp, ArrowDown, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  growth?: number;
  icon: LucideIcon;
  timeRange?: string;
}

export const StatCard = ({ title, value, growth, icon: Icon, timeRange = "month" }: StatCardProps) => {
  return (
    <Card className="glass hover-lift">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            {growth !== undefined && (
              <div className="flex items-center mt-1 text-sm">
                <span className={growth >= 0 ? "text-green-500" : "text-red-500"}>
                  {growth >= 0 ? <ArrowUp className="h-3 w-3 inline mr-1" /> : <ArrowDown className="h-3 w-3 inline mr-1" />}
                  {Math.abs(growth)}%
                </span>
                <span className="text-muted-foreground ml-1">vs {timeRange === "month" ? "dernier mois" : "période précédente"}</span>
              </div>
            )}
          </div>
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
