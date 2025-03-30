
import { Trophy } from "lucide-react";
import { MobileNavSection } from "../MobileNavSection";
import { MobileLinkItem } from "../MobileLinkItem";

interface ChallengesSectionProps {
  activeSection: string | null;
  toggleSection: (section: string) => void;
  onCloseMenu: () => void;
}

export const ChallengesSection = ({
  activeSection,
  toggleSection,
  onCloseMenu,
}: ChallengesSectionProps) => {
  return (
    <MobileNavSection
      title="Challenges"
      icon={Trophy}
      activeSection={activeSection}
      sectionId="challenges"
      toggleSection={toggleSection}
    >
      <MobileLinkItem
        to="/challenges?category=Finance"
        label="Finance"
        onClick={onCloseMenu}
      />
      <MobileLinkItem
        to="/challenges?category=E-commerce"
        label="E-commerce"
        onClick={onCloseMenu}
      />
      <MobileLinkItem
        to="/challenges?category=Marketing"
        label="Marketing"
        onClick={onCloseMenu}
      />
      <MobileLinkItem
        to="/challenges"
        label="Tous les challenges"
        primary
        onClick={onCloseMenu}
      />
    </MobileNavSection>
  );
};
