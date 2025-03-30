
import React, { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Search, Filter, ArrowRight, ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Tools = () => {
  const [category, setCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { toast } = useToast();

  // Filtrer les outils selon la catégorie et le terme de recherche
  const filteredTools = toolsList.filter((tool) => {
    const matchesCategory = category === "all" || tool.category === category;
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const handleBookmark = (toolId: number) => {
    toast({
      title: "Outil enregistré",
      description: "Cet outil a été ajouté à vos favoris",
    });
  };

  return (
    <MainLayout title="Outils" description="Découvrez notre sélection d'outils pour entrepreneurs digitaux">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Outils et Ressources</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explorez notre sélection d'outils soigneusement choisis pour vous aider à développer votre business en ligne plus efficacement.
          </p>
        </div>
        
        {/* Filtres et recherche */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher un outil..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-auto">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Catégorie" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="productivity">Productivité</SelectItem>
                  <SelectItem value="analytics">Analytique</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="seo">SEO</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Featured Tools */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Outils recommandés</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredTools
              .filter(tool => tool.featured)
              .map((tool) => (
                <ToolCard key={tool.id} tool={tool} onBookmark={handleBookmark} />
              ))}
          </div>
        </div>
        
        {/* All Tools */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Tous les outils</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools
              .filter(tool => !tool.featured)
              .map((tool) => (
                <ToolCard key={tool.id} tool={tool} onBookmark={handleBookmark} />
              ))}
          </div>
          
          {filteredTools.filter(tool => !tool.featured).length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun outil ne correspond à votre recherche.</p>
            </div>
          )}
        </div>
        
        {/* Submit Tool Section */}
        <div className="mt-16 bg-muted/30 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-2">Vous connaissez un outil intéressant ?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Partagez vos découvertes avec notre communauté. Suggérez un outil que vous trouvez utile
            et qui pourrait aider d'autres entrepreneurs.
          </p>
          <Button asChild>
            <Link to="/contact" className="flex items-center">
              Suggérer un outil
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

interface Tool {
  id: number;
  name: string;
  description: string;
  category: string;
  image: string;
  link: string;
  pricing: string;
  featured: boolean;
  pricingDetails?: string;
}

const ToolCard = ({ tool, onBookmark }: { tool: Tool, onBookmark: (id: number) => void }) => {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      marketing: 'bg-blue-500/10 text-blue-600 border-blue-200',
      productivity: 'bg-green-500/10 text-green-600 border-green-200',
      analytics: 'bg-purple-500/10 text-purple-600 border-purple-200',
      design: 'bg-pink-500/10 text-pink-600 border-pink-200',
      seo: 'bg-orange-500/10 text-orange-600 border-orange-200',
      ecommerce: 'bg-yellow-500/10 text-yellow-600 border-yellow-200'
    };
    
    return colors[category] || 'bg-gray-500/10 text-gray-600 border-gray-200';
  };
  
  const getPricingBadge = (pricing: string) => {
    const styles: Record<string, string> = {
      free: 'bg-green-500/10 text-green-600 border-green-200',
      freemium: 'bg-blue-500/10 text-blue-600 border-blue-200',
      paid: 'bg-purple-500/10 text-purple-600 border-purple-200',
    };
    
    const labels: Record<string, string> = {
      free: 'Gratuit',
      freemium: 'Freemium',
      paid: 'Payant',
    };
    
    return (
      <Badge variant="outline" className={styles[pricing]}>
        {labels[pricing]}
      </Badge>
    );
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col">
      <div className="p-4 flex items-center justify-center bg-muted/30 h-40">
        <img 
          src={tool.image} 
          alt={tool.name} 
          className="max-w-[180px] max-h-[120px] object-contain" 
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{tool.name}</CardTitle>
          <Badge variant="outline" className={getCategoryColor(tool.category)}>
            {tool.category.charAt(0).toUpperCase() + tool.category.slice(1)}
          </Badge>
        </div>
        <CardDescription>{tool.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-2">
          {getPricingBadge(tool.pricing)}
          {tool.pricingDetails && (
            <span className="text-xs text-muted-foreground">{tool.pricingDetails}</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="mt-auto pt-2">
        <div className="w-full flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <a href={tool.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
              <ExternalLink className="mr-1 h-4 w-4" />
              Visiter
            </a>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onBookmark(tool.id)}
            className="flex-1"
          >
            Sauvegarder
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

// Données des outils
const toolsList: Tool[] = [
  {
    id: 1,
    name: "Canva",
    description: "Plateforme de design graphique permettant de créer facilement des visuels pour les réseaux sociaux, présentations, etc.",
    category: "design",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg",
    link: "https://www.canva.com",
    pricing: "freemium",
    pricingDetails: "Plan Pro à 12,99€/mois",
    featured: true
  },
  {
    id: 2,
    name: "Ahrefs",
    description: "Suite d'outils SEO pour l'analyse de backlinks, recherche de mots-clés et audit de site.",
    category: "seo",
    image: "https://cdn.freebiesupply.com/logos/large/2x/ahrefs-logo-png-transparent.png",
    link: "https://ahrefs.com",
    pricing: "paid",
    pricingDetails: "À partir de 99$/mois",
    featured: true
  },
  {
    id: 3,
    name: "Notion",
    description: "Outil de productivité tout-en-un pour organiser notes, projets, wikis et bases de données.",
    category: "productivity",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
    link: "https://www.notion.so",
    pricing: "freemium",
    pricingDetails: "Plan Pro à 8$/mois",
    featured: true
  },
  {
    id: 4,
    name: "Mailchimp",
    description: "Plateforme de marketing par email pour créer et gérer des campagnes et automatisations.",
    category: "marketing",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Mailchimp_Logo_2018.png/640px-Mailchimp_Logo_2018.png",
    link: "https://mailchimp.com",
    pricing: "freemium",
    pricingDetails: "Selon nombre d'abonnés",
    featured: false
  },
  {
    id: 5,
    name: "Google Analytics",
    description: "Service d'analyse web qui fournit des statistiques et des outils d'analyse pour le référencement et le marketing.",
    category: "analytics",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Logo_Google_Analytics.svg/1200px-Logo_Google_Analytics.svg.png",
    link: "https://analytics.google.com",
    pricing: "free",
    featured: false
  },
  {
    id: 6,
    name: "Shopify",
    description: "Plateforme e-commerce permettant de créer facilement une boutique en ligne et de gérer les ventes.",
    category: "ecommerce",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/2560px-Shopify_logo_2018.svg.png",
    link: "https://www.shopify.com",
    pricing: "paid",
    pricingDetails: "À partir de 29$/mois",
    featured: false
  },
  {
    id: 7,
    name: "Trello",
    description: "Outil de gestion de projet basé sur des tableaux Kanban pour organiser vos tâches et projets.",
    category: "productivity",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Trello_logo.svg/2560px-Trello_logo.svg.png",
    link: "https://trello.com",
    pricing: "freemium",
    pricingDetails: "Version Pro à 10$/mois",
    featured: false
  },
  {
    id: 8,
    name: "Figma",
    description: "Outil de design d'interface collaborative basé sur le cloud pour la création de maquettes et prototypes.",
    category: "design",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
    link: "https://www.figma.com",
    pricing: "freemium",
    pricingDetails: "Version Pro à 15$/mois",
    featured: false
  },
  {
    id: 9,
    name: "Semrush",
    description: "Suite d'outils marketing pour l'analyse concurrentielle, le SEO, PPC et le marketing de contenu.",
    category: "seo",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Semrush_2023_logo.svg/2560px-Semrush_2023_logo.svg.png",
    link: "https://www.semrush.com",
    pricing: "paid",
    pricingDetails: "À partir de 119,95$/mois",
    featured: false
  },
  {
    id: 10,
    name: "Slack",
    description: "Plateforme de communication d'équipe qui propose des outils d'organisation pour collaborer efficacement.",
    category: "productivity",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png",
    link: "https://slack.com",
    pricing: "freemium",
    pricingDetails: "Version Pro à 8$/mois",
    featured: false
  },
  {
    id: 11,
    name: "Hootsuite",
    description: "Plateforme de gestion des médias sociaux pour planifier et publier du contenu sur plusieurs réseaux.",
    category: "marketing",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Hootsuite_logo.svg/2560px-Hootsuite_logo.svg.png",
    link: "https://hootsuite.com",
    pricing: "paid",
    pricingDetails: "À partir de 49$/mois",
    featured: false
  },
  {
    id: 12,
    name: "Ubersuggest",
    description: "Outil SEO qui fournit des suggestions de mots-clés, des analyses de concurrents et des audits de site.",
    category: "seo",
    image: "https://neilpatel.com/wp-content/uploads/2017/04/ubersuggest.png",
    link: "https://neilpatel.com/ubersuggest",
    pricing: "freemium",
    pricingDetails: "Version Pro à 29$/mois",
    featured: false
  }
];

export default Tools;
