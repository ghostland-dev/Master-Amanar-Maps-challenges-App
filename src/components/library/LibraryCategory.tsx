
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  count: number;
}

interface LibraryCategoryProps {
  category: Category;
  isSelected: boolean;
  onSelect: () => void;
}

export function LibraryCategory({ category, isSelected, onSelect }: LibraryCategoryProps) {
  const { name, icon: Icon, count } = category;
  
  return (
    <motion.button
      onClick={onSelect}
      className={cn(
        "flex items-center justify-between w-full px-3 py-3 text-sm rounded-lg transition-all duration-300 hover:shadow-md",
        isSelected 
          ? "bg-primary text-primary-foreground shadow-sm" 
          : "hover:bg-muted"
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center">
        <div className={cn(
          "p-1.5 rounded-md mr-3",
          isSelected 
            ? "bg-primary-foreground/20" 
            : "bg-muted"
        )}>
          <Icon className="h-4 w-4" />
        </div>
        <span className="font-medium">{name}</span>
      </div>
      <span className={cn(
        "text-xs rounded-full px-2.5 py-1",
        isSelected 
          ? "bg-primary-foreground/20 text-primary-foreground" 
          : "bg-muted-foreground/20 text-muted-foreground"
      )}>
        {count}
      </span>
    </motion.button>
  );
}
