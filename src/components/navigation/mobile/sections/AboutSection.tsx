
import { Info, PhoneCall, FileText, Shield } from "lucide-react";
import { MobileNavSection } from "../MobileNavSection";
import { MobileLinkItem } from "../MobileLinkItem";

interface AboutSectionProps {
  activeSection: string | null;
  toggleSection: (section: string) => void;
  onCloseMenu: () => void;
}

export const AboutSection = ({
  activeSection,
  toggleSection,
  onCloseMenu,
}: AboutSectionProps) => {
  return (
    <MobileNavSection
      title="À propos"
      icon={Info}
      activeSection={activeSection}
      sectionId="about"
      toggleSection={toggleSection}
    >
      <MobileLinkItem
        to="/about"
        label="À propos"
        icon={<Info className="ml-1 h-3 w-3" />}
        onClick={onCloseMenu}
      />
      <MobileLinkItem
        to="/contact"
        label="Contact"
        icon={<PhoneCall className="ml-1 h-3 w-3" />}
        onClick={onCloseMenu}
      />
      <MobileLinkItem
        to="/terms-of-service"
        label="Conditions d'utilisation"
        icon={<FileText className="ml-1 h-3 w-3" />}
        onClick={onCloseMenu}
      />
      <MobileLinkItem
        to="/privacy-policy"
        label="Politique de confidentialité"
        icon={<Shield className="ml-1 h-3 w-3" />}
        onClick={onCloseMenu}
      />
    </MobileNavSection>
  );
};
