
import React from "react";

interface StatCardProps {
  value: string;
  label: string;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, description }) => (
  <div className="bg-secondary/20 p-6 rounded-lg text-center">
    <p className="text-4xl font-bold text-primary">{value}</p>
    <h3 className="text-xl font-semibold mt-2 mb-1">{label}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default StatCard;
