
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
  delay?: number;
}

const StepCard: React.FC<StepCardProps> = ({ 
  number, 
  title, 
  description, 
  icon, 
  delay = 0 
}) => (
  <motion.div 
    className="bg-card border border-border rounded-lg p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: delay * 0.2, duration: 0.5 }}
  >
    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold mb-4">
      {number}
    </div>
    <Badge variant="secondary" className="mb-2">Étape {number}</Badge>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
    {icon && (
      <div className="mt-4 text-primary">
        {icon}
      </div>
    )}
  </motion.div>
);

export default StepCard;
