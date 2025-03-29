
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LibraryHeaderProps {
  title: string;
  description: string;
  itemCount: number;
  sortOrder: string;
  setSortOrder: (value: string) => void;
}

export function LibraryHeader({ 
  title, 
  description, 
  itemCount, 
  sortOrder, 
  setSortOrder 
}: LibraryHeaderProps) {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">
          {itemCount} Ressources disponibles
        </h2>
        <Select onValueChange={setSortOrder} defaultValue={sortOrder}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Pertinence</SelectItem>
            <SelectItem value="title">Titre</SelectItem>
            <SelectItem value="duration">Durée</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
