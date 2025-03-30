
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, FileVideo, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceType: "pdf" | "video" | "audio" | null;
  resourceUrl: string;
  title: string;
}

export const ResourceModal: React.FC<ResourceModalProps> = ({
  isOpen,
  onClose,
  resourceType,
  resourceUrl,
  title,
}) => {
  if (!isOpen) return null;

  const getResourceIcon = () => {
    switch (resourceType) {
      case "pdf":
        return <FileText className="h-6 w-6 text-primary" />;
      case "video":
        return <FileVideo className="h-6 w-6 text-primary" />;
      case "audio":
        return <Music className="h-6 w-6 text-primary" />;
      default:
        return null;
    }
  };

  const renderResource = () => {
    switch (resourceType) {
      case "pdf":
        return (
          <iframe
            src={resourceUrl}
            className="w-full h-full border-0"
            title={title}
          />
        );
      case "video":
        return (
          <video
            src={resourceUrl}
            controls
            className="w-full max-h-[70vh]"
            title={title}
          />
        );
      case "audio":
        return (
          <div className="w-full flex flex-col items-center p-4 bg-secondary/20 rounded-lg">
            <audio src={resourceUrl} controls className="w-full my-4" />
            <p className="text-center text-lg font-medium">{title}</p>
          </div>
        );
      default:
        return <div>Ressource non prise en charge</div>;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed left-[50%] top-[50%] z-50 w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] bg-background border border-border rounded-lg shadow-lg overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                {getResourceIcon()}
                <h3 className="text-lg font-semibold">{title}</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Fermer</span>
              </Button>
            </div>
            <div className="p-4 min-h-[200px] max-h-[80vh] overflow-auto">
              {renderResource()}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const useResourceModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [resourceData, setResourceData] = React.useState<{
    type: "pdf" | "video" | "audio" | null;
    url: string;
    title: string;
  }>({
    type: null,
    url: "",
    title: "",
  });

  const openResourceModal = (
    type: "pdf" | "video" | "audio",
    url: string,
    title: string
  ) => {
    setResourceData({ type, url, title });
    setIsOpen(true);
  };

  const closeResourceModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    resourceData,
    openResourceModal,
    closeResourceModal,
  };
};
