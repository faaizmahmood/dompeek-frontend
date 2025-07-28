import { useState } from 'react';
import styles from './header.module.scss';
import { FaBars, FaTimes } from 'react-icons/fa';
// import NavLink

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className={`container ${styles.headerContainer}`}>
                {/* Logo */}
                <div className={styles.logo}>
                    DomPeek<span>.com</span>
                </div>

                {/* Desktop Navigation */}
                <nav className={styles.desktopNav}>
                    <a href="#">Home</a>
                    <a href="#">Features</a>
                    <a href="#">Pricing</a>
                    <a href="#">Contact</a>
                </nav>

                {/* Auth Buttons */}
                <div className={styles.authButtons}>
                    <button className={styles.signIn}>Sign In</button>
                    <button className={styles.signUp}>Sign Up</button>
                </div>

                {/* Mobile Toggle */}
                <div
                    className={styles.mobileToggle}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className={styles.mobileMenu}>
                    <a href="#">Home</a>
                    <a href="#">Features</a>
                    <a href="#">Pricing</a>
                    <a href="#">Contact</a>
                    <button className={styles.signIn}>Sign In</button>
                    <button className={styles.signUp}>Sign Up</button>
                </div>
            )}
        </header>
    );
};

export default Header;
