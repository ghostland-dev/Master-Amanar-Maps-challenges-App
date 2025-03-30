
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Eye, FileText, FileVideo, Music, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useResourceModalContext } from "@/components/ResourceModalProvider";

interface LibraryItemCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  premium: boolean;
  resourceType: string;
  resourceUrl?: string;
  thumbnailUrl?: string;
}

const LibraryItemCard: React.FC<LibraryItemCardProps> = ({
  id,
  title,
  description,
  category,
  premium,
  resourceType,
  resourceUrl,
  thumbnailUrl,
}) => {
  const { openResourceModal } = useResourceModalContext();

  const handlePreview = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (resourceUrl && (resourceType === "pdf" || resourceType === "video" || resourceType === "audio")) {
      openResourceModal(
        resourceType as "pdf" | "video" | "audio", 
        resourceUrl, 
        title
      );
    }
  };

  const getResourceIcon = () => {
    switch (resourceType) {
      case "pdf":
        return <FileText className="h-5 w-5" />;
      case "video":
        return <FileVideo className="h-5 w-5" />;
      case "audio":
        return <Music className="h-5 w-5" />;
      default:
        return <Book className="h-5 w-5" />;
    }
  };

  const previewSupported = resourceUrl && ["pdf", "video", "audio"].includes(resourceType);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/library/${id}`}>
        <Card className="h-full overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 duration-300 group">
          <div 
            className={cn(
              "h-40 relative bg-secondary/20 overflow-hidden", 
              !thumbnailUrl && "flex items-center justify-center"
            )}
          >
            {thumbnailUrl ? (
              <img 
                src={thumbnailUrl} 
                alt={title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="text-primary/50 text-4xl">{getResourceIcon()}</div>
            )}
            
            {/* Category and premium badge */}
            <div className="absolute top-2 left-2 flex gap-2">
              <Badge variant="secondary" className="bg-secondary/80 backdrop-blur-sm">
                {category}
              </Badge>
              {premium && (
                <Badge className="bg-yellow-500/90 text-primary-foreground backdrop-blur-sm">
                  Premium
                </Badge>
              )}
            </div>
            
            {/* Preview button */}
            {previewSupported && (
              <div className="absolute bottom-2 right-2">
                <Button 
                  size="sm" 
                  variant="secondary"
                  onClick={handlePreview}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Eye className="mr-1 h-4 w-4" />
                  Aperçu
                </Button>
              </div>
            )}
          </div>
          
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2 text-muted-foreground text-sm">
              {getResourceIcon()}
              <span className="capitalize">{resourceType}</span>
            </div>
            <h3 className="font-medium text-lg line-clamp-1">{title}</h3>
            <p className="text-muted-foreground mt-1 text-sm line-clamp-2">{description}</p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default LibraryItemCard;
