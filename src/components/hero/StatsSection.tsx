
import { useEffect, useRef } from "react";
import { slideIn } from "@/lib/animations";
import { BarChart2, Users, Award, TrendingUp } from "lucide-react";

const StatsSection = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (statsRef.current) slideIn(statsRef.current, 'up');
  }, []);

  const stats = [
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      value: "12k+",
      label: "Utilisateurs actifs"
    },
    {
      icon: <BarChart2 className="h-6 w-6 text-primary" />,
      value: "85+",
      label: "Challenges financiers"
    },
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      value: "95%",
      label: "Taux de satisfaction"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      value: "3.2M€",
      label: "Générés par nos utilisateurs"
    }
  ];

  return (
    <div ref={statsRef} className="mt-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="bg-gradient-to-br from-background/50 to-secondary/20 backdrop-blur-sm 
                      border border-primary/10 hover:border-primary/20 rounded-xl p-6 text-center
                      transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              {stat.icon}
            </div>
            <div className="text-3xl font-bold text-primary">{stat.value}</div>
            <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
