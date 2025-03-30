
import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, TrendingUp, CheckCircle, Clock, Calendar, ArrowRight, BookOpen, Target, Zap, Gem, BarChart2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import ProgressBar from "@/components/ProgressBar";
import ChallengeCard from "@/components/ChallengeCard";
import { fadeIn, slideIn } from "@/lib/animations";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Dashboard = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const challengesRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (statsRef.current) fadeIn(statsRef.current);
    if (progressRef.current) slideIn(progressRef.current, 'right');
    if (challengesRef.current) slideIn(challengesRef.current, 'up');
    if (overviewRef.current) fadeIn(overviewRef.current);
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

  const recommendedChallenges = [
    {
      id: "3",
      title: "Création d'une boutique Etsy",
      description: "Lancez votre boutique Etsy et vendez vos créations en ligne.",
      category: "Revenus",
      icon: <Gem className="h-6 w-6 text-primary" />,
      difficulty: "beginner" as const,
      duration: "21 jours",
      xp: 350,
      progress: 0,
    },
    {
      id: "4",
      title: "Campagne d'Affiliation Réussie",
      description: "Générez vos premiers revenus passifs grâce à l'affiliation.",
      category: "Marketing",
      icon: <Zap className="h-6 w-6 text-primary" />,
      difficulty: "intermediate" as const,
      duration: "28 jours",
      xp: 400,
      progress: 0,
    },
  ];

  const recentActivity = [
    { date: "Aujourd'hui", action: "Challenge démarré", target: "Première vente en Dropshipping", type: "challenge" },
    { date: "Hier", action: "Ressource terminée", target: "Investir en bourse pour débutants", type: "library" },
    { date: "Il y a 3 jours", action: "Badge obtenu", target: "Investisseur Débutant", type: "badge" },
    { date: "Il y a 5 jours", action: "Simulateur utilisé", target: "Calculateur de ROI Publicitaire", type: "simulator" },
  ];

  const upcomingMilestones = [
    { title: "Terminer le challenge Dropshipping", xp: 150, progress: 65 },
    { title: "Atteindre 1500 XP", xp: 250, progress: 83 },
    { title: "Obtenir le badge Investisseur Intermédiaire", xp: 200, progress: 30 },
  ];

  const learningPathProgress = [
    { path: "E-commerce", progress: 45 },
    { path: "Investissement", progress: 70 },
    { path: "Marketing Digital", progress: 20 },
    { path: "Crypto", progress: 35 },
  ];

  return (
    <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-8">
      {/* Vue d'ensemble */}
      <div ref={overviewRef} className="mb-10">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold">Bonjour, Thomas 👋</h2>
              <p className="text-muted-foreground">Voici votre progression financière cette semaine</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" asChild>
                <Link to="/goals">
                  <Target className="h-4 w-4 mr-2" />
                  Définir un objectif
                </Link>
              </Button>
              <Button asChild>
                <Link to="/challenges">
                  <Zap className="h-4 w-4 mr-2" />
                  Démarrer un challenge
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="glass hover:shadow-md transition-all">
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

      {/* Activité récente et Prochains jalons */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <Card className="glass lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Activité récente</span>
              <Button variant="ghost" size="sm" className="text-xs" asChild>
                <Link to="/activity">
                  Voir tout <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Détail</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.map((activity, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-muted-foreground">{activity.date}</TableCell>
                    <TableCell>{activity.action}</TableCell>
                    <TableCell className="flex items-center">
                      <Badge 
                        variant="outline" 
                        className={`mr-2 ${
                          activity.type === 'challenge' ? 'text-green-500' :
                          activity.type === 'library' ? 'text-blue-500' :
                          activity.type === 'badge' ? 'text-amber-500' :
                          'text-purple-500'
                        }`}
                      >
                        {activity.type}
                      </Badge>
                      {activity.target}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card className="glass">
          <CardHeader>
            <CardTitle>Prochains objectifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingMilestones.map((milestone, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{milestone.title}</span>
                    <span className="text-muted-foreground">+{milestone.xp} XP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={milestone.progress} className="h-2 flex-1" />
                    <span className="text-xs text-muted-foreground">{milestone.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pt-0">
            <Button variant="outline" size="sm" asChild>
              <Link to="/goals">
                Voir tous mes objectifs
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Progress */}
      <div ref={progressRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <Card className="glass lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Progression générale</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs" asChild>
              <Link to="/statistics">
                <BarChart2 className="h-4 w-4 mr-1" />
                Voir les statistiques détaillées
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <ProgressBar 
              label="Progression globale" 
              value={37} 
              max={100} 
              size="lg" 
            />
            
            <Separator />
            
            <div>
              <h4 className="text-sm font-medium mb-3">Parcours d'apprentissage</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {learningPathProgress.map((path, i) => (
                  <ProgressBar 
                    key={i}
                    label={path.path} 
                    value={path.progress} 
                    max={100} 
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass">
          <CardHeader>
            <CardTitle>Bibliothèque</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-4">
              <div className="mx-auto h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">3 ressources en cours</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Continuez votre apprentissage pour gagner des XP et améliorer vos compétences
              </p>
              <div className="flex items-center justify-center text-sm text-muted-foreground mb-4">
                <Clock className="mr-1 h-4 w-4" />
                <span>Temps estimé: 45 minutes</span>
              </div>
              <Button className="w-full" asChild>
                <Link to="/library">
                  Continuer l'apprentissage
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* En cours */}
      <div ref={challengesRef}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-medium">Challenges en cours</h3>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/challenges?view=progress">
              Voir tous mes challenges <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {inProgressChallenges.map((challenge) => (
            <div key={challenge.id}>
              <ChallengeCard 
                {...challenge}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Challenges recommandés */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-medium">Challenges recommandés</h3>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/challenges">
              Découvrir plus de challenges <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendedChallenges.map((challenge) => (
            <div key={challenge.id}>
              <ChallengeCard 
                {...challenge}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
