
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ChallengeGridView from "./ChallengeGridView";
import ChallengeListView from "./ChallengeListView";
import { Challenge } from "@/utils/challenge/types";

interface ChallengeDisplayModeTabsProps {
  displayMode: "grid" | "list";
  isLoading: boolean;
  filteredChallenges: (Challenge & { id: string })[];
  resetFilters: () => void;
  normalizeDifficulty: (difficulty: string) => "beginner" | "intermediate" | "advanced";
}

const ChallengeDisplayModeTabs = ({
  displayMode,
  isLoading,
  filteredChallenges,
  resetFilters,
  normalizeDifficulty
}: ChallengeDisplayModeTabsProps) => {
  return (
    <Tabs value={displayMode} className="w-full">
      <TabsContent value="grid" className="mt-0">
        <ChallengeGridView 
          challenges={filteredChallenges} 
          isLoading={isLoading} 
          resetFilters={resetFilters} 
          normalizeDifficulty={normalizeDifficulty} 
        />
      </TabsContent>

      <TabsContent value="list" className="mt-0">
        <ChallengeListView 
          challenges={filteredChallenges} 
          isLoading={isLoading} 
          resetFilters={resetFilters} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default ChallengeDisplayModeTabs;
