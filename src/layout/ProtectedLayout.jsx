import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { FaBars, FaSignOutAlt, FaTachometerAlt, FaSearch, FaHistory, FaCreditCard } from 'react-icons/fa';
import { MdApi } from 'react-icons/md';
import styles from './ProtectedLayout.module.scss';
import EmailVerificationBanner from '../components/emailVerificationBanner/emailVerificationBanner';
import 'bootstrap/dist/css/bootstrap.min.css';
import NProgress from '../utils/nprogressConfig';
import handleLogout from '../utils/logout';
import { useDispatch } from 'react-redux';

const ProtectedLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [toggled, setToggled] = useState(false);
    const [mobileView, setMobileView] = useState(window.innerWidth <= 768);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch()

    useEffect(() => {
        NProgress.start();
        const timer = setTimeout(() => {
            NProgress.done();
        }, 500); // ⏳ mimic async load

        return () => clearTimeout(timer); // cleanup
    }, [location.pathname]);

    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth <= 768;
            setMobileView(isMobile);
            if (!isMobile) setToggled(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isActive = (path) => location.pathname === path;

    const menuItems = [
        { label: 'Dashboard', icon: <FaTachometerAlt />, path: '/dashboard' },
        { label: 'Lookup', icon: <FaSearch />, path: '/' },
        { label: 'History', icon: <FaHistory />, path: '/history' },
        { label: 'APIs', icon: <MdApi />, path: '/apis' },
        { label: 'Billing', icon: <FaCreditCard />, path: '/billing' },
    ];

    return (
        <div className={styles.layout}>
            {/* Mobile Toggle Button */}
            {mobileView && (
                <button className={styles.mobileToggle} onClick={() => setToggled(!toggled)}>
                    <FaBars className="text-white" />
                </button>
            )}

            <Sidebar
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                backgroundColor="#0f172a"
                className={styles.sidebar}
            >
                <Menu
                    menuItemStyles={{
                        button: ({ active }) => ({
                            backgroundColor: active ? '#fff' : 'transparent',
                            color: active ? '#1A1E34' : '#cbd5e1',
                            fontWeight: active ? 600 : 400,
                            '&:hover': {
                                backgroundColor: '#fff',
                                color: '#1A1E34',
                            },
                        }),
                        icon: ({ active }) => ({
                            color: active ? '#1A1E34' : '#cbd5e1',
                            '&:hover': {
                                color: '#1A1E34',
                            },
                        }),
                    }}
                >
                    <div>
                        <MenuItem
                            icon={<FaBars />}
                            onClick={() => setCollapsed(!collapsed)}
                            className="mb-4 mt-2"
                        >
                            <span className="fw-bold">Dom Peek</span>
                        </MenuItem>

                        {menuItems.map((item) => (
                            <MenuItem
                                key={item.path}
                                icon={item.icon}
                                active={isActive(item.path)}
                                onClick={() => navigate(item.path)}
                                className="mt-3"
                            >
                                <span>{item.label}</span>
                            </MenuItem>
                        ))}
                    </div>

                    <div>
                        <MenuItem
                            icon={<FaSignOutAlt />}
                            className="mt-3"
                            onClick={() => handleLogout(dispatch)}
                        >
                            <span className="">Logout</span>
                        </MenuItem>
                    </div>
                </Menu>
            </Sidebar>

            <main className={styles.main}>
                <EmailVerificationBanner />
                <div className="container-fluid p-3">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default ProtectedLayout;
