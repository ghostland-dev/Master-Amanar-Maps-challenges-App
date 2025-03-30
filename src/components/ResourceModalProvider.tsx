
import React, { createContext, useContext, ReactNode } from "react";
import { ResourceModal, useResourceModal } from "./ResourceModal";

interface ResourceModalContextProps {
  openResourceModal: (type: "pdf" | "video" | "audio", url: string, title: string) => void;
  closeResourceModal: () => void;
}

const ResourceModalContext = createContext<ResourceModalContextProps | undefined>(undefined);

export const useResourceModalContext = () => {
  const context = useContext(ResourceModalContext);
  if (!context) {
    throw new Error("useResourceModalContext must be used within a ResourceModalProvider");
  }
  return context;
};

export const ResourceModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { 
    isOpen, 
    resourceData, 
    openResourceModal, 
    closeResourceModal 
  } = useResourceModal();

  return (
    <ResourceModalContext.Provider value={{ openResourceModal, closeResourceModal }}>
      {children}
      <ResourceModal
        isOpen={isOpen}
        onClose={closeResourceModal}
        resourceType={resourceData.type}
        resourceUrl={resourceData.url}
        title={resourceData.title}
      />
    </ResourceModalContext.Provider>
  );
};
