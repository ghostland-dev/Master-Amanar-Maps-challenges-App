
import React from "react";
import { ListTodo, Info, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChallengeSteps from "@/components/challenge/ChallengeSteps";
import { OverviewTab } from "./OverviewTab";
import { PrerequisitesTab } from "./PrerequisitesTab";
import { Challenge } from "@/utils/challenge/types";

interface ChallengeTabsProps {
  challenge: Challenge;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onUpdateProgress?: (currentStep: number, progress: number) => void;
}

export const ChallengeTabs = ({ 
  challenge, 
  activeTab, 
  setActiveTab,
  onUpdateProgress
}: ChallengeTabsProps) => {
  return (
    <div className="mb-6">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="steps" className="flex-1">
            <ListTodo className="mr-2 h-4 w-4" />
            Étapes
          </TabsTrigger>
          <TabsTrigger value="overview" className="flex-1">
            <Info className="mr-2 h-4 w-4" />
            Vue d'ensemble
          </TabsTrigger>
          {challenge.prerequisites && (
            <TabsTrigger value="prerequisites" className="flex-1">
              <CheckCircle className="mr-2 h-4 w-4" />
              Prérequis
            </TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="steps">
          <ChallengeSteps 
            steps={challenge.steps}
            currentStep={challenge.currentStep}
            totalSteps={challenge.totalSteps}
            onProgressUpdate={onUpdateProgress}
          />
        </TabsContent>
        
        <TabsContent value="overview">
          <OverviewTab 
            description={challenge.description}
            objective={challenge.objective}
            learningOutcomes={challenge.learningOutcomes}
            setActiveTab={setActiveTab}
          />
        </TabsContent>
        
        <TabsContent value="prerequisites">
          <PrerequisitesTab 
            prerequisites={challenge.prerequisites}
            setActiveTab={setActiveTab}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
