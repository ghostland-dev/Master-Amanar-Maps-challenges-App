
import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const Events = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  
  // Filter events based on selected date
  const filteredEvents = date 
    ? eventsData.filter(event => 
        new Date(event.date).toDateString() === date.toDateString()
      )
    : eventsData;
  
  // Get upcoming and past events
  const now = new Date();
  const upcomingEvents = eventsData.filter(event => new Date(event.date) >= now);
  const pastEvents = eventsData.filter(event => new Date(event.date) < now);

  return (
    <MainLayout title="Événements" description="Découvrez nos webinaires, ateliers et rencontres">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Événements</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Participez à nos webinaires, ateliers et rencontres pour développer vos compétences 
            et échanger avec notre communauté d'entrepreneurs.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <div className="sticky top-20">
                <div className="bg-card rounded-lg p-6 mb-6">
                  <h2 className="text-lg font-semibold mb-4">Calendrier</h2>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, 'PPP', { locale: fr }) : "Filtrer par date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                      {date && (
                        <div className="p-2 border-t">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="w-full"
                            onClick={() => setDate(undefined)}
                          >
                            Effacer la sélection
                          </Button>
                        </div>
                      )}
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="bg-card rounded-lg p-6">
                  <h2 className="text-lg font-semibold mb-4">Restez informé</h2>
                  <p className="text-muted-foreground text-sm mb-4">
                    Inscrivez-vous à notre newsletter pour recevoir les annonces 
                    de nos prochains événements.
                  </p>
                  <Button className="w-full">
                    S'inscrire à la newsletter
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="lg:w-2/3">
              <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="upcoming">À venir</TabsTrigger>
                  <TabsTrigger value="past">Passés</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upcoming">
                  {upcomingEvents.length > 0 ? (
                    <div className="space-y-6">
                      {upcomingEvents.map(event => (
                        <EventCard 
                          key={event.id} 
                          event={event} 
                          isPast={false} 
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">Aucun événement à venir pour le moment.</p>
                      <p className="text-sm">Consultez notre calendrier régulièrement pour ne pas manquer nos prochains événements.</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="past">
                  {pastEvents.length > 0 ? (
                    <div className="space-y-6">
                      {pastEvents.map(event => (
                        <EventCard 
                          key={event.id} 
                          event={event} 
                          isPast={true} 
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Aucun événement passé.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

// Event Card Component
interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: "webinar" | "workshop" | "meetup";
  image: string;
  capacity: number;
  registrations: number;
  premium: boolean;
}

const EventCard = ({ event, isPast }: { event: Event; isPast: boolean }) => {
  const formattedDate = format(new Date(event.date), 'EEEE d MMMM yyyy', { locale: fr });
  
  return (
    <div className={cn(
      "border border-border rounded-lg overflow-hidden flex flex-col md:flex-row",
      isPast && "opacity-75"
    )}>
      <div className="md:w-1/4 h-48 md:h-auto relative">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute top-3 left-3">
          <Badge className={cn(
            "capitalize",
            event.type === "webinar" ? "bg-blue-500" : 
            event.type === "workshop" ? "bg-green-500" : "bg-purple-500"
          )}>
            {event.type}
          </Badge>
        </div>
        {event.premium && (
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="bg-yellow-500/20 text-yellow-700 border-yellow-500">
              Premium
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
        <p className="text-muted-foreground mb-4">{event.description}</p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-auto">
          <div className="flex items-center text-sm">
            <CalendarIcon className="h-4 w-4 mr-2 text-primary" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-primary" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            <span>{event.location}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {event.registrations}/{event.capacity} participants
            </span>
          </div>
          
          {isPast ? (
            <Link to={`/events/${event.id}`}>
              <Button variant="outline">
                Voir le résumé
              </Button>
            </Link>
          ) : (
            <Link to={`/events/${event.id}`}>
              <Button>
                S'inscrire
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

// Mock data for events
const eventsData: Event[] = [
  {
    id: 1,
    title: "Webinaire: Comment lancer son business en affiliation",
    description: "Découvrez les stratégies efficaces pour démarrer et développer votre activité d'affiliation en ligne sans budget initial.",
    date: "2023-12-15",
    time: "19:00 - 20:30",
    location: "En ligne",
    type: "webinar",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2532&auto=format&fit=crop",
    capacity: 100,
    registrations: 78,
    premium: false
  },
  {
    id: 2,
    title: "Atelier pratique: Créer sa première boutique Shopify",
    description: "Un atelier hands-on pour mettre en place votre boutique e-commerce de A à Z avec les meilleures pratiques.",
    date: "2023-12-18",
    time: "14:00 - 17:00",
    location: "En ligne",
    type: "workshop",
    image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=2574&auto=format&fit=crop",
    capacity: 50,
    registrations: 43,
    premium: true
  },
  {
    id: 3,
    title: "Meetup entrepreneurs digitaux à Paris",
    description: "Rencontrez d'autres entrepreneurs et échangez sur vos projets dans une ambiance conviviale.",
    date: "2023-12-20",
    time: "18:30 - 21:00",
    location: "Paris",
    type: "meetup",
    image: "https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=2670&auto=format&fit=crop",
    capacity: 30,
    registrations: 27,
    premium: false
  },
  {
    id: 4,
    title: "Webinaire: Tendances crypto et NFT pour 2024",
    description: "Analyse des tendances émergentes dans l'écosystème crypto et NFT avec des opportunités à saisir pour 2024.",
    date: "2023-12-28",
    time: "19:00 - 20:30",
    location: "En ligne",
    type: "webinar",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2832&auto=format&fit=crop",
    capacity: 200,
    registrations: 132,
    premium: false
  },
  {
    id: 5,
    title: "Atelier avancé: Optimisation des campagnes Facebook Ads",
    description: "Techniques avancées pour améliorer le ROAS de vos campagnes publicitaires sur Facebook et Instagram.",
    date: "2023-11-25",
    time: "14:00 - 16:00",
    location: "En ligne",
    type: "workshop",
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=2670&auto=format&fit=crop",
    capacity: 50,
    registrations: 50,
    premium: true
  },
  {
    id: 6,
    title: "Meetup Copy et Rédaction Web à Lyon",
    description: "Une soirée dédiée aux techniques de copywriting efficace et à la rédaction web qui convertit.",
    date: "2023-11-10",
    time: "18:30 - 21:00",
    location: "Lyon",
    type: "meetup",
    image: "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=2670&auto=format&fit=crop",
    capacity: 30,
    registrations: 28,
    premium: false
  }
];

export default Events;
