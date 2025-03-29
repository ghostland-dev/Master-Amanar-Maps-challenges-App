
import { Link } from "react-router-dom";
import { BookOpen, BarChart, ChevronRight, Download, File, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { animate } from "motion";
import { cn } from "@/lib/utils";
import { ChallengeResource } from "@/utils/challenge/types";

interface ChallengeResourcesProps {
  resources: ChallengeResource[];
}

const ChallengeResources = ({ resources }: ChallengeResourcesProps) => {
  const handleDownload = (resource: ChallengeResource) => {
    // In a real app, this would trigger the actual download
    // For now, we'll just show a toast
    toast({
      title: "Téléchargement démarré",
      description: `Le document "${resource.title}" va être téléchargé.`,
    });
  };

  // Default Pexels images for resource types
  const resourceImages = {
    pdf: "https://images.pexels.com/photos/6863250/pexels-photo-6863250.jpeg?auto=compress&cs=tinysrgb&w=300",
    template: "https://images.pexels.com/photos/5058361/pexels-photo-5058361.jpeg?auto=compress&cs=tinysrgb&w=300",
    simulator: "https://images.pexels.com/photos/7567475/pexels-photo-7567475.jpeg?auto=compress&cs=tinysrgb&w=300",
    book: "https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg?auto=compress&cs=tinysrgb&w=300",
    default: "https://images.pexels.com/photos/5797908/pexels-photo-5797908.jpeg?auto=compress&cs=tinysrgb&w=300"
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-primary" />;
      case 'template':
        return <File className="h-5 w-5 text-primary" />;
      case 'simulator':
        return <BarChart className="h-5 w-5 text-primary" />;
      case 'book':
        return <BookOpen className="h-5 w-5 text-primary" />;
      default:
        return <FileText className="h-5 w-5 text-primary" />;
    }
  };

  const getResourceImage = (type: string) => {
    return resourceImages[type as keyof typeof resourceImages] || resourceImages.default;
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <FileText className="mr-2 h-5 w-5 text-primary" />
        Ressources
      </h2>
      <Card className="glass transition-all duration-300 hover:shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Documents et outils</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="overflow-hidden rounded-md hover:scale-[1.01] transition-transform"
            >
              <div className="flex items-center justify-between p-3 bg-secondary/40 rounded-lg hover:bg-secondary transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded overflow-hidden mr-3 shrink-0">
                      <img 
                        src={getResourceImage(resource.type)}
                        alt={resource.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{resource.title}</div>
                      {resource.description && (
                        <p className="text-xs text-muted-foreground truncate">{resource.description}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center ml-2 space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => handleDownload(resource)}
                  >
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Télécharger</span>
                  </Button>
                  
                  <Link 
                    to={resource.url}
                    className={cn(
                      "inline-flex items-center justify-center rounded-md text-sm",
                      "h-8 w-8 p-0 text-muted-foreground hover:text-foreground",
                      "bg-transparent hover:bg-secondary-foreground/10"
                    )}
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Voir le détail</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          
          {resources.length === 0 && (
            <div className="text-center py-6 text-muted-foreground text-sm">
              Aucune ressource disponible pour ce challenge.
            </div>
          )}
          
          <div className="pt-2">
            <Button variant="outline" size="sm" className="w-full text-xs">
              Voir toutes les ressources
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChallengeResources;
