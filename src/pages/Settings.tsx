
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { SettingsTabs } from "@/components/settings/SettingsTabs";

const Settings = () => {
  useEffect(() => {
    document.title = "FinQuest - Paramètres";
  }, []);
  
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      <div className="pt-20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-6">
          <SettingsHeader />
          <SettingsTabs />
        </div>
      </div>
    </div>
  );
};

export default Settings;
