
import { Link } from "react-router-dom";
import { BookOpen, BarChart, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Resource {
  id: number;
  title: string;
  type: string;
  url: string;
}

interface ChallengeResourcesProps {
  resources: Resource[];
}

const ChallengeResources = ({ resources }: ChallengeResourcesProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Ressources</h2>
      <Card className="glass">
        <CardContent className="p-6 space-y-4">
          {resources.map(resource => (
            <Link 
              key={resource.id} 
              to={resource.url} 
              className="flex items-center justify-between p-3 bg-secondary/40 rounded-lg hover:bg-secondary transition-colors"
            >
              <div className="flex items-center">
                {resource.type === 'pdf' && <BookOpen className="h-5 w-5 mr-3 text-primary" />}
                {resource.type === 'template' && <BookOpen className="h-5 w-5 mr-3 text-primary" />}
                {resource.type === 'simulator' && <BarChart className="h-5 w-5 mr-3 text-primary" />}
                <span>{resource.title}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChallengeResources;
