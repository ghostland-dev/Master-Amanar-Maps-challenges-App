
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileSection } from "./ProfileSection";
import { NotificationsSection } from "./NotificationsSection";
import { SecuritySection } from "./SecuritySection";
import { BillingSection } from "./BillingSection";

export const SettingsTabs = () => {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid grid-cols-4 w-full max-w-md mb-8">
        <TabsTrigger value="profile">Profil</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Sécurité</TabsTrigger>
        <TabsTrigger value="billing">Facturation</TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile">
        <ProfileSection />
      </TabsContent>
      
      <TabsContent value="notifications">
        <NotificationsSection />
      </TabsContent>
      
      <TabsContent value="security">
        <SecuritySection />
      </TabsContent>
      
      <TabsContent value="billing">
        <BillingSection />
      </TabsContent>
    </Tabs>
  );
};
