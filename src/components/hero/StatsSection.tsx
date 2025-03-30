
import { useEffect, useRef } from "react";
import { slideIn } from "@/lib/animations";

const StatsSection = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (statsRef.current) slideIn(statsRef.current, 'up');
  }, []);

  return (
    <div ref={statsRef} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      <div className="text-center p-3">
        <div className="text-3xl font-bold text-primary">12k+</div>
        <div className="text-sm text-muted-foreground mt-1">Utilisateurs actifs</div>
      </div>
      <div className="text-center p-3">
        <div className="text-3xl font-bold text-primary">85+</div>
        <div className="text-sm text-muted-foreground mt-1">Challenges financiers</div>
      </div>
      <div className="text-center p-3">
        <div className="text-3xl font-bold text-primary">95%</div>
        <div className="text-sm text-muted-foreground mt-1">Taux de satisfaction</div>
      </div>
      <div className="text-center p-3">
        <div className="text-3xl font-bold text-primary">3.2M€</div>
        <div className="text-sm text-muted-foreground mt-1">Générés par nos utilisateurs</div>
      </div>
    </div>
  );
};

export default StatsSection;
