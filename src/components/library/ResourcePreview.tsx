
import React from "react";
import { Button } from "@/components/ui/button";
import { Eye, FileText, FileVideo, Music, File } from "lucide-react";
import { motion } from "framer-motion";
import { useResourceModal } from "@/components/ResourceModal";

interface ResourcePreviewProps {
  resourceType: "pdf" | "video" | "audio" | "other"; 
  resourceUrl: string;
  title: string;
  description?: string;
}

const ResourcePreview: React.FC<ResourcePreviewProps> = ({
  resourceType,
  resourceUrl,
  title,
  description
}) => {
  const { openResourceModal } = useResourceModal();

  const handlePreviewClick = () => {
    if (resourceType !== "other") {
      openResourceModal(resourceType, resourceUrl, title);
    }
  };

  const getResourceIcon = () => {
    switch (resourceType) {
      case "pdf":
        return <FileText className="h-12 w-12 text-primary/70" />;
      case "video":
        return <FileVideo className="h-12 w-12 text-primary/70" />;
      case "audio":
        return <Music className="h-12 w-12 text-primary/70" />;
      default:
        return <File className="h-12 w-12 text-primary/70" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
    >
      <div className="p-4 flex flex-col items-center space-y-4">
        <div className="bg-primary/5 rounded-full p-4">
          {getResourceIcon()}
        </div>
        
        <div className="text-center">
          <h3 className="font-medium text-lg">{title}</h3>
          {description && (
            <p className="text-muted-foreground text-sm mt-1">{description}</p>
          )}
        </div>
        
        {resourceType !== "other" && (
          <Button 
            onClick={handlePreviewClick} 
            variant="outline" 
            className="w-full flex items-center gap-2 mt-4"
          >
            <Eye className="h-4 w-4" />
            Visualiser
          </Button>
        )}
        
        <a 
          href={resourceUrl} 
          download={title}
          className="w-full"
        >
          <Button variant="default" className="w-full">
            Télécharger
          </Button>
        </a>
      </div>
    </motion.div>
  );
};

export default ResourcePreview;
