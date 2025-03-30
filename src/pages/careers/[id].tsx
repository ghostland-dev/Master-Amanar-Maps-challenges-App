
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Briefcase, MapPin, Banknote, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Label } from "@/components/ui/label";

// Types et données
interface CareerPosition {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  salary?: string;
  department: string;
  postedDate: string;
  icon: React.ComponentType<any>;
}

// Données de carrières (devrait être récupérées depuis une API)
import { Code, Briefcase as BriefcaseIcon } from "lucide-react";

const careerPositions: CareerPosition[] = [
  {
    id: "content-creator",
    title: "Créateur de contenu",
    description: "Nous recherchons un créateur de contenu passionné pour développer des challenges et tutoriels de qualité.",
    location: "À distance",
    type: "Temps plein",
    icon: BriefcaseIcon,
    department: "Marketing",
    postedDate: "2023-10-15",
    salary: "40 000 € - 50 000 € par an",
    responsibilities: [
      "Créer du contenu éducatif engageant pour notre plateforme",
      "Développer des challenges pratiques dans divers domaines du business en ligne",
      "Rédiger des articles de blog et tutoriels",
      "Collaborer avec l'équipe marketing pour optimiser la visibilité du contenu",
      "Analyser les métriques d'engagement pour améliorer continuellement la qualité du contenu",
      "Rester à jour sur les dernières tendances du marketing digital et de l'entrepreneuriat en ligne"
    ],
    requirements: [
      "Expérience pratique dans l'entrepreneuriat digital (e-commerce, affiliation, copywriting, etc.)",
      "Excellentes compétences rédactionnelles",
      "Capacité à expliquer des concepts complexes de manière simple",
      "Passionné par l'éducation et la transmission de connaissances",
      "Autonomie et capacité à travailler en remote",
      "Portfolio de contenus créés précédemment (articles, vidéos, challenges)"
    ]
  },
  {
    id: "frontend-developer",
    title: "Développeur Frontend",
    description: "Rejoignez notre équipe technique pour créer des expériences utilisateur exceptionnelles.",
    location: "À distance",
    type: "Temps plein",
    icon: Code,
    department: "Technique",
    postedDate: "2023-11-05",
    salary: "45 000 € - 60 000 € par an",
    responsibilities: [
      "Développer et maintenir l'interface de notre plateforme web",
      "Collaborer avec les designers pour implémenter des maquettes fidèles",
      "Optimiser la performance et l'accessibilité du site",
      "Participer à l'architecture technique des nouvelles fonctionnalités",
      "Effectuer des tests et assurer la qualité du code",
      "Travailler en méthode agile avec l'équipe de développement"
    ],
    requirements: [
      "Expérience avec React et TypeScript",
      "Compétences en CSS (Tailwind CSS est un plus)",
      "Sensibilité au design et à l'expérience utilisateur",
      "Capacité à travailler de manière autonome dans un environnement remote",
      "Connaissance des bonnes pratiques de développement web moderne",
      "Portfolio de projets ou contributions open source"
    ]
  }
];

// Définir le formulaire de candidature avec zod
const formSchema = z.object({
  fullName: z.string().min(2, "Le nom complet doit contenir au moins 2 caractères"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  phone: z.string().min(10, "Veuillez entrer un numéro de téléphone valide"),
  coverLetter: z.string().min(50, "La lettre de motivation doit contenir au moins 50 caractères"),
  portfolio: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
});

const CareerDetail = () => {
  const { id } = useParams();
  const [position, setPosition] = useState<CareerPosition | null>(null);
  const [loading, setLoading] = useState(true);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      coverLetter: "",
      portfolio: "",
      linkedin: "",
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    // Dans un cas réel, nous ferions une requête API
    setLoading(true);
    
    setTimeout(() => {
      const foundPosition = careerPositions.find(pos => pos.id === id);
      if (foundPosition) {
        setPosition(foundPosition);
        document.title = `${foundPosition.title} | Carrières Amanar Map`;
      } else {
        toast({
          title: "Poste non trouvé",
          description: "Le poste que vous recherchez n'existe pas ou a été supprimé.",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 300);
  }, [id, toast]);

  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérifier le format du fichier (PDF, DOC, DOCX)
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Format non supporté",
          description: "Veuillez télécharger votre CV au format PDF, DOC ou DOCX.",
          variant: "destructive",
        });
        return;
      }
      
      // Vérifier la taille du fichier (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Fichier trop volumineux",
          description: "La taille du fichier ne doit pas dépasser 5MB.",
          variant: "destructive",
        });
        return;
      }
      
      setCvFile(file);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!cvFile) {
      toast({
        title: "CV manquant",
        description: "Veuillez télécharger votre CV pour compléter votre candidature.",
        variant: "destructive",
      });
      return;
    }

    // Ici, nous simulons l'envoi du formulaire
    console.log("Candidature soumise :", { ...values, cvFile });
    
    toast({
      title: "Candidature soumise avec succès",
      description: "Nous avons bien reçu votre candidature et reviendrons vers vous rapidement.",
      variant: "default",
    });
    
    // Réinitialiser le formulaire
    form.reset();
    setCvFile(null);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-4 max-w-md"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-2">
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

  if (!position) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Poste non trouvé</h1>
          <p className="mb-6">Le poste que vous recherchez n'existe pas ou a été supprimé.</p>
          <Button asChild>
            <Link to="/careers">Voir tous les postes</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={`${position.title} | Carrières`} description={position.description}>
      <div className="container mx-auto px-4 py-12">
        {/* Navigation */}
        <div className="mb-8">
          <Link to="/careers" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux offres d'emploi
          </Link>
        </div>
        
        {/* En-tête du poste */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{position.title}</h1>
          <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-x-4 gap-y-2 mt-2">
            <span className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              {position.location}
            </span>
            <span className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {position.type}
            </span>
            <span className="flex items-center">
              <Briefcase className="mr-1 h-4 w-4" />
              {position.department}
            </span>
            <span className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              Publié le {new Date(position.postedDate).toLocaleDateString()}
            </span>
            {position.salary && (
              <span className="flex items-center">
                <Banknote className="mr-1 h-4 w-4" />
                {position.salary}
              </span>
            )}
          </div>
        </div>
        
        {/* Contenu principal en 2 colonnes sur desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Description du poste */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">À propos du poste</h2>
              <p className="text-muted-foreground mb-6">{position.description}</p>
              
              <h3 className="font-medium mb-2">Responsabilités :</h3>
              <ul className="list-disc pl-5 space-y-1 mb-6">
                {position.responsibilities.map((responsibility, i) => (
                  <li key={i} className="text-muted-foreground">{responsibility}</li>
                ))}
              </ul>
              
              <h3 className="font-medium mb-2">Prérequis :</h3>
              <ul className="list-disc pl-5 space-y-1">
                {position.requirements.map((requirement, i) => (
                  <li key={i} className="text-muted-foreground">{requirement}</li>
                ))}
              </ul>
            </div>
            
            <Separator className="my-8" />
            
            {/* Formulaire de candidature */}
            <div>
              <h2 className="text-xl font-semibold mb-6">Postuler à cette offre</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom complet *</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="johndoe@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Téléphone *</FormLabel>
                          <FormControl>
                            <Input placeholder="+33 6 12 34 56 78" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="portfolio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Site web / Portfolio</FormLabel>
                          <FormControl>
                            <Input placeholder="https://monportfolio.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn</FormLabel>
                          <FormControl>
                            <Input placeholder="https://linkedin.com/in/username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cv" className="block mb-2">CV (PDF, DOC, DOCX) *</Label>
                    <Input 
                      id="cv"
                      type="file" 
                      onChange={handleCvUpload}
                      accept=".pdf,.doc,.docx"
                    />
                    {cvFile && (
                      <p className="text-sm text-muted-foreground mt-1">Fichier sélectionné : {cvFile.name}</p>
                    )}
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="coverLetter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lettre de motivation *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Présentez-vous et expliquez pourquoi ce poste vous intéresse..." 
                            className="min-h-[150px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                        <FormDescription>
                          Minimum 50 caractères.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" size="lg">
                    Envoyer ma candidature
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
          {/* Sidebar avec informations complémentaires */}
          <div className="lg:col-span-1">
            <div className="bg-muted/50 p-6 rounded-lg sticky top-24">
              <h3 className="font-semibold mb-4">À propos de Amanar Map</h3>
              <p className="text-muted-foreground mb-6">
                Amanar Map est une plateforme éducative innovante dédiée à aider les entrepreneurs à naviguer dans le monde digital. 
                Nous croyons en la possibilité d'atteindre la liberté financière grâce à l'éducation et des outils pratiques.
              </p>
              
              <h4 className="font-medium mb-2">Pourquoi nous rejoindre ?</h4>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">Travail flexible et 100% remote</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">Impact direct sur des milliers d'entrepreneurs</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">Équipe jeune et passionnée</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">Opportunités d'évolution rapide</span>
                </li>
              </ul>
              
              <Separator className="my-4" />
              
              <div className="text-center">
                <h4 className="font-medium mb-2">Des questions ?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  N'hésitez pas à nous contacter pour toute question concernant ce poste ou le processus de recrutement.
                </p>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/contact">
                    Contactez-nous
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

export default CareerDetail;
