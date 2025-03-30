
import React from "react";
import { Check, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CommissionItemProps {
  percentage: string;
  description: string;
}

const CommissionItem: React.FC<CommissionItemProps> = ({ percentage, description }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center">
      <Check className="h-5 w-5 text-primary mr-2" />
      <span>{description}</span>
    </div>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center">
            <span className="font-bold">{percentage}</span>
            <HelpCircle className="h-4 w-4 ml-1 text-muted-foreground" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Commission calculée sur le montant HT</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
);

export default CommissionItem;
