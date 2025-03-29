
import React, { useRef } from "react";
import { Card } from "@/components/ui/card";

interface ResultCardProps {
  title: string;
  value: number | string;
  suffix?: string;
  prefix?: string;
  colorClass?: string;
  formatter?: (value: number) => string;
  delay?: number;
  animate?: boolean;
  variant?: string;
}

const ResultCard = ({
  title,
  value,
  suffix = "",
  prefix = "",
  colorClass = "text-primary",
  formatter = (v) => v.toFixed(2),
  delay = 0,
  animate = true,
  variant,
}: ResultCardProps) => {
  const valueRef = useRef<HTMLDivElement>(null);
  
  // Map variant to colorClass if variant is provided
  if (variant) {
    switch (variant) {
      case "primary":
        colorClass = "text-primary";
        break;
      case "success":
        colorClass = "text-green-600";
        break;
      case "danger":
        colorClass = "text-red-600";
        break;
      // Add more variants as needed
    }
  }
  
  return (
    <Card className="p-4 text-center border-border/40 hover:border-border/60 transition-colors duration-300 hover:shadow-sm bg-card/40">
      <div className="text-sm text-muted-foreground mb-1">{title}</div>
      <div
        ref={valueRef}
        className={`text-xl font-bold ${colorClass}`}
      >
        {typeof value === 'number' 
          ? `${prefix}${formatter(value)}${suffix}` 
          : `${prefix}${value}${suffix}`}
      </div>
    </Card>
  );
};

export default ResultCard;
