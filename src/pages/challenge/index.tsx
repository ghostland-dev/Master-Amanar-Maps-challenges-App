
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { fadeIn, slideIn } from "@/lib/animations";
import { getChallengeData } from "@/utils/challenge";
import ChallengeInfo from "@/components/challenge/ChallengeInfo";
import ChallengeResources from "@/components/challenge/ChallengeResources";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ChallengeHeader } from "./ChallengeHeader";
import { ChallengeBadges } from "./ChallengeBadges";
import { ChallengeTabs } from "./ChallengeTabs";
import { ChallengeFAQ } from "./ChallengeFAQ";
import { generateChallengePdf } from "./pdfHelpers";

const Challenge = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const infoRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState("steps");
  
  // Get challenge data based on ID
  const [challenge, setChallenge] = useState(getChallengeData(id || "1"));
  
  // Animation des éléments au chargement
  useEffect(() => {
    if (infoRef.current) fadeIn(infoRef.current);
    if (stepsRef.current) slideIn(stepsRef.current, 'right');
    if (resourcesRef.current) slideIn(resourcesRef.current, 'up');
  }, []);
  
  useEffect(() => {
    if (!id) {
      navigate("/challenges");
      return;
    }
    
    const challengeData = getChallengeData(id);
    setChallenge(challengeData);
    document.title = `FinQuest - ${challengeData.title}`;
  }, [id, navigate]);

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
    generateChallengePdf(challenge, toast);
  };

  const handleProgressUpdate = (currentStep: number, progress: number) => {
    setChallenge(prev => ({
      ...prev,
      currentStep,
      progress
    }));
    
    // Ici, vous pourriez enregistrer la progression dans une API
    console.log(`Progress updated: Current Step: ${currentStep}, Progress: ${progress}%`);
    
    // Notifier l'utilisateur de sa progression
    if (progress === 100) {
      toast({
        title: "Challenge terminé !",
        description: `Félicitations ! Vous avez terminé le challenge "${challenge.title}" !`,
      });
    }
  };

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      <div className="pt-20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-6">
          {/* Challenge Header */}
          <ChallengeHeader 
            title={challenge.title}
            isBookmarked={isBookmarked}
            handleBookmark={handleBookmark}
            handleShare={handleShare}
            downloadChallengeGuide={downloadChallengeGuide}
          />
          
          {/* Challenge Badges */}
          <div className="mb-6">
            <Card className="p-4 bg-secondary/30">
              <ChallengeBadges 
                difficulty={challenge.difficulty}
                duration={challenge.duration}
                xp={challenge.xp}
                currentStep={challenge.currentStep}
                totalSteps={challenge.totalSteps}
              />
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
              
              {/* FAQ Section */}
              <ChallengeFAQ faqs={challenge.faqs} />
            </div>
            
            {/* Main content */}
            <div ref={stepsRef} className="lg:col-span-2">
              <ChallengeTabs 
                challenge={challenge}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onUpdateProgress={handleProgressUpdate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenge;
