
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface MediaResource {
  id: string;
  title: string;
  type: "video" | "pdf" | "audio" | "image";
  url: string;
  description?: string;
  thumbnail?: string;
  duration?: string;
  fileSize?: string;
}

interface MediaModalProps {
  resource: MediaResource | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MediaModal = ({ resource, open, onOpenChange }: MediaModalProps) => {
  if (!resource) return null;

  const renderResourceContent = () => {
    switch (resource.type) {
      case "video":
        return (
          <video 
            src={resource.url} 
            controls 
            className="w-full rounded-md" 
            poster={resource.thumbnail}
          >
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>
        );
      case "audio":
        return (
          <div className="bg-muted/30 p-4 rounded-md">
            <div className="mb-4 flex justify-center">
              <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              </div>
            </div>
            <audio src={resource.url} controls className="w-full">
              Votre navigateur ne supporte pas la lecture audio.
            </audio>
          </div>
        );
      case "pdf":
        return (
          <div className="space-y-4">
            <div className="bg-muted/30 p-4 rounded-md flex items-center justify-between">
              <div className="flex items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-danger-500 mr-3">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M9 15v-2h6v2" />
                </svg>
                <div>
                  <p className="font-medium">{resource.title}</p>
                  <p className="text-sm text-muted-foreground">{resource.fileSize || 'PDF Document'}</p>
                </div>
              </div>
              <a 
                href={resource.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm"
              >
                Ouvrir le PDF
              </a>
            </div>
            <iframe 
              src={`${resource.url}#view=FitH`} 
              className="w-full h-[60vh] rounded-md border" 
              title={resource.title}
            >
              Ce navigateur ne permet pas l'affichage des PDF intégrés.
            </iframe>
          </div>
        );
      case "image":
        return (
          <img 
            src={resource.url} 
            alt={resource.title} 
            className="max-h-[80vh] mx-auto rounded-md" 
          />
        );
      default:
        return (
          <div className="p-4 border rounded-md">
            <a 
              href={resource.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Ouvrir la ressource
            </a>
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>{resource.title}</span>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {renderResourceContent()}

          {resource.description && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-1">Description:</h4>
              <p className="text-sm text-muted-foreground">{resource.description}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
