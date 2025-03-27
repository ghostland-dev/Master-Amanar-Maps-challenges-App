
import { Link } from "react-router-dom";
import { BookOpen, BarChart, ChevronRight, Download, File, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { motion } from "motion";
import { cn } from "@/lib/utils";

interface Resource {
  id: number;
  title: string;
  type: string;
  url: string;
  description?: string;
  canDownload?: boolean;
}

interface ChallengeResourcesProps {
  resources: Resource[];
}

const ChallengeResources = ({ resources }: ChallengeResourcesProps) => {
  const handleDownload = (resource: Resource) => {
    // In a real app, this would trigger the actual download
    // For now, we'll just show a toast
    toast({
      title: "Téléchargement démarré",
      description: `Le document "${resource.title}" va être téléchargé.`,
    });
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
            <motion.div
              key={resource.id}
              whileHover={{ scale: 1.01 }}
              className="overflow-hidden rounded-md"
            >
              <div className="flex items-center justify-between p-3 bg-secondary/40 rounded-lg hover:bg-secondary transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    {getResourceIcon(resource.type)}
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{resource.title}</div>
                      {resource.description && (
                        <p className="text-xs text-muted-foreground truncate">{resource.description}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center ml-2 space-x-2">
                  {resource.canDownload && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      onClick={() => handleDownload(resource)}
                    >
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Télécharger</span>
                    </Button>
                  )}
                  
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
            </motion.div>
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
