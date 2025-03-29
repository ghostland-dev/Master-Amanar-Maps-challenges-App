
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Play, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

interface ChallengeProps {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  progress: number;
  totalSteps: number;
  currentStep: number;
  completed: boolean;
  xpReward: number;
  image?: string;
}

interface ProfileChallengesProps {
  userId: string;
}

// Mock challenges data with Pexels images
const mockChallenges: ChallengeProps[] = [
  {
    id: "c1",
    title: "Budget mensuel optimal",
    description: "Apprenez à créer et gérer un budget mensuel efficace",
    category: "Budget",
    difficulty: "Débutant",
    progress: 100,
    totalSteps: 5,
    currentStep: 5,
    completed: true,
    xpReward: 500,
    image: "https://images.pexels.com/photos/4475523/pexels-photo-4475523.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    id: "c2",
    title: "Épargne d'urgence",
    description: "Découvrez comment constituer une épargne de sécurité",
    category: "Épargne",
    difficulty: "Débutant",
    progress: 60,
    totalSteps: 5,
    currentStep: 3,
    completed: false,
    xpReward: 450,
    image: "https://images.pexels.com/photos/6289065/pexels-photo-6289065.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    id: "c3",
    title: "Premiers pas en bourse",
    description: "Initiez-vous aux investissements en bourse",
    category: "Investissement",
    difficulty: "Intermédiaire",
    progress: 40,
    totalSteps: 8,
    currentStep: 3,
    completed: false,
    xpReward: 750,
    image: "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    id: "c4",
    title: "Remboursement de dettes",
    description: "Stratégies pour rembourser efficacement vos dettes",
    category: "Dettes",
    difficulty: "Débutant",
    progress: 100,
    totalSteps: 4,
    currentStep: 4,
    completed: true,
    xpReward: 400,
    image: "https://images.pexels.com/photos/5849577/pexels-photo-5849577.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
];

export function ProfileChallenges({ userId }: ProfileChallengesProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [challenges, setChallenges] = useState<ChallengeProps[]>([]);
  const [completedChallenges, setCompletedChallenges] = useState<ChallengeProps[]>([]);
  const [activeChallenges, setActiveChallenges] = useState<ChallengeProps[]>([]);
  
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setChallenges(mockChallenges);
      setCompletedChallenges(mockChallenges.filter(challenge => challenge.completed));
      setActiveChallenges(mockChallenges.filter(challenge => !challenge.completed));
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [userId]);
  
  // Difficulty color mapping
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "débutant": return "bg-green-500";
      case "intermédiaire": return "bg-yellow-500";
      case "avancé": return "bg-red-500";
      default: return "bg-blue-500";
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mes Challenges</CardTitle>
        <CardDescription>
          Suivez votre progression sur les challenges financiers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active">
          <TabsList className="mb-4 grid grid-cols-2">
            <TabsTrigger value="active">
              En cours ({activeChallenges.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Complétés ({completedChallenges.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <Skeleton className="h-5 w-40 mb-2" />
                        <Skeleton className="h-4 w-60" />
                      </div>
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <Skeleton className="h-2 w-full mt-4" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {activeChallenges.length > 0 ? (
                  activeChallenges.map((challenge) => (
                    <div key={challenge.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex">
                          {/* Challenge thumbnail */}
                          <div className="w-12 h-12 rounded overflow-hidden mr-3 shrink-0">
                            <img 
                              src={challenge.image || "https://images.pexels.com/photos/6802049/pexels-photo-6802049.jpeg?auto=compress&cs=tinysrgb&w=300"}
                              alt={challenge.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-base">{challenge.title}</h4>
                            <p className="text-sm text-muted-foreground">{challenge.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline">{challenge.category}</Badge>
                              <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
                            </div>
                          </div>
                        </div>
                        <Link to={`/challenge/${challenge.id}`}>
                          <Button size="sm">
                            <Play className="h-4 w-4 mr-2" /> Continuer
                          </Button>
                        </Link>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progression</span>
                          <span>{challenge.currentStep}/{challenge.totalSteps} étapes</span>
                        </div>
                        <Progress value={challenge.progress} className="h-2" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">Vous n'avez pas encore de challenges en cours</p>
                    <Link to="/challenges">
                      <Button>
                        Découvrir les challenges
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <Skeleton className="h-5 w-40 mb-2" />
                        <Skeleton className="h-4 w-60" />
                      </div>
                      <Skeleton className="h-6 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {completedChallenges.length > 0 ? (
                  completedChallenges.map((challenge) => (
                    <div key={challenge.id} className="border rounded-lg p-4 bg-muted/30">
                      <div className="flex justify-between items-start">
                        <div className="flex">
                          {/* Challenge thumbnail */}
                          <div className="w-12 h-12 rounded overflow-hidden mr-3 shrink-0">
                            <img 
                              src={challenge.image || "https://images.pexels.com/photos/5849577/pexels-photo-5849577.jpeg?auto=compress&cs=tinysrgb&w=300"}
                              alt={challenge.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-base flex items-center">
                              {challenge.title}
                              <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                            </h4>
                            <p className="text-sm text-muted-foreground">{challenge.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline">{challenge.category}</Badge>
                              <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
                              <Badge variant="secondary">+{challenge.xpReward} XP</Badge>
                            </div>
                          </div>
                        </div>
                        <Link to={`/challenge/${challenge.id}`}>
                          <Button variant="outline" size="sm">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">Vous n'avez pas encore complété de challenges</p>
                    <Link to="/challenges">
                      <Button>
                        Découvrir les challenges
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
