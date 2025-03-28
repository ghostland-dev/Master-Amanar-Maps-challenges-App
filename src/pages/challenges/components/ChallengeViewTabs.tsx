
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ChallengeViewTabsProps {
  viewMode: string;
  setViewMode: (mode: string) => void;
}

const ChallengeViewTabs = ({ viewMode, setViewMode }: ChallengeViewTabsProps) => {
  return (
    <Tabs value={viewMode} onValueChange={setViewMode} className="mb-6">
      <TabsList className="grid grid-cols-4 mb-2 w-full sm:w-auto">
        <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
          Tous
        </TabsTrigger>
        <TabsTrigger value="progress" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
          En cours
        </TabsTrigger>
        <TabsTrigger value="completed" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
          Terminés
        </TabsTrigger>
        <TabsTrigger value="new" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
          Nouveaux
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ChallengeViewTabs;
