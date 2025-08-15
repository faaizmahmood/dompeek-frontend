import styles from './header.module.scss';
import { NavLink } from 'react-router-dom';
import logo from '../../../src/assets/imgs/logo.png';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.headerContainer}`}>
                {/* Logo Only */}
                <NavLink to="/" className={styles.logo}>
                    <img src={logo} alt="Logo" />
                </NavLink>
            </div>
        </header>
    );
};

export default Header;
