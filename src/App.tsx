
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages publiques
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Simulator from "./pages/Simulator";
import Simulators from "./pages/Simulators";
import MarginCalculator from "./pages/MarginCalculator";
import AdBudgetCalculator from "./pages/AdBudgetCalculator";
import PassiveIncomeCalculator from "./pages/PassiveIncomeCalculator";
import TrendAnalysis from "./pages/TrendAnalysis";
import NotFound from "./pages/NotFound";
import Library from "./pages/Library";
import LibraryItem from "./pages/LibraryItem";

// Pages protégées (utilisateur connecté)
import Dashboard from "./pages/Dashboard";
import Challenges from "./pages/challenges";
import Challenge from "./pages/challenge";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Leaderboard from "./pages/Leaderboard";

// Pages admin
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
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="/simulators" element={<Simulators />} />
            <Route path="/simulator/margin" element={<MarginCalculator />} />
            <Route path="/simulator/ad-budget" element={<AdBudgetCalculator />} />
            <Route path="/simulator/passive-income" element={<PassiveIncomeCalculator />} />
            <Route path="/simulator/trend-analysis" element={<TrendAnalysis />} />
            <Route path="/library" element={<Library />} />
            <Route path="/library/:id" element={<LibraryItem />} />
            
            {/* Routes protégées (utilisateur connecté) */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/challenges" element={
              <ProtectedRoute>
                <Challenges />
              </ProtectedRoute>
            } />
            <Route path="/challenge/:id" element={
              <ProtectedRoute>
                <Challenge />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/notifications" element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            } />
            <Route path="/leaderboard" element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            } />
            
            {/* Routes admin */}
            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <SuperAdmin />
              </ProtectedRoute>
            } />
            <Route path="/admin/challenges" element={
              <ProtectedRoute adminOnly>
                <ChallengeManager />
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute adminOnly>
                <UserManager />
              </ProtectedRoute>
            } />
            <Route path="/admin/subscriptions" element={
              <ProtectedRoute adminOnly>
                <SubscriptionManager />
              </ProtectedRoute>
            } />
            <Route path="/admin/analytics" element={
              <ProtectedRoute adminOnly>
                <AnalyticsManager />
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute adminOnly>
                <AdminSettings />
              </ProtectedRoute>
            } />
            
            {/* Route 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
