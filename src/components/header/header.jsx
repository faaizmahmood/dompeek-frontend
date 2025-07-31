import { useState } from 'react';
import styles from './header.module.scss';
import { FaBars, FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { FiUser } from "react-icons/fi";


const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { token, profile } = useAppSelector((state) => state.user);

    return (
        <header className={styles.header}>
            <div className={`container ${styles.headerContainer}`}>
                {/* Logo */}
                <NavLink to="/" className={styles.logo}>
                    DomPeek<span></span>
                </NavLink>

                {/* Desktop Navigation */}
                <nav className={styles.desktopNav}>
                    <NavLink
                        to="/top-domains"
                        className={({ isActive }) => isActive ? styles.activeLink : ''}
                    >
                        Top Domains
                    </NavLink>

                    <NavLink
                        to="/features"
                        className={({ isActive }) => isActive ? styles.activeLink : ''}
                    >
                        Features
                    </NavLink>

                    <NavLink
                        to="/pricing"
                        className={({ isActive }) => isActive ? styles.activeLink : ''}
                    >
                        Pricing
                    </NavLink>

                    <NavLink
                        to="/contact"
                        className={({ isActive }) => isActive ? styles.activeLink : ''}
                    >
                        Contact
                    </NavLink>
                </nav>


                {/* Auth / User */}
                <div className={styles.authButtons}>
                    {!token ? (
                        <>
                            <NavLink to="/signin">
                                <button className={styles.signIn}>Sign In</button>
                            </NavLink>
                            <NavLink to="/signup">
                                <button className={styles.signUp}>Sign Up</button>
                            </NavLink>
                        </>
                    ) : (
                        <div className={styles.userInfo}>
                            {/* <span className='me-3 text-white'>
                                Hi, {profile?.data?.name?.split(' ')[0]?.charAt(0).toUpperCase() + profile?.data?.name?.split(' ')[0]?.slice(1)}
                            </span> */}

                            <NavLink to="/dashboard" className='text-decoration-none'>
                                <div className='d-flex gap-2 text-white'>
                                    <FiUser className='mt-1' />
                                    <p className="text-capitalize text-decoration-none mb-0">
                                        {profile?.data.name?.split(' ')[0]?.charAt(0).toUpperCase() +
                                            profile?.data.name?.split(' ')[0]?.slice(1).toLowerCase()}
                                    </p>
                                </div>
                            </NavLink>
                        </div>
                    )}
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
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/#features">Features</NavLink>
                    <NavLink to="/pricing">Pricing</NavLink>
                    <NavLink to="/#contact">Contact</NavLink>

                    {!token ? (
                        <>
                            <NavLink to="/signin">
                                <button className={styles.signIn}>Sign In</button>
                            </NavLink>
                            <NavLink to="/signup">
                                <button className={styles.signUp}>Sign Up</button>
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <div className={styles.userInfoMobile}>
                                <span>Hello, {profile?.name?.split(' ')[0]}</span>
                            </div>
                            <NavLink to="/dashboard">
                                <button className={styles.dashboardBtn}>Dashboard</button>
                            </NavLink>
                        </>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;
