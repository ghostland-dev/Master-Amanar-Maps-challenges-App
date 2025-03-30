
import { useState } from "react";
import { MediaCard } from "./MediaCard";
import { MediaModal, MediaResource } from "./MediaModal";
import { motion } from "framer-motion";

interface MediaGridProps {
  resources: MediaResource[];
  columns?: number;
}

export const MediaGrid = ({ resources, columns = 3 }: MediaGridProps) => {
  const [selectedResource, setSelectedResource] = useState<MediaResource | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenResource = (resource: MediaResource) => {
    setSelectedResource(resource);
    setModalOpen(true);
  };

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Item animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <>
      <motion.div 
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${Math.min(columns, 3)} lg:grid-cols-${columns} gap-4`}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {resources.map((resource) => (
          <motion.div key={resource.id} variants={itemVariants}>
            <MediaCard 
              resource={resource} 
              onClick={handleOpenResource}
            />
          </motion.div>
        ))}
      </motion.div>

      <MediaModal 
        resource={selectedResource} 
        open={modalOpen} 
        onOpenChange={setModalOpen} 
      />
    </>
  );
};
