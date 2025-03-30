
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Video, Music, Image, File, Play } from "lucide-react";
import { MediaResource } from "./MediaModal";

interface MediaCardProps {
  resource: MediaResource;
  onClick: (resource: MediaResource) => void;
}

export const MediaCard = ({ resource, onClick }: MediaCardProps) => {
  const getTypeIcon = () => {
    switch (resource.type) {
      case "video": return <Video className="h-4 w-4" />;
      case "pdf": return <FileText className="h-4 w-4" />;
      case "audio": return <Music className="h-4 w-4" />;
      case "image": return <Image className="h-4 w-4" />;
      default: return <File className="h-4 w-4" />;
    }
  };

  const getThumbnail = () => {
    if (resource.thumbnail) {
      return (
        <div className="relative aspect-video w-full overflow-hidden rounded-t-md">
          <img 
            src={resource.thumbnail} 
            alt={resource.title} 
            className="w-full h-full object-cover"
          />
          {resource.type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Play className="h-5 w-5 text-white fill-white" />
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="aspect-video w-full bg-muted flex items-center justify-center rounded-t-md">
        <div className="h-14 w-14 rounded-full bg-muted-foreground/10 flex items-center justify-center">
          {getTypeIcon()}
        </div>
      </div>
    );
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      {getThumbnail()}
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium line-clamp-1">{resource.title}</h3>
          <Badge variant="outline" className="ml-2 shrink-0">
            {resource.type}
          </Badge>
        </div>
        {resource.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {resource.description}
          </p>
        )}
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0">
        <Button 
          onClick={() => onClick(resource)}
          variant="outline"
          className="w-full"
        >
          Voir la ressource
        </Button>
      </CardFooter>
    </Card>
  );
};
