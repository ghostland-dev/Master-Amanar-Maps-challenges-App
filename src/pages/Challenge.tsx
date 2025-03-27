
import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import { fadeIn, slideIn } from "@/lib/animations";
import { getChallengeData } from "@/utils/challengeData";
import ChallengeInfo from "@/components/challenge/ChallengeInfo";
import ChallengeResources from "@/components/challenge/ChallengeResources";
import ChallengeSteps from "@/components/challenge/ChallengeSteps";

const Challenge = () => {
  const { id } = useParams<{ id: string }>();
  const infoRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  
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

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      <div className="pt-20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-6">
          <Link to="/challenges" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Retour aux challenges
          </Link>
          
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
