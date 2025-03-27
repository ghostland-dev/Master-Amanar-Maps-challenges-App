
import React, { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { animateNumber } from "@/lib/animations";

interface ResultCardProps {
  title: string;
  value: number | string;
  suffix?: string;
  prefix?: string;
  colorClass?: string;
  formatter?: (value: number) => string;
  delay?: number;
  animate?: boolean;
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
}: ResultCardProps) => {
  const valueRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (valueRef.current && typeof value === 'number' && animate) {
      animateNumber(valueRef.current, 0, value, 1, (v) => `${prefix}${formatter(v)}${suffix}`);
    }
  }, [value, formatter, prefix, suffix, animate]);
  
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
