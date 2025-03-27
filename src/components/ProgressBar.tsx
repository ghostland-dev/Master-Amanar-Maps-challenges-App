
import { useEffect, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { animateNumber } from "@/lib/animations";

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  size?: "sm" | "md" | "lg";
  showPercentage?: boolean;
  animate?: boolean;
  className?: string;
}

const ProgressBar = ({
  value,
  max,
  label,
  size = "md",
  showPercentage = true,
  animate = true,
  className = "",
}: ProgressBarProps) => {
  const percentage = Math.round((value / max) * 100);
  const percentRef = useRef<HTMLSpanElement>(null);
  
  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3"
  };
  
  useEffect(() => {
    if (animate && percentRef.current) {
      animateNumber(percentRef.current, 0, percentage, 1);
    }
  }, [percentage, animate]);

  return (
    <div className={`space-y-1.5 ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between text-sm">
          {label && <span className="text-muted-foreground">{label}</span>}
          {showPercentage && (
            <span ref={percentRef} className="font-medium">
              {percentage}%
            </span>
          )}
        </div>
      )}
      <Progress value={percentage} className={sizeClasses[size]} />
    </div>
  );
};

export default ProgressBar;
