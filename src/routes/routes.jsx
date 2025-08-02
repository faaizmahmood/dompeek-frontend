import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "../pages/auth/signup/signup";
import Signin from "../pages/auth/signin/signin";
import Cookies from 'js-cookie';

import ProtectedLayout from "../layout/ProtectedLayout";
import UnprotectedLayout from "../layout/UnprotectedLayout";
import Home from "../pages/home/home";
import VerifyEmail from "../components/emailVerification/VerifyEmail";
import RecentSearches from "../pages/recentSearches/recentSearches";
import Features from "../pages/features/features";

// Fake auth check
const isAuthenticated = () => Cookies.get("authToken");

// Route guards
const ProtectedRoute = ({ children }) => (
    isAuthenticated() ? children : <Navigate to="/signin" />
);

const GuestOnlyRoute = ({ children }) => (
    isAuthenticated() ? <Navigate to="/dashboard" /> : children
);

// Dummy Protected Pages
const DashboardHome = () => <div>Dashboard Home</div>;
const Lookup = () => <div>Lookup Page</div>;
const History = () => <div>History Page</div>;
const APIs = () => <div>APIs Page</div>;
const Billing = () => <div>Billing Page</div>;
const DashboardSettings = () => <div>Dashboard Settings</div>;
const ProtectedNotFound = () => <div>404 - Page Not Found (Protected)</div>;

// Dummy Public Pages
const Pricing = () => <div>Pricing Page</div>;
const PublicNotFound = () => <div>404 - Page Not Found (Public)</div>;

const AppRoutes = () => {
    return (
        <Routes>

            {/* Public Layout (for non-auth pages) */}
            <Route element={<UnprotectedLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/features" element={<Features />} />
                <Route path="/verify-email/:token" element={<VerifyEmail />} />
                <Route path="*" element={<PublicNotFound />} />
            </Route>

            {/* Auth-only pages (Signin/Signup) */}
            <Route element={<GuestOnlyRoute><UnprotectedLayout /></GuestOnlyRoute>}>
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
            </Route>

            {/* Protected layout with sidebar and dashboard content */}
            <Route element={<ProtectedRoute><ProtectedLayout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<DashboardHome />} />
                <Route path="/lookup" element={<Lookup />} />
                <Route path="/history" element={<RecentSearches />} />
                <Route path="/apis" element={<APIs />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/dashboard/settings" element={<DashboardSettings />} />
                <Route path="*" element={<ProtectedNotFound />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
