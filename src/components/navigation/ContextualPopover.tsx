
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ContextualPopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export const ContextualPopover = ({
  trigger,
  content,
  className = "",
  contentClassName = "",
}: ContextualPopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  // Update position when trigger element changes size or position
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  }, [isOpen]);

  // Handle click outside to close popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current && 
        triggerRef.current && 
        !contentRef.current.contains(event.target as Node) && 
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`relative ${className}`}>
      <div 
        ref={triggerRef}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setTimeout(() => setIsOpen(false), 300)}
      >
        {trigger}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={contentRef}
            className={`absolute z-50 ${contentClassName}`}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              width: contentClassName.includes("w-") ? undefined : `${position.width}px`,
              maxWidth: "calc(100vw - 2rem)"
            }}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
