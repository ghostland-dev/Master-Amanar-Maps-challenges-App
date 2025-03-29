
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
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
import Subscriptions from "./pages/Subscriptions";
import Unauthorized from "./pages/Unauthorized";

// Pages protégées (utilisateur connecté)
import Dashboard from "./pages/Dashboard";
import Challenges from "./pages/challenges";
import Challenge from "./pages/challenge";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Leaderboard from "./pages/Leaderboard";

// Pages spéciales par rôle
import PartnerPortal from "./pages/partner/PartnerPortal";
import AffiliateDashboard from "./pages/affiliate/AffiliateDashboard";
import CommercialDashboard from "./pages/commercial/CommercialDashboard";

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
      <ThemeProvider>
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
              <Route path="/margin-calculator" element={<MarginCalculator />} />
              <Route path="/ad-budget-calculator" element={<AdBudgetCalculator />} />
              <Route path="/simulator/passive-income" element={<PassiveIncomeCalculator />} />
              <Route path="/simulator/trend-analysis" element={<TrendAnalysis />} />
              <Route path="/library" element={<Library />} />
              <Route path="/library/:id" element={<LibraryItem />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              
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
              <Route path="/subscriptions" element={
                <ProtectedRoute>
                  <Subscriptions />
                </ProtectedRoute>
              } />
              
              {/* Routes spécifiques par rôle */}
              <Route path="/partner-portal" element={
                <ProtectedRoute requiredAccess="canAccessPartnerPortal" roles={['partner', 'admin', 'super_admin']}>
                  <PartnerPortal />
                </ProtectedRoute>
              } />
              <Route path="/affiliate-dashboard" element={
                <ProtectedRoute requiredAccess="canAccessAffiliateTools" roles={['affiliate', 'admin', 'super_admin']}>
                  <AffiliateDashboard />
                </ProtectedRoute>
              } />
              <Route path="/commercial-dashboard" element={
                <ProtectedRoute requiredAccess="canAccessCommercialDashboard" roles={['commercial', 'admin', 'super_admin']}>
                  <CommercialDashboard />
                </ProtectedRoute>
              } />
              
              {/* Routes admin */}
              <Route path="/admin" element={
                <ProtectedRoute adminOnly>
                  <SuperAdmin />
                </ProtectedRoute>
              } />
              <Route path="/admin/challenges" element={
                <ProtectedRoute requiredAccess="canManageChallenges" roles={['admin', 'super_admin']}>
                  <ChallengeManager />
                </ProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedRoute requiredAccess="canManageUsers" roles={['admin', 'super_admin']}>
                  <UserManager />
                </ProtectedRoute>
              } />
              <Route path="/admin/subscriptions" element={
                <ProtectedRoute requiredAccess="canManageSubscriptions" roles={['admin', 'super_admin']}>
                  <SubscriptionManager />
                </ProtectedRoute>
              } />
              <Route path="/admin/analytics" element={
                <ProtectedRoute requiredAccess="canViewAnalytics" roles={['admin', 'super_admin', 'commercial']}>
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
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
