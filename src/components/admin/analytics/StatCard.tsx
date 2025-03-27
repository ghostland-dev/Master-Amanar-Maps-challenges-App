
import { ArrowUp, ArrowDown, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type TimeRange = "day" | "week" | "month" | "year";

export interface StatCardProps {
  title: string;
  value: string | number;
  growth?: number;
  icon: LucideIcon;
  timeRange?: TimeRange;
  description?: string;
  className?: string;
  iconClassName?: string;
  valueClassName?: string;
  variant?: "default" | "outline" | "glass";
}

export const StatCard = ({ 
  title, 
  value, 
  growth, 
  icon: Icon, 
  timeRange = "month", 
  description,
  className,
  iconClassName,
  valueClassName,
  variant = "default"
}: StatCardProps) => {
  const getTimeRangeText = () => {
    switch (timeRange) {
      case "day": return "dernier jour";
      case "week": return "dernière semaine";
      case "year": return "dernière année";
      default: return "dernier mois";
    }
  };
  
  const cardStyles = {
    default: "hover:shadow-md transition-all duration-300",
    outline: "border border-border hover:shadow-md transition-all duration-300",
    glass: "bg-white/80 backdrop-blur-md border border-white/20 shadow-sm hover:shadow-md transition-all duration-300"
  };

  return (
    <Card className={cn(cardStyles[variant], className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <h3 className={cn("text-2xl font-bold", valueClassName)}>{value}</h3>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
            {growth !== undefined && (
              <div className="flex items-center mt-1 text-sm">
                <span className={growth >= 0 ? "text-green-500" : "text-red-500"}>
                  {growth >= 0 ? <ArrowUp className="h-3 w-3 inline mr-1" /> : <ArrowDown className="h-3 w-3 inline mr-1" />}
                  {Math.abs(growth)}%
                </span>
                <span className="text-muted-foreground ml-1">vs {getTimeRangeText()}</span>
              </div>
            )}
          </div>
          <div className={cn("h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center", iconClassName)}>
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
