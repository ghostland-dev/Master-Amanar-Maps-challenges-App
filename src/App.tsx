import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./components/layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { ResourceModalProvider } from "./components/ResourceModalProvider";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Library from "./pages/Library";
import LibraryItem from "./pages/LibraryItem";
import Challenges from "./pages/Challenges";
import Simulator from "./pages/Simulator";
import Profile from "./pages/Profile";
import AuthPage from "./pages/AuthPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminChallenges from "./pages/admin/AdminChallenges";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSubscriptions from "./pages/admin/AdminSubscriptions";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSettings from "./pages/admin/AdminSettings";
import PricingPage from "./pages/PricingPage";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import SubscriptionSuccess from "./pages/SubscriptionSuccess";
import SubscriptionCancel from "./pages/SubscriptionCancel";
import PartnerPortal from "./pages/PartnerPortal";
import AffiliateDashboard from "./pages/AffiliatesDashboard";
import CommercialDashboard from "./pages/CommercialDashboard";
import MarginCalculator from "./pages/MarginCalculator";
import AdBudgetCalculator from "./pages/AdBudgetCalculator";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ResourceModalProvider>
          <Router>
            <Routes>
              {/* Main Routes */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/library" element={<Library />} />
                <Route path="/library/:id" element={<LibraryItem />} />
                <Route path="/challenges" element={<Challenges />} />
                <Route path="/simulators" element={<Simulator />} />
                <Route path="/margin-calculator" element={<MarginCalculator />} />
                <Route path="/ad-budget-calculator" element={<AdBudgetCalculator />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/subscriptions" element={<PricingPage />} />
                <Route path="/subscription-success" element={<SubscriptionSuccess />} />
                <Route path="/subscription-cancel" element={<SubscriptionCancel />} />

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
                  <ProtectedRoute requiredRole={['admin', 'super_admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/challenges"
                element={
                  <ProtectedRoute requiredRole={['admin', 'super_admin']}>
                    <AdminChallenges />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute requiredRole={['admin', 'super_admin']}>
                    <AdminUsers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/subscriptions"
                element={
                  <ProtectedRoute requiredRole={['admin', 'super_admin']}>
                    <AdminSubscriptions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/analytics"
                element={
                  <ProtectedRoute requiredRole={['admin', 'super_admin']}>
                    <AdminAnalytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <ProtectedRoute requiredRole={['admin', 'super_admin']}>
                    <AdminSettings />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </ResourceModalProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
