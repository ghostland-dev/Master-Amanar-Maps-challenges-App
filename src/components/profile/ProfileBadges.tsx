
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

// Mock badges data with Pexels images
const mockBadges: BadgeProps[] = [
  {
    id: "b1",
    name: "Débutant financier",
    description: "Terminer son premier challenge",
    image: "https://images.pexels.com/photos/2422278/pexels-photo-2422278.jpeg?auto=compress&cs=tinysrgb&w=300",
    awardedAt: "2023-06-15T10:30:00Z",
    category: "challenge"
  },
  {
    id: "b2",
    name: "Économiseur",
    description: "Compléter le challenge d'épargne",
    image: "https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg?auto=compress&cs=tinysrgb&w=300",
    awardedAt: "2023-07-22T14:45:00Z",
    category: "finance"
  },
  {
    id: "b3",
    name: "Analyste en herbe",
    description: "Utiliser tous les simulateurs",
    image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=300",
    awardedAt: "2023-08-10T09:15:00Z",
    category: "simulator"
  },
  {
    id: "b4",
    name: "Investisseur avisé",
    description: "Compléter 3 challenges d'investissement",
    image: "https://images.pexels.com/photos/6802049/pexels-photo-6802049.jpeg?auto=compress&cs=tinysrgb&w=300",
    category: "finance"
  },
  {
    id: "b5",
    name: "Apprenti constant",
    description: "Consulter 10 articles dans la bibliothèque",
    image: "https://images.pexels.com/photos/4490129/pexels-photo-4490129.jpeg?auto=compress&cs=tinysrgb&w=300",
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
                    <div className="h-16 w-16 mb-3 rounded-full overflow-hidden">
                      <img src={badge.image} alt={badge.name} className="w-full h-full object-cover" />
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
                    <div className="h-16 w-16 mb-3 rounded-full overflow-hidden relative">
                      <img src={badge.image} alt={badge.name} className="w-full h-full object-cover filter grayscale" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <svg className="h-8 w-8 text-white opacity-70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M7 11V7C7 5.93913 7.42143 4.92172 8.17157 4.17157C8.92172 3.42143 9.93913 3 11 3H13C14.0609 3 15.0783 3.42143 15.8284 4.17157C16.5786 4.92172 17 5.93913 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
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
