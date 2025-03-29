
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface LibrarySearchProps {
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setIsFilterDialogOpen: (isOpen: boolean) => void;
}

export function LibrarySearch({
  searchQuery,
  onSearchChange,
  setIsFilterDialogOpen
}: LibrarySearchProps) {
  return (
    <div className="flex gap-2 mt-4 md:mt-0">
      <Input
        type="search"
        placeholder="Rechercher une ressource..."
        className="md:w-64"
        value={searchQuery}
        onChange={onSearchChange}
      />
      <Dialog onOpenChange={setIsFilterDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="h-4 w-4" />
            Filtrer
          </Button>
        </DialogTrigger>
      </Dialog>
    </div>
  );
}
