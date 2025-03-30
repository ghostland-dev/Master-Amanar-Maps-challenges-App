
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import HowItWorksSection from "./components/HowItWorksSection";
import CommissionPlansSection from "./components/CommissionPlansSection";
import FaqSection from "./components/FaqSection";
import CtaSection from "./components/CtaSection";

const Affiliates = () => {
  return (
    <MainLayout title="Programme d'affiliation" description="Gagnez des commissions en recommandant Amanar Map">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <HeroSection />

        {/* Stats Section */}
        <StatsSection />

        {/* How it works */}
        <HowItWorksSection />

        {/* Commission Plans */}
        <CommissionPlansSection />

        {/* FAQ */}
        <FaqSection />

        {/* CTA */}
        <CtaSection />
      </div>
    </MainLayout>
  );
};

export default Affiliates;
