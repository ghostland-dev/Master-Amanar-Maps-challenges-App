
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { 
  Code, 
  Briefcase, 
  Globe, 
  Heart, 
  Clock, 
  Coffee, 
  Users,
  Zap,
  ArrowUpRight
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Careers = () => {
  return (
    <MainLayout title="Carrières" description="Rejoignez l'équipe Amanar Map">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Rejoignez l'aventure Amanar Map</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Nous construisons le futur de l'apprentissage entrepreneurial en ligne. 
            Rejoignez une équipe passionnée qui aide des milliers de personnes à atteindre leur liberté financière.
          </p>
          <Button size="lg" asChild>
            <a href="#open-positions">
              Voir les postes ouverts
            </a>
          </Button>
        </div>
        
        {/* Company Values */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-10">Nos valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-secondary/50">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Passion</h3>
              <p className="text-muted-foreground">
                Nous sommes passionnés par notre mission d'aider les gens à réussir dans l'entrepreneuriat digital.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-secondary/50">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Innovation</h3>
              <p className="text-muted-foreground">
                Nous explorons constamment de nouvelles approches pour rendre l'apprentissage plus efficace et accessible.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-secondary/50">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Communauté</h3>
              <p className="text-muted-foreground">
                Nous croyons à la puissance de la communauté et de l'entraide pour progresser ensemble.
              </p>
            </div>
          </div>
        </div>
        
        {/* Benefits */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-10">Avantages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <Benefit icon={<Globe />} title="Travail à distance" description="Travaillez d'où vous voulez, quand vous voulez." />
            <Benefit icon={<Clock />} title="Horaires flexibles" description="Organisez votre temps comme vous le souhaitez." />
            <Benefit icon={<Coffee />} title="Pauses café virtuelles" description="Rencontrez l'équipe de manière informelle." />
            <Benefit icon={<Briefcase />} title="Développement professionnel" description="Budget formation et conférences." />
          </div>
        </div>
        
        {/* Open Positions */}
        <div id="open-positions" className="mb-20 scroll-mt-20">
          <h2 className="text-2xl font-bold text-center mb-10">Postes ouverts</h2>
          
          {openPositions.length > 0 ? (
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {openPositions.map((position, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="hover:bg-secondary/50 px-4 rounded-lg">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full text-left">
                        <div className="flex items-center">
                          <position.icon className="mr-3 h-5 w-5 text-primary hidden md:block" />
                          <span className="font-medium">{position.title}</span>
                        </div>
                        <div className="flex items-center mt-2 md:mt-0">
                          <span className="text-sm text-muted-foreground mr-3">{position.location}</span>
                          <span className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full">{position.type}</span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="px-4 py-2">
                        <p className="text-muted-foreground mb-4">{position.description}</p>
                        
                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Responsabilités:</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {position.responsibilities.map((responsibility, i) => (
                              <li key={i} className="text-muted-foreground text-sm">{responsibility}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="mb-6">
                          <h4 className="font-medium mb-2">Prérequis:</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {position.requirements.map((requirement, i) => (
                              <li key={i} className="text-muted-foreground text-sm">{requirement}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <Button asChild>
                          <Link to={`/careers/${position.id}`} className="flex items-center">
                            Postuler maintenant
                            <ArrowUpRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ) : (
            <div className="text-center py-8 bg-secondary/30 rounded-lg max-w-3xl mx-auto">
              <p className="text-muted-foreground mb-4">Aucun poste ouvert actuellement.</p>
              <p className="text-sm">Revenez bientôt ou envoyez-nous une candidature spontanée.</p>
              <Button variant="outline" className="mt-4" asChild>
                <a href="mailto:careers@amanarmap.com">Candidature spontanée</a>
              </Button>
            </div>
          )}
        </div>
        
        {/* Join Us CTA */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/50 p-10 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Vous ne trouvez pas le poste idéal ?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Nous sommes toujours à la recherche de talents exceptionnels. Envoyez-nous votre CV 
            et expliquez-nous comment vous pourriez contribuer à notre mission.
          </p>
          <Button variant="default" asChild>
            <a href="mailto:careers@amanarmap.com">Contactez-nous</a>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

// Benefit Component
const Benefit = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="flex flex-col items-center text-center p-4">
    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
      {React.cloneElement(icon as React.ReactElement, { className: "h-6 w-6 text-primary" })}
    </div>
    <h3 className="font-semibold mb-1">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

// Open positions data
const openPositions = [
  {
    id: 'content-creator',
    title: "Créateur de contenu",
    description: "Nous recherchons un créateur de contenu passionné pour développer des challenges et tutoriels de qualité.",
    location: "À distance",
    type: "Temps plein",
    icon: Briefcase,
    responsibilities: [
      "Créer du contenu éducatif engageant pour notre plateforme",
      "Développer des challenges pratiques dans divers domaines du business en ligne",
      "Rédiger des articles de blog et tutoriels",
      "Collaborer avec l'équipe marketing pour optimiser la visibilité du contenu"
    ],
    requirements: [
      "Expérience pratique dans l'entrepreneuriat digital (e-commerce, affiliation, copywriting, etc.)",
      "Excellentes compétences rédactionnelles",
      "Capacité à expliquer des concepts complexes de manière simple",
      "Passionné par l'éducation et la transmission de connaissances"
    ]
  },
  {
    id: 'frontend-developer',
    title: "Développeur Frontend",
    description: "Rejoignez notre équipe technique pour créer des expériences utilisateur exceptionnelles.",
    location: "À distance",
    type: "Temps plein",
    icon: Code,
    responsibilities: [
      "Développer et maintenir l'interface de notre plateforme web",
      "Collaborer avec les designers pour implémenter des maquettes fidèles",
      "Optimiser la performance et l'accessibilité du site",
      "Participer à l'architecture technique des nouvelles fonctionnalités"
    ],
    requirements: [
      "Expérience avec React et TypeScript",
      "Compétences en CSS (Tailwind CSS est un plus)",
      "Sensibilité au design et à l'expérience utilisateur",
      "Capacité à travailler de manière autonome dans un environnement remote"
    ]
  }
];

export default Careers;
