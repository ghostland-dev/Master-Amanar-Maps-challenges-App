
import { ReactNode } from "react";

interface ResultCardProps {
  title: string;
  value: string | number;
  description: string;
  isPositive?: boolean;
  prefix?: string;
  suffix?: string;
}

const ResultCard = ({
  title,
  value,
  description,
  isPositive,
  prefix,
  suffix
}: ResultCardProps) => {
  // Determine text color based on isPositive (only if provided)
  const valueColor = isPositive !== undefined
    ? isPositive ? 'text-green-600' : 'text-red-600'
    : '';

  // Format display value if needed
  const displayValue = typeof value === 'number' 
    ? value.toFixed(2)
    : value;

  return (
    <div className="bg-secondary/50 p-4 rounded-lg text-center hover:shadow-sm transition-all">
      <h3 className="text-sm text-muted-foreground font-medium mb-1">{title}</h3>
      <p className={`text-3xl font-bold ${valueColor}`}>
        {prefix}{displayValue}{suffix}
      </p>
      <p className="text-xs text-muted-foreground mt-1">
        {description}
      </p>
    </div>
  );
};

export default ResultCard;
