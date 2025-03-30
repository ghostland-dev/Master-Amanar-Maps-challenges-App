
import { useState, ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileNavSectionProps {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  activeSection: string | null;
  sectionId: string;
  toggleSection: (section: string) => void;
}

export const MobileNavSection = ({
  title,
  icon: Icon,
  children,
  activeSection,
  sectionId,
  toggleSection,
}: MobileNavSectionProps) => {
  const isActive = activeSection === sectionId;

  return (
    <div className="border-b border-border">
      <button
        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-accent"
        onClick={() => toggleSection(sectionId)}
      >
        <div className="flex items-center space-x-3">
          <Icon className="h-5 w-5 text-primary" />
          <span className="font-medium">{title}</span>
        </div>
        {isActive ? (
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="h-4 w-4" />
          </motion.div>
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-4 py-1 space-y-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
