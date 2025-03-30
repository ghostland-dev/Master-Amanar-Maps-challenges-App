
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface LibraryFiltersProps {
  selectedDifficulty: string | null;
  setSelectedDifficulty: (difficulty: string | null) => void;
  selectedType: string | null;
  setSelectedType: (type: string | null) => void;
}

export function LibraryFilters({
  selectedDifficulty,
  setSelectedDifficulty,
  selectedType,
  setSelectedType
}: LibraryFiltersProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Filtres</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Difficulty filter */}
        <div>
          <h4 className="font-medium text-sm mb-3">Niveau</h4>
          <RadioGroup 
            value={selectedDifficulty || "all"} 
            onValueChange={(value) => setSelectedDifficulty(value === "all" ? null : value)}
          >
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="all" id="difficulty-all" />
              <Label htmlFor="difficulty-all">Tous</Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="débutant" id="difficulty-beginner" />
              <Label htmlFor="difficulty-beginner">Débutant</Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="intermédiaire" id="difficulty-intermediate" />
              <Label htmlFor="difficulty-intermediate">Intermédiaire</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="avancé" id="difficulty-advanced" />
              <Label htmlFor="difficulty-advanced">Avancé</Label>
            </div>
          </RadioGroup>
        </div>
        
        {/* Content type filter */}
        <div>
          <h4 className="font-medium text-sm mb-3">Type de contenu</h4>
          <RadioGroup 
            value={selectedType || "all"} 
            onValueChange={(value) => setSelectedType(value === "all" ? null : value)}
          >
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="all" id="type-all" />
              <Label htmlFor="type-all">Tous</Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="article" id="type-article" />
              <Label htmlFor="type-article">Articles</Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="video" id="type-video" />
              <Label htmlFor="type-video">Vidéos</Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="podcast" id="type-podcast" />
              <Label htmlFor="type-podcast">Podcasts</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ebook" id="type-ebook" />
              <Label htmlFor="type-ebook">E-Books</Label>
            </div>
          </RadioGroup>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={() => {
            setSelectedDifficulty(null);
            setSelectedType(null);
          }}
        >
          Réinitialiser les filtres
        </Button>
      </CardContent>
    </Card>
  );
}
