
import React from "react";
import { X, Download, ExternalLink, File, FileText, Video, Music } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatePresence, motion } from "framer-motion";

export interface MediaResource {
  id: string;
  title: string;
  type: "video" | "pdf" | "audio" | "image" | "link" | "file";
  url: string;
  description?: string;
  fileSize?: string;
  thumbnail?: string;
  duration?: string;
}

interface MediaModalProps {
  resource: MediaResource | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MediaModal = ({ resource, open, onOpenChange }: MediaModalProps) => {
  if (!resource) return null;

  const renderMediaContent = () => {
    switch (resource.type) {
      case "video":
        return (
          <div className="relative aspect-video w-full rounded-md overflow-hidden bg-black">
            <video
              src={resource.url}
              controls
              className="w-full h-full object-contain"
              poster={resource.thumbnail}
              autoPlay={false}
            />
          </div>
        );
      case "pdf":
        return (
          <div className="relative w-full h-[60vh] rounded-md overflow-hidden border">
            <iframe 
              src={`${resource.url}#toolbar=0&navpanes=0`} 
              className="w-full h-full"
              title={resource.title}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-2 flex justify-center">
              <Button variant="outline" asChild>
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Ouvrir dans un nouvel onglet
                </a>
              </Button>
            </div>
          </div>
        );
      case "audio":
        return (
          <div className="w-full p-4 bg-muted/40 rounded-md">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <Music className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">{resource.title}</h3>
                {resource.duration && (
                  <p className="text-sm text-muted-foreground">{resource.duration}</p>
                )}
              </div>
            </div>
            <audio controls className="w-full">
              <source src={resource.url} />
              Votre navigateur ne supporte pas la lecture audio.
            </audio>
          </div>
        );
      case "image":
        return (
          <div className="relative rounded-md overflow-hidden">
            <img src={resource.url} alt={resource.title} className="w-full h-auto" />
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center p-10 bg-muted/20 rounded-md">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              {resource.type === "pdf" ? (
                <FileText className="h-10 w-10 text-primary" />
              ) : (
                <File className="h-10 w-10 text-primary" />
              )}
            </div>
            <h3 className="font-medium text-lg mb-2">{resource.title}</h3>
            <Button variant="default" asChild>
              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4 mr-2" />
                Télécharger
              </a>
            </Button>
          </div>
        );
    }
  };

  const getTypeIcon = () => {
    switch (resource.type) {
      case "video": return <Video className="h-4 w-4" />;
      case "pdf": return <FileText className="h-4 w-4" />;
      case "audio": return <Music className="h-4 w-4" />;
      case "file":
      default: return <File className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl overflow-hidden p-0">
        <DialogClose className="absolute right-4 top-4 z-10">
          <Button size="icon" variant="ghost">
            <X className="h-4 w-4" />
          </Button>
        </DialogClose>

        <div className="flex flex-col">
          {renderMediaContent()}

          <div className="p-6">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl">{resource.title}</DialogTitle>
                <Badge variant="outline" className="flex items-center gap-1">
                  {getTypeIcon()}
                  {resource.type.toUpperCase()}
                  {resource.fileSize && ` • ${resource.fileSize}`}
                </Badge>
              </div>
            </DialogHeader>

            {resource.description && (
              <motion.p 
                className="mt-4 text-muted-foreground"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {resource.description}
              </motion.p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
