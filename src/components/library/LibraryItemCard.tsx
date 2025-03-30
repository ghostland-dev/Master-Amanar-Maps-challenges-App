
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LucideIcon, Clock, BookmarkPlus } from "lucide-react";
import { Link } from "react-router-dom";

interface LibraryItem {
  id: string;
  title: string;
  description: string;
  type: string;
  category: string;
  image: string;
  duration: number;
  difficulty: string;
  progress: number;
}

interface LibraryItemCardProps {
  item: LibraryItem;
  typeIcon: LucideIcon;
}

export function LibraryItemCard({ item, typeIcon: TypeIcon }: LibraryItemCardProps) {
  // Function to format duration
  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
    }
  };
  
  // Function to get color based on difficulty
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "débutant": return "bg-green-500";
      case "intermédiaire": return "bg-yellow-500";
      case "avancé": return "bg-red-500";
      default: return "bg-blue-500";
    }
  };
  
  // Determine button text based on progress
  const getButtonText = (progress: number) => {
    if (progress === 0) return "Commencer";
    if (progress === 100) return "Revoir";
    return "Continuer";
  };

  // Use default Pexels image if item.image is not available
  const imageUrl = item.image || `https://images.pexels.com/photos/6694621/pexels-photo-6694621.jpeg?auto=compress&cs=tinysrgb&w=600`;
  
  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-md">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover" 
        />
        <Badge className="absolute top-2 right-2 flex items-center gap-1">
          <TypeIcon className="h-3 w-3" />
          <span>{item.type === "ebook" ? "E-Book" : item.type.charAt(0).toUpperCase() + item.type.slice(1)}</span>
        </Badge>
        {item.progress > 0 && item.progress < 100 && (
          <div className="absolute bottom-0 left-0 right-0">
            <Progress value={item.progress} className="h-1 rounded-none" />
          </div>
        )}
      </div>
      <CardContent className="pt-4 flex-grow">
        <h3 className="font-medium line-clamp-2 mb-1">{item.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{item.description}</p>
        <div className="flex items-center gap-2 mt-auto">
          <Badge variant="outline" className="capitalize">{item.category}</Badge>
          <Badge className={getDifficultyColor(item.difficulty)}>
            {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pb-4 pt-0">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          {formatDuration(item.duration)}
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <BookmarkPlus className="h-4 w-4" />
          </Button>
          <Link to={`/library/${item.id}`}>
            <Button size="sm">
              {getButtonText(item.progress)}
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
