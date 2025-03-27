
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <button
      onClick={onSelect}
      className={cn(
        "flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors",
        isSelected 
          ? "bg-primary text-primary-foreground" 
          : "hover:bg-muted"
      )}
    >
      <div className="flex items-center">
        <Icon className="h-4 w-4 mr-2" />
        <span>{name}</span>
      </div>
      <span className={cn(
        "text-xs rounded-full px-2 py-0.5",
        isSelected 
          ? "bg-primary-foreground/20 text-primary-foreground" 
          : "bg-muted-foreground/20 text-muted-foreground"
      )}>
        {count}
      </span>
    </button>
  );
}
