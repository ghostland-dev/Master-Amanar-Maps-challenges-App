
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, ExternalLink, FileText, Filter, Search } from "lucide-react";
import { Chip } from "@/components/ui/chip";

interface Guide {
  id: number;
  title: string;
  description: string;
  category: string;
  type: "article" | "video" | "document";
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  link: string;
  tags: string[];
}

const Library = () => {
  useEffect(() => {
    document.title = "FinQuest - Bibliothèque";
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  // Mock guides data - will be replaced with Supabase data
  const guides: Guide[] = [
    {
      id: 1,
      title: "Introduction à l'investissement",
      description: "Comprendre les bases de l'investissement et les différentes classes d'actifs",
      category: "investissement",
      type: "article",
      level: "beginner",
      duration: "10 min",
      link: "#",
      tags: ["bases", "théorie", "finance"]
    },
    {
      id: 2,
      title: "Comment créer une boutique e-commerce",
      description: "Guide étape par étape pour créer votre première boutique en ligne",
      category: "e-commerce",
      type: "document",
      level: "beginner",
      duration: "25 min",
      link: "#",
      tags: ["Shopify", "WooCommerce", "débutant"]
    },
    {
      id: 3,
      title: "Comprendre les crypto-monnaies",
      description: "Les fondamentaux des crypto-monnaies et de la blockchain",
      category: "crypto",
      type: "video",
      level: "beginner",
      duration: "15 min",
      link: "#",
      tags: ["Bitcoin", "Ethereum", "blockchain"]
    },
    {
      id: 4,
      title: "Stratégies de marketing digital",
      description: "Les meilleures stratégies pour promouvoir votre entreprise en ligne",
      category: "marketing",
      type: "article",
      level: "intermediate",
      duration: "20 min",
      link: "#",
      tags: ["social media", "SEO", "publicité"]
    },
    {
      id: 5,
      title: "Analyse technique des marchés financiers",
      description: "Comment utiliser l'analyse technique pour prendre des décisions d'investissement",
      category: "investissement",
      type: "document",
      level: "advanced",
      duration: "45 min",
      link: "#",
      tags: ["chartisme", "indicateurs", "tendances"]
    },
    {
      id: 6,
      title: "Optimisation du taux de conversion",
      description: "Techniques pour améliorer le taux de conversion de votre boutique en ligne",
      category: "e-commerce",
      type: "video",
      level: "intermediate",
      duration: "30 min",
      link: "#",
      tags: ["CRO", "UX", "analytics"]
    },
    {
      id: 7,
      title: "Trading de DeFi",
      description: "Guide avancé sur le trading dans la finance décentralisée",
      category: "crypto",
      type: "document",
      level: "advanced",
      duration: "60 min",
      link: "#",
      tags: ["DeFi", "yield farming", "liquidity"]
    },
    {
      id: 8,
      title: "Copywriting pour convertir",
      description: "Techniques d'écriture persuasive pour augmenter vos ventes",
      category: "marketing",
      type: "article",
      level: "intermediate",
      duration: "15 min",
      link: "#",
      tags: ["copywriting", "persuasion", "conversion"]
    },
  ];

  // Filter guides based on search query, category, and level
  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || guide.category === selectedCategory;
    const matchesLevel = selectedLevel === "all" || guide.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "article":
        return <FileText className="h-4 w-4" />;
      case "video":
        return <BookOpen className="h-4 w-4" />;
      case "document":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };
  
  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "success" as const;
      case "intermediate":
        return "warning" as const;
      case "advanced":
        return "danger" as const;
      default:
        return "neutral" as const;
    }
  };
  
  const getLevelLabel = (level: string) => {
    switch (level) {
      case "beginner":
        return "Débutant";
      case "intermediate":
        return "Intermédiaire";
      case "advanced":
        return "Avancé";
      default:
        return level;
    }
  };

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      <div className="pt-20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-6">
          <h1 className="text-3xl font-bold mb-2">Bibliothèque</h1>
          <p className="text-muted-foreground mb-8">
            Explorez notre collection de guides, articles et vidéos éducatives
          </p>
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-64 space-y-6">
              <Card className="glass">
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2 flex items-center">
                        <Filter className="mr-2 h-4 w-4" />
                        Catégories
                      </h3>
                      <div className="space-y-2">
                        <Button
                          variant={selectedCategory === "all" ? "default" : "ghost"}
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => setSelectedCategory("all")}
                        >
                          Toutes les catégories
                        </Button>
                        <Button
                          variant={selectedCategory === "investissement" ? "default" : "ghost"}
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => setSelectedCategory("investissement")}
                        >
                          Investissement
                        </Button>
                        <Button
                          variant={selectedCategory === "e-commerce" ? "default" : "ghost"}
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => setSelectedCategory("e-commerce")}
                        >
                          E-commerce
                        </Button>
                        <Button
                          variant={selectedCategory === "crypto" ? "default" : "ghost"}
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => setSelectedCategory("crypto")}
                        >
                          Crypto
                        </Button>
                        <Button
                          variant={selectedCategory === "marketing" ? "default" : "ghost"}
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => setSelectedCategory("marketing")}
                        >
                          Marketing
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Niveau</h3>
                      <div className="space-y-2">
                        <Button
                          variant={selectedLevel === "all" ? "default" : "ghost"}
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => setSelectedLevel("all")}
                        >
                          Tous les niveaux
                        </Button>
                        <Button
                          variant={selectedLevel === "beginner" ? "default" : "ghost"}
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => setSelectedLevel("beginner")}
                        >
                          Débutant
                        </Button>
                        <Button
                          variant={selectedLevel === "intermediate" ? "default" : "ghost"}
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => setSelectedLevel("intermediate")}
                        >
                          Intermédiaire
                        </Button>
                        <Button
                          variant={selectedLevel === "advanced" ? "default" : "ghost"}
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => setSelectedLevel("advanced")}
                        >
                          Avancé
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Ressources populaires</h3>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <a href="#" className="hover:text-primary flex items-center">
                        <FileText className="h-3 w-3 mr-2" />
                        <span>Guide de démarrage rapide</span>
                      </a>
                    </div>
                    <div className="text-sm">
                      <a href="#" className="hover:text-primary flex items-center">
                        <FileText className="h-3 w-3 mr-2" />
                        <span>Glossaire financier</span>
                      </a>
                    </div>
                    <div className="text-sm">
                      <a href="#" className="hover:text-primary flex items-center">
                        <FileText className="h-3 w-3 mr-2" />
                        <span>Modèles de tableaux financiers</span>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex-1">
              <Tabs defaultValue="all">
                <TabsList className="mb-6">
                  <TabsTrigger value="all">Tous</TabsTrigger>
                  <TabsTrigger value="articles">Articles</TabsTrigger>
                  <TabsTrigger value="videos">Vidéos</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredGuides.length > 0 ? (
                      filteredGuides.map((guide) => (
                        <Card key={guide.id} className="glass overflow-hidden">
                          <CardContent className="p-0">
                            <div className="p-5">
                              <div className="flex justify-between items-start mb-3">
                                <Badge variant="outline" className="capitalize">
                                  {guide.category}
                                </Badge>
                                <Chip variant={getLevelColor(guide.level)} size="sm">
                                  {getLevelLabel(guide.level)}
                                </Chip>
                              </div>
                              
                              <h3 className="text-lg font-medium mb-2">{guide.title}</h3>
                              <p className="text-sm text-muted-foreground mb-3">
                                {guide.description}
                              </p>
                              
                              <div className="flex flex-wrap gap-2 mb-3">
                                {guide.tags.map((tag, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              
                              <div className="flex items-center text-xs text-muted-foreground">
                                <div className="flex items-center mr-4">
                                  {getTypeIcon(guide.type)}
                                  <span className="ml-1 capitalize">{guide.type}</span>
                                </div>
                                <div>
                                  {guide.duration} de lecture
                                </div>
                              </div>
                            </div>
                            
                            <div className="border-t border-border p-3 bg-secondary/30">
                              <a
                                href={guide.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between text-sm text-primary"
                              >
                                <span>Consulter le guide</span>
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-10 text-muted-foreground">
                        Aucun résultat trouvé pour votre recherche
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="articles" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredGuides.filter(guide => guide.type === "article").length > 0 ? (
                      filteredGuides
                        .filter(guide => guide.type === "article")
                        .map((guide) => (
                          <Card key={guide.id} className="glass overflow-hidden">
                            {/* Same card content as above */}
                            <CardContent className="p-0">
                              <div className="p-5">
                                <div className="flex justify-between items-start mb-3">
                                  <Badge variant="outline" className="capitalize">
                                    {guide.category}
                                  </Badge>
                                  <Chip variant={getLevelColor(guide.level)} size="sm">
                                    {getLevelLabel(guide.level)}
                                  </Chip>
                                </div>
                                
                                <h3 className="text-lg font-medium mb-2">{guide.title}</h3>
                                <p className="text-sm text-muted-foreground mb-3">
                                  {guide.description}
                                </p>
                                
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {guide.tags.map((tag, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                                
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <div className="flex items-center mr-4">
                                    {getTypeIcon(guide.type)}
                                    <span className="ml-1 capitalize">{guide.type}</span>
                                  </div>
                                  <div>
                                    {guide.duration} de lecture
                                  </div>
                                </div>
                              </div>
                              
                              <div className="border-t border-border p-3 bg-secondary/30">
                                <a
                                  href={guide.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-between text-sm text-primary"
                                >
                                  <span>Consulter le guide</span>
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                    ) : (
                      <div className="col-span-2 text-center py-10 text-muted-foreground">
                        Aucun article trouvé pour votre recherche
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="videos" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredGuides.filter(guide => guide.type === "video").length > 0 ? (
                      filteredGuides
                        .filter(guide => guide.type === "video")
                        .map((guide) => (
                          <Card key={guide.id} className="glass overflow-hidden">
                            {/* Same card content as above */}
                            <CardContent className="p-0">
                              <div className="p-5">
                                <div className="flex justify-between items-start mb-3">
                                  <Badge variant="outline" className="capitalize">
                                    {guide.category}
                                  </Badge>
                                  <Chip variant={getLevelColor(guide.level)} size="sm">
                                    {getLevelLabel(guide.level)}
                                  </Chip>
                                </div>
                                
                                <h3 className="text-lg font-medium mb-2">{guide.title}</h3>
                                <p className="text-sm text-muted-foreground mb-3">
                                  {guide.description}
                                </p>
                                
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {guide.tags.map((tag, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                                
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <div className="flex items-center mr-4">
                                    {getTypeIcon(guide.type)}
                                    <span className="ml-1 capitalize">{guide.type}</span>
                                  </div>
                                  <div>
                                    {guide.duration} de lecture
                                  </div>
                                </div>
                              </div>
                              
                              <div className="border-t border-border p-3 bg-secondary/30">
                                <a
                                  href={guide.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-between text-sm text-primary"
                                >
                                  <span>Consulter le guide</span>
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                    ) : (
                      <div className="col-span-2 text-center py-10 text-muted-foreground">
                        Aucune vidéo trouvée pour votre recherche
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="documents" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredGuides.filter(guide => guide.type === "document").length > 0 ? (
                      filteredGuides
                        .filter(guide => guide.type === "document")
                        .map((guide) => (
                          <Card key={guide.id} className="glass overflow-hidden">
                            {/* Same card content as above */}
                            <CardContent className="p-0">
                              <div className="p-5">
                                <div className="flex justify-between items-start mb-3">
                                  <Badge variant="outline" className="capitalize">
                                    {guide.category}
                                  </Badge>
                                  <Chip variant={getLevelColor(guide.level)} size="sm">
                                    {getLevelLabel(guide.level)}
                                  </Chip>
                                </div>
                                
                                <h3 className="text-lg font-medium mb-2">{guide.title}</h3>
                                <p className="text-sm text-muted-foreground mb-3">
                                  {guide.description}
                                </p>
                                
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {guide.tags.map((tag, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                                
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <div className="flex items-center mr-4">
                                    {getTypeIcon(guide.type)}
                                    <span className="ml-1 capitalize">{guide.type}</span>
                                  </div>
                                  <div>
                                    {guide.duration} de lecture
                                  </div>
                                </div>
                              </div>
                              
                              <div className="border-t border-border p-3 bg-secondary/30">
                                <a
                                  href={guide.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-between text-sm text-primary"
                                >
                                  <span>Consulter le guide</span>
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                    ) : (
                      <div className="col-span-2 text-center py-10 text-muted-foreground">
                        Aucun document trouvé pour votre recherche
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="gap-2">
                  <span>Charger plus de ressources</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
