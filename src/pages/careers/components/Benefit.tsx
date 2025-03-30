
import React from "react";

type BenefitProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const Benefit: React.FC<BenefitProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-4">
    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
      {React.cloneElement(icon as React.ReactElement, { className: "h-6 w-6 text-primary" })}
    </div>
    <h3 className="font-semibold mb-1">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default Benefit;
