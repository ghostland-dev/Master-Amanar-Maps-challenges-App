
import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ChevronLeft, 
  Download, 
  FileText, 
  Share2, 
  Bookmark, 
  CalendarDays 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { fadeIn, slideIn } from "@/lib/animations";
import { getChallengeData } from "@/utils/challengeData";
import ChallengeInfo from "@/components/challenge/ChallengeInfo";
import ChallengeResources from "@/components/challenge/ChallengeResources";
import ChallengeSteps from "@/components/challenge/ChallengeSteps";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { generatePdfFromData } from "@/utils/pdfGenerator";
import { useToast } from "@/components/ui/use-toast";

const Challenge = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const infoRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Animation des éléments au chargement
  useEffect(() => {
    if (infoRef.current) fadeIn(infoRef.current);
    if (stepsRef.current) slideIn(stepsRef.current, 'right', 0.3);
    if (resourcesRef.current) slideIn(resourcesRef.current, 'up', 0.6);
  }, []);
  
  // Get challenge data based on ID
  const challenge = getChallengeData(id || "1");
  
  useEffect(() => {
    document.title = `FinQuest - ${challenge.title}`;
  }, [challenge.title]);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Challenge retiré des favoris" : "Challenge ajouté aux favoris",
      description: isBookmarked ? 
        "Vous ne recevrez plus de notifications pour ce challenge" : 
        "Vous recevrez des notifications sur les mises à jour",
      variant: "default",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast({
        title: "Lien copié",
        description: "Le lien du challenge a été copié dans le presse-papier",
        variant: "default",
      });
    });
  };

  const downloadChallengeGuide = () => {
    const data = {
      "Challenge": {
        "Titre": challenge.title,
        "Niveau": challenge.difficulty || "Non spécifié", // Change level to difficulty
        "Description": challenge.description,
        "Durée estimée": challenge.duration,
        "Date de début": new Date().toLocaleDateString(),
        "Progression": `${challenge.currentStep}/${challenge.totalSteps} étapes complétées`,
      },
      "Étapes": challenge.steps.map(step => ({
        "Titre": step.title,
        "Description": step.description,
        "Status": step.isCompleted ? "Terminé" : step.isLocked ? "Bloqué" : "En cours"
      })),
      "Ressources": challenge.resources.map(resource => ({
        "Titre": resource.title,
        "Type": resource.type
      }))
    };

    try {
      generatePdfFromData(data, {
        title: `Guide du challenge: ${challenge.title}`,
        filename: `challenge-${id}-guide.pdf`,
        subject: "Guide de challenge FinQuest"
      });
      
      toast({
        title: "Guide téléchargé",
        description: "Le guide complet du challenge a été téléchargé avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer le PDF",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      <div className="pt-20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <div>
              <Link to="/challenges" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Retour aux challenges
              </Link>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {challenge.title}
              </h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1"
                onClick={handleBookmark}
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-primary text-primary' : ''}`} />
                <span className="hidden sm:inline">{isBookmarked ? "Enregistré" : "Enregistrer"}</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Partager</span>
              </Button>
              
              <Button 
                variant="default" 
                size="sm" 
                className="gap-1"
                onClick={downloadChallengeGuide}
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Guide PDF</span>
              </Button>
            </div>
          </div>
          
          <div className="mb-6">
            <Card className="p-4 bg-secondary/30">
              <div className="flex flex-wrap gap-2 items-center">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                  <FileText className="mr-1 h-3.5 w-3.5" />
                  Niveau: {challenge.difficulty || "Non spécifié"} {/* Change level to difficulty */}
                </Badge>
                
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                  <CalendarDays className="mr-1 h-3.5 w-3.5" />
                  Durée: {challenge.duration}
                </Badge>
                
                <div className="ml-auto flex items-center">
                  <span className="text-sm text-muted-foreground mr-2">Progression:</span>
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${(challenge.currentStep / challenge.totalSteps) * 100}%` }}
                    />
                  </div>
                  <span className="ml-2 text-sm font-medium">
                    {Math.round((challenge.currentStep / challenge.totalSteps) * 100)}%
                  </span>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Challenge info */}
            <div ref={infoRef} className="lg:col-span-1">
              <ChallengeInfo challenge={challenge} />
              
              {/* Resources */}
              <div ref={resourcesRef} className="mt-8">
                <ChallengeResources resources={challenge.resources} />
              </div>
            </div>
            
            {/* Steps */}
            <div ref={stepsRef} className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3 flex items-center">
                  <CalendarDays className="mr-2 h-5 w-5 text-primary" />
                  Plan du challenge
                </h2>
                <p className="text-muted-foreground">
                  Suivez ces étapes structurées pour réussir ce challenge et améliorer vos compétences financières.
                </p>
                <Separator className="my-4" />
              </div>
              
              <ChallengeSteps 
                steps={challenge.steps}
                currentStep={challenge.currentStep}
                totalSteps={challenge.totalSteps}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenge;
