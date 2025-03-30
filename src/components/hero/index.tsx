
import HeroHeader from "./HeroHeader";
import StatsSection from "./StatsSection";
import HeroImage from "./HeroImage";
import FeatureSection from "./FeatureSection";
import WhySection from "./WhySection";
import TestimonialSection from "./TestimonialSection";
import CtaSection from "./CtaSection";
import SubscriptionPalette from "./SubscriptionPalette";

const Hero = () => {
  return (
    <div className="pt-24 pb-0 min-h-screen bg-gradient-to-b from-background to-secondary/5 transition-colors duration-300">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Hero section */}
        <HeroHeader />
        
        {/* Stats section */}
        <StatsSection />
        
        {/* Section image mockup */}
        <HeroImage />
        
        {/* Subscription palette */}
        <SubscriptionPalette />
        
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
