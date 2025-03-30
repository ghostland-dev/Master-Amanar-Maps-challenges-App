
import React from "react";
import { motion } from "framer-motion";

interface StatFeatureProps {
  value: string;
  label: string;
  description: string;
  delay?: number;
}

const StatFeature: React.FC<StatFeatureProps> = ({ 
  value, 
  label, 
  description, 
  delay = 0 
}) => (
  <motion.div 
    className="bg-secondary/20 p-6 rounded-lg text-center"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: delay * 0.2, duration: 0.4 }}
  >
    <p className="text-4xl font-bold text-primary">{value}</p>
    <h3 className="text-xl font-semibold mt-2 mb-1">{label}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </motion.div>
);

export default StatFeature;
