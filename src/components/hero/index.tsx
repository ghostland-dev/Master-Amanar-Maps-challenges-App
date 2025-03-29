
import HeroHeader from "./HeroHeader";
import StatsSection from "./StatsSection";
import HeroImage from "./HeroImage";
import FeatureSection from "./FeatureSection";
import WhySection from "./WhySection";
import TestimonialSection from "./TestimonialSection";
import CtaSection from "./CtaSection";

const Hero = () => {
  return (
    <div className="pt-24 pb-0">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Hero section */}
        <HeroHeader />
        
        {/* Stats section */}
        <StatsSection />
        
        {/* Section image mockup */}
        <HeroImage />
        
        {/* Features */}
        <FeatureSection />
        
        {/* Section "Pourquoi FinQuest" */}
        <WhySection />
        
        {/* Témoignages */}
        <TestimonialSection />
        
        {/* CTA */}
        <CtaSection />
      </div>
    </div>
  );
};

export default Hero;
