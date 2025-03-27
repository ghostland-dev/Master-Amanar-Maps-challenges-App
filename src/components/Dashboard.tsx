
import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, TrendingUp, CheckCircle, Clock, Calendar } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";
import ChallengeCard from "@/components/ChallengeCard";
import { fadeIn, slideIn } from "@/lib/animations";

const Dashboard = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const challengesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (statsRef.current) fadeIn(statsRef.current);
    if (progressRef.current) slideIn(progressRef.current, 'right');
    if (challengesRef.current) slideIn(challengesRef.current, 'up');
  }, []);

  // Données factices
  const stats = [
    { title: "XP Total", value: "1,250", icon: <Award className="h-6 w-6 text-primary" /> },
    { title: "ROI Moyen", value: "+27%", icon: <TrendingUp className="h-6 w-6 text-primary" /> },
    { title: "Challenges Complétés", value: "5", icon: <CheckCircle className="h-6 w-6 text-primary" /> },
    { title: "Jours d'activité", value: "24", icon: <Calendar className="h-6 w-6 text-primary" /> },
  ];

  const inProgressChallenges = [
    {
      id: "1",
      title: "Première vente en Dropshipping",
      description: "Lancez votre première boutique en ligne et réalisez une vente en dropshipping.",
      category: "E-commerce",
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      difficulty: "beginner" as const,
      duration: "14 jours",
      xp: 300,
      progress: 65,
    },
    {
      id: "2",
      title: "Portfolio Crypto Diversifié",
      description: "Créez et gérez un portefeuille diversifié de cryptomonnaies.",
      category: "Crypto",
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      difficulty: "intermediate" as const,
      duration: "30 jours",
      xp: 450,
      progress: 25,
    },
  ];

  return (
    <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-8">
      {/* Stats */}
      <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="glass">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <h4 className="text-2xl font-bold mt-1">{stat.value}</h4>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress */}
      <div ref={progressRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <Card className="glass lg:col-span-2">
          <CardHeader>
            <CardTitle>Progression générale</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ProgressBar 
              label="Progression globale" 
              value={37} 
              max={100} 
              size="lg" 
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <ProgressBar 
                label="E-commerce" 
                value={65} 
                max={100} 
              />
              <ProgressBar 
                label="Crypto" 
                value={25} 
                max={100} 
              />
              <ProgressBar 
                label="Affiliation" 
                value={10} 
                max={100} 
              />
              <ProgressBar 
                label="Marketing" 
                value={45} 
                max={100} 
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass">
          <CardHeader>
            <CardTitle>Prochain objectif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-4">
              <div className="mx-auto h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Terminer le challenge Dropshipping</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Il vous reste 5 étapes pour compléter ce challenge
              </p>
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                <span>Echéance estimée: 5 jours</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* En cours */}
      <div ref={challengesRef}>
        <h3 className="text-xl font-medium mb-4">Challenges en cours</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {inProgressChallenges.map((challenge) => (
            <ChallengeCard 
              key={challenge.id}
              {...challenge}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
