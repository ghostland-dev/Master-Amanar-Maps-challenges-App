
import { Users, BarChart2, ShieldCheck } from "lucide-react";

const WhySection = () => {
  return (
    <div className="mt-24 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-16">
        Pourquoi choisir <span className="text-gradient">FinQuest</span> ?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="flex flex-col items-center">
          <div className="mb-5 h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Communauté active</h3>
          <p className="text-muted-foreground">
            Rejoignez des milliers d'utilisateurs qui partagent leurs stratégies et s'entraident mutuellement.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="mb-5 h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <BarChart2 className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Progression mesurable</h3>
          <p className="text-muted-foreground">
            Suivez votre évolution avec des statistiques détaillées et des indicateurs de performance clairs.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="mb-5 h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <ShieldCheck className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Contenus vérifiés</h3>
          <p className="text-muted-foreground">
            Des experts financiers valident tous nos challenges et ressources pour garantir leur qualité.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhySection;
