import { Outlet } from "react-router-dom";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import EmailVerificationBanner from "../components/emailVerificationBanner/emailVerificationBanner";
import Loader from "../components/loader/loader";

const UnprotectedLayout = () => {
    return (
        <>
            <Loader />
            <EmailVerificationBanner />
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default UnprotectedLayout;
