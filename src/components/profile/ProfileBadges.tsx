
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

interface BadgeProps {
  id: string;
  name: string;
  description: string;
  image: string;
  awardedAt?: string;
  category: string;
}

interface ProfileBadgesProps {
  userId: string;
}

// Mock badges data
const mockBadges: BadgeProps[] = [
  {
    id: "b1",
    name: "Débutant financier",
    description: "Terminer son premier challenge",
    image: "/badges/beginner.svg",
    awardedAt: "2023-06-15T10:30:00Z",
    category: "challenge"
  },
  {
    id: "b2",
    name: "Économiseur",
    description: "Compléter le challenge d'épargne",
    image: "/badges/saver.svg",
    awardedAt: "2023-07-22T14:45:00Z",
    category: "finance"
  },
  {
    id: "b3",
    name: "Analyste en herbe",
    description: "Utiliser tous les simulateurs",
    image: "/badges/analyst.svg",
    awardedAt: "2023-08-10T09:15:00Z",
    category: "simulator"
  },
  {
    id: "b4",
    name: "Investisseur avisé",
    description: "Compléter 3 challenges d'investissement",
    image: "/badges/investor.svg",
    category: "finance"
  },
  {
    id: "b5",
    name: "Apprenti constant",
    description: "Consulter 10 articles dans la bibliothèque",
    image: "/badges/learner.svg",
    category: "library"
  },
];

export function ProfileBadges({ userId }: ProfileBadgesProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [badges, setBadges] = useState<BadgeProps[]>([]);
  const [unlockedBadges, setUnlockedBadges] = useState<BadgeProps[]>([]);
  const [lockedBadges, setLockedBadges] = useState<BadgeProps[]>([]);
  
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setBadges(mockBadges);
      setUnlockedBadges(mockBadges.filter(badge => badge.awardedAt));
      setLockedBadges(mockBadges.filter(badge => !badge.awardedAt));
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [userId]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Badges et Récompenses</CardTitle>
        <CardDescription>
          Suivez votre collection de badges et découvrez les prochaines récompenses à débloquer
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="unlocked">
          <TabsList className="mb-4 grid grid-cols-2">
            <TabsTrigger value="unlocked">
              Débloqués ({unlockedBadges.length})
            </TabsTrigger>
            <TabsTrigger value="locked">
              À débloquer ({lockedBadges.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="unlocked">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center p-4 rounded-lg border">
                    <Skeleton className="h-16 w-16 rounded-full mb-3" />
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {unlockedBadges.map((badge) => (
                  <div key={badge.id} className="flex flex-col items-center p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                    <div className="h-16 w-16 mb-3 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {/* Icon placeholder - replace with actual badge images */}
                      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 15.5C14.21 15.5 16 13.71 16 11.5V6C16 3.79 14.21 2 12 2C9.79 2 8 3.79 8 6V11.5C8 13.71 9.79 15.5 12 15.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4.34998 9.6499V11.3499C4.34998 15.5699 7.77998 18.9999 12 18.9999C16.22 18.9999 19.65 15.5699 19.65 11.3499V9.6499" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 19V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h4 className="font-medium text-sm mb-1">{badge.name}</h4>
                    <p className="text-xs text-muted-foreground text-center">{badge.description}</p>
                    <div className="mt-2 text-xs text-primary">
                      {badge.awardedAt && new Date(badge.awardedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="locked">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center p-4 rounded-lg border">
                    <Skeleton className="h-16 w-16 rounded-full mb-3" />
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {lockedBadges.map((badge) => (
                  <div key={badge.id} className="flex flex-col items-center p-4 rounded-lg border bg-muted/30 opacity-70">
                    <div className="h-16 w-16 mb-3 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                      {/* Icon placeholder with lock icon */}
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 11V7C7 5.93913 7.42143 4.92172 8.17157 4.17157C8.92172 3.42143 9.93913 3 11 3H13C14.0609 3 15.0783 3.42143 15.8284 4.17157C16.5786 4.92172 17 5.93913 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h4 className="font-medium text-sm mb-1">{badge.name}</h4>
                    <p className="text-xs text-muted-foreground text-center">{badge.description}</p>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
