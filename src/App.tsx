
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Challenges from "./pages/Challenges";
import Challenge from "./pages/challenge";
import Simulator from "./pages/Simulator";
import Simulators from "./pages/Simulators";
import MarginCalculator from "./pages/MarginCalculator";
import AdBudgetCalculator from "./pages/AdBudgetCalculator";
import PassiveIncomeCalculator from "./pages/PassiveIncomeCalculator";
import TrendAnalysis from "./pages/TrendAnalysis";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Leaderboard from "./pages/Leaderboard";
import Library from "./pages/Library";
import LibraryItem from "./pages/LibraryItem";
import SuperAdmin from "./pages/SuperAdmin";
import ChallengeManager from "./pages/admin/ChallengeManager";
import UserManager from "./pages/admin/UserManager";
import SubscriptionManager from "./pages/admin/SubscriptionManager";
import AnalyticsManager from "./pages/admin/AnalyticsManager";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/challenge/:id" element={<Challenge />} />
          <Route path="/simulator" element={<Simulator />} />
          <Route path="/simulators" element={<Simulators />} />
          <Route path="/simulator/margin" element={<MarginCalculator />} />
          <Route path="/simulator/ad-budget" element={<AdBudgetCalculator />} />
          <Route path="/simulator/passive-income" element={<PassiveIncomeCalculator />} />
          <Route path="/simulator/trend-analysis" element={<TrendAnalysis />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/library" element={<Library />} />
          <Route path="/library/:id" element={<LibraryItem />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<SuperAdmin />} />
          <Route path="/admin/challenges" element={<ChallengeManager />} />
          <Route path="/admin/users" element={<UserManager />} />
          <Route path="/admin/subscriptions" element={<SubscriptionManager />} />
          <Route path="/admin/analytics" element={<AnalyticsManager />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
