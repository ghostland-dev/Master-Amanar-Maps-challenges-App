
import { Book, Crown } from "lucide-react";
import { MobileNavSection } from "../MobileNavSection";
import { MobileLinkItem } from "../MobileLinkItem";

interface LibrarySectionProps {
  activeSection: string | null;
  toggleSection: (section: string) => void;
  hasPremiumAccess: boolean;
  onCloseMenu: () => void;
}

export const LibrarySection = ({
  activeSection,
  toggleSection,
  hasPremiumAccess,
  onCloseMenu,
}: LibrarySectionProps) => {
  return (
    <MobileNavSection
      title="Bibliothèque"
      icon={Book}
      activeSection={activeSection}
      sectionId="library"
      toggleSection={toggleSection}
    >
      <MobileLinkItem
        to="/library?category=Marketing"
        label="Marketing"
        onClick={onCloseMenu}
      />
      <MobileLinkItem
        to="/library?category=Finance"
        label="Finance"
        onClick={onCloseMenu}
      />
      {hasPremiumAccess && (
        <MobileLinkItem
          to="/library?premium=true"
          label="Contenu Premium"
          icon={<Crown className="ml-1 h-3 w-3 text-yellow-500" />}
          onClick={onCloseMenu}
        />
      )}
      <MobileLinkItem
        to="/library"
        label="Toute la bibliothèque"
        primary
        onClick={onCloseMenu}
      />
    </MobileNavSection>
  );
};
