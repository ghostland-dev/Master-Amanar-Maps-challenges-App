
import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, Code, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Position type definition
export type Position = {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  icon: React.ElementType;
  responsibilities: string[];
  requirements: string[];
};

// Open positions data
export const openPositions: Position[] = [
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

const OpenPositionsSection = () => {
  return (
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
  );
};

export default OpenPositionsSection;
