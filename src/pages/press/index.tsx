
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import {
  ArrowDownToLine,
  FileText,
  Mail,
  ExternalLink
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

const Press = () => {
  return (
    <MainLayout title="Presse" description="Espace presse et médias Amanar Map">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Espace Presse</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ressources et informations pour les journalistes et médias intéressés par Amanar Map.
          </p>
        </div>
        
        {/* Contact Press */}
        <div className="max-w-4xl mx-auto mb-16 bg-secondary/30 p-8 rounded-xl">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="sm:w-2/3">
              <h2 className="text-2xl font-bold mb-2">Contact Presse</h2>
              <p className="text-muted-foreground mb-4">
                Pour toute demande d'interview, d'information ou de collaboration médiatique, 
                n'hésitez pas à nous contacter.
              </p>
              <div className="flex items-center mb-2">
                <Mail className="h-4 w-4 mr-2 text-primary" />
                <a href="mailto:presse@amanarmap.com" className="text-primary hover:underline">
                  presse@amanarmap.com
                </a>
              </div>
            </div>
            <div className="sm:w-1/3 flex justify-center">
              <Button size="lg" asChild>
                <a href="mailto:presse@amanarmap.com">Contacter</a>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Press Kit */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6">Kit Médias</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Logo et éléments visuels</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Logos officiels, photos haute résolution et éléments de marque.
                    </p>
                  </div>
                  <FileText className="h-8 w-8 text-primary/70" />
                </div>
                <Button variant="outline" className="w-full flex items-center justify-center">
                  <ArrowDownToLine className="mr-2 h-4 w-4" />
                  Télécharger (ZIP, 12 MB)
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Dossier de presse</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Présentation détaillée d'Amanar Map, notre mission et nos réalisations.
                    </p>
                  </div>
                  <FileText className="h-8 w-8 text-primary/70" />
                </div>
                <Button variant="outline" className="w-full flex items-center justify-center">
                  <ArrowDownToLine className="mr-2 h-4 w-4" />
                  Télécharger (PDF, 5 MB)
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Press Releases */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6">Communiqués de presse</h2>
          
          <div className="space-y-4">
            {pressReleases.map((release, index) => (
              <div key={index} className="p-5 border border-border rounded-lg hover:bg-secondary/20 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                  <div className="flex items-center mb-2 sm:mb-0">
                    <span className="text-muted-foreground text-sm">{release.date}</span>
                    <Separator orientation="vertical" className="mx-3 h-4" />
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {release.category}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" className="flex items-center" asChild>
                    <a href={release.link} target="_blank" rel="noopener noreferrer">
                      Lire
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                </div>
                <h3 className="text-lg font-semibold">{release.title}</h3>
                <p className="text-muted-foreground text-sm mt-2">{release.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Media Coverage */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6">Dans les médias</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {mediaCoverage.map((coverage, index) => (
              <a 
                key={index} 
                href={coverage.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-sm">{coverage.source}</span>
                    <span className="text-xs text-muted-foreground">{coverage.date}</span>
                  </div>
                  <h3 className="font-medium mb-2 line-clamp-2">{coverage.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-3">{coverage.excerpt}</p>
                  <div className="flex items-center mt-3 text-primary text-sm">
                    Lire l'article
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

// Mock data
const pressReleases = [
  {
    date: "15 Octobre 2023",
    category: "Lancement",
    title: "Amanar Map lance sa nouvelle plateforme d'apprentissage entrepreneurial",
    excerpt: "Amanar Map dévoile aujourd'hui sa plateforme innovante, conçue pour rendre l'entrepreneuriat digital accessible à tous grâce à des challenges pratiques et des parcours guidés.",
    link: "#"
  },
  {
    date: "22 Septembre 2023",
    category: "Partenariat",
    title: "Amanar Map signe un partenariat stratégique avec l'école de commerce EM Lyon",
    excerpt: "Cette collaboration permettra aux étudiants de l'EM Lyon d'accéder à des ressources pratiques pour développer leurs projets entrepreneuriaux en ligne.",
    link: "#"
  },
  {
    date: "5 Août 2023",
    category: "Financement",
    title: "Amanar Map lève 2 millions d'euros pour démocratiser l'apprentissage de l'entrepreneuriat en ligne",
    excerpt: "Cette levée de fonds permettra d'accélérer le développement de la plateforme et d'enrichir son catalogue de challenges et ressources pédagogiques.",
    link: "#"
  }
];

const mediaCoverage = [
  {
    source: "Les Echos",
    date: "18 Oct 2023",
    title: "Amanar Map révolutionne l'apprentissage de l'entrepreneuriat en ligne",
    excerpt: "La start-up française propose une approche innovante basée sur des mini-défis pratiques pour permettre à chacun de développer une activité rentable sur internet.",
    link: "#"
  },
  {
    source: "BFM Business",
    date: "12 Oct 2023",
    title: "L'entrepreneuriat en ligne à la portée de tous avec Amanar Map",
    excerpt: "La plateforme qui promet de rendre accessibles les compétences entrepreneuriales grâce à un parcours d'apprentissage ludique et progressif.",
    link: "#"
  },
  {
    source: "Maddyness",
    date: "8 Oct 2023",
    title: "Amanar Map lève 2M€ pour démocratiser les revenus en ligne",
    excerpt: "Cette jeune pousse ambitieuse veut permettre au plus grand nombre de générer des revenus complémentaires grâce à des formations pratiques.",
    link: "#"
  },
  {
    source: "Le Figaro",
    date: "30 Sept 2023",
    title: "Ces Français qui réinventent la formation à l'entrepreneuriat",
    excerpt: "Portrait des fondateurs d'Amanar Map, qui ont quitté leurs emplois en conseil pour créer une plateforme d'apprentissage innovante.",
    link: "#"
  },
  {
    source: "Capital",
    date: "22 Sept 2023",
    title: "Comment générer un revenu complémentaire sur internet",
    excerpt: "Enquête sur les nouvelles méthodes pour créer des sources de revenus en ligne, avec le témoignage des utilisateurs d'Amanar Map.",
    link: "#"
  },
  {
    source: "JDN",
    date: "15 Sept 2023",
    title: "Amanar Map: la EdTech qui veut démocratiser l'entrepreneuriat digital",
    excerpt: "Analyse du modèle pédagogique disruptif proposé par cette start-up française en pleine croissance.",
    link: "#"
  }
];

export default Press;
