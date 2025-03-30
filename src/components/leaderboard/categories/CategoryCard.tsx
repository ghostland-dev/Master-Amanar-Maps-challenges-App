
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LucideIcon } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from "framer-motion";

interface CategoryStats {
  participants: number;
  challengesCompleted: number;
  avgXp: number;
}

interface CategoryCardProps {
  id: string;
  name: string;
  icon: LucideIcon;
  stats: CategoryStats;
  isSelected: boolean;
  onClick: () => void;
  image?: string;
}

export const CategoryCard = ({ 
  id, 
  name, 
  icon: CategoryIcon, 
  stats, 
  isSelected, 
  onClick,
  image
}: CategoryCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Card 
        className={`cursor-pointer transition-all duration-300 h-full ${
          isSelected ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" : "hover:shadow-md"
        }`}
        onClick={onClick}
      >
        {image && (
          <AspectRatio ratio={16/9} className="bg-muted rounded-t-lg overflow-hidden">
            <img 
              src={image} 
              alt={name}
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-60"></div>
          </AspectRatio>
        )}
        
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className={`h-12 w-12 rounded-full ${isSelected ? 'bg-primary/20' : 'bg-primary/10'} flex items-center justify-center transition-all duration-300`}>
              <CategoryIcon className={`h-6 w-6 ${isSelected ? 'text-primary' : 'text-primary/80'}`} />
            </div>
            <div>
              <h3 className="font-medium">{name}</h3>
              <p className="text-sm text-muted-foreground">
                {stats.participants} participants
              </p>
            </div>
          </div>
          <Separator className="my-3" />
          <div className="grid grid-cols-2 gap-3 text-center mt-3">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Challenges</p>
              <p className="font-medium">{stats.challengesCompleted}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">XP Moyenne</p>
              <p className="font-medium">{stats.avgXp}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
