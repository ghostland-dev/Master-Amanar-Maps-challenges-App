
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import HeroSection from "./components/HeroSection";
import ValuesSection from "./components/ValuesSection";
import BenefitsSection from "./components/BenefitsSection";
import OpenPositionsSection from "./components/OpenPositionsSection";
import JoinUsCTA from "./components/JoinUsCTA";

const Careers = () => {
  return (
    <MainLayout title="Carrières" description="Rejoignez l'équipe Amanar Map">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Company Values */}
        <ValuesSection />
        
        {/* Benefits */}
        <BenefitsSection />
        
        {/* Open Positions */}
        <OpenPositionsSection />
        
        {/* Join Us CTA */}
        <JoinUsCTA />
      </div>
    </MainLayout>
  );
};

export default Careers;
