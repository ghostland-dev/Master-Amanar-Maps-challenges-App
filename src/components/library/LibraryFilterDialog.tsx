
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface LibraryFilterDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  defaultValues: {
    category: string;
    type: string;
    difficulty: string;
    completed: boolean;
    premium: "all" | "free" | "premium";
    search: string;
  };
  onSubmit: (values: {
    category: string;
    type: string;
    difficulty: string;
    completed: boolean;
    premium: "all" | "free" | "premium";
    search: string;
  }) => void;
  onReset: () => void;
}

export function LibraryFilterDialog({
  isOpen,
  onOpenChange,
  defaultValues,
  onSubmit,
  onReset,
}: LibraryFilterDialogProps) {
  const [category, setCategory] = React.useState(defaultValues.category);
  const [type, setType] = React.useState(defaultValues.type);
  const [difficulty, setDifficulty] = React.useState(defaultValues.difficulty);
  const [completed, setCompleted] = React.useState(defaultValues.completed);
  const [premium, setPremium] = React.useState<"all" | "free" | "premium">(defaultValues.premium);

  React.useEffect(() => {
    setCategory(defaultValues.category);
    setType(defaultValues.type);
    setDifficulty(defaultValues.difficulty);
    setCompleted(defaultValues.completed);
    setPremium(defaultValues.premium);
  }, [defaultValues, isOpen]);

  const handleSubmit = () => {
    onSubmit({
      category,
      type,
      difficulty,
      completed,
      premium,
      search: defaultValues.search,
    });
  };

  const handleReset = () => {
    setCategory("");
    setType("");
    setDifficulty("");
    setCompleted(false);
    setPremium("all");
    onReset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filtrer les ressources</DialogTitle>
          <DialogDescription>
            Affinez les résultats selon vos préférences
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Catégorie
            </Label>
            <Select
              value={category}
              onValueChange={setCategory}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Toutes les catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Toutes les catégories</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="E-commerce">E-commerce</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select
              value={type}
              onValueChange={setType}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Tous les types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les types</SelectItem>
                <SelectItem value="article">Article</SelectItem>
                <SelectItem value="video">Vidéo</SelectItem>
                <SelectItem value="ebook">Ebook</SelectItem>
                <SelectItem value="podcast">Podcast</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="difficulty" className="text-right">
              Difficulté
            </Label>
            <Select
              value={difficulty}
              onValueChange={setDifficulty}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Toutes les difficultés" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Toutes les difficultés</SelectItem>
                <SelectItem value="débutant">Débutant</SelectItem>
                <SelectItem value="intermédiaire">Intermédiaire</SelectItem>
                <SelectItem value="avancé">Avancé</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="premium" className="text-right">
              Accès
            </Label>
            <Select
              value={premium}
              onValueChange={(value: "all" | "free" | "premium") => setPremium(value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Tous les contenus" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les contenus</SelectItem>
                <SelectItem value="free">Gratuit uniquement</SelectItem>
                <SelectItem value="premium">Premium uniquement</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="completed" className="text-right">
              Complété
            </Label>
            <div className="flex items-center space-x-2 col-span-3">
              <Switch
                id="completed"
                checked={completed}
                onCheckedChange={setCompleted}
              />
              <Label htmlFor="completed">Afficher uniquement les ressources complétées</Label>
            </div>
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleReset} className="sm:w-auto w-full">
            Réinitialiser
          </Button>
          <Button onClick={handleSubmit} className="sm:w-auto w-full">
            Appliquer les filtres
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
