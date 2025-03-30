
import { Calculator } from "lucide-react";
import { MobileNavSection } from "../MobileNavSection";
import { MobileLinkItem } from "../MobileLinkItem";

interface SimulatorsSectionProps {
  activeSection: string | null;
  toggleSection: (section: string) => void;
  onCloseMenu: () => void;
}

export const SimulatorsSection = ({
  activeSection,
  toggleSection,
  onCloseMenu,
}: SimulatorsSectionProps) => {
  return (
    <MobileNavSection
      title="Simulateurs"
      icon={Calculator}
      activeSection={activeSection}
      sectionId="simulators"
      toggleSection={toggleSection}
    >
      <MobileLinkItem
        to="/margin-calculator"
        label="Calculateur de marges"
        onClick={onCloseMenu}
      />
      <MobileLinkItem
        to="/ad-budget-calculator"
        label="Budget publicitaire"
        onClick={onCloseMenu}
      />
      <MobileLinkItem
        to="/simulators"
        label="Tous les simulateurs"
        primary
        onClick={onCloseMenu}
      />
    </MobileNavSection>
  );
};
