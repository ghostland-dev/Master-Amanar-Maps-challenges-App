
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./components/layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { ResourceModalProvider } from "./components/ResourceModalProvider";

// Pages
import Home from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Library from "./pages/Library";
import LibraryItem from "./pages/LibraryItem";
import Challenges from "./pages/challenges";
import Challenge from "./pages/challenge";
import Simulator from "./pages/Simulators";
import Profile from "./pages/Profile";
import AuthPage from "./pages/Auth";
import SuperAdmin from "./pages/SuperAdmin";
import AdminChallenges from "./pages/admin/ChallengeManager";
import AdminUsers from "./pages/admin/UserManager";
import AdminSubscriptions from "./pages/admin/SubscriptionManager";
import AdminAnalytics from "./pages/admin/AnalyticsManager";
import AdminSettings from "./pages/admin/AdminSettings";
import PricingPage from "./pages/Subscriptions";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import SubscriptionSuccess from "./pages/Subscriptions";
import SubscriptionCancel from "./pages/Subscriptions";
import PartnerPortal from "./pages/partner/PartnerPortal";
import AffiliateDashboard from "./pages/affiliate/AffiliateDashboard";
import CommercialDashboard from "./pages/commercial/CommercialDashboard";
import MarginCalculator from "./pages/MarginCalculator";
import AdBudgetCalculator from "./pages/AdBudgetCalculator";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <ResourceModalProvider>
            <Routes>
              {/* Main Routes */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/library" element={<Library />} />
                <Route path="/library/:id" element={<LibraryItem />} />
                <Route path="/challenges" element={<Challenges />} />
                <Route path="/challenge/:id" element={<Challenge />} />
                <Route path="/simulators" element={<Simulator />} />
                <Route path="/margin-calculator" element={<MarginCalculator />} />
                <Route path="/ad-budget-calculator" element={<AdBudgetCalculator />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/subscriptions" element={<PricingPage />} />
                <Route path="/subscription-success" element={<SubscriptionSuccess />} />
                <Route path="/subscription-cancel" element={<SubscriptionCancel />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                {/* Protected Routes */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/partner-portal"
                  element={
                    <ProtectedRoute>
                      <PartnerPortal />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/affiliate-dashboard"
                  element={
                    <ProtectedRoute>
                      <AffiliateDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/commercial-dashboard"
                  element={
                    <ProtectedRoute>
                      <CommercialDashboard />
                    </ProtectedRoute>
                  }
                />
              </Route>

              {/* Auth Routes */}
              <Route path="/auth" element={<AuthPage />} />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute roles={['admin', 'super_admin']}>
                    <SuperAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/challenges"
                element={
                  <ProtectedRoute roles={['admin', 'super_admin']}>
                    <AdminChallenges />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute roles={['admin', 'super_admin']}>
                    <AdminUsers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/subscriptions"
                element={
                  <ProtectedRoute roles={['admin', 'super_admin']}>
                    <AdminSubscriptions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/analytics"
                element={
                  <ProtectedRoute roles={['admin', 'super_admin']}>
                    <AdminAnalytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <ProtectedRoute roles={['admin', 'super_admin']}>
                    <AdminSettings />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </ResourceModalProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
