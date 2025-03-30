
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, MapPin, Users, ExternalLink, Share2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface EventSpeaker {
  id: number;
  name: string;
  title: string;
  avatar: string;
  bio: string;
}

interface EventSession {
  id: number;
  title: string;
  description: string;
  speaker: EventSpeaker;
  time: string;
  duration: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  type: "online" | "physical" | "hybrid";
  category: string;
  image: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  address?: string;
  meetingLink?: string;
  capacity: number;
  registrations: number;
  price: number | "gratuit";
  speakers: EventSpeaker[];
  sessions: EventSession[];
  isFeatured: boolean;
}

// Données fictives pour les événements
const events: Event[] = [
  {
    id: 1,
    title: "Masterclass Affiliation Amazon",
    description: `
      <p>Rejoignez notre masterclass exclusive pour découvrir les stratégies avancées d'affiliation Amazon qui fonctionnent en 2023.</p>
      
      <p>L'affiliation Amazon reste l'une des méthodes les plus accessibles pour générer des revenus passifs en ligne, mais la concurrence est de plus en plus rude. Dans cette masterclass, nos experts partageront avec vous des stratégies qui ont fait leurs preuves pour se démarquer et maximiser vos commissions.</p>
      
      <h3>Ce que vous allez apprendre :</h3>
      <ul>
        <li>Comment identifier des niches rentables et peu compétitives</li>
        <li>Les techniques SEO spécifiques pour les sites d'affiliation Amazon</li>
        <li>Stratégies avancées de monétisation pour augmenter votre taux de conversion</li>
        <li>Comment créer du contenu qui convertit sans violer les règles d'Amazon</li>
        <li>Utilisation de l'IA pour optimiser et automatiser votre processus de création de contenu</li>
      </ul>
      
      <p>Cette masterclass est idéale pour les débutants qui souhaitent éviter les erreurs coûteuses, ainsi que pour les affiliés expérimentés cherchant à optimiser leurs résultats actuels.</p>
      
      <p>Le nombre de places est limité pour garantir des interactions de qualité et répondre à toutes vos questions.</p>
    `,
    shortDescription: "Découvrez les stratégies avancées d'affiliation Amazon qui fonctionnent en 2023 lors de cette masterclass exclusive.",
    type: "online",
    category: "Affiliation",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop",
    date: "2023-12-15",
    startTime: "19:00",
    endTime: "21:00",
    location: "Zoom",
    meetingLink: "https://zoom.us/j/123456789",
    capacity: 100,
    registrations: 67,
    price: 47,
    isFeatured: true,
    speakers: [
      {
        id: 1,
        name: "Alexandre Martin",
        title: "Expert en Affiliation Amazon",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        bio: "Alexandre a généré plus de 500 000€ de commissions d'affiliation Amazon en 3 ans. Il partage désormais ses stratégies avec des entrepreneurs motivés."
      },
      {
        id: 2,
        name: "Sophie Bernard",
        title: "Spécialiste SEO",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        bio: "Sophie aide les sites d'affiliation à dominer les résultats de recherche Google. Son expertise en SEO a permis à des dizaines de clients d'atteindre la première page."
      }
    ],
    sessions: [
      {
        id: 1,
        title: "Introduction à l'affiliation Amazon en 2023",
        description: "État des lieux, opportunités et défis actuels",
        speaker: {
          id: 1,
          name: "Alexandre Martin",
          title: "Expert en Affiliation Amazon",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          bio: "Alexandre a généré plus de 500 000€ de commissions d'affiliation Amazon en 3 ans. Il partage désormais ses stratégies avec des entrepreneurs motivés."
        },
        time: "19:00",
        duration: "30 min"
      },
      {
        id: 2,
        title: "Stratégies SEO pour dominer les niches d'affiliation",
        description: "Techniques d'optimisation spécifiques aux sites d'affiliation",
        speaker: {
          id: 2,
          name: "Sophie Bernard",
          title: "Spécialiste SEO",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          bio: "Sophie aide les sites d'affiliation à dominer les résultats de recherche Google. Son expertise en SEO a permis à des dizaines de clients d'atteindre la première page."
        },
        time: "19:30",
        duration: "45 min"
      },
      {
        id: 3,
        title: "Automatisation et scaling avec l'IA",
        description: "Utiliser l'intelligence artificielle pour développer votre business d'affiliation",
        speaker: {
          id: 1,
          name: "Alexandre Martin",
          title: "Expert en Affiliation Amazon",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          bio: "Alexandre a généré plus de 500 000€ de commissions d'affiliation Amazon en 3 ans. Il partage désormais ses stratégies avec des entrepreneurs motivés."
        },
        time: "20:15",
        duration: "30 min"
      },
      {
        id: 4,
        title: "Session Q&R",
        description: "Réponses à toutes vos questions",
        speaker: {
          id: 1,
          name: "Alexandre Martin",
          title: "Expert en Affiliation Amazon",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          bio: "Alexandre a généré plus de 500 000€ de commissions d'affiliation Amazon en 3 ans. Il partage désormais ses stratégies avec des entrepreneurs motivés."
        },
        time: "20:45",
        duration: "15 min"
      }
    ]
  }
];

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    // Dans un cas réel, nous ferions une requête API
    setLoading(true);
    
    setTimeout(() => {
      const eventId = Number(id);
      const foundEvent = events.find(e => e.id === eventId);
      
      if (foundEvent) {
        setEvent(foundEvent);
        document.title = `${foundEvent.title} | Événements Amanar Map`;
      } else {
        toast({
          title: "Événement non trouvé",
          description: "L'événement que vous recherchez n'existe pas ou a été supprimé.",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 300);
  }, [id, toast]);
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast({
        title: "Lien copié",
        description: "Le lien de l'événement a été copié dans le presse-papier",
        variant: "default",
      });
    });
  };
  
  const handleRegister = () => {
    toast({
      title: "Inscription enregistrée",
      description: "Votre inscription à l'événement a été confirmée. Vous recevrez un email avec tous les détails.",
      variant: "default",
    });
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-4 max-w-md"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-2">
              <div className="h-60 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
            </div>
            <div>
              <div className="h-60 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!event) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Événement non trouvé</h1>
          <p className="mb-6">L'événement que vous recherchez n'existe pas ou a été supprimé.</p>
          <Button asChild>
            <Link to="/events">Voir tous les événements</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  // Formater la date
  const formattedDate = new Date(event.date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Calculer le pourcentage d'inscriptions
  const registrationPercentage = (event.registrations / event.capacity) * 100;
  
  return (
    <MainLayout title={event.title} description={event.shortDescription}>
      <div className="container mx-auto px-4 py-12">
        {/* Navigation */}
        <div className="mb-8">
          <Link to="/events" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux événements
          </Link>
        </div>
        
        {/* Grid layout pour le détail de l'événement */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2">
            {/* Image et titre */}
            <div className="mb-6">
              <div className="relative mb-4">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-72 object-cover rounded-lg"
                />
                {event.isFeatured && (
                  <Badge className="absolute top-4 right-4 bg-primary">
                    Événement à la une
                  </Badge>
                )}
              </div>
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">{event.title}</h1>
                <Button variant="ghost" size="icon" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <Badge variant="outline" className="bg-secondary/30">
                  {event.category}
                </Badge>
                <Badge variant="outline" className="bg-secondary/30">
                  {event.type === 'online' ? 'En ligne' : event.type === 'physical' ? 'Présentiel' : 'Hybride'}
                </Badge>
              </div>
            </div>
            
            {/* Informations de l'événement */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center p-4 bg-muted/30 rounded-lg">
                <Calendar className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{formattedDate}</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-muted/30 rounded-lg">
                <Clock className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Horaire</p>
                  <p className="font-medium">{event.startTime} - {event.endTime}</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-muted/30 rounded-lg">
                <MapPin className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Lieu</p>
                  <p className="font-medium">{event.location}</p>
                  {event.address && <p className="text-xs text-muted-foreground">{event.address}</p>}
                </div>
              </div>
              <div className="flex items-center p-4 bg-muted/30 rounded-lg">
                <Users className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Participants</p>
                  <p className="font-medium">{event.registrations} / {event.capacity}</p>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">À propos de cet événement</h2>
              <div 
                className="prose max-w-none" 
                dangerouslySetInnerHTML={{ __html: event.description }}
              />
            </div>
            
            {/* Programme */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Programme</h2>
              <div className="space-y-4">
                {event.sessions.map((session) => (
                  <div key={session.id} className="border border-border rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">{session.title}</h3>
                      <span className="text-sm text-muted-foreground">{session.time} ({session.duration})</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{session.description}</p>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={session.speaker.avatar} />
                        <AvatarFallback>{session.speaker.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{session.speaker.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Intervenants */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Intervenants</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {event.speakers.map((speaker) => (
                  <div key={speaker.id} className="flex space-x-4 p-4 bg-muted/30 rounded-lg">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={speaker.avatar} />
                      <AvatarFallback>{speaker.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{speaker.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{speaker.title}</p>
                      <p className="text-sm">{speaker.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="border border-border rounded-lg p-6 mb-6">
                <h3 className="font-semibold mb-2">Réservez votre place</h3>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{event.registrations} inscrits</span>
                    <span>{event.capacity - event.registrations} places restantes</span>
                  </div>
                  <Progress value={registrationPercentage} className="h-2" />
                </div>
                <div className="mb-4">
                  <p className="text-lg font-bold mb-1">
                    {event.price === "gratuit" ? "Gratuit" : `${event.price}€`}
                  </p>
                  {typeof event.price === "number" && (
                    <p className="text-xs text-muted-foreground">TVA incluse</p>
                  )}
                </div>
                <Button className="w-full mb-3" onClick={handleRegister}>
                  S'inscrire maintenant
                </Button>
                {event.type === "online" && event.meetingLink && (
                  <a 
                    href={event.meetingLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center text-sm text-muted-foreground hover:text-primary"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Lien de l'événement
                  </a>
                )}
              </div>
              
              <div className="border border-border rounded-lg p-6">
                <h3 className="font-semibold mb-4">Vous avez des questions ?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Contactez-nous pour toute question concernant cet événement.
                </p>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/contact">
                    Nous contacter
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EventDetail;
