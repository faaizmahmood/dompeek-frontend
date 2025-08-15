import { Routes, Route, Navigate } from "react-router-dom";
import UnprotectedLayout from "../layout/UnprotectedLayout";
import Home from "../pages/home2/home";
import VerifyEmail from "../components/emailVerification/VerifyEmail";
import Features from "../pages/features/features";

// Dummy Public Pages
const Pricing = () => <div>Pricing Page</div>;

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Layout (MVP routes only) */}
            <Route element={<UnprotectedLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/features" element={<Features />} />
                {/* <Route path="/verify-email/:token" element={<VerifyEmail />} /> */}
                {/* Redirect any unknown route to Home */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
