
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import MainLayout from "@/components/layouts/MainLayout";

// Pages
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Challenges from "@/pages/Challenges";
import Library from "@/pages/Library";
import LibraryItem from "@/pages/LibraryItem";
import Leaderboard from "@/pages/Leaderboard";
import Simulator from "@/pages/Simulator";
import AdBudgetCalculator from "@/pages/AdBudgetCalculator";
import MarginCalculator from "@/pages/MarginCalculator";
import PassiveIncomeCalculator from "@/pages/PassiveIncomeCalculator";
import TrendAnalysis from "@/pages/TrendAnalysis";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import Notifications from "@/pages/Notifications";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";
import Challenge from "@/pages/challenge";
import SuperAdmin from "@/pages/SuperAdmin";

// Admin pages
import UserManager from "@/pages/admin/UserManager";
import ChallengeManager from "@/pages/admin/ChallengeManager";
import SubscriptionManager from "@/pages/admin/SubscriptionManager";
import AnalyticsManager from "@/pages/admin/AnalyticsManager";
import PaymentGatewayManager from "@/pages/admin/PaymentGatewayManager";
import PaymentDashboard from "@/pages/admin/PaymentDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><Index /></MainLayout>} />
        <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
        <Route path="/challenges" element={<MainLayout><Challenges /></MainLayout>} />
        <Route path="/challenge/:id" element={<MainLayout><Challenge /></MainLayout>} />
        <Route path="/library" element={<MainLayout><Library /></MainLayout>} />
        <Route path="/library/:id" element={<MainLayout><LibraryItem /></MainLayout>} />
        <Route path="/leaderboard" element={<MainLayout><Leaderboard /></MainLayout>} />
        <Route path="/simulator" element={<MainLayout><Simulator /></MainLayout>} />
        <Route path="/simulator/ad-budget" element={<MainLayout><AdBudgetCalculator /></MainLayout>} />
        <Route path="/simulator/margin" element={<MainLayout><MarginCalculator /></MainLayout>} />
        <Route path="/simulator/passive-income" element={<MainLayout><PassiveIncomeCalculator /></MainLayout>} />
        <Route path="/simulator/trend-analysis" element={<MainLayout><TrendAnalysis /></MainLayout>} />
        <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
        <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
        <Route path="/notifications" element={<MainLayout><Notifications /></MainLayout>} />
        <Route path="/auth" element={<Auth />} />
        
        {/* Routes d'administration */}
        <Route path="/admin" element={<SuperAdmin />} />
        <Route path="/admin/users" element={<UserManager />} />
        <Route path="/admin/challenges" element={<ChallengeManager />} />
        <Route path="/admin/subscriptions" element={<SubscriptionManager />} />
        <Route path="/admin/analytics" element={<AnalyticsManager />} />
        <Route path="/admin/payment-gateways" element={<PaymentGatewayManager />} />
        <Route path="/admin/payments" element={<PaymentDashboard />} />
        
        {/* Route 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
